import type { L } from '~/types/content'
import type { Exercise, Item, Level } from './types'

const l = (pl: string, uk: string, ru: string): L => ({ pl, uk, ru })

/* ================================================================
   Przypadki rzeczownika — 7 przypadków.
   Po ukraińsku też jest 7 (з кличним), po rosyjsku 6.
   ================================================================ */

export type CaseId = 'M' | 'D' | 'C' | 'B' | 'N' | 'Ms' | 'W'

interface CaseInfo {
  id: CaseId
  name: L
  q: string
  /** zdanie-pomocnik: „Nie ma…”, „Widzę…” */
  helper: string
  use: L
  examples: string[]
}

export const cases: CaseInfo[] = [
  {
    id: 'M', name: l('Mianownik', 'називний', 'именительный'), q: 'kto? co?', helper: 'To jest…',
    use: l(
      'Forma ze słownika. Tak nazywamy tego, kto coś robi.',
      'Словникова форма. Так називаємо того, хто щось робить.',
      'Словарная форма. Так называем того, кто что-то делает.'
    ),
    examples: ['To jest [kot].', '[Mama] czyta.', '[Okno] jest otwarte.']
  },
  {
    id: 'D', name: l('Dopełniacz', 'родовий', 'родительный'), q: 'kogo? czego?', helper: 'Nie ma…',
    use: l(
      'Po „nie ma”, po przeczeniu i po: do, bez, od, z (skąd?), dla, obok, u, koło.',
      'Після «nie ma», після заперечення та після: do, bez, od, z (звідки?), dla, obok, u, koło.',
      'После «nie ma», после отрицания и после: do, bez, od, z (откуда?), dla, obok, u, koło.'
    ),
    examples: ['Nie ma [kota].', 'Idę do [mamy].', 'Wracam ze [szkoły].']
  },
  {
    id: 'C', name: l('Celownik', 'давальний', 'дательный'), q: 'komu? czemu?', helper: 'Daję…',
    use: l(
      'Komu coś dajemy, pomagamy, dziękujemy, wierzymy.',
      'Кому щось даємо, допомагаємо, дякуємо, віримо.',
      'Кому что-то даём, помогаем, благодарим (dziękować komu!), верим.'
    ),
    examples: ['Daję mleko [kotu].', 'Pomagam [mamie].', 'Dziękuję [koledze].']
  },
  {
    id: 'B', name: l('Biernik', 'знахідний', 'винительный'), q: 'kogo? co?', helper: 'Widzę…',
    use: l(
      'Kogo lub co widzę, mam, lubię, kupuję. Po: na (dokąd?), przez, za.',
      'Кого чи що бачу, маю, люблю, купую. Після: na (куди?), przez, za.',
      'Кого или что вижу, имею, люблю, покупаю. После: na (куда?), przez, za.'
    ),
    examples: ['Widzę [kota].', 'Kocham [mamę].', 'Myję [okno].']
  },
  {
    id: 'N', name: l('Narzędnik', 'орудний', 'творительный'), q: '(z) kim? (z) czym?', helper: 'Idę z…',
    use: l(
      'Z kim, czym coś robimy. Po „być”: jestem uczniem. Po: z, nad, pod, przed, za, między.',
      'З ким, чим щось робимо. Після «być»: jestem uczniem. Після: z, nad, pod, przed, za, między.',
      'С кем, чем что-то делаем. После «być»: jestem uczniem. После: z, nad, pod, przed, za, między.'
    ),
    examples: ['Bawię się z [kotem].', 'Idę z [mamą].', 'Siedzę pod [oknem].']
  },
  {
    id: 'Ms', name: l('Miejscownik', 'місцевий', 'предложный'), q: 'o kim? o czym?', helper: 'Myślę o…',
    use: l(
      'Zawsze z przyimkiem: o, w, na (gdzie?), przy, po.',
      'Завжди з прийменником: o, w, na (де?), przy, po.',
      'Всегда с предлогом: o, w, na (где?), przy, po.'
    ),
    examples: ['Myślę o [kocie].', 'Mówię o [mamie].', 'Kwiat stoi na [oknie].']
  },
  {
    id: 'W', name: l('Wołacz', 'кличний', 'звательный'), q: 'o!', helper: 'Hej, …!',
    use: l(
      'Gdy wołamy kogoś lub zwracamy się do kogoś.',
      'Коли кличемо когось або звертаємося до когось — як український кличний: мамо!',
      'Когда зовём кого-то или обращаемся к кому-то. По-русски почти нет («мам!»), а в польском — обязательно.'
    ),
    examples: ['[Kocie], chodź tu!', '[Mamo], pomóż mi!', '[Piotrze], gdzie jesteś?']
  }
]

