import type { L } from '~/types/content'
import type { Exercise, Item, Level } from './types'

export const l = (pl: string, uk: string, ru: string): L => ({ pl, uk, ru })

/**
 * Słowo z luką: 'st(ó)ł'. `rule` — klucz krótkiej podpowiedzi z `hints`.
 * `proof` — forma, która udowadnia pisownię (np. „stoły”).
 */
export function word(hints: Record<string, L>, spec: string, opts: string[], rule: string, uk: string, ru: string, proof?: string): Item {
  const m = spec.match(/^(.*)\((.+)\)(.*)$/)
  if (!m) throw new Error(`Bad spec: ${spec}`)
  const [, pre, ans, post] = m as unknown as [string, string, string, string]
  const hint = hints[rule]
  if (!hint) throw new Error(`No hint ${rule}`)
  const answer = opts.indexOf(ans)
  if (answer < 0) throw new Error(`Bad answer: ${spec}`)
  return { pre, post, opts, answer, hint, proof, tr: { uk, ru }, tag: rule }
}

/* ================================================================
   Ó czy U
   ================================================================ */
const OU = ['ó', 'u']
const ouHints: Record<string, L> = {
  alt: l(
    'Ó wymienia się na o, e lub a — piszemy ó.',
    'Ó змінюється на o, e або a — пишемо ó.',
    'Ó чередуется с o, e или a — пишем ó.'
  ),
  end: l(
    'Końcówki -ów, -ówka, -ówna piszemy przez ó.',
    'Закінчення -ów, -ówka, -ówna пишемо з ó.',
    'Окончания -ów, -ówka, -ówna пишем с ó.'
  ),
  memoO: l(
    'Tu nie ma wymiany — to słowo trzeba zapamiętać z ó.',
    'Тут немає заміни — це слово треба запам’ятати з ó.',
    'Здесь нет чередования — это слово надо запомнить с ó.'
  ),
  start: l(
    'Na początku wyrazu piszemy u.',
    'На початку слова пишемо u.',
    'В начале слова пишем u.'
  ),
  endU: l(
    'Końcówki -unek, -uszek, -uszka, -utki, -uch i czasowniki na -uje piszemy przez u.',
    'Закінчення -unek, -uszek, -uszka, -utki, -uch і дієслова на -uje пишемо з u.',
    'Окончания -unek, -uszek, -uszka, -utki, -uch и глаголы на -uje пишем с u.'
  ),
  memoU: l(
    'U nie wymienia się na o — to słowo zapamiętujemy z u.',
    'U не змінюється на o — це слово запам’ятовуємо з u.',
    'U не чередуется с o — это слово запоминаем с u.'
  )
}
const ou = (spec: string, rule: string, uk: string, ru: string, proof?: string) => word(ouHints, spec, OU, rule, uk, ru, proof)

