import type { L } from '~/types/content'
import type { Exercise, Item } from './types'
import { bossLv, l, lv, tip } from './helpers'

/* ================================================================
   WIELKA LITERA — Sawanna Wielkich Liter, przewodniczka: Żyrafa Zuzia
   (najwyższa na sawannie — jak wielka litera w zdaniu)
   ================================================================ */

const PROMPT = l('Wielka czy mała litera?', 'Велика чи мала літера?', 'Заглавная или строчная буква?')

/** 'ulica (K)wiatowa' — w nawiasie pierwsza litera; opcje: wielka i mała */
function cap(spec: string, hint: L, tag: string, uk: string, ru: string): Item {
  const a = spec.indexOf('(')
  const b = spec.indexOf(')')
  const ch = spec.slice(a + 1, b)
  const big = ch.toUpperCase()
  const small = ch.toLowerCase()
  const opts = [big, small]
  return { pre: spec.slice(0, a), post: spec.slice(b + 1), opts, answer: opts.indexOf(ch), hint, tr: { uk, ru }, tag }
}

const h = {
  imie: l('Imiona, nazwiska i imiona zwierząt piszemy wielką literą: Anna, Kowalski, pies Burek.', 'Імена, прізвища й клички тварин пишемо з великої: Anna, Kowalski, pies Burek.', 'Имена, фамилии и клички животных пишем с заглавной: Anna, Kowalski, pies Burek.'),
  miejsce: l('Nazwy miast, krajów, rzek i gór — wielką literą: Warszawa, Polska, Wisła, Tatry.', 'Назви міст, країн, річок і гір — з великої: Warszawa, Polska, Wisła, Tatry.', 'Названия городов, стран, рек и гор — с заглавной: Warszawa, Polska, Wisła, Tatry.'),
  ulica: l('Nazwę ulicy piszemy wielką literą, ale słowo „ulica” — małą: ulica Kwiatowa.', 'Назву вулиці пишемо з великої, а слово «ulica» — з малої: ulica Kwiatowa.', 'Название улицы пишем с заглавной, а слово «ulica» — со строчной: ulica Kwiatowa.'),
  mieszkaniec: l('Mieszkańcy krajów — wielką literą: Polak, Ukrainka.', 'Жителі країн — з великої: Polak, Ukrainka (на відміну від української!).', 'Жители стран — с заглавной: Polak, Ukrainka (в отличие от русского!).'),
  przym: l('Przymiotniki od nazw krajów — małą literą: polski, ukraiński.', 'Прикметники від назв країн — з малої: polski, ukraiński.', 'Прилагательные от названий стран — со строчной: polski, ukraiński.'),
  dni: l('Dni tygodnia i miesiące — małą literą: poniedziałek, styczeń.', 'Дні тижня й місяці — з малої: poniedziałek, styczeń (як в українській).', 'Дни недели и месяцы — со строчной: poniedziałek, styczeń (как в русском).'),
  swieto: l('Święta — wielką literą: Boże Narodzenie, Wielkanoc, Dzień Matki.', 'Свята — з великої: Boże Narodzenie, Wielkanoc, Dzień Matki.', 'Праздники — с заглавной: Boże Narodzenie, Wielkanoc, Dzień Matki.'),
  zwykle: l('To zwykłe słowo, nie nazwa — piszemy małą literą.', 'Це звичайне слово, а не назва — пишемо з малої.', 'Это обычное слово, а не название — пишем со строчной.')
}

const nameItems: Item[] = [
  cap('(A)nna', h.imie, 'imie', 'Анна', 'Анна'),
  cap('Jan (K)owalski', h.imie, 'imie', 'Ян Ковальський', 'Ян Ковальский'),
  cap('pies (B)urek', h.imie, 'imie', 'пес Бурек', 'собака Бурек'),
  cap('kot (F)ilemon', h.imie, 'imie', 'кіт Філемон', 'кот Филемон'),
  cap('mój (b)rat', h.zwykle, 'zwykle', 'мій брат', 'мой брат'),
  cap('(W)arszawa', h.miejsce, 'miejsce', 'Варшава', 'Варшава'),
  cap('(P)olska', h.miejsce, 'miejsce', 'Польща', 'Польша'),
  cap('rzeka (W)isła', h.miejsce, 'miejsce', 'річка Вісла', 'река Висла'),
  cap('góry (T)atry', h.miejsce, 'miejsce', 'гори Татри', 'горы Татры'),
  cap('(U)kraina', h.miejsce, 'miejsce', 'Україна', 'Украина'),
  cap('duże (m)iasto', h.zwykle, 'zwykle', 'велике місто', 'большой город'),
  cap('ulica (K)wiatowa', h.ulica, 'ulica', 'вулиця Квітова', 'улица Цветочная'),
  cap('mieszkam przy (u)licy Długiej', h.ulica, 'ulica', 'я живу на вулиці Довгій', 'я живу на улице Длинной')
]

const peopleItems: Item[] = [
  cap('(P)olak', h.mieszkaniec, 'mieszk', 'поляк', 'поляк'),
  cap('język (p)olski', h.przym, 'przym', 'польська мова', 'польский язык'),
  cap('(U)krainka', h.mieszkaniec, 'mieszk', 'українка', 'украинка'),
  cap('barszcz (u)kraiński', h.przym, 'przym', 'український борщ', 'украинский борщ'),
  cap('(N)iemiec', h.mieszkaniec, 'mieszk', 'німець', 'немец'),
  cap('flaga (p)olska', h.przym, 'przym', 'польський прапор', 'польский флаг'),
  cap('(P)olka', h.mieszkaniec, 'mieszk', 'полька', 'полька'),
  cap('kuchnia (w)łoska', h.przym, 'przym', 'італійська кухня', 'итальянская кухня'),
  cap('(A)nglik', h.mieszkaniec, 'mieszk', 'англієць', 'англичанин')
]

