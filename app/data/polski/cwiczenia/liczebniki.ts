import type { L } from '~/types/content'
import type { Exercise, Item, Level } from './types'
import { l, word } from './litery'

/* ================================================================
   LICZEBNIKI — Las Liczebników, przewodniczka: Wiewiórka Zosia
   ================================================================ */

const WORD_PROMPT = l('Co pasuje?', 'Що підходить?', 'Что подходит?')
const SENT_PROMPT = l('Które słowo pasuje?', 'Яке слово підходить?', 'Какое слово подходит?')
const TYPE_PROMPT = l('Jaki to liczebnik?', 'Який це числівник?', 'Какое это числительное?')

/* ---------- 1. główny czy porządkowy ---------- */
const GLOWNY: L = { pl: 'główny (ile?)', uk: 'кількісний (скільки?)', ru: 'количественное (сколько?)' }
const PORZ: L = { pl: 'porządkowy (który?)', uk: 'порядковий (котрий?)', ru: 'порядковое (который?)' }
const typeHint = {
  g: l(
    'Pytamy: ile? — to liczebnik główny (jeden, dwa, pięć).',
    'Питаємо: скільки? (ile?) — це кількісний числівник (jeden, dwa, pięć).',
    'Спрашиваем: сколько? (ile?) — это количественное числительное (jeden, dwa, pięć).'
  ),
  p: l(
    'Pytamy: który? — to liczebnik porządkowy (pierwszy, drugi, piąty).',
    'Питаємо: котрий? (który?) — це порядковий числівник (pierwszy, drugi, piąty).',
    'Спрашиваем: который? (który?) — это порядковое числительное (pierwszy, drugi, piąty).'
  )
}
function typ(s: string, kind: 'g' | 'p', uk: string, ru: string): Item {
  const a = s.indexOf('[')
  const b = s.indexOf(']')
  const mid = s.slice(a + 1, b)
  return {
    pre: s.slice(0, a), mark: mid, post: s.slice(b + 1),
    opts: [GLOWNY, PORZ], answer: kind === 'g' ? 0 : 1,
    hint: typeHint[kind], proof: kind === 'g' ? `ile? → ${mid}` : `który? → ${mid}`,
    tr: { uk, ru }, say: s.replace(/[[\]]/g, ''), tag: kind
  }
}
const typeItems: Item[] = [
  typ('Mam [trzy] koty.', 'g', 'У мене три коти.', 'У меня три кота.'),
  typ('To mój [trzeci] kot.', 'p', 'Це мій третій кіт.', 'Это мой третий кот.'),
  typ('Mieszkam na [piątym] piętrze.', 'p', 'Я живу на п’ятому поверсі.', 'Я живу на пятом этаже.'),
  typ('Kupiłem [pięć] jabłek.', 'g', 'Я купив п’ять яблук.', 'Я купил пять яблок.'),
  typ('Dziś jest [pierwszy] dzień wakacji.', 'p', 'Сьогодні перший день канікул.', 'Сегодня первый день каникул.'),
  typ('W klasie jest [dwadzieścia] dzieci.', 'g', 'У класі двадцять дітей.', 'В классе двадцать детей.'),
  typ('Wygrałem [drugi] raz!', 'p', 'Я виграв удруге!', 'Я выиграл второй раз!'),
  typ('Mam [dziesięć] lat.', 'g', 'Мені десять років.', 'Мне десять лет.'),
  typ('Chodzę do [czwartej] klasy.', 'p', 'Я ходжу до четвертого класу.', 'Я хожу в четвёртый класс.'),
  typ('Tydzień ma [siedem] dni.', 'g', 'Тиждень має сім днів.', 'В неделе семь дней.')
]

