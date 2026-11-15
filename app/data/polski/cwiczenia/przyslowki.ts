import type { L } from '~/types/content'
import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, mark, SENT, tip } from './helpers'

/* ================================================================
   PRZYSŁÓWKI — Ogród Przysłówków, przewodnik: Ślimak Szymek
   (chodzi wolno, ale marzy, żeby biegać szybko)
   ================================================================ */

/* ---------- 1. Jak? gdzie? kiedy? ---------- */
const POS: L[] = [
  { pl: 'przysłówek (jak? gdzie? kiedy?)', uk: 'прислівник (як? де? коли?)', ru: 'наречие (как? где? когда?)' },
  { pl: 'przymiotnik (jaki?)', uk: 'прикметник (який?)', ru: 'прилагательное (какой?)' },
  { pl: 'czasownik (co robi?)', uk: 'дієслово (що робить?)', ru: 'глагол (что делает?)' }
]
const posHint = [
  l('Pytamy: jak? gdzie? kiedy? — to przysłówek. Opisuje czasownik.', 'Питаємо: як? де? коли? — це прислівник. Він описує дієслово.', 'Спрашиваем: как? где? когда? — это наречие. Оно описывает глагол.'),
  l('Pytamy: jaki? jaka? jakie? — to przymiotnik. Opisuje rzeczownik.', 'Питаємо: який? яка? яке? — це прикметник. Він описує іменник.', 'Спрашиваем: какой? какая? какое? — это прилагательное. Оно описывает существительное.'),
  l('Pytamy: co robi? — to czasownik.', 'Питаємо: що робить? — це дієслово.', 'Спрашиваем: что делает? — это глагол.')
]
const p = (s: string, k: 0 | 1 | 2, uk: string, ru: string) => mark(s, POS, k, posHint[k]!, `p${k}`, uk, ru)
const posItems: Item[] = [
  p('Ślimak idzie [wolno].', 0, 'Равлик іде повільно.', 'Улитка ползёт медленно.'),
  p('To [wolny] ślimak.', 1, 'Це повільний равлик.', 'Это медленная улитка.'),
  p('Ślimak [idzie] wolno.', 2, 'Равлик іде повільно.', 'Улитка ползёт медленно.'),
  p('[Jutro] jedziemy nad morze.', 0, 'Завтра ми їдемо на море.', 'Завтра мы едем на море.'),
  p('Mama [ładnie] śpiewa.', 0, 'Мама гарно співає.', 'Мама красиво поёт.'),
  p('Mama ma [ładny] głos.', 1, 'У мами гарний голос.', 'У мамы красивый голос.'),
  p('Kot śpi [tutaj].', 0, 'Кіт спить тут.', 'Кот спит здесь.'),
  p('[Wczoraj] padał deszcz.', 0, 'Учора падав дощ.', 'Вчера шёл дождь.'),
  p('To jest [szybki] samochód.', 1, 'Це швидка машина.', 'Это быстрая машина.'),
  p('Samochód jedzie [szybko].', 0, 'Машина їде швидко.', 'Машина едет быстро.')
]

