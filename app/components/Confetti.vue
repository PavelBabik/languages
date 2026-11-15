<script setup lang="ts">
const colors = ['var(--g1)', 'var(--g2)', 'var(--g3)', 'var(--g5)', 'var(--g6)', 'var(--red)']
const pieces = ref<{ left: number; delay: number; dur: number; color: string; rot: number; round: boolean }[]>([])

onMounted(() => {
  pieces.value = Array.from({ length: 70 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 2.2 + Math.random() * 1.8,
    color: colors[i % colors.length]!,
    rot: Math.random() * 360,
    round: Math.random() > 0.6
  }))
})
</script>

<template>
  <div class="confetti" aria-hidden="true">
    <i
      v-for="(p, i) in pieces"
      :key="i"
      :class="{ round: p.round }"
      :style="{
        left: `${p.left}%`,
        background: p.color,
        animationDelay: `${p.delay}s`,
        animationDuration: `${p.dur}s`,
        '--rot': `${p.rot}deg`
      }"
    />
  </div>
</template>

<style scoped>
.confetti { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 100; }
i {
  position: absolute;
  top: -20px;
  width: 12px;
  height: 18px;
  border: 2px solid var(--ink);
  border-radius: 3px;
  animation: fall linear forwards;
}
i.round { width: 14px; height: 14px; border-radius: 50%; }
@keyframes fall {
  0% { transform: translateY(0) rotate(var(--rot)); opacity: 1; }
  100% { transform: translateY(110vh) rotate(calc(var(--rot) + 540deg)); opacity: .9; }
}
</style>