export const ouItems: Item[] = [
  ou('st(ó)ł', 'alt', 'стіл', 'стол', 'stół → stoły'),
  ou('r(ó)g', 'alt', 'ріг', 'рог', 'róg → rogi'),
  ou('n(ó)ż', 'alt', 'ніж', 'нож', 'nóż → noże'),
  ou('s(ó)l', 'alt', 'сіль', 'соль', 'sól → solić'),
  ou('w(ó)z', 'alt', 'віз', 'воз', 'wóz → wozy'),
  ou('l(ó)d', 'alt', 'лід', 'лёд', 'lód → lody'),
  ou('mr(ó)z', 'alt', 'мороз', 'мороз', 'mróz → mrozy'),
  ou('ogr(ó)d', 'alt', 'сад', 'сад', 'ogród → ogrody'),
  ou('(ó)smy', 'alt', 'восьмий', 'восьмой', 'ósmy → osiem'),
  ou('przyjaci(ó)ł', 'alt', 'друзів', 'друзей', 'przyjaciół → przyjaciel'),
  ou('pszcz(ó)ł', 'alt', 'бджіл', 'пчёл', 'pszczół → pszczoła'),
  ou('wr(ó)cić', 'alt', 'повернутися', 'вернуться', 'wrócić → wracać'),
  ou('Krak(ó)w', 'end', 'Краків', 'Краков', '-ów'),
  ou('kot(ó)w', 'end', 'котів', 'котов', '-ów'),
  ou('dom(ó)w', 'end', 'будинків', 'домов', '-ów'),
  ou('ps(ó)w', 'end', 'собак', 'собак', '-ów'),
  ou('ptak(ó)w', 'end', 'птахів', 'птиц', '-ów'),
  ou('Rzesz(ó)w', 'end', 'Ряшів', 'Жешув', '-ów'),
  ou('Nowak(ó)wna', 'end', 'панна Новак', 'панна Новак', '-ówna'),
  ou('kresk(ó)wka', 'end', 'мультфільм', 'мультфильм', '-ówka'),
  ou('poczt(ó)wka', 'end', 'листівка', 'открытка', '-ówka'),
  ou('g(ó)ra', 'memoO', 'гора', 'гора'),
  ou('kr(ó)l', 'memoO', 'король', 'король'),
  ou('og(ó)rek', 'memoO', 'огірок', 'огурец'),
  ou('ż(ó)łw', 'memoO', 'черепаха', 'черепаха'),
  ou('wr(ó)bel', 'memoO', 'горобець', 'воробей'),
  ou('kt(ó)ry', 'memoO', 'який', 'который'),
  ou('c(ó)rka', 'memoO', 'донька', 'дочка'),
  ou('ż(ó)łty', 'memoO', 'жовтий', 'жёлтый'),
  ou('m(ó)zg', 'memoO', 'мозок', 'мозг'),
  ou('p(ó)źno', 'memoO', 'пізно', 'поздно'),
  ou('sk(ó)ra', 'memoO', 'шкіра', 'кожа'),
  ou('wiewi(ó)rka', 'memoO', 'білка', 'белка'),
  ou('jask(ó)łka', 'memoO', 'ластівка', 'ласточка'),
  ou('oł(ó)wek', 'memoO', 'олівець', 'карандаш'),
  ou('(u)l', 'start', 'вулик', 'улей'),
  ou('(u)cho', 'start', 'вухо', 'ухо'),
  ou('(u)lica', 'start', 'вулиця', 'улица'),
  ou('(u)czeń', 'start', 'учень', 'ученик'),
  ou('(u)śmiech', 'start', 'усмішка', 'улыбка'),
  ou('rys(u)nek', 'endU', 'малюнок', 'рисунок', '-unek'),
  ou('koż(u)szek', 'endU', 'кожушок', 'тулупчик', '-uszek'),
  ou('pod(u)szka', 'endU', 'подушка', 'подушка', '-uszka'),
  ou('mal(u)tki', 'endU', 'малесенький', 'малюсенький', '-utki'),
  ou('mal(u)ch', 'endU', 'малюк', 'малыш', '-uch'),
  ou('mal(u)je', 'endU', 'малює', 'рисует', '-uje'),
  ou('bud(u)je', 'endU', 'будує', 'строит', '-uje'),
  ou('m(u)cha', 'memoU', 'муха', 'муха'),
  ou('b(u)t', 'memoU', 'черевик', 'ботинок', 'but → buty'),
  ou('k(u)ra', 'memoU', 'курка', 'курица'),
  ou('chm(u)ra', 'memoU', 'хмара', 'туча'),
  ou('b(u)rza', 'memoU', 'буря', 'гроза'),
  ou('dzi(u)ra', 'memoU', 'дірка', 'дыра'),
  ou('szn(u)rek', 'memoU', 'мотузка', 'верёвка'),
  ou('d(u)ży', 'memoU', 'великий', 'большой'),
  ou('j(u)tro', 'memoU', 'завтра', 'завтра'),
  ou('kog(u)t', 'memoU', 'півень', 'петух')
]

/* ================================================================
   RZ czy Ż
   ================================================================ */
