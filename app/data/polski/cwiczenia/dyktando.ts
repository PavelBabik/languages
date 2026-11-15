import type { Exercise } from './types'
import { boss, by, chItems, l, ouItems, rzItems } from './litery'
import { ccItems, eaItems } from './litery2'

/* ================================================================
   Wielkie dyktando — Zamek Dyktanda, Sowa Bożena.
   Wszystkie litery razem: ó/u, rz/ż, ch/h, ć/ci, cz/ć, sz/ś, ę/ą.
   ================================================================ */
const all = [...ouItems, ...rzItems, ...chItems, ...ccItems, ...eaItems]
const hard = [
  ...by(ouItems, 'memoO', 'memoU'), ...by(rzItems, 'memoZ', 'after'), ...by(chItems, 'memoCh', 'memoH'),
  ...by(ccItems, 'softC', 'softCi', 'cz', 'cTi'), ...by(eaItems, 'native', 'foreign', 'uU', 'uJa')
]

export const mixExercise: Exercise = {
  slug: 'litery-mix',
  group: 'litery',
  icon: '✦',
  color: 'var(--pl)',
  soft: 'var(--pl-soft)',
  title: l('Wielkie dyktando', 'Великий диктант', 'Большой диктант'),
  lead: l(
    'Wszystkie litery razem — jak w prawdziwym dyktandzie.',
    'Усі літери разом — як у справжньому диктанті.',
    'Все буквы вместе — как в настоящем диктанте.'
  ),
  badge: l('Mistrz dyktanda', 'Майстер диктанту', 'Мастер диктанта'),
  levels: [
    {
      ...boss('mix', all, l('Dyktando: 10 słów', 'Диктант: 10 слів', 'Диктант: 10 слов')),
      examples: ['st[ó]ł → st[o]ły', 'mo[rz]e → mo[r]ski', 'mu[ch]a → mu[sz]e', 'z[ą]b → z[ę]by'],
      rule: l(
        '1. Zmień słowo i szukaj wymiany. 2. Popatrz na końcówkę. 3. Porównaj z ukraińskim. 4. Zapamiętaj.',
        '1. Зміни слово і шукай заміну. 2. Подивись на закінчення. 3. Порівняй з українською. 4. Запам’ятай.',
        '1. Измени слово и ищи чередование. 2. Посмотри на окончание. 3. Сравни с русским. 4. Запомни.'
      )
    },
    boss('hard', hard, l('Trudne słowa: 12', 'Складні слова: 12', 'Сложные слова: 12'), 12),
    boss('mega', all, l('Mega-dyktando: 20', 'Мега-диктант: 20', 'Мега-диктант: 20'), 20)
  ]
}
