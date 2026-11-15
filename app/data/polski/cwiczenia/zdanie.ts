import type { L } from '~/types/content'
import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, mark, tip } from './helpers'

/* ================================================================
   ZDANIE — Mrowisko Zdań, przewodniczka: Mrówka Marta
   (mrówki budują razem — jak słowa budują zdanie)
   ================================================================ */

/* ---------- 1. Zdanie czy równoważnik? ---------- */
const ZR: L[] = [
  { pl: 'zdanie (jest czasownik)', uk: 'речення (є дієслово)', ru: 'предложение (есть глагол)' },
  { pl: 'równoważnik (bez czasownika)', uk: 'еквівалент (без дієслова)', ru: 'эквивалент (без глагола)' }
]
const zrHint = [
  l('Jest czasownik (co robi?) — to zdanie.', 'Є дієслово (що робить?) — це речення.', 'Есть глагол (что делает?) — это предложение.'),
  l('Nie ma czasownika, ale wszystko rozumiemy — to równoważnik zdania.', 'Немає дієслова, але все зрозуміло — це еквівалент речення (równoważnik).', 'Нет глагола, но всё понятно — это эквивалент предложения (równoważnik).')
]
const zr = (s: string, k: 0 | 1, uk: string, ru: string): Item =>
  ({ pre: '', post: '', mark: s, opts: ZR, answer: k, hint: zrHint[k]!, tr: { uk, ru }, say: s, tag: `z${k}` })
const zrItems: Item[] = [
  zr('Pada deszcz.', 0, 'Падає дощ.', 'Идёт дождь.'),
  zr('Cisza!', 1, 'Тиша!', 'Тишина!'),
  zr('Uwaga, pies!', 1, 'Увага, собака!', 'Осторожно, собака!'),
  zr('Dzieci bawią się w ogrodzie.', 0, 'Діти граються в саду.', 'Дети играют в саду.'),
  zr('Smacznego!', 1, 'Смачного!', 'Приятного аппетита!'),
  zr('Idę do domu.', 0, 'Я йду додому.', 'Я иду домой.'),
  zr('Pożar!', 1, 'Пожежа!', 'Пожар!'),
  zr('Kot śpi.', 0, 'Кіт спить.', 'Кот спит.'),
  zr('Dzień dobry!', 1, 'Добрий день!', 'Добрый день!'),
  zr('Mama gotuje zupę.', 0, 'Мама варить суп.', 'Мама варит суп.')
]

/* ---------- 2. Kropka, pytajnik, wykrzyknik ---------- */
const punHint = {
  '.': l('Zdanie oznajmujące — coś mówimy. Na końcu kropka.', 'Розповідне речення — щось повідомляємо. У кінці крапка.', 'Повествовательное предложение — что-то сообщаем. В конце точка.'),
  '?': l('Zdanie pytające — pytamy (czy, gdzie, kto…). Na końcu pytajnik.', 'Питальне речення — питаємо (czy, gdzie, kto…). У кінці знак питання.', 'Вопросительное предложение — спрашиваем (czy, gdzie, kto…). В конце вопросительный знак.'),
  '!': l('Zdanie rozkazujące albo z emocjami — na końcu wykrzyknik.', 'Спонукальне або емоційне речення — у кінці знак оклику.', 'Побудительное или эмоциональное предложение — в конце восклицательный знак.')
}
const P = ['.', '?', '!']
const pun = (s: string, k: '.' | '?' | '!', uk: string, ru: string) => gap(`${s}(${k})`, P, punHint[k], k, uk, ru)
const punItems: Item[] = [
  pun('Czy masz kota', '?', 'Чи є в тебе кіт?', 'У тебя есть кот?'),
  pun('Zamknij drzwi', '!', 'Зачини двері!', 'Закрой дверь!'),
  pun('Mam psa', '.', 'У мене є пес.', 'У меня есть собака.'),
  pun('Gdzie jest mama', '?', 'Де мама?', 'Где мама?'),
  pun('Uważaj', '!', 'Обережно!', 'Осторожно!'),
  pun('Dziś pada deszcz', '.', 'Сьогодні падає дощ.', 'Сегодня идёт дождь.'),
  pun('Kto to zrobił', '?', 'Хто це зробив?', 'Кто это сделал?'),
  pun('Mieszkam w Polsce', '.', 'Я живу в Польщі.', 'Я живу в Польше.'),
  pun('Pomocy', '!', 'Допоможіть!', 'Помогите!'),
  pun('Ile masz lat', '?', 'Скільки тобі років?', 'Сколько тебе лет?')
]