const RZ = ['rz', 'ż']
const rzHints: Record<string, L> = {
  alt: l(
    'Rz wymienia się na r — piszemy rz.',
    'Rz змінюється на r — пишемо rz.',
    'Rz чередуется с r — пишем rz.'
  ),
  after: l(
    'Po b, ch, d, g, j, k, p, t, w piszemy rz.',
    'Після b, ch, d, g, j, k, p, t, w пишемо rz.',
    'После b, ch, d, g, j, k, p, t, w пишем rz.'
  ),
  end: l(
    'Końcówki -arz, -erz (zawody, osoby) piszemy przez rz.',
    'Закінчення -arz, -erz (професії, особи) пишемо з rz.',
    'Окончания -arz, -erz (профессии, люди) пишем с rz.'
  ),
  altZ: l(
    'Ż wymienia się na g, z, s lub h — piszemy ż.',
    'Ż змінюється на g, z, s або h — пишемо ż.',
    'Ż чередуется с g, z, s или h — пишем ż.'
  ),
  memoZ: l(
    'Tu nie ma wymiany — to słowo zapamiętujemy z ż.',
    'Тут немає заміни — це слово запам’ятовуємо з ż.',
    'Здесь нет чередования — это слово запоминаем с ż.'
  )
}
const rz = (spec: string, rule: string, uk: string, ru: string, proof?: string) => word(rzHints, spec, RZ, rule, uk, ru, proof)

export const rzItems: Item[] = [
  rz('mo(rz)e', 'alt', 'море', 'море', 'morze → morski'),
  rz('dob(rz)e', 'alt', 'добре', 'хорошо', 'dobrze → dobry'),
  rz('na rowe(rz)e', 'alt', 'на велосипеді', 'на велосипеде', 'rowerze → rower'),
  rz('w gó(rz)e', 'alt', 'угорі', 'наверху', 'górze → góra'),
  rz('cho(rz)y', 'alt', 'хворі', 'больные', 'chorzy → chory'),
  rz('o kolo(rz)e', 'alt', 'про колір', 'о цвете', 'kolorze → kolor'),
  rz('b(rz)eg', 'after', 'берег', 'берег', 'b + rz'),
  rz('d(rz)ewo', 'after', 'дерево', 'дерево', 'd + rz'),
  rz('g(rz)yb', 'after', 'гриб', 'гриб', 'g + rz'),
  rz('k(rz)esło', 'after', 'стілець', 'стул', 'k + rz'),
  rz('p(rz)yjaciel', 'after', 'друг', 'друг', 'p + rz'),
  rz('t(rz)y', 'after', 'три', 'три', 't + rz'),
  rz('w(rz)esień', 'after', 'вересень', 'сентябрь', 'w + rz'),
  rz('ch(rz)an', 'after', 'хрін', 'хрен', 'ch + rz'),
  rz('k(rz)ak', 'after', 'кущ', 'куст', 'k + rz'),
  rz('p(rz)ez', 'after', 'через', 'через', 'p + rz'),
  rz('leka(rz)', 'end', 'лікар', 'врач', '-arz'),
  rz('kucha(rz)', 'end', 'кухар', 'повар', '-arz'),
  rz('pisa(rz)', 'end', 'письменник', 'писатель', '-arz'),
  rz('ryce(rz)', 'end', 'лицар', 'рыцарь', '-erz'),
  rz('żołnie(rz)', 'end', 'солдат', 'солдат', '-erz'),
  rz('kalenda(rz)', 'end', 'календар', 'календарь', '-arz'),
  rz('nó(ż)ka', 'altZ', 'ніжка', 'ножка', 'nóżka → noga'),
  rz('ksią(ż)ka', 'altZ', 'книжка', 'книга', 'książka → księga'),
  rz('wo(ż)ę', 'altZ', 'вожу', 'вожу', 'wożę → wozić'),
  rz('wy(ż)ej', 'altZ', 'вище', 'выше', 'wyżej → wysoko'),
  rz('bli(ż)ej', 'altZ', 'ближче', 'ближе', 'bliżej → blisko'),
  rz('ni(ż)ej', 'altZ', 'нижче', 'ниже', 'niżej → nisko'),
  rz('dru(ż)yna', 'altZ', 'команда', 'команда', 'drużyna → druh'),
  rz('(ż)aba', 'memoZ', 'жаба', 'лягушка'),
  rz('(ż)yrafa', 'memoZ', 'жирафа', 'жираф'),
  rz('ró(ż)a', 'memoZ', 'троянда', 'роза'),
  rz('łó(ż)ko', 'memoZ', 'ліжко', 'кровать'),
  rz('je(ż)', 'memoZ', 'їжак', 'ёж'),
  rz('wą(ż)', 'memoZ', 'змія', 'змея'),
  rz('mą(ż)', 'memoZ', 'чоловік', 'муж'),
  rz('pla(ż)a', 'memoZ', 'пляж', 'пляж'),
  rz('(ż)art', 'memoZ', 'жарт', 'шутка'),
  rz('poniewa(ż)', 'memoZ', 'тому що', 'потому что'),
  rz('(ż)ołnierz', 'memoZ', 'солдат', 'солдат')
]

