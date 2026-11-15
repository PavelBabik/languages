<script setup lang="ts">
import type { Opt } from '~/data/polski/cwiczenia/types'
import type { AnimalKind } from '~/data/polski/cwiczenia/world'

/**
 * „Skoki”: zwierzak stoi na brzegu, nad wodą sterczą kamienie z literami.
 * Kliknij kamień — zwierzak skacze. Dobry kamień świeci, zły kruszy się i plusk! do wody.
 */
const props = defineProps<{ opts: Opt[]; answer: number; state: 'ask' | 'bad' | 'ok'; wrong: Set<number>; animal: AnimalKind; round: string; sentence: boolean }>()
const emit = defineEmits<{ (e: 'pick', k: number): void }>()
const sound = useSound()
const { lang, showPl } = useT()

const COLORS = ['#ff8fab', '#7cc6ff', '#8ee07a', '#ffd166', '#c3a6ff']
const n = computed(() => props.opts.length)

/* pozycje kamieni: x w %, wysokość wierzchołka w px */
const stones = computed(() =>
  props.opts.map((o, k) => {
    const from = props.sentence ? 26 : 38
    const to = props.sentence ? 85 : 84
    const x = n.value === 1 ? (from + to) / 2 : from + ((to - from) / (n.value - 1)) * k
    const h = props.sentence ? (k % 2 ? 168 : 92) : [118, 158, 128, 166, 112][k % 5]!
    return { k, x, h, label: typeof o === 'string' ? o : o.pl, tr: typeof o === 'string' ? '' : o[lang.value], color: COLORS[k % COLORS.length]! }
  })
)

const START = { x: 9, h: 74 }
const target = ref<number | null>(null)
const phase = ref<'idle' | 'jump' | 'win' | 'fall'>('idle')
const hop = ref(0)
const crumbled = ref(new Set<number>())
const splash = ref<{ x: number; id: number } | null>(null)
const scroll = ref(0)
const instant = ref(false)
const TILE = computed(() => (props.sentence ? 26 : 38))

const pos = computed(() => {
  if (target.value === null) return { x: START.x, b: START.h }
  const s = stones.value[target.value]!
  return { x: s.x, b: s.h + TILE.value }
})

function act(k: number) {
  if (phase.value === 'jump' || phase.value === 'fall' || props.state === 'ok' || props.wrong.has(k)) return
  instant.value = false
  target.value = k
  phase.value = 'jump'
  hop.value++
  sound.play('jump')
  setTimeout(() => {
    const ok = k === props.answer
    emit('pick', k)
    if (ok) {
      phase.value = 'win'
      return
    }
    /* kamień się kruszy */
    crumbled.value = new Set(crumbled.value).add(k)
    phase.value = 'fall'
    setTimeout(() => {
      splash.value = { x: stones.value[k]!.x, id: Date.now() }
      sound.play('splash')
    }, 250)
    setTimeout(() => {
      instant.value = true
      target.value = null
      phase.value = 'idle'
      hop.value++
    }, 900)
  }, 560)
}
defineExpose({ act })

/* nowe zadanie: biegniemy dalej */
watch(() => props.round, () => {
  instant.value = false
  target.value = null
  phase.value = 'idle'
  crumbled.value = new Set()
  splash.value = null
  scroll.value += 1
})
</script>

<template>
  <div class="jp" :class="{ 'jp--sentence': sentence }" :style="{ '--scroll': scroll }">
    <div class="jp__hills" aria-hidden="true" />
    <div class="jp__hills jp__hills--2" aria-hidden="true" />
    <div class="jp__water" aria-hidden="true" />

    <!-- brzeg startowy -->
    <div class="jp__shore" :style="{ left: `${START.x}%`, height: `${START.h}px` }" aria-hidden="true" />

    <!-- kamienie -->
    <button
      v-for="s in stones"
      :key="`${round}-${s.k}`"
      type="button"
      class="stone"
      :class="{
        'stone--win': state === 'ok' && s.k === answer,
        'stone--gone': crumbled.has(s.k) || (wrong.has(s.k) && !crumbled.has(s.k))
      }"
      :style="{ left: `${s.x}%`, height: `${s.h}px`, '--tile': s.color, animationDelay: `${s.k * 0.08}s` }"
      :disabled="wrong.has(s.k) || state === 'ok'"
      @click="act(s.k)"
    >
      <span class="stone__tile">
        <span lang="pl">{{ s.label }}</span>
        <small v-if="showPl && s.tr">{{ s.tr }}</small>
      </span>
      <DrillBurst v-if="state === 'ok' && s.k === answer" />
    </button>

    <!-- zwierzak -->
    <div class="hopper" :class="{ 'hopper--instant': instant }" :style="{ left: `${pos.x}%`, bottom: `${pos.b}px` }">
      <div :key="hop" class="hopper__arc" :class="{ arc: phase === 'jump', fall: phase === 'fall', respawn: instant }">
        <Animal :kind="animal" :size="sentence ? 62 : 72" :mood="phase === 'win' ? 'joy' : phase === 'fall' ? 'wow' : 'happy'" :act="phase === 'win' ? 'jump' : 'idle'" />
      </div>
    </div>

    <span v-if="splash" :key="splash.id" class="jp__splash" :style="{ left: `${splash.x}%` }" aria-hidden="true">💦</span>
  </div>