/* ---------- 2. Szybki → szybko ---------- */
const formHint = {
  adv: l('Jak? (robi coś) — przysłówek na -o lub -e: idzie szybko, śpiewa ładnie.', 'Як? (робить щось) — прислівник на -o або -e: idzie szybko (швидко), śpiewa ładnie (гарно).', 'Как? (делает что-то) — наречие на -o или -e: idzie szybko (быстро), śpiewa ładnie (красиво).'),
  adj: l('Jaki? (rzecz, osoba) — przymiotnik: szybki rower, ładny głos.', 'Який? (річ, людина) — прикметник: szybki rower, ładny głos.', 'Какой? (вещь, человек) — прилагательное: szybki rower, ładny głos.')
}
const formItems: Item[] = [
  gap('Ślimak idzie (wolno).', ['wolny', 'wolno'], formHint.adv, 'adv', 'Равлик іде повільно.', 'Улитка ползёт медленно.', 'jak? → wolno'),
  gap('To jest (wolny) ślimak.', ['wolny', 'wolno'], formHint.adj, 'adj', 'Це повільний равлик.', 'Это медленная улитка.', 'jaki? → wolny'),
  gap('Mama (ładnie) śpiewa.', ['ładna', 'ładnie'], formHint.adv, 'adv', 'Мама гарно співає.', 'Мама красиво поёт.', 'jak? → ładnie'),
  gap('Mama jest (ładna).', ['ładna', 'ładnie'], formHint.adj, 'adj', 'Мама гарна.', 'Мама красивая.', 'jaka? → ładna'),
  gap('Czuję się (dobrze).', ['dobry', 'dobrze'], formHint.adv, 'adv', 'Я почуваюся добре.', 'Я чувствую себя хорошо.', 'jak? → dobrze'),
  gap('To (dobry) pomysł.', ['dobry', 'dobrze'], formHint.adj, 'adj', 'Це добра ідея.', 'Это хорошая идея.', 'jaki? → dobry'),
  gap('Kot (szybko) biega.', ['szybki', 'szybko'], formHint.adv, 'adv', 'Кіт швидко бігає.', 'Кот быстро бегает.', 'jak? → szybko'),
  gap('Mam (szybki) rower.', ['szybki', 'szybko'], formHint.adj, 'adj', 'У мене швидкий велосипед.', 'У меня быстрый велосипед.', 'jaki? → szybki'),
  gap('Dzieci bawią się (wesoło).', ['wesoły', 'wesoło'], formHint.adv, 'adv', 'Діти весело граються.', 'Дети весело играют.', 'jak? → wesoło'),
  gap('Śpiewasz (źle).', ['zły', 'źle'], formHint.adv, 'adv', 'Ти погано співаєш.', 'Ты плохо поёшь.', 'jak? → źle')
]

/* ---------- 3. Szybko → szybciej → najszybciej ---------- */
const stHint = {
  w: l('Porównujemy (niż) — -iej, -ej: szybciej, ładniej.', 'Порівнюємо (niż) — -iej, -ej: szybciej (швидше), ładniej.', 'Сравниваем (niż) — -iej, -ej: szybciej (быстрее), ładniej.'),
  n: l('Najbardziej ze wszystkich — naj-: najszybciej.', 'Найбільше з усіх — naj-: najszybciej (найшвидше).', 'Больше всех — naj-: najszybciej (быстрее всех).'),
  ir: l('Nieregularne: dobrze → lepiej, źle → gorzej, dużo → więcej, mało → mniej.', 'Неправильні: dobrze → lepiej, źle → gorzej, dużo → więcej, mało → mniej.', 'Неправильные: dobrze → lepiej, źle → gorzej, dużo → więcej, mało → mniej.')
}
const stItems: Item[] = [
  gap('Zając biega (szybciej) niż ślimak.', ['szybko', 'szybciej', 'najszybciej'], stHint.w, 'w', 'Заєць бігає швидше за равлика.', 'Заяц бегает быстрее улитки.'),
  gap('Gepard biega (najszybciej).', ['szybko', 'szybciej', 'najszybciej'], stHint.n, 'n', 'Гепард бігає найшвидше.', 'Гепард бегает быстрее всех.'),
  gap('Dziś śpiewasz (ładniej) niż wczoraj.', ['ładnie', 'ładniej', 'najładniej'], stHint.w, 'w', 'Сьогодні ти співаєш гарніше, ніж учора.', 'Сегодня ты поёшь красивее, чем вчера.'),
  gap('Czuję się (lepiej).', ['dobrzej', 'lepiej', 'najlepiej'], stHint.ir, 'ir', 'Я почуваюся краще.', 'Я чувствую себя лучше.'),
  gap('Ola rysuje (najlepiej) w klasie.', ['dobrze', 'lepiej', 'najlepiej'], stHint.ir, 'ir', 'Оля малює найкраще в класі.', 'Оля рисует лучше всех в классе.'),
  gap('Dziś jest (gorzej) niż wczoraj.', ['źlej', 'gorzej', 'najgorzej'], stHint.ir, 'ir', 'Сьогодні гірше, ніж учора.', 'Сегодня хуже, чем вчера.'),
  gap('Zjedz (więcej) warzyw!', ['dużej', 'więcej', 'najwięcej'], stHint.ir, 'ir', 'З’їж більше овочів!', 'Съешь больше овощей!'),
  gap('Mam (mniej) czasu niż ty.', ['małej', 'mniej', 'najmniej'], stHint.ir, 'ir', 'У мене менше часу, ніж у тебе.', 'У меня меньше времени, чем у тебя.'),
  gap('Ślimak idzie (najwolniej).', ['wolno', 'wolniej', 'najwolniej'], stHint.n, 'n', 'Равлик іде найповільніше.', 'Улитка ползёт медленнее всех.')
]

