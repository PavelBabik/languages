import type { H3Event } from 'h3'

/** Adres serwisu: NUXT_PUBLIC_SITE_URL albo host z żądania (działa na każdej domenie Vercel). */
export function siteOrigin(event: H3Event): string {
  const fromConfig = useRuntimeConfig(event).public.siteUrl as string
  return (fromConfig || getRequestURL(event).origin).replace(/\/$/, '')
}
