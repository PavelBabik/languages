<script setup lang="ts">
import { exercise, levelKey, levelStates } from '~/data/polski/cwiczenia'
import type { GameResult } from '~/data/polski/cwiczenia/types'

/**
 * Przystanek w krainie: przewodnik opowiada (dymki po kolei) → przykłady (tap) → gra → pieczątka.
 * Mało tekstu naraz; każdy krok kończy się jednym dużym przyciskiem.
 */
definePageMeta({ layout: 'game' })

const route = useRoute()
const ex = computed(() => exercise(String(route.params.slug)))
const idx = computed(() => ex.value?.levels.findIndex(l => l.id === route.params.level) ?? -1)
if (!ex.value || idx.value < 0) throw createError({ statusCode: 404, statusMessage: 'Nie ma takiego poziomu', fatal: true })

const { t, lang, loc, showPl } = useT()
const lp = useLocalePath()
const { stars, xp, save, addXp, touchDay } = useProgress()
const { focus } = useSettings()
const sound = useSound()

const lv = computed(() => ex.value!.levels[idx.value]!)
const land = computed(() => ex.value!.land)
const animal = computed(() => land.value?.animal ?? 'jez')
const mapUrl = computed(() => lp(`/polski/cwiczenia/${ex.value!.slug}`))

/* zamknięty przystanek → wracamy na mapę */
const before = levelStates(ex.value!, stars.value)
if (!before.list[idx.value]?.open) await navigateTo(mapUrl.value, { replace: true })

usePageSeo({
  title: () => `${lv.value.title.pl} — ${ex.value!.title.pl} — ease.lang`,
  description: () => t('seo.cwOne', { title: loc(ex.value!.title) })
})

type Phase = 'story' | 'examples' | 'game' | 'reward'
const phases = computed<Phase[]>(() => (lv.value.examples.length ? ['story', 'examples', 'game', 'reward'] : ['story', 'game', 'reward']))
const phase = ref<Phase>('story')

/* ---------- opowieść: dymki po kolei ---------- */
const bubbles = computed(() => [lv.value.rule, ...(lv.value.explain ?? [])])
const shown = ref(1)
const typing = ref(false)
const storyDone = computed(() => shown.value >= bubbles.value.length)
function more() {
  if (typing.value || storyDone.value) return
  typing.value = true
  sound.play('pop')
  setTimeout(() => {
    typing.value = false
    shown.value++
  }, focus.value ? 0 : 550)
}

/* ---------- przykłady ---------- */
const opened = ref(new Set<number>())
const hop = ref(0)
const allOpen = computed(() => opened.value.size >= lv.value.examples.length)
function onOpen(i: number) {
  opened.value = new Set(opened.value).add(i)
  hop.value++
  if (opened.value.size === lv.value.examples.length) setTimeout(() => sound.play('combo'), 200)
}

watch(() => route.params.level, () => {
  phase.value = 'story'
  shown.value = 1
  opened.value = new Set()
  result.value = null
})

function go(p: Phase) {
  phase.value = p
  if (import.meta.client) window.scrollTo({ top: 0, behavior: focus.value ? 'auto' : 'smooth' })
}

/* ---------- nagroda ---------- */
const result = ref<GameResult | null>(null)
const bonus = 20
const newBadge = ref(false)
const shownStars = ref(0)
const shownXp = ref(0)

function onDone(r: GameResult) {
  const wasComplete = levelStates(ex.value!, stars.value).complete
  result.value = r
  save(levelKey(ex.value!.slug, lv.value.id), r.stars)
  addXp(r.xp + bonus)
  touchDay()
  newBadge.value = !wasComplete && levelStates(ex.value!, stars.value).complete
  go('reward')
  sound.play('win')
  shownStars.value = 0
  shownXp.value = 0
  for (let k = 1; k <= r.stars; k++) {
    setTimeout(() => {
      shownStars.value = k
      sound.play('star')
    }, 1100 + k * 420)
  }
  const target = r.xp + bonus
  const t0 = performance.now()
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / 900)
    shownXp.value = Math.round(target * p)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* tryb gry: domyślnie na zmianę — skoki, balony, łapanie */
const defaultMode = computed(() => (['jump', 'balloons', 'catch'] as const)[idx.value % 3]!)

