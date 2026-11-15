<script setup lang="ts">
const { t } = useT()
/**
 * Słówko — maskotka ease.lang: dymek z komiksu, który mówi.
 * Kolor zależy od przedmiotu (polski — czerwony, angielski — niebieski).
 */
withDefaults(
  defineProps<{
    color?: string
    mood?: 'happy' | 'wow' | 'think' | 'sad'
    wave?: boolean
    size?: number
  }>(),
  { color: 'var(--pl)', mood: 'happy', wave: false, size: 160 }
)
</script>

<template>
  <svg
    class="mascot"
    :class="{ 'mascot--wave': wave }"
    :width="size"
    :height="size"
    viewBox="0 0 140 140"
    role="img"
    :aria-label="t('mascot.label')"
  >
    <ellipse cx="70" cy="134" rx="38" ry="5" fill="rgba(31,29,54,.14)" />
    <g class="mascot__body">
      <!-- ręce -->
      <path class="mascot__arm-l" d="M20 66 Q6 60 8 44" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" />
      <path d="M120 70 Q132 76 130 90" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" />

      <!-- ciało-dymek z ogonkiem -->
      <path
        d="M34 20 H106 C116 20 122 26 122 36 V86 C122 96 116 102 106 102 H76 L52 124 L56 102 H34 C24 102 18 96 18 86 V36 C18 26 24 20 34 20Z"
        :fill="color"
        stroke="var(--ink)"
        stroke-width="3.5"
        stroke-linejoin="round"
      />
      <!-- błysk -->
      <path d="M32 46 Q34 34 46 32" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="6" stroke-linecap="round" />

      <!-- oczy -->
      <g class="mascot__eyes">
        <template v-if="mood === 'sad'">
          <path d="M43 58 Q50 52 57 58 M83 58 Q90 52 97 58" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" />
        </template>
        <template v-else>
          <ellipse cx="50" cy="56" rx="10" :ry="mood === 'wow' ? 12 : 11" fill="var(--white)" stroke="var(--ink)" stroke-width="3" />
          <ellipse cx="90" cy="56" rx="10" :ry="mood === 'wow' ? 12 : 11" fill="var(--white)" stroke="var(--ink)" stroke-width="3" />
          <circle :cx="mood === 'think' ? 53 : 51" :cy="mood === 'think' ? 52 : 58" r="5" fill="var(--ink)" />
          <circle :cx="mood === 'think' ? 93 : 91" :cy="mood === 'think' ? 52 : 58" r="5" fill="var(--ink)" />
        </template>
      </g>

      <!-- policzki -->
      <ellipse cx="36" cy="76" rx="7" ry="4.5" fill="var(--pink)" opacity=".75" />
      <ellipse cx="104" cy="76" rx="7" ry="4.5" fill="var(--pink)" opacity=".75" />

      <!-- usta -->
      <path v-if="mood === 'happy'" d="M58 76 Q70 92 82 76 Z" fill="var(--ink)" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" />
      <ellipse v-else-if="mood === 'wow'" cx="70" cy="82" rx="7" ry="8" fill="var(--ink)" />
      <path v-else-if="mood === 'think'" d="M60 82 Q70 77 80 82" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" />
      <path v-else d="M60 86 Q70 78 80 86" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" />
    </g>
  </svg>
</template>

<style scoped>
.mascot { overflow: visible; }
.mascot__body {
  animation: bob 3.2s ease-in-out infinite;
  transform-origin: 70px 124px;
}
.mascot__eyes {
  transform-box: fill-box;
  transform-origin: center;
  animation: blink 4.5s infinite;
}
.mascot--wave .mascot__arm-l {
  transform-origin: 20px 66px;
  animation: wave 1.2s ease-in-out infinite;
}
@keyframes bob {
  0%, 100% { transform: translateY(0) scale(1, 1); }
  50% { transform: translateY(-5px) scale(1.01, .99); }
}
@keyframes blink {
  0%, 94%, 100% { transform: scaleY(1); }
  97% { transform: scaleY(.1); }
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(22deg); }
}
</style>
