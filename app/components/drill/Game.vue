<script setup lang="ts">
import type { Game, GameResult, Item, Opt } from '~/data/polski/cwiczenia/types'
import type { AnimalKind } from '~/data/polski/cwiczenia/world'

/**
 * Silnik gry: kolejka zadań, punkty, seria, nagrody. Samą „zabawę” robi tryb:
 *  jump     — zwierzak skacze na kamień z dobrą literą,
 *  balloons — przebij dobry balon,
 *  catch    — łap spadające litery koszykiem,
 *  tap      — zwykłe przyciski.
 * Błąd = podpowiedź, zadanie wraca raz na koniec. Seria 5 = tryb SUPER (×2).
 * Losujemy tylko w przeglądarce — komponent jest w <ClientOnly>.
 */
type Mode = 'jump' | 'balloons' | 'catch' | 'tap'

const props = defineProps<{ game: Game; color?: string; animal?: AnimalKind; marks?: string[]; mode?: Mode }>()
const emit = defineEmits<{ (e: 'done', r: GameResult): void }>()

const { t, tm, lang, showPl } = useT()
const sound = useSound()
const { focus } = useSettings()

type Slot = { item: Item; retry: boolean }

const queue = ref<Slot[]>([])
const pos = ref(0)
const state = ref<'ask' | 'bad' | 'ok'>('ask')
const wrong = ref(new Set<number>())
const missed = ref(0)
const size = ref(0)
const xp = ref(0)
const combo = ref(0)
const best = ref(0)
const gain = ref(0)
const praise = ref('')
const flash = ref('')
const react = ref(0)
const coins = ref<{ id: number; dx: number; dy: number; d: number }[]>([])

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

function start() {
  const g = props.game
  const rn = Math.min(g.reviewN ?? (g.review?.length ? 2 : 0), g.review?.length ?? 0)
  const main = shuffle(g.items).slice(0, Math.max(1, g.round - rn))
  const extra = shuffle(g.review ?? []).filter(x => !main.includes(x)).slice(0, rn)
  const all = shuffle([...main, ...extra])
  queue.value = all.map(item => ({ item, retry: false }))
  size.value = all.length
  pos.value = 0
  missed.value = 0
  xp.value = 0
  combo.value = 0
  best.value = 0
  state.value = 'ask'
  wrong.value = new Set()
}
start()
watch(() => props.game.id, start)

const slot = computed(() => queue.value[pos.value]!)
const it = computed(() => slot.value.item)
const answerText = computed(() => optPl(it.value.opts[it.value.answer]!))
const full = computed(() => it.value.say ?? (it.value.mark ? `${it.value.pre}${it.value.mark}${it.value.post}` : `${it.value.pre}${answerText.value}${it.value.post}`))
const progress = computed(() => (pos.value + (state.value === 'ok' ? 1 : 0)) / queue.value.length)
const fever = computed(() => combo.value >= 5)

/* ---------- tryb gry ---------- */
const MODES: { id: Mode; icon: string; key: string }[] = [
  { id: 'jump', icon: '🦘', key: 'drill.mJump' },
  { id: 'balloons', icon: '🎈', key: 'drill.mBalloons' },
  { id: 'catch', icon: '🧺', key: 'drill.mCatch' },
  { id: 'tap', icon: '👆', key: 'drill.mTap' }
]
const maxOpts = computed(() => Math.max(...props.game.items.map(i => i.opts.length)))
/* za dużo opcji na planszę → zostaje tryb z przyciskami */
/* długie odpowiedzi (np. „główny (ile?)”) nie mieszczą się na kamieniach i balonach */
const maxLen = computed(() => Math.max(...props.game.items.flatMap(i => i.opts.map(o => optPl(o).length))))
const modes = computed(() =>
  MODES.filter(m => m.id === 'tap' || (maxLen.value <= 12 && maxOpts.value <= (m.id === 'catch' && props.game.size === 'sentence' ? 4 : 5)))
)
const chosen = ref<Mode | null>(null)
const mode = computed<Mode>(() => {
  const want = chosen.value ?? props.mode ?? 'jump'
  if (modes.value.some(m => m.id === want)) return want
  return modes.value.find(m => m.id !== 'tap')?.id ?? 'tap'
})

function optPl(o: Opt) {
  return typeof o === 'string' ? o : o.pl
}

