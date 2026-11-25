<script setup lang="ts">
import type { Exercise, Land } from '~/data/polski/cwiczenia'
import { soonLands } from '~/data/polski/cwiczenia'

/**
 * Ilustrowana mapa Krainy Polskiego: morze, wyspy-krainy ze zwierzakami,
 * droga między nimi (przebyta część — złota) i znacznik „Tu jesteś”.
 * Na telefonie mapa jest pionowa (inne współrzędne).
 */
type St = { done: number; total: number; stars: number; complete: boolean; current: number; list: { lv: { title: { pl: string; uk: string; ru: string }; boss?: boolean } }[] }
const props = defineProps<{ list: { ex: Exercise; st: St }[] }>()

const { t, loc, showPl } = useT()
const lp = useLocalePath()

/* współrzędne środków wysp w % (poziomo / pionowo) */
const DESK = [[13, 5.5], [37, 8.0], [61, 4.5], [86, 7.0], [86, 22.3], [61, 24.8], [37, 21.3], [13, 23.8], [13, 39.1], [37, 41.6], [61, 38.1], [86, 40.6], [86, 55.9], [61, 58.4], [37, 54.9], [13, 57.4], [13, 72.7], [37, 75.2], [61, 71.7], [86, 74.2], [86, 89.5]] as const
const MOB = [[27, 3.4], [73, 7.8], [27, 12.3], [73, 16.8], [27, 21.2], [73, 25.6], [27, 30.1], [73, 34.6], [27, 39.0], [73, 43.5], [27, 47.9], [73, 52.4], [27, 56.8], [73, 61.2], [27, 65.7], [73, 70.2], [27, 74.6], [73, 79.1], [27, 83.5], [73, 88.0], [27, 92.4]] as const
const SOON_DESK = [[66, 87]] as const
const SOON_MOB = [[73, 88]] as const
const H_DESK = 210
const H_MOB = 940

const current = computed(() => {
  const i = props.list.findIndex(x => !x.st.complete)
  return i < 0 ? props.list.length - 1 : i
})

/* gładka ścieżka przez punkty (krzywe Q przez środki odcinków) */
function path(pts: readonly (readonly [number, number])[], h: number) {
  const p = pts.map(([x, y]) => [x, (y / 100) * h] as const)
  if (p.length < 2) return ''
  let d = `M${p[0]![0]} ${p[0]![1]}`
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i]![0] + p[i + 1]![0]) / 2
    const my = (p[i]![1] + p[i + 1]![1]) / 2
    d += ` Q${p[i]![0]} ${p[i]![1]} ${mx} ${my}`
  }
  const last = p[p.length - 1]!
  d += ` T${last[0]} ${last[1]}`
  return d
}
const full = computed(() => ({ d: path(DESK.slice(0, props.list.length), H_DESK), m: path(MOB.slice(0, props.list.length), H_MOB) }))
const done = computed(() => {
  const n = props.list.filter(x => x.st.complete).length
  const upto = Math.min(props.list.length, n + 1)
  return upto < 2 ? { d: '', m: '' } : { d: path(DESK.slice(0, upto), H_DESK), m: path(MOB.slice(0, upto), H_MOB) }
})

const land = (x: { ex: Exercise }) => x.ex.land as Land
</script>

