import type { L } from '~/types/content'
import type { Exercise, Item, Level } from './types'
import { l, word } from './litery'

/* ================================================================
   PRZYMIOTNIKI — Dolina Przymiotników, przewodnik: Kameleon Kamil
   ================================================================ */

const SENT = l('Które słowo pasuje?', 'Яке слово підходить?', 'Какое слово подходит?')
const END = l('Która końcówka pasuje?', 'Яке закінчення підходить?', 'Какое окончание подходит?')

/** zdanie z (odpowiedzią); jeśli odpowiedź z wielkiej litery — opcje też */
function gap(s: string, opts: string[], hint: L, tag: string, uk: string, ru: string, proof?: string): Item {
  const a = s.indexOf('(')
  const b = s.indexOf(')')
  const mid = s.slice(a + 1, b)
  const cap = mid[0] !== mid[0]!.toLowerCase()
  const o = cap ? opts.map(x => x[0]!.toUpperCase() + x.slice(1)) : opts
  const answer = o.indexOf(mid)
  if (answer < 0) throw new Error(`No answer: ${s}`)
  return { pre: s.slice(0, a), post: s.slice(b + 1), opts: o, answer, hint, proof, tr: { uk, ru }, tag }
}

/* ---------- 1. Co to jest przymiotnik? ---------- */
const POS: L[] = [
  { pl: 'przymiotnik (jaki?)', uk: 'прикметник (який?)', ru: 'прилагательное (какой?)' },
  { pl: 'rzeczownik (kto? co?)', uk: 'іменник (хто? що?)', ru: 'существительное (кто? что?)' },
  { pl: 'czasownik (co robi?)', uk: 'дієслово (що робить?)', ru: 'глагол (что делает?)' }
]
const posHint: Record<'p' | 'r' | 'c', L> = {
  p: l('Pytamy: jaki? jaka? jakie? — to przymiotnik. Opisuje rzeczownik.', 'Питаємо: який? яка? яке? — це прикметник. Він описує іменник.', 'Спрашиваем: какой? какая? какое? — это прилагательное. Оно описывает существительное.'),
  r: l('Pytamy: kto? co? — to rzeczownik.', 'Питаємо: хто? що? — це іменник.', 'Спрашиваем: кто? что? — это существительное.'),
  c: l('Pytamy: co robi? — to czasownik.', 'Питаємо: що робить? — це дієслово.', 'Спрашиваем: что делает? — это глагол.')
}
function pos(s: string, k: 'p' | 'r' | 'c', uk: string, ru: string): Item {
  const a = s.indexOf('[')
  const b = s.indexOf(']')
  return {
    pre: s.slice(0, a), mark: s.slice(a + 1, b), post: s.slice(b + 1),
    opts: POS, answer: { p: 0, r: 1, c: 2 }[k], hint: posHint[k],
    tr: { uk, ru }, say: s.replace(/[[\]]/g, ''), tag: k
  }
}
const posItems: Item[] = [
  pos('Mam [czerwony] rower.', 'p', 'У мене червоний велосипед.', 'У меня красный велосипед.'),
  pos('Mam czerwony [rower].', 'r', 'У мене червоний велосипед.', 'У меня красный велосипед.'),
  pos('Kot [śpi] na kanapie.', 'c', 'Кіт спить на дивані.', 'Кот спит на диване.'),
  pos('To jest [mądra] sowa.', 'p', 'Це мудра сова.', 'Это мудрая сова.'),
  pos('[Duży] pies szczeka.', 'p', 'Великий пес гавкає.', 'Большая собака лает.'),
  pos('Duży pies [szczeka].', 'c', 'Великий пес гавкає.', 'Большая собака лает.'),
  pos('Lubię [zielone] jabłka.', 'p', 'Я люблю зелені яблука.', 'Я люблю зелёные яблоки.'),
  pos('Moja [siostra] jest wesoła.', 'r', 'Моя сестра весела.', 'Моя сестра весёлая.'),
  pos('Moja siostra jest [wesoła].', 'p', 'Моя сестра весела.', 'Моя сестра весёлая.'),
  pos('Ten film jest [śmieszny].', 'p', 'Цей фільм смішний.', 'Этот фильм смешной.'),
  pos('Dzieci [biegają] po parku.', 'c', 'Діти бігають парком.', 'Дети бегают по парку.')
]

