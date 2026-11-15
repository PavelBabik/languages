<script setup lang="ts">
import type { Opt } from '~/data/polski/cwiczenia/types'
import type { AnimalKind } from '~/data/polski/cwiczenia/world'

/**
 * „Łapanie”: litery spadają z nieba w kilku torach. Zwierzak z koszykiem biega w lewo i prawo.
 * Sterowanie: kliknij literę (od razu leci do koszyka) / kliknij tor / przeciągnij palcem / ← →.
 * Złap dobrą literę! Zła — znika z „bęc”. Litery, których nie złapiesz, spadają znowu.
 */
const props = defineProps<{ opts: Opt[]; answer: number; state: 'ask' | 'bad' | 'ok'; wrong: Set<number>; animal: AnimalKind; round: string; sentence: boolean }>()
const emit = defineEmits<{ (e: 'pick', k: number): void }>()
const sound = useSound()
const { lang, showPl } = useT()
const { focus } = useSettings()

const COLORS = ['#ff8fab', '#7cc6ff', '#8ee07a', '#ffd166', '#c3a6ff']
const lanes = computed(() => props.opts.length)
const laneX = (i: number) => ((i + 0.5) / lanes.value) * 100

type Drop = { k: number; lane: number; y: number; v: number; caught: boolean; bad: boolean; zip: boolean }
const drops = ref<Drop[]>([])
const basket = ref(0)
const catching = ref(-1)
const bump = ref(0)

/* 1 = cała wysokość; y koszyka ok. 0.78 */
const CATCH_Y = 0.76
const FALL = computed(() => (focus.value ? 9 : 6.2))

function reset() {
  /* tory losowo, żeby dobra litera nie była zawsze w tym samym miejscu */
  const order = [...props.opts.keys()].sort(() => Math.random() - 0.5)
  drops.value = props.opts.map((_, k) => ({
    k,
    lane: order[k]!,
    y: -0.1 - Math.random() * 0.3 - k * 0.1,
    v: 1 / (FALL.value * (0.85 + Math.random() * 0.3)),
    caught: false,
    bad: false,
    zip: false
  }))
  basket.value = Math.floor(lanes.value / 2)
  catching.value = -1
}

let raf = 0
let last = 0
function loop(t: number) {
  const dt = Math.min(0.05, (t - (last || t)) / 1000)
  last = t
  if (props.state !== 'ok') {
    for (const d of drops.value) {
      if (d.caught || props.wrong.has(d.k)) continue
      if (d.zip) continue
      const before = d.y
      d.y += d.v * dt
      if (before < CATCH_Y && d.y >= CATCH_Y && d.lane === basket.value) catchIt(d)
      if (d.y > 1.1) d.y = -0.2 - Math.random() * 0.4
    }
  }
  raf = requestAnimationFrame(loop)
}

function catchIt(d: Drop) {
  if (props.state === 'ok') return
  d.caught = true
  bump.value++
  if (d.k === props.answer) {
    sound.play('pop')
    emit('pick', d.k)
  } else {
    d.bad = true
    sound.play('splash')
    emit('pick', d.k)
  }
}

function move(lane: number) {
  if (props.state === 'ok') return
  basket.value = Math.max(0, Math.min(lanes.value - 1, lane))
}

/* klawisze: strzałki przesuwają koszyk */
function key(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') return move(basket.value - 1), true
  if (e.key === 'ArrowRight') return move(basket.value + 1), true
  return false
}

/* klik w literę = od razu: zwierzak biegnie pod nią, litera leci do koszyka */
function tap(d: Drop) {
  if (props.state === 'ok' || d.caught || props.wrong.has(d.k) || d.zip) return
  move(d.lane)
  if (d.y >= CATCH_Y) return catchIt(d)
  /* litera leci prosto do koszyka (przejście CSS), po 0,3 s — sprawdzamy */
  d.zip = true
  d.y = CATCH_Y
  sound.play('jump')
  setTimeout(() => catchIt(d), 300)
}
/* klawisze 1–5 (z silnika) = klik w literę */
function act(k: number) {
  const d = drops.value.find(x => x.k === k)
  if (d) tap(d)
}
defineExpose({ key, act })

/* przeciąganie palcem */
const box = ref<HTMLElement>()
const dragging = ref(false)
function laneFromEvent(e: PointerEvent) {
  const r = box.value!.getBoundingClientRect()
  return Math.floor(((e.clientX - r.left) / r.width) * lanes.value)
}
function down(e: PointerEvent) {
  dragging.value = true
  move(laneFromEvent(e))
}
function drag(e: PointerEvent) {
  if (dragging.value) move(laneFromEvent(e))
}