/* ---------- 4. „nie” z przysłówkami ---------- */
const nieHint = {
  razem: l('Przysłówek od przymiotnika (na -o, -e) + nie — razem: niedobrze, niedaleko.', 'Прислівник від прикметника (на -o, -e) + nie — разом: niedobrze, niedaleko.', 'Наречие от прилагательного (на -o, -e) + nie — слитно: niedobrze, niedaleko.'),
  osobno: l('Osobno: ze stopniem wyższym (nie lepiej) i ze słowami tu, teraz, zawsze, bardzo.', 'Окремо: з вищим ступенем (nie lepiej) і зі словами tu, teraz, zawsze, bardzo.', 'Раздельно: со сравнительной степенью (nie lepiej) и со словами tu, teraz, zawsze, bardzo.')
}
const nie = (s: string, w: string, together: boolean, uk: string, ru: string) => {
  const s2 = s.replace('{}', `(${together ? `nie${w}` : `nie ${w}`})`)
  return gap(s2, [`nie${w}`, `nie ${w}`], together ? nieHint.razem : nieHint.osobno, together ? 'razem' : 'osobno', uk, ru)
}
const nieItems: Item[] = [
  nie('Mieszkam {} szkoły.', 'daleko', true, 'Я живу недалеко від школи.', 'Я живу недалеко от школы.'),
  nie('Czuję się {}.', 'dobrze', true, 'Я почуваюся недобре.', 'Я чувствую себя нехорошо.'),
  nie('Jest mi {}.', 'wygodnie', true, 'Мені незручно.', 'Мне неудобно.'),
  nie('Mówisz {}.', 'wyraźnie', true, 'Ти говориш нечітко.', 'Ты говоришь невнятно.'),
  nie('Mam czas, ale {}.', 'teraz', false, 'Я маю час, але не зараз.', 'У меня есть время, но не сейчас.'),
  nie('Kot śpi, ale {}.', 'tu', false, 'Кіт спить, але не тут.', 'Кот спит, но не здесь.'),
  nie('Gram w piłkę, ale {}.', 'zawsze', false, 'Я граю в м’яч, але не завжди.', 'Я играю в мяч, но не всегда.'),
  nie('Dziś jest {} niż wczoraj.', 'lepiej', false, 'Сьогодні не краще, ніж учора.', 'Сегодня не лучше, чем вчера.'),
  nie('Lubię szpinak, ale {}.', 'bardzo', false, 'Я люблю шпинат, але не дуже.', 'Я люблю шпинат, но не очень.')
]

