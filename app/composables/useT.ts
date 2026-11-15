import { messages, type Lang } from '~/i18n'
import type { L } from '~/types/content'

function lookup(lang: Lang, key: string): unknown {
  return key.split('.').reduce<unknown>(
    (o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined),
    messages[lang]
  )
}

function format(s: string, p?: Record<string, string | number>) {
  return p ? s.replace(/\{(\w+)\}/g, (_, k) => String(p[k] ?? `{${k}}`)) : s
}

/** Переклад конкретною мовою поза компонентом (напр. підказка іншою мовою). */
export function tlFor(l: Lang, key: string, p?: Record<string, string | number>): string {
  const v = lookup(l, key) ?? lookup('pl', key)
  return typeof v === 'string' ? format(v, p) : key
}

/**
 * Мінімальний i18n: t() — мова дитини, tpl() — завжди польською
 * (щоб показувати шкільні терміни поруч із перекладом).
 */
export function useT() {
  const { lang } = useSettings()

  const tl = (l: Lang, key: string, p?: Record<string, string | number>) => {
    const v = lookup(l, key) ?? lookup('pl', key)
    return typeof v === 'string' ? format(v, p) : key
  }
  const t = (key: string, p?: Record<string, string | number>) => tl(lang.value, key, p)
  const tpl = (key: string, p?: Record<string, string | number>) => tl('pl', key, p)
  /** масиви та об'єкти */
  const tm = <T = unknown>(key: string): T => (lookup(lang.value, key) ?? lookup('pl', key)) as T
  const plural = (key: string, n: number) => {
    const rule = new Intl.PluralRules(lang.value).select(n)
    return tl(lang.value, `${key}.${lookup(lang.value, `${key}.${rule}`) ? rule : 'other'}`, { n })
  }
  /** чи показувати польський оригінал поруч */
  const showPl = computed(() => lang.value !== 'pl')

  /** текст із контенту уроку: { pl, uk, ru } */
  const loc = (x: L | string | number) => (typeof x === 'object' ? x[lang.value] ?? x.pl : String(x))
  const locPl = (x: L | string | number) => (typeof x === 'object' ? x.pl : String(x))
  /** повідомлення з i18n як об'єкт L (щоб показати і переклад, і польський оригінал) */
  const msgL = (key: string, p?: Record<string, string | number>): L => ({
    pl: tl('pl', key, p),
    uk: tl('uk', key, p),
    ru: tl('ru', key, p)
  })
  const pluralIn = (l: Lang, key: string, n: number) => {
    const rule = new Intl.PluralRules(l).select(n)
    return tl(l, `${key}.${lookup(l, `${key}.${rule}`) ? rule : 'other'}`, { n })
  }

  return { lang, t, tpl, tl, tm, plural, pluralIn, showPl, loc, locPl, msgL }
}
