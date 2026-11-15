<script setup lang="ts">
/**
 * Tło krainy: niebo, słońce, chmury, dwa rzędy pagórków i pływające ozdoby.
 * Kładziemy je pod treścią (rodzic: position: relative; isolation: isolate).
 */
const props = withDefaults(
  defineProps<{ sky?: string; ground?: string; ground2?: string; deco?: string[]; hills?: boolean }>(),
  { sky: '#bfe6ff', ground: '#8fd96b', ground2: '#5fb84a', deco: () => [], hills: true }
)
const spots = [
  { l: 6, t: 18, s: 30, d: 0 }, { l: 88, t: 12, s: 26, d: 1.2 }, { l: 78, t: 46, s: 34, d: .6 },
  { l: 12, t: 58, s: 28, d: 1.8 }, { l: 46, t: 8, s: 22, d: 2.4 }, { l: 94, t: 70, s: 30, d: .3 },
  { l: 3, t: 84, s: 32, d: 1.5 }
]
const items = computed(() => spots.map((s, i) => ({ ...s, e: props.deco[i % Math.max(props.deco.length, 1)] })).filter(x => x.e))
</script>

<template>
  <div class="scene" aria-hidden="true" :style="{ '--sky': sky, '--ground': ground, '--ground2': ground2 }">
    <div class="scene__sun" />
    <div class="scene__cloud c1" /><div class="scene__cloud c2" /><div class="scene__cloud c3" />
    <svg v-if="hills" class="scene__hills" viewBox="0 0 1440 220" preserveAspectRatio="none">
      <path d="M0 120 C200 40 360 40 560 110 C760 180 900 60 1100 70 C1260 80 1360 120 1440 100 V220 H0Z" fill="var(--ground2)" />
      <path d="M0 160 C240 100 420 120 640 160 C860 200 1040 110 1240 130 C1340 140 1400 160 1440 150 V220 H0Z" fill="var(--ground)" />
    </svg>
    <span v-for="(x, i) in items" :key="i" class="scene__deco deco" :style="{ left: `${x.l}%`, top: `${x.t}%`, fontSize: `${x.s}px`, animationDelay: `${x.d}s` }">{{ x.e }}</span>
  </div>
</template>

<style scoped>
.scene {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(180deg, var(--sky) 0%, color-mix(in srgb, var(--sky) 55%, #fff) 70%, var(--ground) 100%);
}
.scene__sun {
  position: absolute;
  top: 26px;
  right: 7%;
  width: 84px;
  height: 84px;
  background: radial-gradient(circle, #fff3a6 0 45%, #ffd23f 46% 100%);
  border: 3px solid var(--ink);
  border-radius: 50%;
  box-shadow: 0 0 0 14px rgb(255 210 63 / .25), 0 0 0 30px rgb(255 210 63 / .12);
}
.scene__cloud {
  position: absolute;
  width: 130px;
  height: 40px;
  background: #fff;
  border: 3px solid var(--ink);
  border-radius: 40px;
  opacity: .92;
  animation: drift 38s linear infinite;
}
.scene__cloud::before, .scene__cloud::after { content: ''; position: absolute; background: #fff; border: 3px solid var(--ink); border-bottom: 0; border-radius: 50% 50% 0 0; }
.scene__cloud::before { left: 22px; top: -24px; width: 50px; height: 30px; }
.scene__cloud::after { left: 58px; top: -34px; width: 50px; height: 40px; }
.c1 { top: 70px; left: -10%; }
.c2 { top: 150px; left: 30%; transform: scale(.7); animation-duration: 52s; animation-delay: -20s; }
.c3 { top: 40px; left: 60%; transform: scale(.85); animation-duration: 46s; animation-delay: -8s; }
.scene__hills { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 160px; }
.scene__deco { position: absolute; animation: float 6s ease-in-out infinite; filter: drop-shadow(2px 3px 0 rgb(31 29 54 / .15)); }
@keyframes drift { from { translate: 0 0; } to { translate: 120vw 0; } }
@media (max-width: 620px) {
  .scene__sun { width: 56px; height: 56px; top: 16px; }
  .scene__cloud { width: 90px; height: 30px; }
  .scene__deco { opacity: .35; }
  .scene__cloud { opacity: .55; }
  .scene__sun { top: 70px; opacity: .8; }
}
</style>