/* ================================================================
   CH czy H
   ================================================================ */
const CH = ['ch', 'h']
const chHints: Record<string, L> = {
  alt: l(
    'Ch wymienia się na sz — piszemy ch.',
    'Ch змінюється на sz — пишемо ch.',
    'Ch чередуется с sz — пишем ch.'
  ),
  end: l(
    'Na końcu wyrazu prawie zawsze piszemy ch (wyjątek: druh).',
    'У кінці слова майже завжди пишемо ch (виняток: druh).',
    'В конце слова почти всегда пишем ch (исключение: druh).'
  ),
  s: l(
    'Po literze s piszemy ch.',
    'Після літери s пишемо ch.',
    'После буквы s пишем ch.'
  ),
  memoCh: l(
    'To słowo zapamiętujemy z ch. Podpowiedź: po ukraińsku i rosyjsku jest tu „х”.',
    'Це слово запам’ятовуємо з ch. Підказка: українською тут «х».',
    'Это слово запоминаем с ch. Подсказка: по-русски здесь «х».'
  ),
  altH: l(
    'H wymienia się na ż lub g — piszemy h.',
    'H змінюється на ż або g — пишемо h.',
    'H чередуется с ż или g — пишем h.'
  ),
  memoH: l(
    'To słowo zapamiętujemy z h. Często po ukraińsku jest tu „г”.',
    'Це слово запам’ятовуємо з h. Часто українською тут «г».',
    'Это слово запоминаем с h. Часто по-русски здесь «г».'
  )
}
const ch = (spec: string, rule: string, uk: string, ru: string, proof?: string) => word(chHints, spec, CH, rule, uk, ru, proof)

