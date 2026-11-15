// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      /** Адреса сайту для canonical, hreflang і sitemap. Задається змінною NUXT_PUBLIC_SITE_URL; без неї — береться з запиту. */
      siteUrl: ''
    }
  },
  hooks: {
    /** Мовні маршрути: кожна сторінка також під /uk/… і /ru/… (польська — без префікса). */
    'pages:extend'(pages) {
      const extra = pages.flatMap(p =>
        (['uk', 'ru'] as const).map(l => ({
          ...p,
          name: p.name ? `${p.name}___${l}` : undefined,
          path: `/${l}${p.path === '/' ? '' : p.path}`
        }))
      )
      pages.push(...extra)
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      title: 'ease.lang — polski i angielski bez stresu',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#fff8ec' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Rubik:wght@500;600;700&display=swap'
        }
      ]
    }
  }
})
