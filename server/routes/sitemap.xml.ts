import { plGrades } from '../../app/data/polski/curriculum'
import { exercises } from '../../app/data/polski/cwiczenia'

/**
 * sitemap.xml: wszystkie strony w trzech językach (pl bez prefiksu, /uk, /ru)
 * z alternatywami hreflang — zgodnie z zaleceniami Google dla stron wielojęzycznych.
 */
const LANGS = ['pl', 'uk', 'ru'] as const
const withLang = (path: string, l: (typeof LANGS)[number]) => (l === 'pl' ? path : path === '/' ? `/${l}` : `/${l}${path}`)
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

export default defineEventHandler(event => {
  const origin = siteOrigin(event)
  const pages: { path: string; priority: string; freq: string }[] = [
    { path: '/', priority: '1.0', freq: 'weekly' },
    { path: '/polski', priority: '0.9', freq: 'weekly' },
    ...plGrades.map(g => ({ path: `/polski/klasa/${g.n}`, priority: '0.8', freq: 'weekly' })),
    { path: '/polski/cwiczenia', priority: '0.9', freq: 'weekly' },
    ...exercises.map(e => ({ path: `/polski/cwiczenia/${e.slug}`, priority: '0.8', freq: 'weekly' })),
    { path: '/angielski', priority: '0.5', freq: 'monthly' },
    { path: '/kontakt', priority: '0.4', freq: 'yearly' }
  ]
  const urls = pages.flatMap(p =>
    LANGS.map(l => {
      const alts = LANGS.map(a => `    <xhtml:link rel="alternate" hreflang="${a}" href="${esc(origin + withLang(p.path, a))}"/>`).join('\n')
      return `  <url>
    <loc>${esc(origin + withLang(p.path, l))}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(origin + p.path)}"/>
    <changefreq>${p.freq}</changefreq>
    <priority>${l === 'pl' ? p.priority : (Number(p.priority) - 0.1).toFixed(1)}</priority>
  </url>`
    })
  )
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
})