const timeItems: Item[] = [
  cap('w (p)oniedziałek', h.dni, 'dni', 'у понеділок', 'в понедельник'),
  cap('(s)tyczeń', h.dni, 'dni', 'січень', 'январь'),
  cap('w (s)obotę', h.dni, 'dni', 'у суботу', 'в субботу'),
  cap('urodziny w (m)aju', h.dni, 'dni', 'день народження в травні', 'день рождения в мае'),
  cap('(B)oże Narodzenie', h.swieto, 'swieto', 'Різдво', 'Рождество'),
  cap('(W)ielkanoc', h.swieto, 'swieto', 'Великдень', 'Пасха'),
  cap('Dzień (M)atki', h.swieto, 'swieto', 'День матері', 'День матери'),
  cap('(w)akacje', h.zwykle, 'zwykle', 'канікули', 'каникулы'),
  cap('(n)iedziela', h.dni, 'dni', 'неділя', 'воскресенье'),
  cap('(W)igilia', h.swieto, 'swieto', 'Святвечір', 'Сочельник')
]

export const wielkaExercise: Exercise = {
  slug: 'wielka-litera',
  group: 'litery',
  icon: 'Aa',
  color: 'var(--g1)',
  soft: 'var(--g1-soft)',
  title: l('Wielka litera', 'Велика літера', 'Заглавная буква'),
  lead: l(
    'Anna czy anna? Polak czy polak? Poniedziałek czy poniedziałek? Kiedy litera ma być wielka?',
    'Anna чи anna? Polak чи polak? poniedziałek чи Poniedziałek? Коли літера має бути великою?',
    'Anna или anna? Polak или polak? poniedziałek или Poniedziałek? Когда буква должна быть заглавной?'
  ),
  badge: l('Mistrz wielkich liter', 'Майстер великих літер', 'Мастер заглавных букв'),
  levels: [
    lv('nazwy', 'A Anna',
      l('Imiona i nazwy miejsc', 'Імена й назви місць', 'Имена и названия мест'),
      l(
        'Wielką literą: imiona ([A]nna, pies [B]urek), miasta ([W]arszawa), kraje ([P]olska), rzeki ([W]isła), ulice (ulica [K]wiatowa).',
        'З великої: імена ([A]nna, pies [B]urek), міста ([W]arszawa), країни ([P]olska), річки ([W]isła), вулиці (ulica [K]wiatowa).',
        'С заглавной: имена ([A]nna, pies [B]urek), города ([W]arszawa), страны ([P]olska), реки ([W]isła), улицы (ulica [K]wiatowa).'
      ),
      ['[A]nna', 'pies [B]urek', '[W]arszawa', 'ulica [K]wiatowa'],
      nameItems, PROMPT, 'word'),
    lv('polak', 'Polak',
      l('Polak, ale polski', 'Polak, але polski', 'Polak, но polski'),
      l(
        'Mieszkaniec kraju — wielką literą: [P]olak, [U]krainka. Ale przymiotnik — małą: język [p]olski, barszcz [u]kraiński.',
        'Житель країни — з великої: [P]olak, [U]krainka. А прикметник — з малої: język [p]olski, barszcz [u]kraiński.',
        'Житель страны — с заглавной: [P]olak, [U]krainka. А прилагательное — со строчной: język [p]olski.'
      ),
      ['[P]olak', 'język [p]olski', '[U]krainka', 'barszcz [u]kraiński'],
      peopleItems, PROMPT, 'word', tip(l('Uwaga', 'Увага: не як в українській!', 'Внимание: не как в русском!'),
        l('Po ukraińsku: поляк, українка — małą literą. Po polsku: Polak, Ukrainka — wielką!', 'Українською «поляк», «українка» — з малої. А польською [P]olak, [U]krainka — з великої!', 'По-русски «поляк», «украинка» — со строчной. А по-польски [P]olak, [U]krainka — с заглавной!'))),
    lv('czas', 'pon.',
      l('Dni, miesiące i święta', 'Дні, місяці й свята', 'Дни, месяцы и праздники'),
      l(
        'Dni tygodnia i miesiące — małą literą: [p]oniedziałek, [s]tyczeń. Święta — wielką: [B]oże Narodzenie, [W]ielkanoc.',
        'Дні тижня й місяці — з малої: [p]oniedziałek, [s]tyczeń. Свята — з великої: [B]oże Narodzenie, [W]ielkanoc.',
        'Дни недели и месяцы — со строчной: [p]oniedziałek, [s]tyczeń. Праздники — с заглавной: [B]oże Narodzenie, [W]ielkanoc.'
      ),
      ['w [p]oniedziałek', '[s]tyczeń', '[B]oże Narodzenie', '[W]ielkanoc'],
      timeItems, PROMPT, 'word'),
    bossLv([...nameItems, ...peopleItems, ...timeItems],
      l('Boss: wielkie polowanie', 'Бос: велике полювання', 'Босс: большая охота'),
      l('Wszystko naraz: imiona, miasta, Polak czy polski, dni i święta.', 'Усе разом: імена, міста, Polak чи polski, дні й свята.', 'Всё вместе: имена, города, Polak или polski, дни и праздники.'),
      PROMPT, 'word')
  ]
}
