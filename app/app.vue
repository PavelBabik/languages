<script setup lang="ts">
import { HREFLANG, LOCALES, OG_LOCALE, stripLang, withLang } from '~/i18n/routing'

const { lang, focus } = useSettings()
const { t } = useT()
const route = useRoute()
const config = useRuntimeConfig()
const reqUrl = useRequestURL()
/** Adres strony: z konfiguracji (NUXT_PUBLIC_SITE_URL) albo z żądania. */
const origin = computed(() => (config.public.siteUrl || reqUrl.origin).replace(/\/$/, ''))
const base = computed(() => stripLang(route.path))

useHead({
  htmlAttrs: {
    lang: () => HREFLANG[lang.value],
    class: () => (focus.value ? 'focus-mode' : '')
  },
  link: () => [
    { rel: 'canonical', href: origin.value + withLang(base.value, lang.value) },
    ...LOCALES.map(l => ({ rel: 'alternate', hreflang: HREFLANG[l], href: origin.value + withLang(base.value, l) })),
    { rel: 'alternate', hreflang: 'x-default', href: origin.value + base.value }
  ],
  meta: () => [
    { property: 'og:locale', content: OG_LOCALE[lang.value] },
    ...LOCALES.filter(l => l !== lang.value).map(l => ({ property: 'og:locale:alternate', content: OG_LOCALE[l] })),
    { property: 'og:url', content: origin.value + route.path },
    // domyślny opis (np. strona błędu) — strony nadpisują go swoim
    { name: 'description', content: t('seo.home'), key: 'description' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
