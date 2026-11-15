import type { Lang } from '~/i18n'
import { langFromPath } from '~/i18n/routing'

const YEAR = 60 * 60 * 24 * 365

/** Мова з заголовка Accept-Language (лише для підказки «є переклад»). */
export function detectLang(header?: string): Lang {
  const s = (header || '').toLowerCase()
  if (s.startsWith('uk') || s.startsWith('ua')) return 'uk'
  if (s.startsWith('ru') || s.startsWith('be')) return 'ru'
  return 'pl'
}

/**
 * Налаштування. Мова визначається адресою сторінки (/, /uk, /ru);
 * у cookie зберігаємо лише вибір користувача (для підказки) та режим фокусу.
 */
export function useSettings() {
  const route = useRoute()
  const lang = computed<Lang>(() => langFromPath(route.path))
  const preferred = useCookie<Lang | null>('el_lang', { maxAge: YEAR, sameSite: 'lax', default: () => null })
  const focus = useCookie<boolean>('el_focus', { maxAge: YEAR, sameSite: 'lax', default: () => false })
  return { lang, preferred, focus }
}