const byId = Object.fromEntries(cases.map(c => [c.id, c])) as Record<CaseId, CaseInfo>
const caseOpts: L[] = cases.map(c => c.name)

/** Krótkie wyjaśnienia pułapek. */
const notes = {
  neg: l(
    'Po przeczeniu biernik zmienia się w dopełniacz: mam kanapkę → nie mam kanapki.',
    'Після заперечення знахідний стає родовим: mam kanapkę → nie mam kanapki.',
    'После отрицания винительный становится родительным: mam kanapkę → nie mam kanapki.'
  ),
  verbD: l(
    'Szukać, słuchać, używać, uczyć się, bać się, potrzebować — zawsze z dopełniaczem.',
    'Szukać, słuchać, używać, uczyć się, bać się, potrzebować — завжди з родовим (а українською «слухаю музику» — знахідний!).',
    'Szukać, słuchać, używać, uczyć się, bać się, potrzebować — всегда с родительным (а по-русски «слушаю музыку» — винительный!).'
  ),
  byc: l(
    'Po „być” (jestem, jesteś…) rzeczownik jest w narzędniku.',
    'Після «być» (jestem, jesteś…) іменник в орудному: jestem uczniem — я учень.',
    'После «być» (jestem, jesteś…) существительное в творительном: jestem uczniem — я ученик.'
  ),
  anim: l(
    'Dla żywych rodzaju męskiego biernik = dopełniacz (widzę psa, kota). Sprawdź pytaniem.',
    'Для живих чоловічого роду знахідний = родовий (widzę psa, kota). Перевір питанням.',
    'Для одушевлённых мужского рода винительный = родительный (widzę psa, kota). Проверь вопросом.'
  ),
  inan: l(
    'Dla rzeczy rodzaju męskiego biernik = mianownik (widzę samolot, kupiłem chleb).',
    'Для неживих чоловічого роду знахідний = називний (widzę samolot, kupiłem chleb).',
    'Для неодушевлённых мужского рода винительный = именительный (widzę samolot, kupiłem chleb).'
  ),
  dzieki: l(
    'Dziękować komu? — celownik.',
    'Dziękować komu? — давальний, як «дякувати кому».',
    'Dziękować komu? — дательный (а по-русски «благодарить кого»!).'
  ),
  gdzie: l(
    'W, na + gdzie? → miejscownik.',
    'W, na + де? → місцевий.',
    'W, na + где? → предложный.'
  ),
  dokad: l(
    'Do + dokąd? → dopełniacz.',
    'Do + куди? → родовий.',
    'Do + куда? → родительный.'
  )
}
type Note = keyof typeof notes

function caseHint(c: CaseId, note?: Note): L {
  const k = byId[c]
  const base = l(
    `Pytamy: ${k.q} → ${k.name.pl.toLowerCase()}.`,
    `Питаємо: ${k.q} → ${k.name.pl.toLowerCase()} (${k.name.uk}).`,
    `Спрашиваем: ${k.q} → ${k.name.pl.toLowerCase()} (${k.name.ru}).`
  )
  if (!note) return base
  const n = notes[note]
  return l(`${base.pl} ${n.pl}`, `${base.uk} ${n.uk}`, `${base.ru} ${n.ru}`)
}

function split(s: string, open: string, close: string) {
  const a = s.indexOf(open)
  const b = s.indexOf(close, a)
  if (a < 0 || b < 0) throw new Error(`Bad sentence: ${s}`)
  return { pre: s.slice(0, a), mid: s.slice(a + 1, b), post: s.slice(b + 1) }
}

/** „Który to przypadek?”: słowo w [nawiasach]. */
function which(s: string, c: CaseId, uk: string, ru: string, note?: Note): Item {
  const { pre, mid, post } = split(s, '[', ']')
  return {
    pre, post, mark: mid,
    opts: caseOpts,
    answer: cases.findIndex(x => x.id === c),
    hint: caseHint(c, note),
    proof: `${byId[c].helper} ${byId[c].q}`,
    tr: { uk, ru },
    say: `${pre}${mid}${post}`,
    tag: c
  }
}