/* ---------- 3. Podmiot i orzeczenie ---------- */
const PO: L[] = [
  { pl: 'podmiot (kto? co?)', uk: 'підмет (хто? що?)', ru: 'подлежащее (кто? что?)' },
  { pl: 'orzeczenie (co robi?)', uk: 'присудок (що робить?)', ru: 'сказуемое (что делает?)' },
  { pl: 'inna część zdania', uk: 'інший член речення', ru: 'другой член предложения' }
]
const poHint = [
  l('Kto? co? robi — to podmiot (główna osoba lub rzecz).', 'Хто? що? робить — це підмет (головна особа чи річ).', 'Кто? что? делает — это подлежащее (главное лицо или предмет).'),
  l('Co robi podmiot? — to orzeczenie (zwykle czasownik).', 'Що робить підмет? — це присудок (зазвичай дієслово).', 'Что делает подлежащее? — это сказуемое (обычно глагол).'),
  l('To słowo nie jest podmiotem ani orzeczeniem — opisuje coś więcej.', 'Це слово не підмет і не присудок — воно щось уточнює.', 'Это слово не подлежащее и не сказуемое — оно что-то уточняет.')
]
const po = (s: string, k: 0 | 1 | 2, uk: string, ru: string) => mark(s, PO, k, poHint[k]!, `po${k}`, uk, ru)
const poItems: Item[] = [
  po('[Kot] śpi na kanapie.', 0, 'Кіт спить на дивані.', 'Кот спит на диване.'),
  po('Kot [śpi] na kanapie.', 1, 'Кіт спить на дивані.', 'Кот спит на диване.'),
  po('Kot śpi na [kanapie].', 2, 'Кіт спить на дивані.', 'Кот спит на диване.'),
  po('[Dzieci] grają w piłkę.', 0, 'Діти грають у м’яч.', 'Дети играют в мяч.'),
  po('Dzieci [grają] w piłkę.', 1, 'Діти грають у м’яч.', 'Дети играют в мяч.'),
  po('Mama gotuje [obiad].', 2, 'Мама готує обід.', 'Мама готовит обед.'),
  po('[Słońce] świeci jasno.', 0, 'Сонце яскраво світить.', 'Солнце ярко светит.'),
  po('Słońce [świeci] jasno.', 1, 'Сонце яскраво світить.', 'Солнце ярко светит.'),
  po('Wczoraj [padał] deszcz.', 1, 'Учора падав дощ.', 'Вчера шёл дождь.'),
  po('Wczoraj padał [deszcz].', 0, 'Учора падав дощ.', 'Вчера шёл дождь.')
]

/* ---------- 4. Przydawka, dopełnienie, okolicznik ---------- */
const CZ: L[] = [
  { pl: 'przydawka (jaki? czyj?)', uk: 'означення (який? чий?)', ru: 'определение (какой? чей?)' },
  { pl: 'dopełnienie (kogo? co?)', uk: 'додаток (кого? що?)', ru: 'дополнение (кого? что?)' },
  { pl: 'okolicznik (gdzie? kiedy? jak?)', uk: 'обставина (де? коли? як?)', ru: 'обстоятельство (где? когда? как?)' }
]
const czHint = [
  l('Jaki? jaka? czyj? — opisuje rzeczownik: przydawka.', 'Який? яка? чий? — описує іменник: означення (przydawka).', 'Какой? какая? чей? — описывает существительное: определение (przydawka).'),
  l('Kogo? co? czego? czym? — mówi, na kim lub czym jest czynność: dopełnienie.', 'Кого? що? чого? чим? — на кому чи чому дія: додаток (dopełnienie).', 'Кого? что? чего? чем? — на ком или чём действие: дополнение (dopełnienie).'),
  l('Gdzie? kiedy? jak? dlaczego? — okoliczności czynności: okolicznik.', 'Де? коли? як? чому? — обставини дії: обставина (okolicznik).', 'Где? когда? как? почему? — обстоятельства действия: обстоятельство (okolicznik).')
]
const cz = (s: string, k: 0 | 1 | 2, uk: string, ru: string) => mark(s, CZ, k, czHint[k]!, `cz${k}`, uk, ru)
const czItems: Item[] = [
  cz('[Mały] kot śpi.', 0, 'Маленький кіт спить.', 'Маленький кот спит.'),
  cz('Mama czyta [książkę].', 1, 'Мама читає книжку.', 'Мама читает книгу.'),
  cz('Kot śpi [na kanapie].', 2, 'Кіт спить на дивані.', 'Кот спит на диване.'),
  cz('[Mój] brat gra w szachy.', 0, 'Мій брат грає в шахи.', 'Мой брат играет в шахматы.'),
  cz('Jem [obiad].', 1, 'Я їм обід.', 'Я ем обед.'),
  cz('[Wieczorem] czytam bajki.', 2, 'Увечері я читаю казки.', 'Вечером я читаю сказки.'),
  cz('Biegnę [szybko].', 2, 'Я біжу швидко.', 'Я бегу быстро.'),
  cz('Lubię [lody].', 1, 'Я люблю морозиво.', 'Я люблю мороженое.'),
  cz('[Zielony] liść spadł.', 0, 'Зелений листок упав.', 'Зелёный лист упал.'),
  cz('Piszę [długopisem].', 1, 'Я пишу ручкою.', 'Я пишу ручкой.')
]