onMounted(() => {
  reset()
  raf = requestAnimationFrame(loop)
  window.addEventListener('pointerup', () => (dragging.value = false))
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
watch(() => props.round, reset)

const label = (k: number) => {
  const o = props.opts[k]!
  return typeof o === 'string' ? o : o.pl
}
const tr = (k: number) => {
  const o = props.opts[k]!
  return typeof o === 'string' ? '' : o[lang.value]
}
</script>

<template>
  <div ref="box" class="ct" :class="{ 'ct--sentence': sentence }" @pointerdown="down" @pointermove="drag">
    <div class="ct__lanes" aria-hidden="true">
      <span v-for="i in lanes" :key="i" class="ct__lane" :class="{ on: basket === i - 1 }" />
    </div>
    <div class="ct__grass" aria-hidden="true" />

    <span
      v-for="d in drops"
      v-show="!(wrong.has(d.k) && !d.bad)"
      :key="`${round}-${d.k}`"
      class="drop"
      :class="{ 'drop--zip': d.zip, 'drop--caught': d.caught && !d.bad, 'drop--bad': d.bad, 'drop--win': state === 'ok' && d.k === answer }"
      :style="{ left: `${laneX(d.lane)}%`, top: `${d.y * 100}%`, '--c': COLORS[d.k % COLORS.length] }"
      lang="pl"
      role="button"
      :aria-label="label(d.k)"
      @pointerdown.stop.prevent="tap(d)"
    >
      {{ label(d.k) }}
      <small v-if="showPl && tr(d.k)">{{ tr(d.k) }}</small>
    </span>

    <div class="catcher" :style="{ left: `${laneX(basket)}%` }">
      <span :key="bump" class="catcher__basket" :class="{ bump: bump }" aria-hidden="true">🧺</span>
      <Animal :kind="animal" :size="sentence ? 62 : 70" :mood="state === 'ok' ? 'joy' : state === 'bad' ? 'sad' : 'happy'" :act="state === 'ok' ? 'jump' : 'walk'" />
    </div>

    <span class="ct__hint" aria-hidden="true">← →</span>
  </div>
</template>

<style scoped>
.ct {
  position: relative;
  height: 340px;
  overflow: hidden;
  background: linear-gradient(180deg, #ffd9a8 0%, #ffeccf 45%, #e9f7ff 100%);
  border: var(--border);
  border-radius: 22px;
  touch-action: none;
  user-select: none;
  cursor: pointer;
}
.ct__lanes { position: absolute; inset: 0 0 38px; display: flex; }
.ct__lane { flex: 1; border-right: 2px dashed rgb(31 29 54 / .08); transition: background-color .2s; }
.ct__lane:last-child { border-right: 0; }
.ct__lane.on { background: rgb(255 255 255 / .35); }
.ct__grass { position: absolute; left: 0; right: 0; bottom: 0; height: 38px; background: linear-gradient(#8fd96b, #5fb84a); border-top: 3px solid var(--ink); }

.drop {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  min-width: 70px;
  height: 70px;
  padding: 0 10px;
  translate: -50% -50%;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
  background: var(--c);
  border: var(--border);
  border-radius: 50%;
  box-shadow: 0 5px 0 var(--ink);
  cursor: pointer;
  animation: wobble 1.4s ease-in-out infinite;
}
.ct--sentence .drop { min-width: 64px; height: 44px; font-size: 16px; border-radius: 14px; white-space: nowrap; }
.drop--zip { transition: top .3s cubic-bezier(.5, 0, .9, .6), left .25s ease-out; }
.drop:hover { filter: brightness(1.08); scale: 1.08; }
.drop small { font-family: var(--font-body); font-size: 10px; font-weight: 800; }
.drop--caught { animation: into .35s ease-in forwards; }
.drop--win { color: #fff; background: var(--green); }
.drop--bad { animation: bad .6s ease-out forwards; background: #ccc; }
@keyframes wobble { 0%, 100% { rotate: -8deg; } 50% { rotate: 8deg; } }
@keyframes into { to { transform: scale(.3) translateY(30px); opacity: 0; } }
@keyframes bad { 0% { transform: scale(1); } 30% { transform: scale(1.2) rotate(20deg); } 100% { transform: translateY(80px) scale(.6); opacity: 0; } }

.catcher { position: absolute; bottom: 20px; z-index: 3; display: grid; justify-items: center; translate: -50% 0; line-height: 0; transition: left .22s ease-out; pointer-events: none; }
.catcher__basket { margin-bottom: -14px; font-size: 46px; line-height: 1; z-index: 2; }
.catcher__basket.bump { animation: basket .35s var(--ease-bounce); }
@keyframes basket { 50% { transform: scale(1.25, .85); } }
.ct__hint { position: absolute; right: 10px; top: 8px; padding: 2px 8px; font-weight: 800; font-size: 13px; color: var(--ink-soft); background: rgb(255 255 255 / .7); border-radius: 99px; }

@media (max-width: 520px) {
  .drop { min-width: 58px; height: 58px; font-size: 32px; }
  .ct--sentence .drop { min-width: 54px; height: 40px; font-size: 13px; padding: 0 6px; }
  .catcher__basket { font-size: 38px; }
}
</style>
