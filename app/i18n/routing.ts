import type { Lang } from './index'

/**
 * Мовні маршрути: польська — основна (без префікса), українська — /uk/…, російська — /ru/….
 * Ті самі сторінки, ті самі польські адреси (slug) — змінюється лише префікс.
 */
export const LOCALES: Lang[] = ['pl', 'uk', 'ru']
export const PREFIXED: Lang[] = ['uk', 'ru']
/** Значення атрибута hreflang / html lang */
export const HREFLANG: Record<Lang, string> = { pl: 'pl', uk: 'uk', ru: 'ru' }
export const OG_LOCALE: Record<Lang, string> = { pl: 'pl_PL', uk: 'uk_UA', ru: 'ru_RU' }

const RE = /^\/(uk|ru)(?=\/|$|\?|#)/

export function langFromPath(path: string): Lang {
  const m = path.match(RE)
  return (m?.[1] as Lang | undefined) ?? 'pl'
}

/** Шлях без мовного префікса: /uk/klasa/1 → /klasa/1, /uk → / */
export function stripLang(path: string): string {
  const s = path.replace(RE, '')
  return s === '' || s.startsWith('?') || s.startsWith('#') ? `/${s}` : s
}

/** Додає префікс мови: ('/klasa/1', 'uk') → /uk/klasa/1; ('/#klasy', 'ru') → /ru#klasy */
export function withLang(path: string, lang: Lang): string {
  const p = stripLang(path)
  if (lang === 'pl') return p
  if (p === '/') return `/${lang}`
  if (p.startsWith('/?') || p.startsWith('/#')) return `/${lang}${p.slice(1)}`
  return `/${lang}${p}`
}
