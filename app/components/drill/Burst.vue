<script setup lang="ts">
/** Wybuch kolorowych kropek po dobrej odpowiedzi. Zmień `key`, żeby odpalić jeszcze raz. */
const colors = ['var(--g1)', 'var(--g2)', 'var(--g3)', 'var(--g5)', 'var(--g6)', 'var(--pl)', 'var(--en)']
const parts = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2
  const r = 70 + (i % 3) * 22
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, c: colors[i % colors.length], s: 8 + (i % 4) * 3, star: i % 4 === 0 }
})
</script>

<template>
  <span class="burst deco" aria-hidden="true">
    <i v-for="(p, i) in parts" :key="i" :class="{ star: p.star }" :style="{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--c': p.c, '--s': `${p.s}px` }">{{ p.star ? '★' : '' }}</i>
  </span>
</template>

<style scoped>
.burst { position: absolute; left: 50%; top: 50%; width: 0; height: 0; pointer-events: none; z-index: 3; }
i {
  position: absolute;
  left: calc(var(--s) / -2);
  top: calc(var(--s) / -2);
  width: var(--s);
  height: var(--s);
  background: var(--c);
  border: 2px solid var(--ink);
  border-radius: 50%;
  animation: fly .7s cubic-bezier(.2, .8, .3, 1) forwards;
}
i.star { display: grid; place-items: center; width: auto; height: auto; font-size: 20px; line-height: 1; color: var(--c); background: none; border: 0; -webkit-text-stroke: 1.5px var(--ink); }
@keyframes fly {
  0% { transform: translate(0, 0) scale(.3); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: translate(var(--x), var(--y)) scale(1); opacity: 0; }
}
</style>