export const chItems: Item[] = [
  ch('mu(ch)a', 'alt', 'муха', 'муха', 'mucha → musze'),
  ch('u(ch)o', 'alt', 'вухо', 'ухо', 'ucho → uszy'),
  ch('ci(ch)o', 'alt', 'тихо', 'тихо', 'cicho → cisza'),
  ch('du(ch)', 'alt', 'дух', 'дух', 'duch → dusza'),
  ch('su(ch)y', 'alt', 'сухий', 'сухой', 'suchy → susza'),
  ch('da(ch)', 'end', 'дах', 'крыша'),
  ch('gro(ch)', 'end', 'горох', 'горох'),
  ch('me(ch)', 'end', 'мох', 'мох'),
  ch('ru(ch)', 'end', 'рух', 'движение'),
  ch('brzu(ch)', 'end', 'живіт', 'живот'),
  ch('zapa(ch)', 'end', 'запах', 'запах'),
  ch('stra(ch)', 'end', 'страх', 'страх'),
  ch('s(ch)ody', 's', 'сходи', 'лестница', 's + ch'),
  ch('s(ch)ować', 's', 'сховати', 'спрятать', 's + ch'),
  ch('s(ch)ronisko', 's', 'притулок', 'приют', 's + ch'),
  ch('(ch)leb', 'memoCh', 'хліб', 'хлеб'),
  ch('(ch)mura', 'memoCh', 'хмара', 'туча'),
  ch('(ch)łopiec', 'memoCh', 'хлопець', 'мальчик'),
  ch('(ch)ory', 'memoCh', 'хворий', 'больной'),
  ch('(ch)omik', 'memoCh', 'хом’ячок', 'хомяк'),
  ch('ku(ch)nia', 'memoCh', 'кухня', 'кухня'),
  ch('(ch)rząszcz', 'memoCh', 'хрущ', 'жук'),
  ch('dru(h)', 'altH', 'друг', 'друг', 'druh → drużyna'),
  ch('wata(h)a', 'altH', 'зграя', 'стая', 'wataha → watażka'),
  ch('(h)erbata', 'memoH', 'чай', 'чай'),
  ch('(h)ałas', 'memoH', 'галас', 'шум'),
  ch('(h)amak', 'memoH', 'гамак', 'гамак'),
  ch('(h)ulajnoga', 'memoH', 'самокат', 'самокат'),
  ch('bo(h)ater', 'memoH', 'герой (богатир)', 'герой (богатырь)'),
  ch('(h)uśtawka', 'memoH', 'гойдалка', 'качели'),
  ch('(h)istoria', 'memoH', 'історія', 'история'),
  ch('(h)ipopotam', 'memoH', 'гіпопотам', 'гиппопотам'),
  ch('(h)otel', 'memoH', 'готель', 'отель'),
  ch('(h)umor', 'memoH', 'гумор', 'юмор'),
  ch('(h)ymn', 'memoH', 'гімн', 'гимн'),
  ch('(h)oryzont', 'memoH', 'горизонт', 'горизонт')
]


/* ================================================================
   Poziomy: jedna reguła = jeden poziom
   ================================================================ */

export const PROMPT = l('Która litera pasuje?', 'Яка літера підходить?', 'Какая буква подходит?')
export const by = (items: Item[], ...tags: string[]) => items.filter(it => tags.includes(it.tag))

export function level(
  id: string, icon: string, title: L, rule: L, examples: string[],
  items: Item[], review: Item[] = [], extra: Partial<Level> = {}, round = 6
): Level {
  return {
    id, icon, title, rule, examples,
    game: { id, prompt: PROMPT, size: 'word', items, round, review, reviewN: review.length ? 2 : 0 },
    ...extra
  }
}

export function boss(id: string, items: Item[], title: L = l('Boss: wszystko razem', 'Бос: усе разом', 'Босс: всё вместе'), round = 10): Level {
  return {
    id, icon: '👑', boss: true, title,
    rule: l(
      'Wszystkie reguły naraz. Najpierw sprawdź wymianę, potem końcówkę, a na końcu — pamięć.',
      'Усі правила разом. Спершу перевір заміну, потім закінчення, а наостанок — пам’ять.',
      'Все правила вместе. Сначала проверь чередование, потом окончание, а в конце — память.'
    ),
    examples: [],
    game: { id, prompt: PROMPT, size: 'word', items, round }
  }
}