/* ---------- 2. Rodzaj: -y/-i, -a, -e ---------- */
const genHints: Record<string, L> = {
  m: l('Jaki? (on) — końcówka -y albo -i: duży dom, wysoki chłopiec.', 'Який? (він) — закінчення -y або -i: duży dom (великий дім).', 'Какой? (он) — окончание -y или -i: duży dom (большой дом).'),
  f: l('Jaka? (ona) — końcówka -a: duża książka.', 'Яка? (вона) — закінчення -a: duża książka (велика книжка).', 'Какая? (она) — окончание -a: duża książka (большая книга).'),
  n: l('Jakie? (ono) — końcówka -e: duże okno.', 'Яке? (воно) — закінчення -e: duże okno (велике вікно).', 'Какое? (оно) — окончание -e: duże okno (большое окно).')
}
const g = (spec: string, opts: string[], rule: string, uk: string, ru: string) => word(genHints, spec, opts, rule, uk, ru)
const YAE = ['y', 'a', 'e']
const IAE = ['i', 'a', 'e']
const genItems: Item[] = [
  g('duż(y) dom', YAE, 'm', 'великий дім', 'большой дом'),
  g('duż(a) książka', YAE, 'f', 'велика книжка', 'большая книга'),
  g('duż(e) okno', YAE, 'n', 'велике вікно', 'большое окно'),
  g('czerwon(a) róża', YAE, 'f', 'червона троянда', 'красная роза'),
  g('zielon(e) drzewo', YAE, 'n', 'зелене дерево', 'зелёное дерево'),
  g('mił(y) kot', YAE, 'm', 'милий кіт', 'милый кот'),
  g('mądr(a) sowa', YAE, 'f', 'мудра сова', 'мудрая сова'),
  g('now(e) auto', YAE, 'n', 'нове авто', 'новая машина'),
  g('wysok(i) chłopiec', IAE, 'm', 'високий хлопець', 'высокий мальчик'),
  g('wysok(a) góra', IAE, 'f', 'висока гора', 'высокая гора'),
  g('polsk(i) język', IAE, 'm', 'польська мова', 'польский язык'),
  g('słodk(ie) ciastko', ['i', 'a', 'ie'], 'n', 'солодке тістечко', 'сладкое пирожное')
]

/* ---------- 3. Liczba mnoga: mili chłopcy, miłe koty ---------- */
const plHint = {
  osob: l(
    'Mężczyźni i chłopcy (oni): mili, dobrzy, wysocy.',
    'Чоловіки й хлопці (oni): mili, dobrzy, wysocy — особлива форма!',
    'Мужчины и мальчики (oni): mili, dobrzy, wysocy — особая форма!'
  ),
  reszta: l(
    'Kobiety, dzieci, zwierzęta i rzeczy (one): miłe, dobre, wysokie.',
    'Жінки, діти, тварини й речі (one): miłe, dobre, wysokie.',
    'Женщины, дети, животные и вещи (one): miłe, dobre, wysokie.'
  )
}
const plItems: Item[] = [
  gap('(Mili) chłopcy grają w piłkę.', ['mili', 'miłe'], plHint.osob, 'osob', 'Милі хлопці грають у м’яч.', 'Милые мальчики играют в мяч.'),
  gap('(Miłe) dziewczynki śpiewają.', ['mili', 'miłe'], plHint.reszta, 'reszta', 'Милі дівчатка співають.', 'Милые девочки поют.'),
  gap('To są (dobrzy) uczniowie.', ['dobrzy', 'dobre'], plHint.osob, 'osob', 'Це добрі учні.', 'Это хорошие ученики.'),
  gap('To są (dobre) dzieci.', ['dobrzy', 'dobre'], plHint.reszta, 'reszta', 'Це добрі діти.', 'Это хорошие дети.'),
  gap('(Wysocy) panowie stoją przy drzwiach.', ['wysocy', 'wysokie'], plHint.osob, 'osob', 'Високі чоловіки стоять біля дверей.', 'Высокие мужчины стоят у двери.'),
  gap('W parku rosną (wysokie) drzewa.', ['wysocy', 'wysokie'], plHint.reszta, 'reszta', 'У парку ростуть високі дерева.', 'В парке растут высокие деревья.'),
  gap('Moi bracia są (weseli).', ['weseli', 'wesołe'], plHint.osob, 'osob', 'Мої брати веселі.', 'Мои братья весёлые.'),
  gap('Moje psy są (wesołe).', ['weseli', 'wesołe'], plHint.reszta, 'reszta', 'Мої пси веселі.', 'Мои собаки весёлые.'),
  gap('(Mądrzy) nauczyciele dużo wiedzą.', ['mądrzy', 'mądre'], plHint.osob, 'osob', 'Мудрі вчителі багато знають.', 'Умные учителя много знают.'),
  gap('Sowy są (mądre).', ['mądrzy', 'mądre'], plHint.reszta, 'reszta', 'Сови мудрі.', 'Совы мудрые.')
]