/* ---------- monetki lecą do licznika ---------- */
const root = ref<HTMLElement>()
const coinEl = ref<HTMLElement>()
let coinId = 0
function flyCoins(n: number) {
  if (focus.value || !root.value || !coinEl.value) return
  const r = root.value.getBoundingClientRect()
  const c = coinEl.value.getBoundingClientRect()
  const sx = r.width / 2
  const sy = r.height * 0.42
  const dx = c.left - r.left + c.width / 2 - sx
  const dy = c.top - r.top + c.height / 2 - sy
  for (let i = 0; i < n; i++) {
    const id = ++coinId
    coins.value.push({ id, dx, dy, d: i * 0.09 })
    setTimeout(() => {
      coins.value = coins.value.filter(x => x.id !== id)
      sound.play('coin')
    }, 750 + i * 90)
  }
}

function pick(k: number) {
  if (state.value === 'ok' || wrong.value.has(k)) return
  if (k === it.value.answer) {
    const first = wrong.value.size === 0 && !slot.value.retry
    state.value = 'ok'
    combo.value = first ? combo.value + 1 : 0
    best.value = Math.max(best.value, combo.value)
    gain.value = (first ? 10 : 5) * (fever.value ? 2 : 1)
    xp.value += gain.value
    react.value++
    const list = tm<string[]>('drill.praise')
    praise.value = list[Math.floor(Math.random() * list.length)] ?? t('drill.ok')
    flyCoins(Math.min(5, Math.round(gain.value / 5)))
    if (first && combo.value === 5) {
      flash.value = t('drill.fever')
      sound.play('fever')
      setTimeout(() => (flash.value = ''), 1500)
    } else if (first && combo.value >= 3 && combo.value % 2 === 1) {
      flash.value = `🔥 ${t('drill.combo', { n: combo.value })}`
      sound.play('combo')
      setTimeout(() => (flash.value = ''), 1100)
    } else sound.play('ok')
    setTimeout(() => say(full.value), 300)
  } else {
    state.value = 'bad'
    combo.value = 0
    react.value++
    sound.play('bad')
    wrong.value = new Set(wrong.value).add(k)
    if (!slot.value.retry && !queue.value.slice(pos.value + 1).some(s => s.item === it.value)) {
      missed.value++
      queue.value.push({ item: it.value, retry: true })
    }
  }
}

function next() {
  if (state.value !== 'ok') return
  if (pos.value + 1 >= queue.value.length) {
    const firstTry = size.value - missed.value
    const r = firstTry / Math.max(size.value, 1)
    emit('done', { stars: r >= 0.9 ? 3 : r >= 0.6 ? 2 : 1, xp: xp.value, firstTry, total: size.value, best: best.value })
  } else {
    pos.value++
    state.value = 'ask'
    wrong.value = new Set()
  }
}

/* tryb może mieć własną animację przed wyborem (skok, przebicie balonu) */
const modeRef = ref<{ act?: (k: number) => void; key?: (e: KeyboardEvent) => boolean }>()
function choose(k: number) {
  if (modeRef.value?.act) modeRef.value.act(k)
  else pick(k)
}