/* ---------- Ó / U ---------- */
export const ouExercise: Exercise = {
  slug: 'o-u',
  group: 'litery',
  icon: 'ó',
  color: 'var(--g2)',
  soft: 'var(--g2-soft)',
  title: l('Ó czy u?', 'Ó чи u?', 'Ó или u?'),
  lead: l(
    'Brzmią tak samo, a piszemy je inaczej. Siedem małych kroków do mistrzostwa.',
    'Звучать однаково, а пишуться по-різному. Сім маленьких кроків до майстерності.',
    'Звучат одинаково, а пишутся по-разному. Семь маленьких шагов к мастерству.'
  ),
  badge: l('Mistrz Ó', 'Майстер Ó', 'Мастер Ó'),
  levels: [
    level('alt', 'ó→o',
      l('Ó zmienia się w o', 'Ó змінюється на o', 'Ó меняется на o'),
      l(
        'Zmień słowo. Jeśli ó zamienia się w o, e albo a — piszemy ó. Jeśli zostaje u — piszemy u.',
        'Зміни слово. Якщо ó стає o, e або a — пишемо ó. Якщо лишається u — пишемо u.',
        'Измени слово. Если ó становится o, e или a — пишем ó. Если остаётся u — пишем u.'
      ),
      ['st[ó]ł → st[o]ły', 'n[ó]ż → n[o]że', 'przyjaci[ó]ł → przyjaci[e]l', 'b[u]t → b[u]ty'],
      by(ouItems, 'alt'), by(ouItems, 'memoU').filter(i => i.proof),
      {
        tip: {
          title: l('Sztuczka', 'Хитрість: українське «і»', 'Хитрость: русское «о»'),
          text: l(
            'Po ukraińsku w tym miejscu często jest „і”, po rosyjsku „о”.',
            'Якщо українською на цьому місці «і» — польською часто ó.',
            'Если по-русски на этом месте «о» — по-польски часто ó.'
          ),
          examples: ['стіл · стол → st[ó]ł', 'ніж · нож → n[ó]ż', 'сіль · соль → s[ó]l']
        }
      }),
    level('end', '-ów',
      l('Ó w końcówkach -ów, -ówka', 'Ó в закінченнях -ów, -ówka', 'Ó в окончаниях -ów, -ówka'),
      l(
        'Na końcu słowa: -ów, -ówka, -ówna piszemy z ó.',
        'У кінці слова: -ów, -ówka, -ówna пишемо з ó.',
        'В конце слова: -ów, -ówka, -ówna пишем с ó.'
      ),
      ['Krak[ów]', 'kot[ów]', 'kresk[ówka]', 'poczt[ówka]'],
      by(ouItems, 'end'), by(ouItems, 'endU')),
    level('start', 'u…',
      l('U na początku słowa', 'U на початку слова', 'U в начале слова'),
      l(
        'Słowo zaczyna się od tego dźwięku? Piszemy u.',
        'Слово починається з цього звуку? Пишемо u.',
        'Слово начинается с этого звука? Пишем u.'
      ),
      ['[u]cho', '[u]lica', '[u]śmiech'],
      by(ouItems, 'start'), by(ouItems, 'alt'), {}, 5),
    level('endU', '-unek',
      l('U w -unek, -uszka, -utki, -uje', 'U в -unek, -uszka, -utki, -uje', 'U в -unek, -uszka, -utki, -uje'),
      l(
        'Te końcówki zawsze piszemy z u: -unek, -uszek, -uszka, -utki, -uch, -uje.',
        'Ці закінчення завжди пишемо з u: -unek, -uszek, -uszka, -utki, -uch, -uje.',
        'Эти окончания всегда пишем с u: -unek, -uszek, -uszka, -utki, -uch, -uje.'
      ),
      ['rys[unek]', 'pod[uszka]', 'mal[utki]', 'mal[uje]'],
      by(ouItems, 'endU'), by(ouItems, 'end')),
    level('memoO', 'ó!',
      l('Zapamiętaj: słowa z ó', 'Запам’ятай: слова з ó', 'Запомни: слова с ó'),
      l(
        'Tych słów nie sprawdzisz — trzeba je zapamiętać. Spróbuj powiedzieć je na głos!',
        'Ці слова не перевіриш — їх треба запам’ятати. Спробуй сказати їх уголос!',
        'Эти слова не проверишь — их надо запомнить. Попробуй сказать их вслух!'
      ),
      ['g[ó]ra', 'kr[ó]l', 'ż[ó]łw', 'kt[ó]ry'],
      by(ouItems, 'memoO'), by(ouItems, 'memoU')),
    level('memoU', 'u!',
      l('Zapamiętaj: słowa z u', 'Запам’ятай: слова з u', 'Запомни: слова с u'),
      l(
        'U, które się nie zmienia. Podpowiedź: po ukraińsku też jest „у”.',
        'U, яке не змінюється. Підказка: українською теж «у» — муха, буря.',
        'U, которое не меняется. Подсказка: по-русски тоже «у» — муха, буря.'
      ),
      ['m[u]cha', 'k[u]ra', 'chm[u]ra', 'b[u]rza'],
      by(ouItems, 'memoU'), by(ouItems, 'memoO')),
    boss('boss', ouItems)
  ]
}