/** „Wstaw dobrą formę”: odpowiedź w (nawiasach), opcje — formy tego słowa. */
function form(s: string, opts: string[], c: CaseId, uk: string, ru: string, note?: Note): Item {
  const { pre, mid, post } = split(s, '(', ')')
  /* na początku zdania — wielka litera we wszystkich opcjach */
  if (mid[0] !== mid[0]!.toLowerCase()) opts = opts.map(o => o[0]!.toUpperCase() + o.slice(1))
  const answer = opts.indexOf(mid)
  if (answer < 0) throw new Error(`No answer in opts: ${s}`)
  const tag = note === 'neg' || note === 'verbD' ? 'trap' : c
  return { pre, post, opts, answer, hint: caseHint(c, note), proof: `${byId[c].name.pl}: ${byId[c].q}`, tr: { uk, ru }, tag }
}

const whichItems: Item[] = [
  which('[Kot] śpi na kanapie.', 'M', 'Кіт спить на дивані.', 'Кот спит на диване.'),
  which('[Dzieci] bawią się w parku.', 'M', 'Діти граються в парку.', 'Дети играют в парке.'),
  which('Nie mam [czasu].', 'D', 'У мене немає часу.', 'У меня нет времени.'),
  which('Idę do [szkoły].', 'D', 'Я йду до школи.', 'Я иду в школу.', 'dokad'),
  which('Nie widzę [psa].', 'D', 'Я не бачу собаки.', 'Я не вижу собаку.', 'neg'),
  which('Szukam [kluczy].', 'D', 'Я шукаю ключі.', 'Я ищу ключи.', 'verbD'),
  which('Słucham [muzyki].', 'D', 'Я слухаю музику.', 'Я слушаю музыку.', 'verbD'),
  which('Boję się [pająków].', 'D', 'Я боюся павуків.', 'Я боюсь пауков.', 'verbD'),
  which('Daję prezent [mamie].', 'C', 'Я даю подарунок мамі.', 'Я дарю подарок маме.'),
  which('Pomagam [babci].', 'C', 'Я допомагаю бабусі.', 'Я помогаю бабушке.'),
  which('Dziękuję [nauczycielce].', 'C', 'Я дякую вчительці.', 'Я благодарю учительницу.', 'dzieki'),
  which('Widzę [psa].', 'B', 'Я бачу собаку.', 'Я вижу собаку.', 'anim'),
  which('Lubię [lody].', 'B', 'Я люблю морозиво.', 'Я люблю мороженое.'),
  which('Kupiłem [chleb].', 'B', 'Я купив хліб.', 'Я купил хлеб.', 'inan'),
  which('Mam [kanapkę].', 'B', 'У мене є бутерброд.', 'У меня есть бутерброд.'),
  which('Piszę [długopisem].', 'N', 'Я пишу ручкою.', 'Я пишу ручкой.'),
  which('Idę z [bratem].', 'N', 'Я йду з братом.', 'Я иду с братом.'),
  which('Jestem [uczniem].', 'N', 'Я учень.', 'Я ученик.', 'byc'),
  which('Interesuję się [historią].', 'N', 'Я цікавлюся історією.', 'Я интересуюсь историей.'),
  which('Mieszkam w [Warszawie].', 'Ms', 'Я живу у Варшаві.', 'Я живу в Варшаве.', 'gdzie'),
  which('Myślę o [wakacjach].', 'Ms', 'Я думаю про канікули.', 'Я думаю о каникулах.'),
  which('Rozmawiamy o [filmie].', 'Ms', 'Ми говоримо про фільм.', 'Мы говорим о фильме.'),
  which('Książka leży na [stole].', 'Ms', 'Книжка лежить на столі.', 'Книга лежит на столе.', 'gdzie'),
  which('[Mamo], gdzie jest klucz?', 'W', 'Мамо, де ключ?', 'Мама, где ключ?'),
  which('[Piotrze], chodź tutaj!', 'W', 'Петре, іди сюди!', 'Пётр, иди сюда!')
]