/* ---------- 4. Stopniowanie regularne ---------- */
const stHint = {
  wyzszy: l(
    'Porównujemy dwie rzeczy (niż, od) — stopień wyższy: -szy, -ejszy.',
    'Порівнюємо дві речі (niż — ніж) — вищий ступінь: -szy, -ejszy.',
    'Сравниваем две вещи (niż — чем) — сравнительная степень: -szy, -ejszy.'
  ),
  najwyzszy: l(
    'Najbardziej ze wszystkich — stopień najwyższy: naj- + -szy.',
    'Найбільше з усіх — найвищий ступінь: naj- + -szy (як українське най-!).',
    'Больше всех — превосходная степень: naj- + -szy (как украинское «най-»).'
  ),
  rowny: l(
    'Nie porównujemy — zwykła forma: szybki, stary.',
    'Не порівнюємо — звичайна форма: szybki, stary.',
    'Не сравниваем — обычная форма: szybki, stary.'
  )
}
const stItems: Item[] = [
  gap('Kot jest (szybszy) niż żółw.', ['szybki', 'szybszy', 'najszybszy'], stHint.wyzszy, 'w', 'Кіт швидший за черепаху.', 'Кот быстрее черепахи.', 'szybki → szybszy → najszybszy'),
  gap('Gepard jest (najszybszy) ze wszystkich.', ['szybki', 'szybszy', 'najszybszy'], stHint.najwyzszy, 'n', 'Гепард найшвидший з усіх.', 'Гепард самый быстрый.', 'szybki → szybszy → najszybszy'),
  gap('Mój brat jest (starszy) ode mnie.', ['stary', 'starszy', 'najstarszy'], stHint.wyzszy, 'w', 'Мій брат старший за мене.', 'Мой брат старше меня.', 'stary → starszy → najstarszy'),
  gap('Dziadek jest (najstarszy) w rodzinie.', ['stary', 'starszy', 'najstarszy'], stHint.najwyzszy, 'n', 'Дідусь найстарший у родині.', 'Дедушка самый старший в семье.', 'stary → starszy → najstarszy'),
  gap('Ten zamek jest bardzo (stary).', ['stary', 'starszy', 'najstarszy'], stHint.rowny, 'r', 'Цей замок дуже старий.', 'Этот замок очень старый.'),
  gap('Dziś jest (cieplejszy) dzień niż wczoraj.', ['ciepły', 'cieplejszy', 'najcieplejszy'], stHint.wyzszy, 'w', 'Сьогодні тепліший день, ніж учора.', 'Сегодня более тёплый день, чем вчера.', 'ciepły → cieplejszy → najcieplejszy'),
  gap('Zosia jest (najmłodsza) w klasie.', ['młoda', 'młodsza', 'najmłodsza'], stHint.najwyzszy, 'n', 'Зося наймолодша в класі.', 'Зося самая младшая в классе.', 'młoda → młodsza → najmłodsza'),
  gap('Sowa jest (mądrzejsza) niż kura.', ['mądra', 'mądrzejsza', 'najmądrzejsza'], stHint.wyzszy, 'w', 'Сова мудріша за курку.', 'Сова умнее курицы.', 'mądra → mądrzejsza → najmądrzejsza'),
  gap('To jest (najnowszy) telefon w sklepie.', ['nowy', 'nowszy', 'najnowszy'], stHint.najwyzszy, 'n', 'Це найновіший телефон у магазині.', 'Это самый новый телефон в магазине.', 'nowy → nowszy → najnowszy')
]