<template>
  <div class="map">
    <!-- tytuł na zwoju -->
    <div class="map__title">
      <span>🗺️ {{ t('world.mapTitle') }}</span>
    </div>

    <!-- ozdoby morza -->
    <span class="sea sea--compass deco" aria-hidden="true">🧭</span>
    <span class="sea sea--whale deco" aria-hidden="true">🐳</span>
    <span class="sea sea--octo deco" aria-hidden="true">🐙</span>
    <span class="sea sea--fish deco" aria-hidden="true">🐟</span>
    <span class="sea sea--ship deco" aria-hidden="true">⛵</span>

    <!-- droga -->
    <svg class="road road--d" viewBox="0 0 100 210" preserveAspectRatio="none" aria-hidden="true">
      <path :d="full.d" class="road__all" />
      <path v-if="done.d" :d="done.d" class="road__done" />
    </svg>
    <svg class="road road--m" viewBox="0 0 100 940" preserveAspectRatio="none" aria-hidden="true">
      <path :d="full.m" class="road__all" />
      <path v-if="done.m" :d="done.m" class="road__done" />
    </svg>

    <!-- wyspy -->
    <NuxtLink
      v-for="(x, i) in list"
      :key="x.ex.slug"
      :to="lp(`/polski/cwiczenia/${x.ex.slug}`)"
      class="isl"
      :class="{ 'isl--done': x.st.complete, 'isl--now': i === current }"
      :style="{
        '--x': DESK[i]?.[0], '--y': DESK[i]?.[1], '--mx': MOB[i]?.[0], '--my': MOB[i]?.[1],
        '--g': land(x).ground, '--g2': land(x).ground2, '--d': `${i * 0.12}s`
      }"
    >
      <span class="isl__num" aria-hidden="true">{{ i + 1 }}</span>
      <span class="isl__shape" aria-hidden="true">
        <span v-for="(e, k) in land(x).deco.slice(0, 3)" :key="k" class="isl__deco" :class="`d${k}`">{{ e }}</span>
      </span>
      <Animal :kind="land(x).animal" :size="92" class="isl__pet" :mood="x.st.complete ? 'joy' : 'happy'" :act="i === current ? 'walk' : 'idle'" />
      <span v-if="x.st.complete" class="isl__flag" aria-hidden="true">🏆</span>
      <span v-if="i === current" class="isl__pin" aria-hidden="true">📍 {{ t('world.here') }}</span>
      <span class="isl__label">
        <b lang="pl">{{ land(x).name.pl }}</b>
        <small v-if="showPl">{{ loc(land(x).name) }}</small>
        <span class="isl__topic"><span class="isl__icon">{{ x.ex.icon }}</span> <span lang="pl">{{ x.ex.title.pl }}</span></span>
        <ClientOnly>
          <span v-if="x.st.complete" class="isl__next isl__next--done">🏅 {{ loc(x.ex.badge) }}</span>
          <span v-else class="isl__next" lang="pl">▶ {{ x.st.current + 1 }}. {{ x.st.list[x.st.current]?.lv.title.pl }}</span>
          <span class="isl__prog">★ {{ x.st.stars }} · {{ t('world.stops', { n: x.st.done, total: x.st.total }) }}</span>
        </ClientOnly>
      </span>
    </NuxtLink>

    <!-- krainy we mgle -->
    <div
      v-for="(s, i) in soonLands"
      :key="s.name.pl"
      class="isl isl--soon"
      :class="{ 'isl--soon-hide': !SOON_MOB[i] }"
      :style="{ '--x': SOON_DESK[i]?.[0], '--y': SOON_DESK[i]?.[1], '--mx': SOON_MOB[i]?.[0] ?? 0, '--my': SOON_MOB[i]?.[1] ?? 0 }"
      :title="t('world.soon')"
    >
      <span class="isl__shape" aria-hidden="true"><span class="isl__fog">☁️</span><span class="isl__soon-ico">{{ s.icon }}</span></span>
      <span class="isl__label isl__label--soon">
        <b lang="pl">{{ s.name.pl }}</b>
        <small>{{ t('world.soonShort') }}</small>
      </span>
    </div>
  </div>
</template>