const formItems: Item[] = [
  form('Idę do (szkoły).', ['szkoła', 'szkoły', 'szkole', 'szkołę', 'szkołą'], 'D', 'Я йду до школи.', 'Я иду в школу.', 'dokad'),
  form('Mieszkam w (Krakowie).', ['Kraków', 'Krakowa', 'Krakowem', 'Krakowie'], 'Ms', 'Я живу в Кракові.', 'Я живу в Кракове.', 'gdzie'),
  form('Nie mam (kanapki).', ['kanapka', 'kanapki', 'kanapkę', 'kanapką'], 'D', 'У мене немає бутерброда.', 'У меня нет бутерброда.', 'neg'),
  form('Mam (kanapkę).', ['kanapka', 'kanapki', 'kanapkę', 'kanapką'], 'B', 'У мене є бутерброд.', 'У меня есть бутерброд.'),
  form('Jadę do szkoły (rowerem).', ['rower', 'roweru', 'rowerem', 'rowerze'], 'N', 'Я їду до школи на велосипеді.', 'Я еду в школу на велосипеде.'),
  form('Rozmawiam z (koleżanką).', ['koleżanka', 'koleżanki', 'koleżance', 'koleżanką'], 'N', 'Я розмовляю з подругою.', 'Я разговариваю с подругой.'),
  form('Daję kwiaty (mamie).', ['mama', 'mamy', 'mamie', 'mamę'], 'C', 'Я даю квіти мамі.', 'Я дарю цветы маме.'),
  form('Szukam (telefonu).', ['telefon', 'telefonu', 'telefonem', 'telefonie'], 'D', 'Я шукаю телефон.', 'Я ищу телефон.', 'verbD'),
  form('Słucham (muzyki).', ['muzyka', 'muzyki', 'muzykę', 'muzyką'], 'D', 'Я слухаю музику.', 'Я слушаю музыку.', 'verbD'),
  form('Uczę się (matematyki).', ['matematyka', 'matematyki', 'matematykę', 'matematyką'], 'D', 'Я вчу математику.', 'Я учу математику.', 'verbD'),
  form('Nie lubię (mleka).', ['mleko', 'mleka', 'mleku', 'mlekiem'], 'D', 'Я не люблю молока.', 'Я не люблю молоко.', 'neg'),
  form('Piszę list do (babci).', ['babcia', 'babci', 'babcię', 'babcią'], 'D', 'Я пишу листа бабусі.', 'Я пишу письмо бабушке.', 'dokad'),
  form('Myślę o (wakacjach).', ['wakacje', 'wakacji', 'wakacjami', 'wakacjach'], 'Ms', 'Я думаю про канікули.', 'Я думаю о каникулах.'),
  form('Jestem (uczniem).', ['uczeń', 'ucznia', 'uczniowi', 'uczniem'], 'N', 'Я учень.', 'Я ученик.', 'byc'),
  form('(Kasiu), chodź na obiad!', ['Kasia', 'Kasi', 'Kasię', 'Kasiu'], 'W', 'Касю, йди обідати!', 'Катя, иди обедать!'),
  form('Boję się (psa).', ['pies', 'psa', 'psu', 'psem'], 'D', 'Я боюся собаки.', 'Я боюсь собаки.', 'verbD'),
  form('Dziękuję (koledze) za pomoc.', ['kolega', 'kolegi', 'koledze', 'kolegę'], 'C', 'Я дякую другові за допомогу.', 'Я благодарю друга за помощь.', 'dzieki'),
  form('Kot śpi na (kanapie).', ['kanapa', 'kanapy', 'kanapę', 'kanapie'], 'Ms', 'Кіт спить на дивані.', 'Кот спит на диване.', 'gdzie'),
  form('Widzę (samolot).', ['samolot', 'samolotu', 'samolotem', 'samolocie'], 'B', 'Я бачу літак.', 'Я вижу самолёт.', 'inan'),
  form('Nie widzę (samolotu).', ['samolot', 'samolotu', 'samolotem', 'samolocie'], 'D', 'Я не бачу літака.', 'Я не вижу самолёта.', 'neg'),
  form('Interesuję się (sportem).', ['sport', 'sportu', 'sportem', 'sporcie'], 'N', 'Я цікавлюся спортом.', 'Я интересуюсь спортом.'),
  form('Pomagam (bratu).', ['brat', 'brata', 'bratu', 'bratem'], 'C', 'Я допомагаю братові.', 'Я помогаю брату.'),
  form('Opowiadam o (psie).', ['pies', 'psa', 'psu', 'psie'], 'Ms', 'Я розповідаю про собаку.', 'Я рассказываю о собаке.'),
  form('Używam (komputera).', ['komputer', 'komputera', 'komputerem', 'komputerze'], 'D', 'Я користуюся комп’ютером.', 'Я пользуюсь компьютером.', 'verbD'),
  form('Lubię (Polskę).', ['Polska', 'Polski', 'Polskę', 'Polsce'], 'B', 'Я люблю Польщу.', 'Я люблю Польшу.'),
  form('Mieszkamy w (Polsce).', ['Polska', 'Polski', 'Polskę', 'Polsce'], 'Ms', 'Ми живемо в Польщі.', 'Мы живём в Польше.', 'gdzie'),
  /* M */
  form('(Kot) śpi na kanapie.', ['kot', 'kota', 'kotem', 'kocie'], 'M', 'Кіт спить на дивані.', 'Кот спит на диване.'),
  form('(Mama) gotuje obiad.', ['mama', 'mamy', 'mamie', 'mamą'], 'M', 'Мама готує обід.', 'Мама готовит обед.'),
  form('To jest mój (brat).', ['brat', 'brata', 'bratu', 'bratem'], 'M', 'Це мій брат.', 'Это мой брат.'),
  form('(Pies) głośno szczeka.', ['pies', 'psa', 'psu', 'psem'], 'M', 'Собака голосно гавкає.', 'Собака громко лает.'),
  form('(Słońce) świeci.', ['słońce', 'słońca', 'słońcu', 'słońcem'], 'M', 'Сонце світить.', 'Солнце светит.'),
  form('Moja (szkoła) jest duża.', ['szkoła', 'szkoły', 'szkole', 'szkołę'], 'M', 'Моя школа велика.', 'Моя школа большая.'),
  /* D */
  form('Nie ma (mamy) w domu.', ['mama', 'mamy', 'mamie', 'mamą'], 'D', 'Мами немає вдома.', 'Мамы нет дома.'),
  form('Kupiłem prezent dla (siostry).', ['siostra', 'siostry', 'siostrze', 'siostrą'], 'D', 'Я купив подарунок для сестри.', 'Я купил подарок для сестры.'),
  form('Mieszkam obok (parku).', ['park', 'parku', 'parkowi', 'parkiem'], 'D', 'Я живу біля парку.', 'Я живу рядом с парком.'),
  form('Piję herbatę bez (cukru).', ['cukier', 'cukru', 'cukrem', 'cukrze'], 'D', 'Я п’ю чай без цукру.', 'Я пью чай без сахара.'),
  form('Poproszę szklankę (wody).', ['woda', 'wody', 'wodzie', 'wodą'], 'D', 'Склянку води, будь ласка.', 'Стакан воды, пожалуйста.'),
  /* C */
  form('Kupiłem (psu) nową piłkę.', ['pies', 'psa', 'psu', 'psem'], 'C', 'Я купив собаці новий м’яч.', 'Я купил собаке новый мяч.'),
  form('Wierzę (przyjacielowi).', ['przyjaciel', 'przyjaciela', 'przyjacielowi', 'przyjacielem'], 'C', 'Я вірю другові.', 'Я верю другу.'),
  form('Przyglądam się (obrazowi).', ['obraz', 'obrazu', 'obrazowi', 'obrazem'], 'C', 'Я розглядаю картину.', 'Я рассматриваю картину.'),
  form('Czytam bajkę (siostrze).', ['siostra', 'siostry', 'siostrze', 'siostrą'], 'C', 'Я читаю казку сестрі.', 'Я читаю сказку сестре.'),
  /* B */
  form('Kocham (mamę).', ['mama', 'mamy', 'mamie', 'mamę'], 'B', 'Я люблю маму.', 'Я люблю маму.'),
  form('Czytam ciekawą (książkę).', ['książka', 'książki', 'książkę', 'książką'], 'B', 'Я читаю цікаву книжку.', 'Я читаю интересную книгу.'),
  form('Widzę (psa).', ['pies', 'psa', 'psu', 'psem'], 'B', 'Я бачу собаку.', 'Я вижу собаку.', 'anim'),
  form('Jem pyszną (zupę).', ['zupa', 'zupy', 'zupie', 'zupę'], 'B', 'Я їм смачний суп.', 'Я ем вкусный суп.'),
  /* N */
  form('Piszę (długopisem).', ['długopis', 'długopisu', 'długopisem', 'długopisie'], 'N', 'Я пишу ручкою.', 'Я пишу ручкой.'),
  form('Kot śpi pod (stołem).', ['stół', 'stołu', 'stołem', 'stole'], 'N', 'Кіт спить під столом.', 'Кот спит под столом.'),
  form('Mój tata jest (lekarzem).', ['lekarz', 'lekarza', 'lekarzowi', 'lekarzem'], 'N', 'Мій тато — лікар.', 'Мой папа — врач.', 'byc'),
  /* Ms */
  form('Książka leży na (stole).', ['stół', 'stołu', 'stołem', 'stole'], 'Ms', 'Книжка лежить на столі.', 'Книга лежит на столе.', 'gdzie'),
  form('Rozmawiamy o (filmie).', ['film', 'filmu', 'filmem', 'filmie'], 'Ms', 'Ми говоримо про фільм.', 'Мы говорим о фильме.'),
  /* W */
  form('(Mamo), pomóż mi!', ['mama', 'mamy', 'mamę', 'mamo'], 'W', 'Мамо, допоможи мені!', 'Мама, помоги мне!'),
  form('(Piotrze), chodź tutaj!', ['Piotr', 'Piotra', 'Piotrem', 'Piotrze'], 'W', 'Петре, іди сюди!', 'Пётр, иди сюда!'),
  form('(Tato), gdzie jesteś?', ['tata', 'taty', 'tatą', 'tato'], 'W', 'Тату, де ти?', 'Папа, где ты?'),
  form('Cześć, (Marku)!', ['Marek', 'Marka', 'Markiem', 'Marku'], 'W', 'Привіт, Марку!', 'Привет, Марк!'),
  form('(Babciu), dziękuję!', ['babcia', 'babci', 'babcią', 'babciu'], 'W', 'Бабусю, дякую!', 'Бабушка, спасибо!'),
  form('Pani (Anno), mam pytanie.', ['Anna', 'Anny', 'Anną', 'Anno'], 'W', 'Пані Анно, у мене питання.', 'Пани Анна, у меня вопрос.')
]