/* ---------- 2–4. pisownia: -naście, dziesiątki, setki ---------- */
const spellHints: Record<string, L> = {
  nascie: l(
    '11–19: liczba + -naście. Uwaga: czternaście, piętnaście, szesnaście, dziewiętnaście.',
    '11–19: число + -naście. Увага: czternaście, piętnaście, szesnaście, dziewiętnaście.',
    '11–19: число + -naście. Внимание: czternaście, piętnaście, szesnaście, dziewiętnaście.'
  ),
  dziesci: l(
    '20 — dwadzieścia, 30 i 40 — -dzieści, od 50 do 90 — -dziesiąt.',
    '20 — dwadzieścia, 30 і 40 — -dzieści, від 50 до 90 — -dziesiąt.',
    '20 — dwadzieścia, 30 и 40 — -dzieści, от 50 до 90 — -dziesiąt.'
  ),
  set: l(
    '200 — dwieście, 300 i 400 — -sta, od 500 do 900 — -set.',
    '200 — dwieście, 300 і 400 — -sta, від 500 до 900 — -set.',
    '200 — dwieście, 300 и 400 — -sta, от 500 до 900 — -set.'
  )
}
const sp = (spec: string, opts: string[], rule: string, uk: string, ru: string, proof?: string) => word(spellHints, spec, opts, rule, uk, ru, proof)
const spellItems: Item[] = [
  sp('jede(n)aście', ['n', 'nn'], 'nascie', 'одинадцять', 'одиннадцать', '11'),
  sp('dwa(naście)', ['naście', 'dzieścia'], 'nascie', 'дванадцять', 'двенадцать', '12'),
  sp('trzy(naście)', ['naście', 'dzieści'], 'nascie', 'тринадцять', 'тринадцать', '13'),
  sp('czter(naście)', ['naście', 'ynaście'], 'nascie', 'чотирнадцять', 'четырнадцать', '14'),
  sp('pi(ęt)naście', ['ęt', 'ęć'], 'nascie', 'п’ятнадцять', 'пятнадцать', '15'),
  sp('sze(s)naście', ['s', 'ść'], 'nascie', 'шістнадцять', 'шестнадцать', '16'),
  sp('siedem(naście)', ['naście', 'dziesiąt'], 'nascie', 'сімнадцять', 'семнадцать', '17'),
  sp('dziewi(ęt)naście', ['ęt', 'ęć'], 'nascie', 'дев’ятнадцять', 'девятнадцать', '19'),
  sp('dwa(dzieścia)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'двадцять', 'двадцать', '20'),
  sp('trzy(dzieści)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'тридцять', 'тридцать', '30'),
  sp('czter(dzieści)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'сорок', 'сорок', '40'),
  sp('pięć(dziesiąt)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'п’ятдесят', 'пятьдесят', '50'),
  sp('sześć(dziesiąt)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'шістдесят', 'шестьдесят', '60'),
  sp('siedem(dziesiąt)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'сімдесят', 'семьдесят', '70'),
  sp('osiem(dziesiąt)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'вісімдесят', 'восемьдесят', '80'),
  sp('dziewięć(dziesiąt)', ['dzieścia', 'dzieści', 'dziesiąt'], 'dziesci', 'дев’яносто', 'девяносто', '90'),
  sp('dwie(ście)', ['ście', 'sta', 'set'], 'set', 'двісті', 'двести', '200'),
  sp('trzy(sta)', ['ście', 'sta', 'set'], 'set', 'триста', 'триста', '300'),
  sp('cztery(sta)', ['ście', 'sta', 'set'], 'set', 'чотириста', 'четыреста', '400'),
  sp('pięć(set)', ['ście', 'sta', 'set'], 'set', 'п’ятсот', 'пятьсот', '500'),
  sp('sześć(set)', ['ście', 'sta', 'set'], 'set', 'шістсот', 'шестьсот', '600'),
  sp('siedem(set)', ['ście', 'sta', 'set'], 'set', 'сімсот', 'семьсот', '700'),
  sp('dziewięć(set)', ['ście', 'sta', 'set'], 'set', 'дев’ятсот', 'девятьсот', '900')
]

/* ---------- 5. dwa / dwie / dwóch / dwoje ---------- */
const twoHint = {
  dwa: l(
    'Dwa — dla rodzaju męskiego (rzeczy, zwierzęta) i nijakiego: dwa psy, dwa okna.',
    'Dwa — для чоловічого роду (речі, тварини) і середнього: dwa psy, dwa okna.',
    'Dwa — для мужского рода (вещи, животные) и среднего: dwa psy, dwa okna.'
  ),
  dwie: l(
    'Dwie — dla rodzaju żeńskiego: dwie siostry, dwie książki.',
    'Dwie — для жіночого роду: dwie siostry (дві сестри).',
    'Dwie — для женского рода: dwie siostry (две сестры).'
  ),
  dwoch: l(
    'Dwóch — dla mężczyzn i chłopców: dwóch chłopców, dwóch panów.',
    'Dwóch — для чоловіків і хлопців: dwóch chłopców (двоє хлопців).',
    'Dwóch — для мужчин и мальчиков: dwóch chłopców (двое мальчиков).'
  ),
  dwoje: l(
    'Dwoje — dla dzieci i grup: dwoje dzieci.',
    'Dwoje — для дітей: dwoje dzieci (двоє дітей).',
    'Dwoje — для детей: dwoje dzieci (двое детей).'
  )
}
const TWO = ['dwa', 'dwie', 'dwóch', 'dwoje']
function two(s: string, ans: 'dwa' | 'dwie' | 'dwóch' | 'dwoje', uk: string, ru: string): Item {
  const a = s.indexOf('(')
  const b = s.indexOf(')')
  const cap = s[a + 1] !== s[a + 1]!.toLowerCase()
  const opts = cap ? TWO.map(o => o[0]!.toUpperCase() + o.slice(1)) : TWO
  const key = ans === 'dwóch' ? 'dwoch' : ans
  return { pre: s.slice(0, a), post: s.slice(b + 1), opts, answer: TWO.indexOf(ans), hint: twoHint[key], tr: { uk, ru }, tag: key }
}
const twoItems: Item[] = [
  two('Mam (dwa) psy.', 'dwa', 'У мене два пси.', 'У меня две собаки.'),
  two('Mam (dwie) siostry.', 'dwie', 'У мене дві сестри.', 'У меня две сестры.'),
  two('W pokoju są (dwa) okna.', 'dwa', 'У кімнаті два вікна.', 'В комнате два окна.'),
  two('Przyszło (dwóch) chłopców.', 'dwóch', 'Прийшли двоє хлопців.', 'Пришли двое мальчиков.'),
  two('Na podwórku bawi się (dwoje) dzieci.', 'dwoje', 'На подвір’ї граються двоє дітей.', 'Во дворе играют двое детей.'),
  two('Kupiłam (dwie) książki.', 'dwie', 'Я купила дві книжки.', 'Я купила две книги.'),
  two('Na stole leżą (dwa) jabłka.', 'dwa', 'На столі лежать два яблука.', 'На столе лежат два яблока.'),
  two('W klasie jest (dwóch) nauczycieli.', 'dwóch', 'У класі двоє вчителів.', 'В классе двое учителей.'),
  two('Widzę (dwie) krowy.', 'dwie', 'Я бачу дві корови.', 'Я вижу двух коров.'),
  two('Mam (dwa) koty.', 'dwa', 'У мене два коти.', 'У меня два кота.')
]

/* ---------- 6. dwa koty, ale pięć kotów ---------- */
const countHint = {
  few: l(
    'Po 2, 3, 4 (i 22, 23, 24…) — forma jak „są”: dwa koty, cztery jabłka.',
    'Після 2, 3, 4 (і 22, 23, 24…) — як українською: два коти, чотири яблука.',
    'После 2, 3, 4 (и 22, 23, 24…) — как по-русски «два кота»: dwa koty, cztery jabłka.'
  ),
  many: l(
    'Po 5 i więcej (a także 12, 13, 14) — dopełniacz: pięć kotów, dwanaście jabłek.',
    'Після 5 і більше (а також 12, 13, 14) — родовий: pięć kotów (п’ять котів), dwanaście jabłek.',
    'После 5 и больше (а также 12, 13, 14) — родительный: pięć kotów (пять котов), dwanaście jabłek.'
  )
}
function cnt(s: string, opts: [string, string], ans: string, kind: 'few' | 'many', uk: string, ru: string): Item {
  const a = s.indexOf('(')
  const b = s.indexOf(')')
  return { pre: s.slice(0, a), post: s.slice(b + 1), opts, answer: opts.indexOf(ans), hint: countHint[kind], tr: { uk, ru }, tag: kind }
}
const countItems: Item[] = [
  cnt('Mam trzy (koty).', ['koty', 'kotów'], 'koty', 'few', 'У мене три коти.', 'У меня три кота.'),
  cnt('Mam pięć (kotów).', ['koty', 'kotów'], 'kotów', 'many', 'У мене п’ять котів.', 'У меня пять котов.'),
  cnt('Kupiłem cztery (jabłka).', ['jabłka', 'jabłek'], 'jabłka', 'few', 'Я купив чотири яблука.', 'Я купил четыре яблока.'),
  cnt('Kupiłem siedem (jabłek).', ['jabłka', 'jabłek'], 'jabłek', 'many', 'Я купив сім яблук.', 'Я купил семь яблок.'),
  cnt('Rok ma dwanaście (miesięcy).', ['miesiące', 'miesięcy'], 'miesięcy', 'many', 'Рік має дванадцять місяців.', 'В году двенадцать месяцев.'),
  cnt('Mam dwadzieścia dwa (koty).', ['koty', 'kotów'], 'koty', 'few', 'У мене двадцять два коти.', 'У меня двадцать два кота.'),
  cnt('W pudełku jest dziesięć (kredek).', ['kredki', 'kredek'], 'kredek', 'many', 'У коробці десять олівців.', 'В коробке десять карандашей.'),
  cnt('Mam trzy (siostry).', ['siostry', 'sióstr'], 'siostry', 'few', 'У мене три сестри.', 'У меня три сестры.'),
  cnt('Na drzewie siedzi sześć (ptaków).', ['ptaki', 'ptaków'], 'ptaków', 'many', 'На дереві сидять шість птахів.', 'На дереве сидят шесть птиц.'),
  cnt('Mam trzynaście (lat).', ['lata', 'lat'], 'lat', 'many', 'Мені тринадцять років.', 'Мне тринадцать лет.'),
  cnt('Mam cztery (lata).', ['lata', 'lat'], 'lata', 'few', 'Мені чотири роки.', 'Мне четыре года.')
]

const lv = (id: string, icon: string, title: L, rule: L, examples: string[], items: Item[], size: 'word' | 'sentence', prompt: L, round = 6, extra: Partial<Level> = {}): Level =>
  ({ id, icon, title, rule, examples, game: { id, prompt, size, items, round }, ...extra })

export const liczebnikiExercise: Exercise = {
  slug: 'liczebniki',
  group: 'liczebnik',
  icon: '12',
  color: 'var(--g3)',
  soft: 'var(--g3-soft)',
  title: l('Liczebniki', 'Числівники', 'Числительные'),
  lead: l(
    'Ile? Który? Dwa czy dwie? Trzy koty, ale pięć kotów!',
    'Скільки? Котрий? Dwa чи dwie? Три коти, але п’ять котів!',
    'Сколько? Который? Dwa или dwie? Три кота, но пять котов!'
  ),
  badge: l('Mistrz liczenia', 'Майстер лічби', 'Мастер счёта'),
  levels: [
    lv('typ', 'ile?',
      l('Ile? czy który?', 'Скільки? чи котрий?', 'Сколько? или который?'),
      l(
        'Liczebnik główny mówi „ile?”: pięć kotów. Porządkowy mówi „który?”: piąty kot.',
        'Кількісний числівник відповідає «скільки?»: pięć kotów. Порядковий — «котрий?»: piąty kot.',
        'Количественное отвечает «сколько?»: pięć kotów. Порядковое — «который?»: piąty kot.'
      ),
      ['ile? → [pięć]', 'który? → [piąty]', 'ile? → [dwa]', 'który? → [drugi]'],
      typeItems, 'sentence', TYPE_PROMPT),
    lv('nascie', '-naście',
      l('11–19: -naście', '11–19: -naście', '11–19: -naście'),
      l(
        'Od 11 do 19 dodajemy -naście: jedenaście, dwanaście. Uważaj na 14, 15, 16 i 19!',
        'Від 11 до 19 додаємо -naście: jedenaście, dwanaście. Обережно з 14, 15, 16 і 19!',
        'От 11 до 19 добавляем -naście: jedenaście, dwanaście. Осторожно с 14, 15, 16 и 19!'
      ),
      ['czter[naście]', 'pi[ęt]naście', 'sze[s]naście', 'dziewi[ęt]naście'],
      spellItems.filter(i => i.tag === 'nascie'), 'word', WORD_PROMPT),
    lv('dziesiat', '-dzieści',
      l('Dziesiątki: -dzieścia, -dzieści, -dziesiąt', 'Десятки: -dzieścia, -dzieści, -dziesiąt', 'Десятки: -dzieścia, -dzieści, -dziesiąt'),
      l(
        '20 — dwa[dzieścia]. 30, 40 — trzy[dzieści], czter[dzieści]. 50–90 — pięć[dziesiąt].',
        '20 — dwa[dzieścia]. 30, 40 — trzy[dzieści], czter[dzieści]. 50–90 — pięć[dziesiąt].',
        '20 — dwa[dzieścia]. 30, 40 — trzy[dzieści], czter[dzieści]. 50–90 — pięć[dziesiąt].'
      ),
      ['20 → dwa[dzieścia]', '40 → czter[dzieści]', '50 → pięć[dziesiąt]'],
      spellItems.filter(i => i.tag === 'dziesci'), 'word', WORD_PROMPT, 6, {
        tip: {
          title: l('Sztuczka', 'Хитрість', 'Хитрость'),
          text: l(
            'Jak po ukraińsku: двадцять, тридцять, сорок → dwadzieścia, trzydzieści, czterdzieści.',
            'Як в українській: п’ятдесят → pięćdziesiąt — «десят» = «dziesiąt».',
            'Как в русском: пятьдесят → pięćdziesiąt — «десят» = «dziesiąt».'
          )
        }
      }),
    lv('set', '-set',
      l('Setki: -ście, -sta, -set', 'Сотні: -ście, -sta, -set', 'Сотни: -ście, -sta, -set'),
      l(
        '200 — dwie[ście]. 300, 400 — trzy[sta], cztery[sta]. 500–900 — pięć[set].',
        '200 — dwie[ście]. 300, 400 — trzy[sta], cztery[sta]. 500–900 — pięć[set].',
        '200 — dwie[ście]. 300, 400 — trzy[sta], cztery[sta]. 500–900 — pięć[set].'
      ),
      ['200 → dwie[ście]', '300 → trzy[sta]', '500 → pięć[set]'],
      spellItems.filter(i => i.tag === 'set'), 'word', WORD_PROMPT),
    lv('dwa', 'dwa',
      l('Dwa, dwie, dwóch, dwoje', 'Dwa, dwie, dwóch, dwoje', 'Dwa, dwie, dwóch, dwoje'),
      l(
        'Dwa psy, dwa okna. Dwie siostry. Dwóch chłopców. Dwoje dzieci.',
        'Dwa psy (два пси). Dwie siostry (дві сестри). Dwóch chłopców (двоє хлопців). Dwoje dzieci (двоє дітей).',
        'Dwa psy (две собаки). Dwie siostry (две сестры). Dwóch chłopców (двое мальчиков). Dwoje dzieci (двое детей).'
      ),
      ['[dwa] psy', '[dwie] siostry', '[dwóch] chłopców', '[dwoje] dzieci'],
      twoItems, 'sentence', SENT_PROMPT),
    lv('ile', '5 kotów',
      l('Dwa koty, ale pięć kotów', 'Два коти, але п’ять котів', 'Два кота, но пять котов'),
      l(
        'Po 2, 3, 4 — koty. Po 5 i więcej (i po 12, 13, 14) — kotów.',
        'Після 2, 3, 4 — koty. Після 5 і більше (і після 12, 13, 14) — kotów.',
        'После 2, 3, 4 — koty. После 5 и больше (и после 12, 13, 14) — kotów.'
      ),
      ['trzy [koty]', 'pięć [kotów]', 'dwanaście [kotów]', 'dwadzieścia dwa [koty]'],
      countItems, 'sentence', SENT_PROMPT, 6, {
        tip: {
          title: l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
          text: l(
            'Tak samo jak po ukraińsku: два коти, п’ять котів.',
            'Точнісінько як українською: два коти → dwa koty, п’ять котів → pięć kotów!',
            'Почти как по-русски: пять котов → pięć kotów. Но: два кота → dwa koty (а не «kota»).'
          )
        }
      }),
    {
      ...lv('boss', '👑', l('Boss: wszystkie liczebniki', 'Бос: усі числівники', 'Босс: все числительные'),
        l('Wszystko naraz: pisownia, dwa czy dwie, koty czy kotów.', 'Усе разом: правопис, dwa чи dwie, koty чи kotów.', 'Всё вместе: правописание, dwa или dwie, koty или kotów.'),
        [], [...twoItems, ...countItems], 'sentence', SENT_PROMPT, 10),
      boss: true
    }
  ]
}

/* do „Wielkiego dyktanda” */
export { spellItems as liczebnikiSpell }