/* ---------- RZ / Ż ---------- */
export const rzExercise: Exercise = {
  slug: 'rz-z',
  group: 'litery',
  icon: 'rz',
  color: 'var(--g5)',
  soft: 'var(--g5-soft)',
  title: l('Rz czy ż?', 'Rz чи ż?', 'Rz или ż?'),
  lead: l(
    'Oba brzmią jak „ż”. Rz lubi r, ż lubi g, z, s, h.',
    'Обидва звучать як «ж». Rz дружить з r, ż — з g, z, s, h.',
    'Оба звучат как «ж». Rz дружит с r, ż — с g, z, s, h.'
  ),
  badge: l('Mistrz Rz', 'Майстер Rz', 'Мастер Rz'),
  levels: [
    level('alt', 'rz→r',
      l('Rz zmienia się w r', 'Rz змінюється на r', 'Rz меняется на r'),
      l(
        'Znajdź inne słowo z tej rodziny. Słychać r? Piszemy rz.',
        'Знайди споріднене слово. Чути r? Пишемо rz.',
        'Найди однокоренное слово. Слышно r? Пишем rz.'
      ),
      ['mo[rz]e → mo[r]ski', 'dob[rz]e → dob[r]y', 'w gó[rz]e → gó[r]a'],
      by(rzItems, 'alt'), by(rzItems, 'memoZ')),
    level('after', 'trz',
      l('Rz po b, d, g, k, p, t, w, ch, j', 'Rz після b, d, g, k, p, t, w, ch, j', 'Rz после b, d, g, k, p, t, w, ch, j'),
      l(
        'Po tych literach piszemy rz. Po p, t, k brzmi jak „sz” — ale piszemy rz!',
        'Після цих літер пишемо rz. Після p, t, k звучить як «ш» — але пишемо rz!',
        'После этих букв пишем rz. После p, t, k звучит как «ш» — но пишем rz!'
      ),
      ['t[rz]y', 'p[rz]yjaciel', 'k[rz]esło', 'd[rz]ewo'],
      by(rzItems, 'after'), by(rzItems, 'memoZ'),
      {
        tip: {
          title: l('Sztuczka', 'Хитрість: «р»', 'Хитрость: «р»'),
          text: l(
            'Po ukraińsku i rosyjsku jest tu często „р”.',
            'Якщо українською чути «р» — польською часто rz.',
            'Если по-русски слышно «р» — по-польски часто rz.'
          ),
          examples: ['три → t[rz]y', 'берег → b[rz]eg', 'гриб → g[rz]yb']
        }
      }),
    level('end', '-arz',
      l('Rz w zawodach: -arz, -erz', 'Rz у професіях: -arz, -erz', 'Rz в профессиях: -arz, -erz'),
      l(
        'Kto coś robi? Lekarz, kucharz, rycerz — na końcu rz.',
        'Хто щось робить? Lekarz, kucharz, rycerz — у кінці rz.',
        'Кто что-то делает? Lekarz, kucharz, rycerz — в конце rz.'
      ),
      ['leka[rz]', 'kucha[rz]', 'ryce[rz]'],
      by(rzItems, 'end'), by(rzItems, 'altZ')),
    level('altZ', 'ż→g',
      l('Ż zmienia się w g, z, s, h', 'Ż змінюється на g, z, s, h', 'Ż меняется на g, z, s, h'),
      l(
        'W innej formie słychać g, z, s albo h? Piszemy ż.',
        'В іншій формі чути g, z, s або h? Пишемо ż.',
        'В другой форме слышно g, z, s или h? Пишем ż.'
      ),
      ['nó[ż]ka → no[g]a', 'ksią[ż]ka → księ[g]a', 'wy[ż]ej → wy[s]oko', 'dru[ż]yna → dru[h]'],
      by(rzItems, 'altZ'), by(rzItems, 'alt')),
    level('memoZ', 'ż!',
      l('Zapamiętaj: słowa z ż', 'Запам’ятай: слова з ż', 'Запомни: слова с ż'),
      l(
        'Te słowa trzeba znać na pamięć. Pomaga ukraińskie i rosyjskie „ж”.',
        'Ці слова треба знати напам’ять. Допомагає українське «ж».',
        'Эти слова надо знать наизусть. Помогает русское «ж».'
      ),
      ['[ż]aba', 'je[ż]', 'ró[ż]a', 'łó[ż]ko'],
      by(rzItems, 'memoZ'), by(rzItems, 'after'),
      {
        tip: {
          title: l('Sztuczka', 'Хитрість: «ж»', 'Хитрость: «ж»'),
          text: l('Słychać „ж”? Często ż.', 'Чуєш «ж»? Часто ż.', 'Слышишь «ж»? Часто ż.'),
          examples: ['жаба → [ż]aba', 'жарт → [ż]art', 'ніж · нож → nó[ż]']
        }
      }),
    boss('boss', rzItems)
  ]
}