<style scoped>
.map {
  position: relative;
  aspect-ratio: 100 / 210;
  margin-top: 30px;
  overflow: hidden;
  background:
    radial-gradient(circle at 20px 20px, transparent 9px, rgb(255 255 255 / .35) 10px 12px, transparent 13px) 0 0 / 90px 46px,
    radial-gradient(ellipse at 50% 40%, #6fd3f7 0%, #3fb2ea 55%, #2a8fd0 100%);
  border: var(--border);
  border-radius: 36px;
  box-shadow: 0 10px 0 var(--ink), inset 0 0 0 10px rgb(255 255 255 / .25);
  animation: sea 18s linear infinite;
}
@keyframes sea { to { background-position: 90px 46px, 0 0; } }

.map__title { position: absolute; top: 16px; left: 50%; z-index: 6; translate: -50% 0; }
.map__title span {
  display: inline-block;
  padding: 8px 26px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(18px, 2.6vw, 26px);
  white-space: nowrap;
  background: linear-gradient(180deg, #fff6d8, #f3dfa6);
  border: var(--border);
  border-radius: 14px;
  box-shadow: 0 5px 0 var(--ink);
  rotate: -1.5deg;
}

.sea { position: absolute; z-index: 1; line-height: 1; filter: drop-shadow(2px 3px 0 rgb(31 29 54 / .2)); }
.sea--compass { top: 18px; left: 20px; font-size: 54px; animation: spin 30s linear infinite; }
.sea--whale { left: 60%; top: 92%; font-size: 40px; animation: float 4s ease-in-out infinite; }
.sea--octo { left: 50%; top: 32%; font-size: 34px; animation: float 5s ease-in-out infinite 1s; }
.sea--fish { left: 25%; top: 66%; font-size: 26px; animation: swim 9s ease-in-out infinite; }
.sea--ship { top: 48%; left: -6%; font-size: 40px; animation: sail 40s linear infinite; }
@keyframes spin { to { rotate: 360deg; } }
@keyframes swim { 0%, 100% { translate: 0 0; } 50% { translate: 60px -10px; scale: -1 1; } }
@keyframes sail { 0% { left: -6%; translate: 0 0; } 50% { translate: 0 -12px; } 100% { left: 104%; translate: 0 0; } }

.road { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; pointer-events: none; }
.road--m { display: none; }
.road path { fill: none; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.road__all { stroke: rgb(255 255 255 / .85); stroke-width: 7; stroke-dasharray: 2 16; }
.road__done { stroke: #ffd23f; stroke-width: 9; stroke-dasharray: 2 14; filter: drop-shadow(0 2px 0 rgb(31 29 54 / .4)); }

/* wyspa */
.isl {
  position: absolute;
  left: calc(var(--x) * 1%);
  top: calc(var(--y) * 1%);
  z-index: 3;
  display: grid;
  justify-items: center;
  width: 190px;
  translate: -50% -50%;
  transition: transform .2s var(--ease-bounce);
}
a.isl:hover { transform: translateY(-8px) scale(1.04); z-index: 5; }
.isl__shape {
  position: relative;
  display: block;
  width: 170px;
  height: 92px;
  background: radial-gradient(ellipse at 50% 35%, var(--g) 0 55%, var(--g2) 56% 100%);
  border: var(--border);
  border-radius: 50% 50% 46% 54% / 60% 60% 40% 40%;
  box-shadow: 0 0 0 9px #f6d98f, 0 0 0 12px var(--ink), 0 0 0 22px rgb(255 255 255 / .45);
}
.isl__deco { position: absolute; font-size: 22px; line-height: 1; }
.d0 { left: 12px; top: 10px; }
.d1 { right: 14px; top: 6px; }
.d2 { right: 30px; bottom: 6px; }
.isl__pet { position: absolute; top: -46px; left: 50%; translate: -50% 0; z-index: 2; pointer-events: none; }
.isl__num { position: absolute; top: -50px; left: 6px; z-index: 3; display: grid; place-items: center; width: 34px; height: 34px; font-family: var(--font-display); font-weight: 700; color: #fff; background: var(--g2); border: 3px solid var(--ink); border-radius: 50%; box-shadow: 0 3px 0 var(--ink); }
.isl__flag { position: absolute; top: -60px; right: 4px; z-index: 3; font-size: 36px; animation: float 3s ease-in-out infinite; }
.isl__pin {
  position: absolute;
  top: -92px;
  z-index: 4;
  padding: 4px 12px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  color: #fff;
  background: var(--hl);
  border: 3px solid var(--ink);
  border-radius: 14px;
  box-shadow: 0 4px 0 var(--ink);
  animation: bob 1.3s ease-in-out infinite;
}
.isl__pin::after { content: ''; position: absolute; left: 50%; bottom: -10px; width: 14px; height: 14px; translate: -50% 0; rotate: 45deg; background: var(--hl); border-right: 3px solid var(--ink); border-bottom: 3px solid var(--ink); }
.isl--now .isl__shape { animation: glow 1.6s ease-in-out infinite; }
.isl__label {
  display: grid;
  justify-items: center;
  margin-top: 18px;
  padding: 6px 14px;
  text-align: center;
  line-height: 1.15;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 14px;
  box-shadow: 0 4px 0 var(--ink);
}
.isl__label b { font-family: var(--font-display); font-weight: 700; font-size: 17px; white-space: nowrap; }
.isl__label small { font-size: 12px; font-weight: 700; color: var(--ink-soft); }
.isl__topic { display: inline-flex; align-items: center; gap: 5px; margin-top: 3px; font-family: var(--font-display); font-weight: 600; font-size: 14px; white-space: nowrap; }
.isl__next { max-width: 190px; margin-top: 3px; padding: 2px 8px; overflow: hidden; font-size: 12px; font-weight: 800; white-space: nowrap; text-overflow: ellipsis; color: #fff; background: var(--g2); border-radius: 8px; }
.isl__next--done { color: var(--ink); background: #ffe066; }
.isl__prog { margin-top: 3px; font-size: 12px; font-weight: 800; color: #b07800; }
.isl__icon { display: grid; place-items: center; min-width: 22px; height: 22px; padding: 0 4px; font-size: 11px; color: #fff; background: var(--g2); border: 2px solid var(--ink); border-radius: 6px; }
.isl--done .isl__label { background: #fff6c9; }

.isl--soon { width: 150px; opacity: .85; filter: saturate(.3); }
.isl--soon .isl__shape { width: 120px; height: 64px; --g: #dfe6ee; --g2: #c5cfdb; display: grid; place-items: center; }
.isl__fog { position: absolute; top: -26px; font-size: 54px; animation: float 5s ease-in-out infinite; }
.isl__soon-ico { font-size: 26px; opacity: .6; }
.isl__label--soon { margin-top: 14px; padding: 4px 10px; }
.isl__label--soon b { font-size: 14px; }

@keyframes bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 0 9px #f6d98f, 0 0 0 12px var(--ink), 0 0 0 22px rgb(255 255 255 / .45); } 50% { box-shadow: 0 0 0 9px #f6d98f, 0 0 0 12px var(--ink), 0 0 0 30px rgb(255 214 64 / .7); } }

@media (max-width: 1000px) {
  .isl { width: 160px; }
  .isl__shape { width: 140px; height: 78px; }
}
@media (max-width: 760px) {
  .map { aspect-ratio: 100 / 940; border-radius: 28px; }
  .road--d { display: none; }
  .road--m { display: block; }
  .isl { left: calc(var(--mx) * 1%); top: calc(var(--my) * 1%); width: 140px; }
  .isl__shape { width: 112px; height: 62px; box-shadow: 0 0 0 7px #f6d98f, 0 0 0 10px var(--ink), 0 0 0 16px rgb(255 255 255 / .45); }
  .isl__deco { font-size: 16px; }
  .isl__pet { top: -44px; width: 76px; height: 76px; }
  .isl__pet:deep(svg) { width: 76px; height: 76px; }
  .isl__num { top: -40px; width: 28px; height: 28px; font-size: 14px; }
  .isl__flag { top: -50px; font-size: 28px; }
  .isl__pin { top: -76px; font-size: 13px; }
  .isl__label { max-width: 170px; margin-top: 14px; padding: 4px 10px; }
  .isl__topic span:last-child { max-width: 120px; overflow: hidden; text-overflow: ellipsis; }
  .isl__next { max-width: 150px; }
  .isl__label b { font-size: 14px; }
  .isl__label small { font-size: 11px; }
  .isl--soon-hide { display: none; }
  .map__title { display: none; }
  .sea--compass { font-size: 34px; top: 70px; left: 10px; }
  .sea--whale { left: 72%; top: 44%; }
  .sea--octo { left: 8%; top: 64%; }
  .sea--fish { left: 50%; top: 20%; }
}
</style>
