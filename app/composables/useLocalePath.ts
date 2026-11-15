import type { Lang } from '~/i18n'
import { withLang } from '~/i18n/routing'

/** Посилання з урахуванням поточної мови: lp('/klasa/1') → /uk/klasa/1 */
export function useLocalePath() {
  const { lang } = useSettings()
  return (path: string) => withLang(path, lang.value)
}

/** Адреса поточної сторінки іншою мовою. */
export function useSwitchLang() {
  const route = useRoute()
  return (l: Lang) => withLang(route.fullPath, l)
}
