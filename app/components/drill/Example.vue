<script setup lang="ts">
/** Przykład z podświetleniem: fragment w [nawiasach] jest wyróżniony. */
const props = defineProps<{ text: string }>()
const parts = computed(() => props.text.split(/\[(.+?)\]/))
</script>

<template>
  <span class="ex" lang="pl"><template v-for="(p, i) in parts" :key="i"><mark v-if="i % 2">{{ p }}</mark><template v-else>{{ p }}</template></template></span>
</template>

<style scoped>
.ex { display: inline-block; padding: 4px 12px; font-family: var(--font-display); font-weight: 600; font-size: 18px; background: var(--white); border: 2px solid var(--ink); border-radius: 12px; }
.ex mark { padding: 0 2px; color: var(--hl); background: transparent; border-bottom: 3px solid currentColor; }
</style>