const nextLevel = computed(() => ex.value!.levels[idx.value + 1])
function again() {
  result.value = null
  go('game')
}
const ICON: Record<Phase, string> = { story: '💬', examples: '👆', game: '🎮', reward: '🎫' }
</script>

<template>
  <div v-if="ex && lv" class="lp" :style="{ '--c': ex.color, '--soft': ex.soft, '--g': land?.ground, '--g2': land?.ground2 }">
    <WorldScene v-if="land" :sky="land.sky" :ground="land.ground" :ground2="land.ground2" :deco="land.deco" />

    <div class="container lp__top">
      <NuxtLink :to="mapUrl" class="lp__close" :aria-label="t('lvl.toMap')">✕</NuxtLink>
      <div class="steps" aria-hidden="true">
        <span v-for="(p, k) in phases" :key="p" class="steps__i" :class="{ on: phases.indexOf(phase) >= k, now: phase === p }">{{ ICON[p] }}</span>
      </div>
      <span class="lp__lvl">📍 {{ land?.name.pl }} · {{ idx + 1 }}/{{ ex.levels.length }}</span>
      <SettingsBar compact class="lp__set" />
    </div>

    <!-- 1. Opowieść przewodnika -->
    <section v-if="phase === 'story'" class="container stage">
      <div class="story">
        <div class="story__head">
          <span class="story__tag">{{ lv.boss ? `👑 ${t('lvl.boss')}` : t('lvl.level', { n: idx + 1 }) }}</span>
          <h1 lang="pl"><Rich :text="lv.title.pl" :marks="ex.marks" /></h1>
          <p v-if="showPl" class="story__sub">{{ loc(lv.title) }}</p>
        </div>
        <div class="chat">
          <div class="chat__who">
            <Animal :kind="animal" :size="120" :mood="storyDone ? 'joy' : 'happy'" :act="typing ? 'walk' : 'idle'" />
            <b lang="pl">{{ land?.guide }}</b>
          </div>
          <div class="chat__list" aria-live="polite">
            <div v-for="(b, k) in bubbles.slice(0, shown)" :key="k" class="bubble" :class="{ 'bubble--rule': k === 0 }">
              <span v-if="k === 0" class="bubble__tag">📘 {{ t('lvl.rule') }}</span>
              <Rich :text="b.pl" tag="p" class="bubble__pl" lang="pl" :marks="ex.marks" />
              <Rich v-if="showPl" :text="b[lang]" tag="p" class="bubble__tr" :lang="lang" :marks="ex.marks" />
            </div>
            <div v-if="typing" class="bubble bubble--typing"><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <button v-if="!storyDone" type="button" class="btn btn--lg big btn--game" @click="more">{{ t('lvl.more') }} 💬</button>
      <button v-else-if="lv.examples.length" type="button" class="btn btn--primary btn--lg big btn--game pulse" @click="go('examples')">{{ t('lvl.got') }} →</button>
      <button v-else type="button" class="btn btn--primary btn--lg big btn--game pulse" @click="go('game')">▶ {{ t('lvl.play') }}</button>
    </section>

    <!-- 2. Przykłady -->
    <section v-else-if="phase === 'examples'" class="container stage">
      <div class="ex-head">
        <Animal :key="hop" :kind="animal" :size="96" :act="hop ? 'jump' : 'idle'" :mood="allOpen ? 'joy' : 'wow'" />
        <div class="ex-head__bubble">
          <h2>{{ t('lvl.tapAll') }} <span class="count">{{ opened.size }}/{{ lv.examples.length }}</span></h2>
          <Rich :text="lv.rule.pl" tag="p" lang="pl" :marks="ex.marks" />
        </div>
      </div>
      <div class="reveals">
        <DrillReveal v-for="(x, i) in lv.examples" :key="x" :text="x" :index="i" @open="onOpen(i)" />
      </div>

      <div v-if="allOpen && lv.tip" class="tip">
        <span class="tip__badge">💡 {{ t('cw.trick') }}</span>
        <b>{{ loc(lv.tip.title) }}</b>
        <Rich :text="loc(lv.tip.text)" tag="p" :marks="ex.marks" />
        <div v-if="lv.tip.examples" class="tip__ex">
          <DrillExample v-for="x in lv.tip.examples" :key="x" :text="x" />
        </div>
      </div>

      <button v-if="allOpen" type="button" class="btn btn--primary btn--lg big btn--game pulse" @click="go('game')">▶ {{ t('lvl.play') }}</button>
      <button v-else type="button" class="skip" @click="go('game')">{{ t('lvl.skip') }}</button>
    </section>

    <!-- 3. Gra -->
    <section v-else-if="phase === 'game'" class="container stage stage--game">
      <ClientOnly>
        <DrillGame :key="`${lv.id}-${result ? 'b' : 'a'}`" :game="lv.game" :color="land?.ground2 ?? ex.color" :animal="animal" :marks="ex.marks" :mode="defaultMode" @done="onDone" />
        <template #fallback><div class="ph" /></template>
      </ClientOnly>
    </section>

    <!-- 4. Pieczątka i nagroda -->
    <section v-else-if="phase === 'reward' && result" class="container stage reward">
      <Confetti v-if="!focus" />
      <div class="reward__top">
        <Animal :kind="animal" :size="150" mood="joy" act="jump" />
        <div class="stampbig" aria-hidden="true">
          <span class="stampbig__ring">
            <small lang="pl">{{ land?.name.pl }}</small>
            <b>{{ lv.icon }}</b>
            <small>★ {{ result.stars }}/3</small>
          </span>
        </div>
      </div>
      <p class="reward__new">🎫 {{ t('world.stamp') }}</p>
      <h1>{{ result.stars === 3 ? t('lvl.perfect') : t('lvl.done') }}</h1>
      <p class="reward__stars" :aria-label="`${result.stars}/3`">
        <span v-for="k in 3" :key="k" :class="{ on: k <= shownStars }">★</span>
      </p>
      <div class="reward__row">
        <span class="pill pill--xp">⚡ +{{ shownXp }} XP</span>
        <span class="pill">✓ {{ t('lvl.firstTry', { n: result.firstTry, total: result.total }) }}</span>
        <span v-if="result.best >= 3" class="pill pill--fire">🔥 {{ t('lvl.bestCombo', { n: result.best }) }}</span>
      </div>
      <p class="reward__total">{{ t('lvl.totalXp', { n: xp }) }}</p>

      <div v-if="newBadge" class="badge">
        <Animal :kind="animal" :size="70" mood="joy" />
        <span>
          <small>{{ t('lvl.newBadge') }}</small>
          <b>🏅 {{ loc(ex.badge) }}</b>
          <em lang="pl">{{ land?.guide }} — {{ t('world.friends').toLowerCase() }} ♥</em>
        </span>
      </div>

      <div class="reward__btns">
        <NuxtLink
          v-if="nextLevel"
          :to="lp(`/polski/cwiczenia/${ex.slug}/${nextLevel.id}`)"
          class="btn btn--primary btn--lg big btn--game pulse"
        >{{ nextLevel.boss ? `👑 ${t('lvl.toBoss')}` : t('world.next') }} →</NuxtLink>
        <NuxtLink v-else :to="lp('/polski/cwiczenia')" class="btn btn--primary btn--lg big btn--game">🗺 {{ t('world.passport') }} →</NuxtLink>
        <button type="button" class="btn btn--game" @click="again">↺ {{ t('lvl.again') }}</button>
        <NuxtLink :to="mapUrl" class="btn btn--game">🗺 {{ t('lvl.toMap') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lp { position: relative; isolation: isolate; min-height: 100vh; padding-bottom: 170px; }
.lp__set { flex: none; }
.lp__top { display: flex; align-items: center; gap: 14px; padding-block: 16px; }
.lp__close { display: grid; place-items: center; flex: none; width: 44px; height: 44px; font-size: 18px; font-weight: 800; background: var(--white); border: 2px solid var(--ink); border-radius: 50%; box-shadow: 0 3px 0 var(--ink); }
.lp__close:hover { background: var(--paper); }
.steps { display: flex; gap: 6px; flex: 1; }
.steps__i { display: grid; place-items: center; flex: 1; max-width: 90px; height: 36px; font-size: 17px; background: rgb(255 255 255 / .7); border: 2px solid var(--ink); border-radius: 99px; filter: grayscale(1); opacity: .5; transition: all .3s; }
.steps__i.on { background: var(--white); filter: none; opacity: 1; }
.steps__i.now { background: #ffe066; box-shadow: 0 3px 0 var(--ink); }
.lp__lvl { flex: none; padding: 4px 12px; font-family: var(--font-display); font-weight: 600; font-size: 15px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; }

.stage { display: grid; justify-items: center; gap: 22px; padding-top: 8px; animation: rise .4s var(--ease-bounce); }
.stage--game { display: block; max-width: 900px; }
.big { min-width: min(320px, 100%); }
.btn--game { box-shadow: 0 6px 0 var(--ink); }
.btn--game:active { transform: translateY(4px); box-shadow: 0 2px 0 var(--ink); }
.pulse { animation: pulse 1.6s ease-in-out infinite; }

/* opowieść */
.story { display: grid; gap: 16px; width: 100%; max-width: 820px; }
.story__head { display: grid; justify-items: center; gap: 6px; text-align: center; }
.story__tag { padding: 3px 14px; font-weight: 800; font-size: 14px; background: #ffe066; border: 2px solid var(--ink); border-radius: 99px; box-shadow: 0 3px 0 var(--ink); }
.story__head h1 { font-size: clamp(30px, 5.4vw, 50px); line-height: 1.08; text-shadow: 3px 3px 0 #fff; }
.story__sub { font-family: var(--font-display); font-weight: 600; font-size: 19px; color: var(--ink-soft); }
.chat { display: flex; align-items: flex-end; gap: 10px; }
.chat__who { flex: none; display: grid; justify-items: center; }
.chat__who b { margin-top: -6px; padding: 2px 10px; font-family: var(--font-display); font-size: 14px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; }
.chat__list { display: grid; gap: 12px; flex: 1; padding-bottom: 20px; }
.bubble { position: relative; display: grid; gap: 6px; padding: 16px 20px; background: var(--white); border: var(--border); border-radius: 24px 24px 24px 6px; box-shadow: 0 5px 0 var(--ink); animation: msg .4s var(--ease-bounce); }
.bubble--rule { background: #fffbe0; }
.bubble__tag { justify-self: start; padding: 2px 10px; font-size: 13px; font-weight: 800; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; }
.bubble__pl { font-size: clamp(19px, 2.8vw, 23px); font-weight: 700; line-height: 1.45; }
.bubble__tr { font-size: 16px; color: var(--ink-soft); line-height: 1.45; }
.bubble--typing { display: flex; gap: 6px; justify-self: start; padding: 16px 20px; }
.bubble--typing i { width: 10px; height: 10px; background: var(--ink-soft); border-radius: 50%; animation: dot 1s infinite; }
.bubble--typing i:nth-child(2) { animation-delay: .15s; }
.bubble--typing i:nth-child(3) { animation-delay: .3s; }

/* przykłady */
.ex-head { display: flex; align-items: flex-end; gap: 6px; max-width: 760px; }
.ex-head__bubble { display: grid; gap: 6px; margin-bottom: 20px; padding: 14px 20px; background: var(--white); border: var(--border); border-radius: 24px 24px 24px 6px; box-shadow: 0 5px 0 var(--ink); }
.ex-head__bubble h2 { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: clamp(22px, 3.6vw, 30px); }
.ex-head__bubble p { font-weight: 700; color: var(--ink-soft); }
.count { padding: 2px 12px; font-size: 18px; background: #ffe066; border: 2px solid var(--ink); border-radius: 99px; }
.reveals { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; max-width: 840px; }
.tip { display: grid; gap: 6px; max-width: 640px; padding: 18px 22px; background: #fff6c9; border: 3px dashed var(--ink); border-radius: var(--radius); animation: pop-in .4s var(--ease-bounce); }
.tip__badge { justify-self: start; padding: 2px 10px; font-size: 13px; font-weight: 800; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; }
.tip b { font-family: var(--font-display); font-size: 20px; }
.tip p { font-weight: 700; }
.tip__ex { display: flex; flex-wrap: wrap; gap: 6px; }
.skip { padding: 6px 12px; font-weight: 800; color: var(--ink-soft); background: rgb(255 255 255 / .7); border: 0; border-radius: 99px; text-decoration: underline; cursor: pointer; }
.ph { min-height: 520px; }

/* nagroda */
.reward { text-align: center; gap: 16px; }
.reward__top { display: flex; align-items: flex-end; justify-content: center; gap: 10px; }
.stampbig { display: grid; place-items: center; width: 150px; height: 150px; margin-bottom: 10px; animation: slam .6s cubic-bezier(.2, 1.4, .4, 1) .5s backwards; }
.stampbig__ring {
  display: grid;
  place-items: center;
  align-content: center;
  width: 140px;
  height: 140px;
  color: var(--hl);
  background: rgb(255 255 255 / .9);
  border: 5px double var(--hl);
  border-radius: 50%;
  box-shadow: inset 0 0 0 4px rgb(255 255 255), inset 0 0 0 7px var(--hl);
  transform: rotate(-12deg);
}
.stampbig__ring b { font-family: var(--font-display); font-size: 34px; line-height: 1.1; }
.stampbig__ring small { max-width: 100px; font-family: var(--font-display); font-weight: 700; font-size: 13px; line-height: 1.1; text-transform: uppercase; }
.reward__new { padding: 4px 14px; font-weight: 800; background: #ffe066; border: 2px solid var(--ink); border-radius: 99px; animation: pop-in .4s var(--ease-bounce) 1s backwards; }
.reward h1 { font-size: clamp(34px, 6vw, 56px); text-shadow: 3px 3px 0 #fff; }
.reward__stars { display: flex; gap: 10px; margin: -6px 0; font-size: clamp(60px, 12vw, 84px); line-height: 1; color: rgb(255 255 255 / .8); -webkit-text-stroke: 3px var(--ink); }
.reward__stars .on { color: var(--g1); animation: star-in .5s var(--ease-bounce); }
.reward__stars span:nth-child(2) { transform: translateY(-14px); }
.reward__stars span:nth-child(2).on { animation-name: star-in-2; }
.reward__row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.pill { padding: 6px 14px; font-family: var(--font-display); font-weight: 700; font-size: 18px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; box-shadow: 0 3px 0 var(--ink); }
.pill--xp { background: var(--g1); }
.pill--fire { background: var(--red-soft); }
.reward__total { margin-top: -6px; padding: 2px 10px; font-weight: 800; background: rgb(255 255 255 / .7); border-radius: 99px; }
.badge { display: flex; align-items: center; gap: 12px; padding: 12px 22px; text-align: left; background: #fff6c9; border: var(--border); border-radius: var(--radius); box-shadow: 0 5px 0 var(--ink); animation: pop-in .5s var(--ease-bounce) 2s backwards; }
.badge small { display: block; font-size: 13px; font-weight: 800; text-transform: uppercase; color: var(--ink-soft); }
.badge b { display: block; font-family: var(--font-display); font-size: 26px; }
.badge em { font-style: normal; font-weight: 700; color: var(--hl); }
.reward__btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 4px; }

@keyframes rise { from { transform: translateY(16px); opacity: 0; } }
@keyframes msg { from { transform: translateY(14px) scale(.9); opacity: 0; } }
@keyframes dot { 0%, 100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(-5px); opacity: 1; } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes slam { 0% { transform: scale(3) rotate(20deg); opacity: 0; } 60% { transform: scale(.9) rotate(-4deg); opacity: 1; } 100% { transform: scale(1) rotate(0); } }
@keyframes star-in { 0% { transform: scale(0) rotate(-90deg); } 70% { transform: scale(1.3) rotate(10deg); } 100% { transform: scale(1); } }
@keyframes star-in-2 { 0% { transform: translateY(-14px) scale(0) rotate(-90deg); } 70% { transform: translateY(-14px) scale(1.3) rotate(10deg); } 100% { transform: translateY(-14px) scale(1); } }

@media (max-width: 620px) {
  .chat { flex-direction: column; align-items: stretch; }
  .chat__who { flex-direction: row; justify-content: flex-start; gap: 8px; order: -1; }
  .chat__who :deep(svg) { width: 80px; height: 80px; }
  .ex-head :deep(svg) { width: 70px; height: 70px; }
  .lp__lvl { display: none; }
  .stampbig { width: 120px; height: 120px; }
  .stampbig__ring { width: 112px; height: 112px; }
  .reward__top :deep(svg) { width: 110px; height: 110px; }
}
</style>