/* ---------- 5. Pojedyncze czy złożone? ---------- */
const PZ: L[] = [
  { pl: 'pojedyncze (1 czasownik)', uk: 'просте (1 дієслово)', ru: 'простое (1 глагол)' },
  { pl: 'złożone (2 czasowniki)', uk: 'складне (2 дієслова)', ru: 'сложное (2 глагола)' }
]
const pzHint = [
  l('Jedno orzeczenie (jeden czasownik) — zdanie pojedyncze.', 'Один присудок (одне дієслово) — просте речення.', 'Одно сказуемое (один глагол) — простое предложение.'),
  l('Dwa orzeczenia, często z przecinkiem i spójnikiem — zdanie złożone.', 'Два присудки, часто з комою і сполучником — складне речення.', 'Два сказуемых, часто с запятой и союзом — сложное предложение.')
]
const pz = (s: string, k: 0 | 1, uk: string, ru: string): Item =>
  ({ pre: '', post: '', mark: s, opts: PZ, answer: k, hint: pzHint[k]!, tr: { uk, ru }, say: s, tag: `pz${k}` })
const pzItems: Item[] = [
  pz('Kot śpi na kanapie.', 0, 'Кіт спить на дивані.', 'Кот спит на диване.'),
  pz('Kot śpi, a pies szczeka.', 1, 'Кіт спить, а пес гавкає.', 'Кот спит, а собака лает.'),
  pz('Idę do domu, bo pada deszcz.', 1, 'Я йду додому, бо падає дощ.', 'Я иду домой, потому что идёт дождь.'),
  pz('Dzieci bawią się w parku.', 0, 'Діти граються в парку.', 'Дети играют в парке.'),
  pz('Wiem, że masz rację.', 1, 'Я знаю, що ти маєш рацію.', 'Я знаю, что ты прав.'),
  pz('Mama kupiła chleb i mleko.', 0, 'Мама купила хліб і молоко.', 'Мама купила хлеб и молоко.'),
  pz('Chciałem iść, ale zacząłem kaszleć.', 1, 'Я хотів піти, але почав кашляти.', 'Я хотел пойти, но начал кашлять.'),
  pz('Mój brat gra na gitarze.', 0, 'Мій брат грає на гітарі.', 'Мой брат играет на гитаре.')
]

