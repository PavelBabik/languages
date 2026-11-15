import pl from './pl'
import uk from './uk'
import ru from './ru'

export type Lang = 'pl' | 'uk' | 'ru'

export const LANGS: { code: Lang; label: string; name: string; speech: string }[] = [
  { code: 'pl', label: 'PL', name: 'Polski', speech: 'pl-PL' },
  { code: 'uk', label: 'УКР', name: 'Українська', speech: 'uk-UA' },
  { code: 'ru', label: 'РУС', name: 'Русский', speech: 'ru-RU' }
]

export const messages: Record<Lang, Record<string, unknown>> = { pl, uk, ru }