/* ---------- 5. Nieregularne: dobry → lepszy ---------- */
const irHint = l(
  'Te przymiotniki zmieniają się całe: dobry → lepszy, zły → gorszy, duży → większy, mały → mniejszy.',
  'Ці прикметники змінюються повністю: dobry → lepszy, zły → gorszy, duży → większy, mały → mniejszy.',
  'Эти прилагательные меняются полностью: dobry → lepszy, zły → gorszy, duży → większy, mały → mniejszy.'
)
const irItems: Item[] = [
  gap('Ta pizza jest (lepsza) niż tamta.', ['dobrzejsza', 'lepsza', 'najlepsza'], irHint, 'ir', 'Ця піца краща за ту.', 'Эта пицца лучше той.', 'dobry → lepszy → najlepszy'),
  gap('To (najlepszy) dzień wakacji!', ['dobrszy', 'lepszy', 'najlepszy'], irHint, 'ir', 'Це найкращий день канікул!', 'Это лучший день каникул!', 'dobry → lepszy → najlepszy'),
  gap('Mój pies jest (większy) niż twój.', ['duższy', 'większy', 'największy'], irHint, 'ir', 'Мій пес більший за твого.', 'Моя собака больше твоей.', 'duży → większy → największy'),
  gap('Słoń jest (największy) w zoo.', ['duższy', 'większy', 'największy'], irHint, 'ir', 'Слон найбільший у зоопарку.', 'Слон самый большой в зоопарке.', 'duży → większy → największy'),
  gap('Mysz jest (mniejsza) niż kot.', ['małsza', 'mniejsza', 'najmniejsza'], irHint, 'ir', 'Миша менша за кота.', 'Мышь меньше кота.', 'mały → mniejszy → najmniejszy'),
  gap('To był (najgorszy) mecz w sezonie.', ['złszy', 'gorszy', 'najgorszy'], irHint, 'ir', 'Це був найгірший матч сезону.', 'Это был худший матч сезона.', 'zły → gorszy → najgorszy'),
  gap('Dzisiejsza pogoda jest (gorsza) niż wczoraj.', ['złsza', 'gorsza', 'najgorsza'], irHint, 'ir', 'Сьогоднішня погода гірша, ніж учора.', 'Сегодняшняя погода хуже, чем вчера.', 'zły → gorszy → najgorszy'),
  gap('Koliber to (najmniejszy) ptak.', ['małszy', 'mniejszy', 'najmniejszy'], irHint, 'ir', 'Колібрі — найменший птах.', 'Колибри — самая маленькая птица.', 'mały → mniejszy → najmniejszy')
]

/* ---------- 6. „nie” z przymiotnikami ---------- */
const nieHint = {
  razem: l(
    '„Nie” ze zwykłym przymiotnikiem piszemy razem: niedobry, niewysoki.',
    '«Nie» зі звичайним прикметником пишемо разом: niedobry, niewysoki.',
    '«Nie» с обычным прилагательным пишем слитно: niedobry, niewysoki.'
  ),
  osobno: l(
    '„Nie” ze stopniem wyższym i najwyższym piszemy osobno: nie lepszy, nie najlepszy.',
    '«Nie» з вищим і найвищим ступенем пишемо окремо: nie lepszy, nie najlepszy.',
    '«Nie» со сравнительной и превосходной степенью пишем раздельно: nie lepszy, nie najlepszy.'
  )
}
const nie = (s: string, w: string, together: boolean, uk: string, ru: string) =>
  gap(s, [`nie${w}`, `nie ${w}`], together ? nieHint.razem : nieHint.osobno, together ? 'razem' : 'osobno', uk, ru)
const nieItems: Item[] = [
  nie('Ten film jest (nieciekawy).', 'ciekawy', true, 'Цей фільм нецікавий.', 'Этот фильм неинтересный.'),
  nie('To (niedobry) pomysł.', 'dobry', true, 'Це недобра ідея.', 'Это нехорошая идея.'),
  nie('Mój tata jest (niewysoki).', 'wysoki', true, 'Мій тато невисокий.', 'Мой папа невысокий.'),
  nie('Ta zupa jest (niesmaczna).', 'smaczna', true, 'Цей суп несмачний.', 'Этот суп невкусный.'),
  nie('Ten pies jest (niegroźny).', 'groźny', true, 'Цей пес не страшний.', 'Эта собака не опасная.'),
  nie('Mój brat jest (nie starszy) ode mnie.', 'starszy', false, 'Мій брат не старший за мене.', 'Мой брат не старше меня.'),
  nie('Twój dom jest (nie większy) niż nasz.', 'większy', false, 'Твій дім не більший за наш.', 'Твой дом не больше нашего.'),
  nie('Ta książka jest (nie najlepsza).', 'najlepsza', false, 'Ця книжка не найкраща.', 'Эта книга не самая лучшая.'),
  nie('Ten sok jest (nie słodszy) od tamtego.', 'słodszy', false, 'Цей сік не солодший за той.', 'Этот сок не слаще того.')
]

