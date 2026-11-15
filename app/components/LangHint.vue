<script setup lang="ts">
import type { Lang } from '~/i18n'
import { tlFor } from '~/composables/useT'

/**
 * Podpowiedź „Ta strona jest też po ukraińsku / rosyjsku” — bez automatycznego przekierowania
 * (lepiej dla SEO i dla linków wysyłanych innym). Pokazujemy na polskich stronach,
 * gdy przeglądarka lub wcześniejszy wybór wskazuje inny język.
 */
const { lang, preferred } = useSettings()
const switchLang = useSwitchLang()
const headers = import.meta.server ? useRequestHeaders(['accept-language']) : {}
const off = useCookie<boolean>('el_hint_off', { maxAge: 60 * 60 * 24 * 180, sameSite: 'lax', default: () => false })
const target = computed<Lang | null>(() => {
  const want = preferred.value ?? detectLang(import.meta.server ? headers['accept-language'] : navigator.language)
  return lang.value === 'pl' && want !== 'pl' ? want : null
})
</script>

<template>
  <div v-if="target && !off" class="lhint" :lang="target">
    <div class="container lhint__inner">
      <span>{{ tlFor(target, 'langHint.text') }}</span>
      <NuxtLink :to="switchLang(target)" class="lhint__go" @click="preferred = target">{{ tlFor(target, 'langHint.go') }} →</NuxtLink>
      <button type="button" class="lhint__x" :aria-label="tlFor(target, 'langHint.close')" @click="off = true">✕</button>
    </div>
  </div>
</template>

<style scoped>
.lhint { background: var(--ink); color: var(--white); font-size: 15px; }
.lhint__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 14px; min-height: 44px; padding-block: 6px; }
.lhint__go { font-family: var(--font-display); font-weight: 600; color: var(--g1); text-decoration: underline; text-underline-offset: 3px; }
.lhint__x { width: 30px; height: 30px; color: var(--white); background: transparent; border: 0; border-radius: 99px; cursor: pointer; }
.lhint__x:hover { background: color-mix(in srgb, var(--white) 15%, transparent); }
</style>