</template>

<style scoped>
.jp {
  position: relative;
  height: 300px;
  overflow: hidden;
  background: linear-gradient(180deg, #9fd8ff 0%, #d9f1ff 70%);
  border: var(--border);
  border-radius: 22px;
}
.jp__hills {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  height: 120px;
  background: radial-gradient(circle at 50% 100%, #a8e08a 0 58%, transparent 59%) 0 100% / 260px 120px repeat-x;
  background-position-x: calc(var(--scroll) * -180px);
  transition: background-position-x 1s ease;
  opacity: .8;
}
.jp__hills--2 { bottom: 40px; height: 80px; background: radial-gradient(circle at 50% 100%, #7cc865 0 58%, transparent 59%) 0 100% / 180px 80px repeat-x; background-position-x: calc(var(--scroll) * -320px + 60px); }
.jp__water {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  background:
    radial-gradient(circle at 12px -4px, transparent 12px, #4da3ff 13px) 0 0 / 24px 48px repeat-x,
    linear-gradient(#4da3ff, #2f7fe0);
  border-top: 3px solid var(--ink);
  animation: waves 2.4s linear infinite;
  z-index: 3;
}
@keyframes waves { to { background-position: 24px 0, 0 0; } }
.jp__shore {
  position: absolute;
  bottom: 0;
  width: 90px;
  translate: -50% 0;
  background: linear-gradient(180deg, #8fd96b 0 16px, #a0714a 16px);
  border: var(--border);
  border-radius: 26px 26px 0 0;
  z-index: 2;
}

.stone {
  position: absolute;
  bottom: 0;
  width: 26px;
  translate: -50% 0;
  padding: 0;
  background: linear-gradient(90deg, #8a8fa3, #b8bdcc 45%, #8a8fa3);
  border: var(--border);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  z-index: 2;
  animation: stone-in .55s var(--ease-bounce) backwards;
  transition: transform .6s cubic-bezier(.5, 0, .9, .5), opacity .6s ease;
}
.stone__tile {
  position: absolute;
  top: 0;
  left: 50%;
  display: grid;
  place-items: center;
  min-width: 84px;
  height: 76px;
  padding: 0 12px;
  translate: -50% -50%;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 44px;
  line-height: 1;
  color: var(--ink);
  background: var(--tile);
  border: var(--border);
  border-radius: 20px;
  box-shadow: 0 6px 0 var(--ink);
  transition: transform .15s var(--ease-bounce), background-color .2s;
}
.jp--sentence .stone__tile { min-width: 70px; height: 52px; font-size: 18px; border-radius: 14px; padding: 0 8px; white-space: nowrap; }
.stone__tile small { font-family: var(--font-body); font-size: 11px; font-weight: 700; opacity: .75; }
.stone:hover .stone__tile { transform: translateY(-4px) rotate(-2deg); }
.stone:active .stone__tile { transform: translateY(3px); }
.stone--win .stone__tile { color: #fff; background: var(--green); animation: glow 1s ease-in-out infinite; }
.stone--gone { transform: translateY(260px) rotate(16deg); opacity: 0; pointer-events: none; }
.stone[disabled] { cursor: default; }
@keyframes stone-in { from { transform: translateY(240px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 6px 0 var(--ink), 0 0 0 0 rgb(47 191 113 / .6); } 50% { box-shadow: 0 6px 0 var(--ink), 0 0 0 14px rgb(47 191 113 / 0); } }

.hopper { position: absolute; z-index: 4; translate: -50% 0; line-height: 0; transition: left .55s ease-in-out, bottom .55s ease-in-out; pointer-events: none; }
.hopper--instant { transition: none; }
.hopper__arc.arc { animation: arc .55s ease-in-out; }
.hopper__arc.fall { animation: fall .7s ease-in forwards; }
.hopper__arc.respawn { animation: pop-in .4s var(--ease-bounce); }
@keyframes arc { 0% { transform: translateY(0) scale(1.1, .85); } 15% { transform: translateY(-10px) scale(.9, 1.1); } 50% { transform: translateY(-96px) rotate(-10deg); } 100% { transform: translateY(0) scale(1); } }
@keyframes fall { 0% { transform: translateY(0); } 25% { transform: translateY(-20px) rotate(-10deg); } 100% { transform: translateY(260px) rotate(40deg); opacity: 0; } }

.jp__splash { position: absolute; bottom: 30px; z-index: 5; font-size: 44px; translate: -50% 0; animation: splash .8s ease-out forwards; }
@keyframes splash { 0% { transform: scale(.3) translateY(20px); opacity: 0; } 30% { transform: scale(1.3) translateY(-10px); opacity: 1; } 100% { transform: scale(1) translateY(-30px); opacity: 0; } }

@media (max-width: 520px) {
  .jp { height: 280px; }
  .stone__tile { min-width: 70px; height: 66px; font-size: 38px; }
  .jp--sentence .stone__tile { min-width: 56px; height: 46px; font-size: 14px; }
  .jp__shore { width: 60px; }
}
</style>