function onKey(e: KeyboardEvent) {
  if (e.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return
  if (e.key === 'Enter' && state.value === 'ok') {
    e.preventDefault()
    return next()
  }
  if (modeRef.value?.key?.(e)) return e.preventDefault()
  const n = Number(e.key)
  if (n >= 1 && n <= it.value.opts.length) {
    e.preventDefault()
    choose(n - 1)
  }
}

const canSpeak = ref(false)
onMounted(() => {
  canSpeak.value = 'speechSynthesis' in window
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
function say(text: string) {
  if (!canSpeak.value) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'pl-PL'
  u.rate = 0.85
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}

const modeProps = computed(() => ({
  opts: it.value.opts,
  answer: it.value.answer,
  state: state.value,
  wrong: wrong.value,
  animal: props.animal ?? 'jez',
  round: `${pos.value}-${slot.value.retry ? 'r' : ''}`,
  sentence: props.game.size === 'sentence'
}))
</script>

<template>
  <div ref="root" class="dg" :class="[`dg--${state}`, { 'dg--fever': fever }]" :style="{ '--c': color ?? 'var(--pl)' }">
    <!-- HUD -->
    <div class="hud">
      <div class="road" role="progressbar" :aria-valuenow="Math.round(progress * 100)" aria-valuemin="0" aria-valuemax="100" :aria-label="t('drill.progress', { i: pos + 1, n: queue.length })">
        <span class="road__fill" :style="{ width: `${progress * 100}%` }" />
        <span class="road__walker" :style="{ left: `${progress * 100}%` }">
          <Animal :kind="animal ?? 'jez'" :size="40" :act="state === 'ok' ? 'walk' : 'idle'" mood="happy" />
        </span>
        <span class="road__flag" aria-hidden="true">🏁</span>
      </div>
      <span class="hud__combo" :class="{ hot: combo >= 3 }" :aria-label="t('drill.combo', { n: combo })">🔥{{ combo }}</span>
      <span ref="coinEl" class="hud__coins" :class="{ bump: coins.length }">🪙 {{ xp }}</span>
      <button type="button" class="hud__btn" :aria-pressed="sound.on.value" :aria-label="t('drill.sound')" @click="sound.on.value = !sound.on.value">{{ sound.on.value ? '🔔' : '🔕' }}</button>
    </div>

    <div v-if="modes.length > 1" class="modes" role="radiogroup" :aria-label="t('drill.mode')">
      <button
        v-for="m in modes"
        :key="m.id"
        type="button"
        role="radio"
        class="modes__b"
        :class="{ on: mode === m.id }"
        :aria-checked="mode === m.id"
        @click="chosen = m.id"
      >{{ m.icon }} <span>{{ t(m.key) }}</span></button>
    </div>

    <!-- zadanie na tabliczce -->
    <div class="sign" :class="{ 'sign--word': game.size === 'word' }">
      <p class="sign__q">
        {{ game.prompt.pl }}
        <small v-if="showPl" :lang="lang">{{ game.prompt[lang] }}</small>
      </p>
      <p :key="pos" class="sign__text" :class="state" lang="pl">
        <span>{{ it.pre }}</span>
        <mark v-if="it.mark" class="sign__mark">{{ it.mark }}</mark>
        <span v-else class="sign__gap">{{ state === 'ok' ? answerText : game.size === 'word' ? '?' : '…' }}</span>
        <span>{{ it.post }}</span>
      </p>
      <button v-if="canSpeak && !it.mark && game.size === 'word'" type="button" class="sign__say" :aria-label="t('drill.listen')" @click="say(full)">🔊</button>
      <span v-if="slot.retry" class="sign__retry">↺ {{ t('drill.retry') }}</span>
    </div>

    <!-- plansza trybu -->
    <div class="field">
      <DrillModeJump v-if="mode === 'jump'" ref="modeRef" v-bind="modeProps" @pick="pick" />
      <DrillModeBalloons v-else-if="mode === 'balloons'" ref="modeRef" v-bind="modeProps" @pick="pick" />
      <DrillModeCatch v-else-if="mode === 'catch'" ref="modeRef" v-bind="modeProps" @pick="pick" />
      <DrillModeTap v-else ref="modeRef" v-bind="modeProps" @pick="pick" />
      <span v-if="state === 'ok'" :key="`g${pos}`" class="gain deco">+{{ gain }}</span>
      <span v-if="flash" class="flash">{{ flash }}</span>
    </div>

    <!-- monetki -->
    <span v-for="c in coins" :key="c.id" class="coin" :style="{ '--dx': `${c.dx}px`, '--dy': `${c.dy}px`, animationDelay: `${c.d}s` }" aria-hidden="true">🪙</span>

    <!-- dymek przewodnika -->
    <div class="say" :class="state" aria-live="polite">
      <Animal :key="`a${react}`" :kind="animal ?? 'jez'" :size="72" class="say__pet" :mood="state === 'ok' ? 'joy' : state === 'bad' ? 'sad' : 'think'" :act="state === 'ok' ? 'jump' : state === 'bad' ? 'shake' : 'idle'" />
      <div class="say__msg">
        <span v-if="state === 'ask'" class="say__tip">{{ t(`drill.how.${mode}`) }}</span>
        <template v-else>
          <b>{{ state === 'ok' ? praise : t('drill.bad') }}</b>
          <Rich :text="it.hint.pl" lang="pl" :marks="marks" />
          <Rich v-if="showPl" :text="it.hint[lang]" class="say__tr" :lang="lang" :marks="marks" />
          <template v-if="state === 'ok'">
            <span v-if="it.proof" class="say__proof" lang="pl"><Rich :text="it.proof" :marks="marks" /></span>
            <span v-if="it.tr" class="say__chips">
              <span v-if="lang !== 'ru'" class="chip" lang="uk"><b>UA</b> {{ it.tr.uk }}</span>
              <span v-if="lang !== 'uk'" class="chip" lang="ru"><b>RU</b> {{ it.tr.ru }}</span>
            </span>
          </template>
        </template>
      </div>
    </div>

    <button v-if="state === 'ok'" type="button" class="btn btn--primary btn--lg next" @click="next">
      {{ pos + 1 >= queue.length ? t('drill.finish') : t('drill.next') }} →
    </button>
  </div>
</template>

<style scoped>
.dg {
  position: relative;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 12px;
  width: 100%;
  padding: 14px 16px 20px;
  background: rgb(255 255 255 / .94);
  border: var(--border);
  border-radius: 30px;
  box-shadow: 0 8px 0 var(--ink);
}
.dg--fever { animation: fever-border 1.2s linear infinite; }
@keyframes fever-border {
  0% { box-shadow: 0 8px 0 var(--ink), 0 0 0 6px #ff4d6d; }
  25% { box-shadow: 0 8px 0 var(--ink), 0 0 0 6px #ffb627; }
  50% { box-shadow: 0 8px 0 var(--ink), 0 0 0 6px #34c47c; }
  75% { box-shadow: 0 8px 0 var(--ink), 0 0 0 6px #4d86ff; }
  100% { box-shadow: 0 8px 0 var(--ink), 0 0 0 6px #ff4d6d; }
}

/* HUD */
.hud { display: flex; align-items: center; gap: 8px; width: 100%; }
.road { position: relative; flex: 1; height: 20px; margin: 16px 26px 0 10px; background: repeating-linear-gradient(90deg, #e9dcc0 0 14px, #f6ecd6 14px 28px); border: 2px solid var(--ink); border-radius: 99px; }
.road__fill { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, var(--g1), var(--c)); border-radius: 99px; transition: width .6s var(--ease-bounce); }
.road__walker { position: absolute; bottom: 0; translate: -50% 0; line-height: 0; transition: left .6s var(--ease-bounce); z-index: 2; }
.road__flag { position: absolute; right: -24px; bottom: -2px; font-size: 24px; line-height: 1; }
.hud__combo, .hud__coins { flex: none; padding: 3px 10px; font-family: var(--font-display); font-weight: 700; font-size: 17px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; box-shadow: 0 3px 0 var(--ink); }
.hud__combo { filter: grayscale(1); opacity: .5; transition: all .2s; }
.hud__combo.hot { filter: none; opacity: 1; background: #ffd6a5; animation: pop-in .35s var(--ease-bounce); }
.hud__coins { background: #fff1a8; }
.hud__coins.bump { animation: bump .3s ease 3; }
.hud__btn { flex: none; width: 36px; height: 36px; font-size: 16px; background: var(--white); border: 2px solid var(--ink); border-radius: 50%; cursor: pointer; }
@keyframes bump { 50% { transform: scale(1.18); } }

.modes { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
.modes__b { padding: 4px 12px; font-family: var(--font-display); font-weight: 600; font-size: 15px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; cursor: pointer; opacity: .65; }
.modes__b.on { opacity: 1; background: #ffe066; box-shadow: 0 3px 0 var(--ink); }

/* tabliczka */
.sign {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 2px;
  width: min(100%, 720px);
  padding: 10px 22px 14px;
  background: linear-gradient(180deg, #e2a865, #c98a47);
  border: var(--border);
  border-radius: 18px;
  box-shadow: inset 0 -6px 0 rgb(0 0 0 / .12), 0 5px 0 var(--ink);
}
.sign::before, .sign::after { content: ''; position: absolute; top: 12px; width: 10px; height: 10px; background: #7a4b22; border-radius: 50%; }
.sign::before { left: 10px; }
.sign::after { right: 10px; }
.sign__q { display: grid; justify-items: center; font-family: var(--font-display); font-weight: 600; font-size: 16px; color: #4a2a0f; text-align: center; }
.sign__q small { font-family: var(--font-body); font-size: 13px; color: #5f3a17; }
.sign__text {
  margin: 0;
  padding: 2px 18px;
  font-family: var(--font-display);
  font-weight: 700;
  text-align: center;
  white-space: pre-wrap;
  color: #fff;
  text-shadow: 0 3px 0 rgb(0 0 0 / .25);
  animation: sign-in .4s var(--ease-bounce);
}
.sign--word .sign__text { font-size: clamp(42px, 10vw, 76px); line-height: 1.05; letter-spacing: .02em; }
.sign:not(.sign--word) .sign__text { font-size: clamp(22px, 4.4vw, 34px); line-height: 1.3; }
.sign__gap { display: inline-block; min-width: .62em; margin-inline: 1px; text-align: center; color: #ffe9a8; border-bottom: 5px dashed #ffe9a8; }
.sign:not(.sign--word) .sign__gap { min-width: 3em; }
.ok .sign__gap { color: #fff; background: var(--hl); border-bottom: 0; border-radius: 10px; padding: 0 .08em; text-shadow: none; animation: pop-big .5s var(--ease-bounce); }
.sign__mark { padding: 0 .2em; color: #fff; background: var(--hl); border-radius: 8px; text-shadow: none; }
.sign__text.bad { animation: shake .4s; }
.sign__say { position: absolute; right: 10px; bottom: 10px; width: 40px; height: 40px; font-size: 18px; background: #fff3d6; border: 2px solid var(--ink); border-radius: 50%; cursor: pointer; }
.sign__retry { margin-top: 2px; padding: 1px 10px; font-size: 13px; font-weight: 800; background: #fff3d6; border-radius: 99px; }

/* plansza */
.field { position: relative; width: 100%; }
.gain { position: absolute; top: 10px; right: 14%; z-index: 6; font-family: var(--font-display); font-weight: 700; font-size: 34px; color: #ffd23f; -webkit-text-stroke: 2px var(--ink); animation: float-up 1s ease-out forwards; }
.flash {
  position: absolute;
  left: 50%;
  top: 40%;
  z-index: 7;
  padding: 10px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(24px, 5vw, 36px);
  white-space: nowrap;
  background: linear-gradient(90deg, #ff4d6d, #ffb627, #34c47c, #4d86ff);
  color: #fff;
  -webkit-text-stroke: 1.5px var(--ink);
  border: var(--border);
  border-radius: 99px;
  box-shadow: 0 6px 0 var(--ink);
  translate: -50% -50%;
  animation: pop-big .5s var(--ease-bounce);
}

.coin { position: absolute; left: 50%; top: 42%; z-index: 9; font-size: 28px; pointer-events: none; animation: coin-fly .75s cubic-bezier(.5, -0.4, .6, 1) forwards; }
@keyframes coin-fly {
  0% { transform: translate(-50%, -50%) scale(.4); opacity: 0; }
  15% { transform: translate(-50%, -120%) scale(1.2); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(.6); opacity: 1; }
}

/* dymek */
.say { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 70px; padding: 10px 14px; text-align: left; background: #f6f1e4; border: 2px solid transparent; border-radius: 20px; }
.say.ok { background: #e9fbef; border-color: var(--green); animation: pop-in .3s var(--ease-bounce); }
.say.bad { background: #fff3c4; }
.say__pet { flex: none; margin: -16px 0 -8px -6px; }
.say__msg { display: grid; gap: 4px; flex: 1; font-size: 16px; line-height: 1.4; }
.say__msg b { font-family: var(--font-display); font-weight: 700; font-size: 22px; }
.say.ok .say__msg > b { color: var(--green); }
.say__tr { font-size: 15px; color: var(--ink-soft); }
.say__tip { font-weight: 700; color: var(--ink-soft); }
.say__proof { justify-self: start; padding: 2px 12px; font-family: var(--font-display); font-weight: 600; font-size: 19px; background: #fff; border: 2px solid var(--ink); border-radius: 10px; }
.say__chips { display: flex; flex-wrap: wrap; gap: 6px; }
.say__chips b { font-size: 11px; color: var(--muted); }
.next { animation: pop-in .3s var(--ease-bounce); box-shadow: 0 6px 0 var(--ink); }

@keyframes sign-in { from { transform: translateY(-14px) rotate(-3deg); opacity: 0; } }
@keyframes pop-big { 0% { transform: scale(.6); } 60% { transform: scale(1.18); } 100% { transform: scale(1); } }
@keyframes float-up { 0% { transform: translateY(10px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(-60px); opacity: 0; } }

@media (max-width: 560px) {
  .dg { padding: 10px 10px 16px; border-radius: 24px; }
  .modes__b span { display: none; }
  .hud__combo, .hud__coins { padding: 2px 8px; font-size: 15px; }
  .sign { padding: 8px 14px 12px; }
}
</style>