export const przyslowkiExercise: Exercise = {
  slug: 'przyslowki',
  group: 'przyslowek',
  icon: 'jak?',
  color: 'var(--g4)',
  soft: 'var(--g4-soft)',
  title: l('Przysłówki', 'Прислівники', 'Наречия'),
  lead: l(
    'Jak? Gdzie? Kiedy? Szybko, wolno, tutaj, jutro… Przysłówki mówią, jak coś się dzieje.',
    'Як? Де? Коли? Szybko, wolno, tutaj, jutro… Прислівники кажуть, як щось відбувається.',
    'Как? Где? Когда? Szybko, wolno, tutaj, jutro… Наречия говорят, как что-то происходит.'
  ),
  badge: l('Mistrz przysłówków', 'Майстер прислівників', 'Мастер наречий'),
  levels: [
    lv('co', 'jak?',
      l('Co to jest przysłówek?', 'Що таке прислівник?', 'Что такое наречие?'),
      l(
        'Przysłówek odpowiada na pytania jak? gdzie? kiedy? i opisuje czasownik: idzie [wolno], śpi [tutaj], [jutro] jedziemy.',
        'Прислівник відповідає на питання як? де? коли? і описує дієслово: idzie [wolno] (іде повільно), [jutro] jedziemy.',
        'Наречие отвечает на вопросы как? где? когда? и описывает глагол: idzie [wolno] (ползёт медленно), [jutro] jedziemy.'
      ),
      ['jak? → [wolno]', 'gdzie? → [tutaj]', 'kiedy? → [jutro]'],
      posItems, l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?')),
    lv('od', '-y → -o',
      l('Szybki czy szybko?', 'Szybki чи szybko?', 'Szybki или szybko?'),
      l(
        'Jaki rower? — szybk[i]. Jak jedzie? — szybk[o]. Przymiotnik opisuje rzecz, przysłówek — czynność.',
        'Який велосипед? — szybk[i]. Як їде? — szybk[o]. Прикметник описує річ, прислівник — дію.',
        'Какой велосипед? — szybk[i]. Как едет? — szybk[o]. Прилагательное описывает вещь, наречие — действие.'
      ),
      ['szybk[i] rower → jedzie szybk[o]', 'ładn[y] głos → śpiewa ładni[e]', 'dobr[y] → dobrz[e]'],
      formItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: швидкий → швидко', 'Хитрость: быстрый → быстро'),
        l('Jak po ukraińsku: швидкий → швидко, веселий → весело.', 'Як українською: швидк[ий] → швидк[о] = szybk[i] → szybk[o].', 'Как по-русски: быстр[ый] → быстр[о] = szybk[i] → szybk[o].'))),
    lv('stopien', 'szybciej',
      l('Szybko, szybciej, najszybciej', 'Szybko, szybciej, najszybciej', 'Szybko, szybciej, najszybciej'),
      l(
        'Szybk[o] → szybc[iej] → [naj]szybciej. Uwaga na łobuzy: dobrze → [lepiej], źle → [gorzej], dużo → [więcej], mało → [mniej].',
        'Szybk[o] → szybc[iej] → [naj]szybciej. Увага на розбишак: dobrze → [lepiej], źle → [gorzej], dużo → [więcej], mało → [mniej].',
        'Szybk[o] → szybc[iej] → [naj]szybciej. Осторожно, хулиганы: dobrze → [lepiej], źle → [gorzej], dużo → [więcej], mało → [mniej].'
      ),
      ['szybko → [szybciej] → [naj]szybciej', 'dobrze → [lepiej]', 'dużo → [więcej]'],
      stItems, SENT),
    lv('nie', 'nie-',
      l('„Nie” z przysłówkami', '«Nie» з прислівниками', '«Nie» с наречиями'),
      l(
        'Przysłówek na -o, -e + nie — [razem]: niedobrze, niedaleko. Ale [osobno]: nie tu, nie teraz, nie zawsze, nie bardzo, nie lepiej.',
        'Прислівник на -o, -e + nie — [разом]: niedobrze, niedaleko. Але [окремо]: nie tu, nie teraz, nie zawsze, nie bardzo, nie lepiej.',
        'Наречие на -o, -e + nie — [слитно]: niedobrze, niedaleko. Но [раздельно]: nie tu, nie teraz, nie zawsze, nie bardzo, nie lepiej.'
      ),
      ['[nie]daleko', '[nie]dobrze', '[nie ]teraz', '[nie ]lepiej'],
      nieItems, SENT),
    bossLv([...formItems, ...stItems, ...nieItems],
      l('Boss: wyścig ślimaków', 'Бос: перегони равликів', 'Босс: гонки улиток'),
      l('Wszystko naraz: szybki czy szybko, lepiej czy najlepiej, nie razem czy osobno.', 'Усе разом: szybki чи szybko, lepiej чи najlepiej, nie разом чи окремо.', 'Всё вместе: szybki или szybko, lepiej или najlepiej, nie слитно или раздельно.'))
  ]
}
