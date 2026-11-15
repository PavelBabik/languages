<script setup lang="ts">
/**
 * Tekst z regułą. Na czerwono:
 *  – fragmenty w [nawiasach],
 *  – automatycznie wszystkie litery z reguły (`marks`, np. ['ó', 'u']).
 */
const props = defineProps<{ text: string; tag?: string; marks?: string[] }>()

const re = computed(() => {
  const m = [...(props.marks ?? [])].sort((a, b) => b.length - a.length).map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return m.length ? new RegExp(`(${m.join('|')})`, 'gi') : null
})

const parts = computed(() => {
  const out: { t: string; hl: boolean }[] = []
  props.text.split(/\[(.+?)\]/).forEach((seg, i) => {
    if (i % 2) return out.push({ t: seg, hl: true })
    if (!re.value) return out.push({ t: seg, hl: false })
    seg.split(re.value).forEach((p, j) => p && out.push({ t: p, hl: j % 2 === 1 }))
  })
  return out
})
</script>

<template>
  <component :is="tag ?? 'span'" class="rich"><template v-for="(p, i) in parts" :key="i"><b v-if="p.hl" class="rich__hl">{{ p.t }}</b><template v-else>{{ p.t }}</template></template></component>
</template>

<style scoped>
.rich__hl { color: var(--hl); font-weight: 800; }
</style>