/* ---------- CH / H ---------- */
export const chExercise: Exercise = {
  slug: 'ch-h',
  group: 'litery',
  icon: 'ch',
  color: 'var(--g3)',
  soft: 'var(--g3-soft)',
  title: l('Ch czy h?', 'Ch чи h?', 'Ch или h?'),
  lead: l(
    'Brzmią prawie tak samo. Pomaga sz… i ukraiński!',
    'Звучать майже однаково. Допомагає sz… і українська!',
    'Звучат почти одинаково. Помогает sz… и русский!'
  ),
  badge: l('Mistrz Ch', 'Майстер Ch', 'Мастер Ch'),
  levels: [
    level('alt', 'ch→sz',
      l('Ch zmienia się w sz', 'Ch змінюється на sz', 'Ch меняется на sz'),
      l(
        'W innej formie słychać sz? Piszemy ch.',
        'В іншій формі чути sz? Пишемо ch.',
        'В другой форме слышно sz? Пишем ch.'
      ),
      ['mu[ch]a → mu[sz]e', 'u[ch]o → u[sz]y', 'su[ch]y → su[sz]a'],
      by(chItems, 'alt'), by(chItems, 'memoH'), {}, 5),
    level('end', '…ch',
      l('Ch na końcu i po s', 'Ch у кінці та після s', 'Ch в конце и после s'),
      l(
        'Na końcu słowa i po literze s piszemy ch. Jedyny wyjątek: druh.',
        'У кінці слова і після літери s пишемо ch. Єдиний виняток: druh.',
        'В конце слова и после буквы s пишем ch. Единственное исключение: druh.'
      ),
      ['da[ch]', 'stra[ch]', 's[ch]ody'],
      by(chItems, 'end', 's'), by(chItems, 'memoH')),
    level('memoCh', 'х=ch',
      l('Ukraińskie „х” = ch', 'Українське «х» = ch', 'Русское «х» = ch'),
      l(
        'Słowa do zapamiętania. Po ukraińsku i rosyjsku jest w nich „х”.',
        'Слова, які треба запам’ятати. Українською в них «х»: хліб → chleb.',
        'Слова, которые надо запомнить. По-русски в них «х»: хлеб → chleb.'
      ),
      ['хліб · хлеб → [ch]leb', 'хмара → [ch]mura', 'кухня → ku[ch]nia'],
      by(chItems, 'memoCh'), by(chItems, 'memoH')),
    level('h', 'г=h',
      l('H — słowa obce i „г”', 'H — запозичення і «г»', 'H — заимствования и «г»'),
      l(
        'H jest często w słowach z innych języków. Po ukraińsku jest tam „г”.',
        'H часто буває в запозиченнях. Українською там «г»: готель → hotel.',
        'H часто бывает в заимствованиях. По-русски там иногда «г»: гимн → hymn.'
      ),
      ['готель → [h]otel', 'гумор → [h]umor', 'гімн · гимн → [h]ymn', 'dru[h] → dru[ż]yna'],
      by(chItems, 'altH', 'memoH'), by(chItems, 'memoCh')),
    boss('boss', chItems)
  ]
}
