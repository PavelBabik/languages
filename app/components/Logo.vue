<script setup lang="ts">
const lp = useLocalePath()
const { t } = useT()
</script>

<template>
  <NuxtLink :to="lp('/')" class="logo" :aria-label="t('nav.home')">
    <span class="logo__mark" aria-hidden="true">
      <svg viewBox="0 0 40 34" width="40" height="34">
        <!-- dwa dymki: polski i angielski -->
        <path d="M4 4 H24 a3 3 0 0 1 3 3 V17 a3 3 0 0 1 -3 3 H12 L6 25 V20 H4 a3 3 0 0 1 -3 -3 V7 a3 3 0 0 1 3 -3Z" fill="var(--pl)" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round" />
        <path d="M18 12 H36 a3 3 0 0 1 3 3 V24 a3 3 0 0 1 -3 3 H34 V32 L28 27 H18 a3 3 0 0 1 -3 -3 V15 a3 3 0 0 1 3 -3Z" fill="var(--en)" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round" />
        <circle cx="23" cy="19.5" r="1.8" fill="var(--white)" />
        <circle cx="28" cy="19.5" r="1.8" fill="var(--white)" />
        <circle cx="33" cy="19.5" r="1.8" fill="var(--white)" />
      </svg>
    </span>
    <span class="logo__text">ease<b>.</b>lang</span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: -0.02em;
}
.logo__mark {
  display: grid;
  place-items: center;
  width: 50px;
  height: 46px;
  background: var(--white);
  border: var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: transform .3s var(--ease-bounce);
}
.logo__mark svg { width: 34px; height: auto; }
.logo:hover .logo__mark { transform: rotate(-10deg) scale(1.06); }
.logo__text b { color: var(--pl); }
</style>
