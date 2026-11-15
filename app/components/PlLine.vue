<script setup lang="ts">
/** Польський оригінал під перекладом — дитина бачить шкільний термін. */
defineProps<{ text: string }>()
</script>

<template>
  <span class="pl-line" lang="pl">
    <b>PL</b>
    <span>{{ text }}</span>
  </span>
</template>

<style scoped>
.pl-line {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-soft);
}
.pl-line b {
  flex: none;
  padding: 1px 7px;
  font-size: 11px;
  letter-spacing: .06em;
  color: var(--white);
  background: #dc143c;
  border-radius: 6px;
  transform: translateY(-1px);
}
</style>
