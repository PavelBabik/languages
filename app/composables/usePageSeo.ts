import { SITE } from '~/data/site'
import { HREFLANG } from '~/i18n/routing'

type Getter = () => string

/**
 * Jeden komplet meta tagów dla strony: title, description, Open Graph i Twitter.
 * Wszystko w języku z adresu — żeby wyszukiwarki i podglądy linków nie dostawały polskiego
 * opisu na stronach /uk i /ru.
 */
export function usePageSeo(opts: { title: Getter; description: Getter; type?: 'website' | 'article'; jsonLd?: (origin: string) => Record<string, unknown> }) {
  const { t, lang } = useT()
  const config = useRuntimeConfig()
  const reqUrl = useRequestURL()
  const origin = computed(() => (config.public.siteUrl || reqUrl.origin).replace(/\/$/, ''))
  const image = computed(() => `${origin.value}/icon-512.png`)
  const desc = () => clip(opts.description())

  useHead({ title: opts.title })
  useSeoMeta({
    description: desc,
    ogTitle: opts.title,
    ogDescription: desc,
    ogType: opts.type ?? 'website',
    ogSiteName: SITE.name,
    ogImage: image,
    ogImageAlt: () => t('mascot.label'),
    twitterCard: 'summary',
    twitterTitle: opts.title,
    twitterDescription: desc,
    twitterImage: image
  })
  if (opts.jsonLd) {
    useHead({
      script: () => [{
        type: 'application/ld+json',
        key: 'ld',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', inLanguage: HREFLANG[lang.value], ...opts.jsonLd!(origin.value) })
      }]
    })
  }
  return { origin }
}

/** Opisy ~155 znaków: Google i tak ucina dłuższe, więc tniemy na granicy słowa. */
function clip(s: string, max = 158): string {
  const one = s.replace(/\s+/g, ' ').trim()
  if (one.length <= max) return one
  const cut = one.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—–-]+$/, '') + '…'
}