export const zdanieExercise: Exercise = {
  slug: 'zdanie',
  group: 'zdanie',
  icon: '.?!',
  color: 'var(--g8)',
  soft: 'var(--g8-soft)',
  title: l('Zdanie', 'Речення', 'Предложение'),
  lead: l(
    'Jak zbudować zdanie? Kropka czy pytajnik? Kto jest podmiotem, a co orzeczeniem? Mrówki pomogą!',
    'Як збудувати речення? Крапка чи знак питання? Хто підмет, а що присудок? Мурашки допоможуть!',
    'Как построить предложение? Точка или вопросительный знак? Кто подлежащее, а что сказуемое? Муравьи помогут!'
  ),
  badge: l('Mistrz zdań', 'Майстер речень', 'Мастер предложений'),
  levels: [
    lv('rownowaznik', 'zdanie?',
      l('Zdanie czy równoważnik?', 'Речення чи еквівалент?', 'Предложение или эквивалент?'),
      l(
        'Zdanie ma czasownik: Kot [śpi]. Równoważnik zdania nie ma czasownika, ale też go rozumiemy: Cisza! Smacznego!',
        'Речення має дієслово: Kot [śpi]. Еквівалент речення (równoważnik) без дієслова, але теж зрозумілий: Cisza! Smacznego!',
        'Предложение имеет глагол: Kot [śpi]. Эквивалент (równoważnik) — без глагола, но тоже понятен: Cisza! Smacznego!'
      ),
      ['Kot [śpi].', 'Pada [deszcz].', 'Cisza!', 'Smacznego!'],
      zrItems, l('Zdanie czy równoważnik?', 'Речення чи еквівалент?', 'Предложение или эквивалент?')),
    lv('znaki', '. ? !',
      l('Kropka, pytajnik, wykrzyknik', 'Крапка, знак питання, знак оклику', 'Точка, вопросительный, восклицательный'),
      l(
        'Mówimy coś — kropka [.] Pytamy — pytajnik [?] Prosimy, krzyczymy, rozkazujemy — wykrzyknik [!]',
        'Повідомляємо — крапка [.] Питаємо — знак питання [?] Просимо, кричимо, наказуємо — знак оклику [!]',
        'Сообщаем — точка [.] Спрашиваем — вопросительный знак [?] Просим, кричим, приказываем — восклицательный [!]'
      ),
      ['Mam psa[.]', 'Czy masz kota[?]', 'Uważaj[!]'],
      punItems, l('Jaki znak na końcu?', 'Який знак у кінці?', 'Какой знак в конце?')),
    lv('podmiot', 'kto?',
      l('Podmiot i orzeczenie', 'Підмет і присудок', 'Подлежащее и сказуемое'),
      l(
        'Podmiot — kto? co? robi: [Kot] śpi. Orzeczenie — co robi podmiot: Kot [śpi]. Razem to serce zdania.',
        'Підмет — хто? що?: [Kot] śpi. Присудок — що робить підмет: Kot [śpi]. Разом — серце речення.',
        'Подлежащее — кто? что?: [Kot] śpi. Сказуемое — что делает подлежащее: Kot [śpi]. Вместе — сердце предложения.'
      ),
      ['kto? → [Kot] śpi.', 'co robi? → Kot [śpi].', '[Dzieci] [grają].'],
      poItems, l('Co to za część zdania?', 'Що це за член речення?', 'Что это за член предложения?'), 'sentence',
      tip(l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
        l('To samo co po ukraińsku: підмет = podmiot, присудок = orzeczenie.', 'Те саме, що в українській: підмет = [podmiot], присудок = [orzeczenie].', 'То же, что в русском: подлежащее = [podmiot], сказуемое = [orzeczenie].'))),
    lv('czesci', 'jaki?',
      l('Przydawka, dopełnienie, okolicznik', 'Означення, додаток, обставина', 'Определение, дополнение, обстоятельство'),
      l(
        'Przydawka — jaki? czyj? ([mały] kot). Dopełnienie — kogo? co? (czytam [książkę]). Okolicznik — gdzie? kiedy? jak? (śpi [na kanapie]).',
        'Означення — який? чий? ([mały] kot). Додаток — кого? що? (czytam [książkę]). Обставина — де? коли? як? (śpi [na kanapie]).',
        'Определение — какой? чей? ([mały] kot). Дополнение — кого? что? (czytam [książkę]). Обстоятельство — где? когда? как? (śpi [na kanapie]).'
      ),
      ['jaki? → [mały] kot', 'co? → czytam [książkę]', 'gdzie? → śpi [na kanapie]'],
      czItems, l('Co to za część zdania?', 'Що це за член речення?', 'Что это за член предложения?')),
    lv('zlozone', '1 + 1',
      l('Pojedyncze czy złożone?', 'Просте чи складне?', 'Простое или сложное?'),
      l(
        'Policz czasowniki! Jeden — zdanie pojedyncze: Kot [śpi]. Dwa — złożone: Kot [śpi], a pies [szczeka].',
        'Порахуй дієслова! Одне — просте речення: Kot [śpi]. Два — складне: Kot [śpi], a pies [szczeka].',
        'Посчитай глаголы! Один — простое предложение: Kot [śpi]. Два — сложное: Kot [śpi], a pies [szczeka].'
      ),
      ['Kot [śpi].', 'Kot [śpi], a pies [szczeka].'],
      pzItems, l('Jakie to zdanie?', 'Яке це речення?', 'Какое это предложение?')),
    bossLv([...punItems, ...poItems, ...czItems],
      l('Boss: wielkie mrowisko', 'Бос: великий мурашник', 'Босс: большой муравейник'),
      l('Wszystko o zdaniu naraz!', 'Усе про речення разом!', 'Всё о предложении вместе!'),
      l('Co pasuje?', 'Що підходить?', 'Что подходит?'))
  ]
}