/* ================================================================
   Poziomy: jeden przypadek = jeden poziom
   ================================================================ */

const FORM_PROMPT = l('Które słowo pasuje?', 'Яке слово підходить?', 'Какое слово подходит?')
const WHICH_PROMPT = l('Jaki to przypadek?', 'Який це відмінок?', 'Какой это падеж?')
const tagged = (...tags: string[]) => formItems.filter(i => tags.includes(i.tag))

const ukQ: Record<CaseId, [string, string]> = {
  M: ['хто? що?', 'кто? что?'],
  D: ['кого? чого?', 'кого? чего?'],
  C: ['кому? чому?', 'кому? чему?'],
  B: ['кого? що?', 'кого? что?'],
  N: ['ким? чим?', 'кем? чем?'],
  Ms: ['на кому? на чому?', 'о ком? о чём?'],
  W: ['мамо! тату!', '(мам! пап!)']
}

const caseLevels: Level[] = cases.map((c, i) => {
  const prev = cases.slice(0, i).map(x => x.id)
  return {
    id: c.id,
    icon: c.id,
    title: l(`${c.name.pl}: ${c.q}`, `${c.name.pl} — ${c.name.uk}`, `${c.name.pl} — ${c.name.ru}`),
    rule: c.use,
    examples: c.examples,
    tip: {
      title: l(`${c.helper} ${c.q}`, `${c.helper} ${c.q}`, `${c.helper} ${c.q}`),
      text: l(
        `Zapamiętaj zdanie-pomocnika: „${c.helper} ${c.q}”.`,
        c.id === 'W'
          ? 'Як український кличний: мамо! тату! Петре!'
          : `Українською це ${c.name.uk} відмінок: ${ukQ[c.id][0]}`,
        c.id === 'W'
          ? 'В русском такого падежа почти нет («мам!»), а в польском он обязателен.'
          : `По-русски это ${c.name.ru} падеж: ${ukQ[c.id][1]}`
      )
    },
    game: {
      id: c.id,
      prompt: FORM_PROMPT,
      size: 'sentence',
      items: tagged(c.id),
      round: 5,
      review: prev.length ? tagged(...prev) : undefined,
      reviewN: prev.length ? 1 : 0
    }
  }
})