const lv = (id: string, icon: string, title: L, rule: L, examples: string[], items: Item[], size: 'word' | 'sentence', prompt: L, extra: Partial<Level> = {}, round = 6): Level =>
  ({ id, icon, title, rule, examples, game: { id, prompt, size, items, round }, ...extra })

export const przymiotnikiExercise: Exercise = {
  slug: 'przymiotniki',
  group: 'przymiotnik',
  icon: '🎨',
  color: 'var(--g6)',
  soft: 'var(--g6-soft)',
  title: l('Przymiotniki', 'Прикметники', 'Прилагательные'),
  lead: l(
    'Jaki? Jaka? Jakie? Przymiotniki malują świat kolorami — duży, mały, lepszy, najlepszy!',
    'Який? Яка? Яке? Прикметники розфарбовують світ — duży, mały, lepszy, najlepszy!',
    'Какой? Какая? Какое? Прилагательные раскрашивают мир — duży, mały, lepszy, najlepszy!'
  ),
  badge: l('Mistrz kolorów', 'Майстер кольорів', 'Мастер красок'),
  levels: [
    lv('co', 'jaki?',
      l('Co to jest przymiotnik?', 'Що таке прикметник?', 'Что такое прилагательное?'),
      l(
        'Przymiotnik odpowiada na pytanie jaki? jaka? jakie? i opisuje rzeczownik: [czerwony] rower, [mądra] sowa.',
        'Прикметник відповідає на питання який? яка? яке? і описує іменник: [czerwony] rower — червоний велосипед.',
        'Прилагательное отвечает на вопрос какой? какая? какое? и описывает существительное: [czerwony] rower — красный велосипед.'
      ),
      ['jaki? → [czerwony] rower', 'jaka? → [mądra] sowa', 'jakie? → [zielone] jabłko'],
      posItems, 'sentence', l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?')),
    lv('rodzaj', '-y -a -e',
      l('Jaki, jaka, jakie: -y, -a, -e', 'Який, яка, яке: -y, -a, -e', 'Какой, какая, какое: -y, -a, -e'),
      l(
        'On — duż[y] dom. Ona — duż[a] książka. Ono — duż[e] okno. Po k i g zamiast -y piszemy -i: wysok[i].',
        'Він — duż[y] dom. Вона — duż[a] książka. Воно — duż[e] okno. Після k і g замість -y пишемо -i: wysok[i].',
        'Он — duż[y] dom. Она — duż[a] książka. Оно — duż[e] okno. После k и g вместо -y пишем -i: wysok[i].'
      ),
      ['duż[y] dom', 'duż[a] książka', 'duż[e] okno', 'wysok[i] chłopiec'],
      genItems, 'word', END, {
        tip: {
          title: l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
          text: l(
            'Jak po ukraińsku: великий, велика, велике.',
            'Точно як українською: велик[ий] → duż[y], велик[а] → duż[a], велик[е] → duż[e].',
            'Как по-русски: больш[ой] → duż[y], больш[ая] → duż[a], больш[ое] → duż[e].'
          )
        }
      }),
    lv('mnoga', 'mili',
      l('Mili chłopcy, ale miłe koty', 'Mili chłopcy, але miłe koty', 'Mili chłopcy, но miłe koty'),
      l(
        'O mężczyznach i chłopcach mówimy inaczej: mil[i], dobrz[y], wysoc[y]. O wszystkim innym: mił[e], dobr[e], wysoki[e].',
        'Про чоловіків і хлопців кажемо інакше: mil[i], dobrz[y], wysoc[y]. Про все інше: mił[e], dobr[e], wysoki[e].',
        'О мужчинах и мальчиках говорим иначе: mil[i], dobrz[y], wysoc[y]. Обо всём остальном: mił[e], dobr[e], wysoki[e].'
      ),
      ['[mili] chłopcy', '[miłe] dziewczynki', '[dobrzy] uczniowie', '[dobre] dzieci'],
      plItems, 'sentence', SENT),
    lv('stopien', 'naj-',
      l('Stopniowanie: szybki, szybszy, najszybszy', 'Ступені: szybki, szybszy, najszybszy', 'Степени: szybki, szybszy, najszybszy'),
      l(
        'Dwie rzeczy porównujemy z [-szy]: szyb[szy] niż żółw. Najbardziej ze wszystkich — [naj-]: [naj]szybszy.',
        'Дві речі порівнюємо з [-szy]: szyb[szy] — швидший. Найбільше з усіх — [naj-]: [naj]szybszy — найшвидший.',
        'Две вещи сравниваем с [-szy]: szyb[szy] — быстрее. Больше всех — [naj-]: [naj]szybszy — самый быстрый.'
      ),
      ['szybki → szyb[szy] → [naj]szybszy', 'stary → star[szy] → [naj]starszy', 'mądry → mądrz[ejszy]'],
      stItems, 'sentence', SENT, {
        tip: {
          title: l('Sztuczka', 'Хитрість: най- = naj-', 'Хитрость: «самый» = naj-'),
          text: l(
            'Po ukraińsku też jest „най-”: найстарший → najstarszy.',
            'Українське [най-] = польське [naj-]: найстарший → [naj]starszy, найшвидший → [naj]szybszy.',
            'Русское «самый» = польское [naj-]: самый старый → [naj]starszy.'
          )
        }
      }),
    lv('nieregularne', 'lepszy',
      l('Dobry → lepszy, duży → większy', 'Dobry → lepszy, duży → większy', 'Dobry → lepszy, duży → większy'),
      l(
        'Cztery łobuzy zmieniają się całe: dobry → [lepszy], zły → [gorszy], duży → [większy], mały → [mniejszy].',
        'Чотири розбишаки змінюються повністю: dobry → [lepszy], zły → [gorszy], duży → [większy], mały → [mniejszy].',
        'Четыре хулигана меняются полностью: dobry → [lepszy], zły → [gorszy], duży → [większy], mały → [mniejszy].'
      ),
      ['dobry → [lepszy] → [naj]lepszy', 'duży → [większy]', 'mały → [mniejszy]', 'zły → [gorszy]'],
      irItems, 'sentence', SENT, {
        tip: {
          title: l('Sztuczka', 'Хитрість', 'Хитрость'),
          text: l(
            'Po ukraińsku też: добрий → кращий, поганий → гірший.',
            'Українською теж так: добрий → кращий, поганий → гірший. Ніхто не каже «добріший»!',
            'По-русски тоже так: хороший → лучше, плохой → хуже. Никто не говорит «хорошее»!'
          )
        }
      }),
    lv('nie', 'nie-',
      l('„Nie” z przymiotnikami', '«Nie» з прикметниками', '«Nie» с прилагательными'),
      l(
        'Ze zwykłym przymiotnikiem — [razem]: niedobry, niewysoki. Ze stopniem wyższym i najwyższym — [osobno]: nie lepszy, nie najlepszy.',
        'Зі звичайним прикметником — [разом]: niedobry. З вищим і найвищим ступенем — [окремо]: nie lepszy.',
        'С обычным прилагательным — [слитно]: niedobry. Со сравнительной и превосходной степенью — [раздельно]: nie lepszy.'
      ),
      ['[nie]dobry', '[nie]wysoki', '[nie ]starszy', '[nie ]najlepszy'],
      nieItems, 'sentence', SENT),
    {
      ...lv('boss', '👑', l('Boss: kolorowy mix', 'Бос: кольоровий мікс', 'Босс: цветной микс'),
        l('Wszystko naraz: końcówki, mili czy miłe, lepszy czy najlepszy, nie razem czy osobno.', 'Усе разом: закінчення, mili чи miłe, lepszy чи najlepszy, nie разом чи окремо.', 'Всё вместе: окончания, mili или miłe, lepszy или najlepszy, nie слитно или раздельно.'),
        [], [...plItems, ...stItems, ...irItems, ...nieItems], 'sentence', SENT, {}, 10),
      boss: true
    }
  ]
}