export const przypadkiExercise: Exercise = {
  slug: 'przypadki',
  group: 'przypadki',
  icon: '7',
  color: 'var(--g6)',
  soft: 'var(--g6-soft)',
  title: l('Przypadki rzeczownika', 'Відмінки іменника', 'Падежи существительного'),
  lead: l(
    'Siedem przypadków — siedem poziomów. Jeden przypadek naraz, potem pułapki i boss.',
    'Сім відмінків — сім рівнів. По одному відмінку, потім пастки і бос.',
    'Семь падежей — семь уровней. По одному падежу, потом ловушки и босс.'
  ),
  badge: l('Mistrz przypadków', 'Майстер відмінків', 'Мастер падежей'),
  levels: [
    ...caseLevels,
    {
      id: 'trap',
      icon: '⚠',
      title: l('Pułapki', 'Пастки', 'Ловушки'),
      rule: l(
        'Po „nie” biernik zmienia się w dopełniacz. Szukać, słuchać, uczyć się, bać się, używać — zawsze z dopełniaczem.',
        'Після «nie» знахідний стає родовим. Szukać, słuchać, uczyć się, bać się, używać — завжди з родовим.',
        'После «nie» винительный становится родительным. Szukać, słuchać, uczyć się, bać się, używać — всегда с родительным.'
      ),
      examples: ['Mam [kanapkę]. → Nie mam [kanapki].', 'Słucham [muzyki].', 'Szukam [telefonu].'],
      tip: {
        title: l('Uwaga', 'Увага: не як в українській', 'Внимание: не как в русском'),
        text: l(
          'Po ukraińsku i rosyjsku tu jest inny przypadek — łatwo się pomylić.',
          'Українською «слухаю музику», «шукаю телефон» — знахідний. А польською — родовий!',
          'По-русски «слушаю музыку», «ищу телефон» — винительный. А по-польски — родительный!'
        ),
        examples: ['слухаю музику → słucham [muzyki]']
      },
      game: { id: 'trap', prompt: FORM_PROMPT, size: 'sentence', items: tagged('trap'), round: 6 }
    },
    {
      id: 'which',
      icon: '👑',
      boss: true,
      title: l('Boss: jaki to przypadek?', 'Бос: який це відмінок?', 'Босс: какой это падеж?'),
      rule: l(
        'Zadaj pytanie do wyróżnionego słowa — i wybierz przypadek.',
        'Постав питання до виділеного слова — і обери відмінок.',
        'Задай вопрос к выделенному слову — и выбери падеж.'
      ),
      examples: [],
      game: { id: 'which', prompt: WHICH_PROMPT, size: 'sentence', items: whichItems, round: 10 }
    },
    {
      id: 'forms',
      icon: '👑',
      boss: true,
      title: l('Boss: wstaw formę', 'Бос: встав форму', 'Босс: вставь форму'),
      rule: l(
        'Wszystkie przypadki naraz. Zadaj pytanie i wybierz dobrą formę.',
        'Усі відмінки разом. Постав питання і обери правильну форму.',
        'Все падежи вместе. Задай вопрос и выбери правильную форму.'
      ),
      examples: [],
      game: { id: 'forms', prompt: FORM_PROMPT, size: 'sentence', items: formItems, round: 10 }
    }
  ],
  table: {
    caption: l('Odmiana: kot, mama, okno', 'Відмінювання: kot, mama, okno', 'Склонение: kot, mama, okno'),
    head: [l('Przypadek', 'Відмінок', 'Падеж'), l('Pytania', 'Питання', 'Вопросы'), l('kot', 'кіт', 'кот'), l('mama', 'мама', 'мама'), l('okno', 'вікно', 'окно')],
    rows: [
      [cases[0]!.name, 'kto? co?', 'kot', 'mama', 'okno'],
      [cases[1]!.name, 'kogo? czego?', 'kota', 'mamy', 'okna'],
      [cases[2]!.name, 'komu? czemu?', 'kotu', 'mamie', 'oknu'],
      [cases[3]!.name, 'kogo? co?', 'kota', 'mamę', 'okno'],
      [cases[4]!.name, 'z kim? z czym?', 'kotem', 'mamą', 'oknem'],
      [cases[5]!.name, 'o kim? o czym?', 'kocie', 'mamie', 'oknie'],
      [cases[6]!.name, 'o!', 'kocie!', 'mamo!', 'okno!']
    ]
  }
}
