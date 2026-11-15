import type { L } from '~/types/content'
import type { Exercise, Item, Level } from './types'
import { l } from './litery'

/* ================================================================
   CZASOWNIKI — Rzeka Czasowników, przewodnik: Bóbr Bartek
   ================================================================ */

const SENT = l('Które słowo pasuje?', 'Яке слово підходить?', 'Какое слово подходит?')

/** zdanie z (odpowiedzią); wielka litera na początku → opcje też */
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

/** zdanie z [wyróżnionym] słowem i odpowiedziami-etykietami */
function mark(s: string, opts: L[], answer: number, hint: L, tag: string, uk: string, ru: string): Item {
  const a = s.indexOf('[')
  const b = s.indexOf(']')
  return { pre: s.slice(0, a), mark: s.slice(a + 1, b), post: s.slice(b + 1), opts, answer, hint, tr: { uk, ru }, say: s.replace(/[[\]]/g, ''), tag }
}

/* ---------- 1. Co to jest czasownik? ---------- */
const POS: L[] = [
  { pl: 'czasownik (co robi?)', uk: 'дієслово (що робить?)', ru: 'глагол (что делает?)' },
  { pl: 'rzeczownik (kto? co?)', uk: 'іменник (хто? що?)', ru: 'существительное (кто? что?)' },
  { pl: 'przymiotnik (jaki?)', uk: 'прикметник (який?)', ru: 'прилагательное (какой?)' }
]
const posHint = [
  l('Pytamy: co robi? co się dzieje? — to czasownik.', 'Питаємо: що робить? що відбувається? — це дієслово.', 'Спрашиваем: что делает? что происходит? — это глагол.'),
  l('Pytamy: kto? co? — to rzeczownik.', 'Питаємо: хто? що? — це іменник.', 'Спрашиваем: кто? что? — это существительное.'),
  l('Pytamy: jaki? jaka? jakie? — to przymiotnik.', 'Питаємо: який? яка? яке? — це прикметник.', 'Спрашиваем: какой? какая? какое? — это прилагательное.')
]
const pos = (s: string, k: 0 | 1 | 2, uk: string, ru: string) => mark(s, POS, k, posHint[k]!, `p${k}`, uk, ru)
const posItems: Item[] = [
  pos('Bóbr [buduje] tamę.', 0, 'Бобер будує греблю.', 'Бобр строит плотину.'),
  pos('[Bóbr] buduje tamę.', 1, 'Бобер будує греблю.', 'Бобр строит плотину.'),
  pos('Dzieci [śpiewają] piosenkę.', 0, 'Діти співають пісню.', 'Дети поют песню.'),
  pos('Pada [zimny] deszcz.', 2, 'Падає холодний дощ.', 'Идёт холодный дождь.'),
  pos('Pada zimny [deszcz].', 1, 'Падає холодний дощ.', 'Идёт холодный дождь.'),
  pos('Na dworze [pada] deszcz.', 0, 'Надворі падає дощ.', 'На улице идёт дождь.'),
  pos('Kot [myje] łapki.', 0, 'Кіт миє лапки.', 'Кот моет лапки.'),
  pos('Tata [czyta] gazetę.', 0, 'Тато читає газету.', 'Папа читает газету.'),
  pos('Mam [wesołego] psa.', 2, 'У мене веселий пес.', 'У меня весёлая собака.'),
  pos('Rano [wstaję] o siódmej.', 0, 'Вранці я встаю о сьомій.', 'Утром я встаю в семь.')
]

/* ---------- 2. Osoby ---------- */
const osHint = l(
  'Końcówka mówi, kto to robi: ja -ę/-m, ty -sz, on/ona -, my -my, wy -cie, oni -ą/-ją.',
  'Закінчення каже, хто це робить: ja -ę/-m, ty -sz, on/ona -, my -my, wy -cie, oni -ą/-ją.',
  'Окончание говорит, кто это делает: ja -ę/-m, ty -sz, on/ona -, my -my, wy -cie, oni -ą/-ją.'
)
const osItems: Item[] = [
  gap('Ja (czytam) książkę.', ['czytam', 'czytasz', 'czyta', 'czytają'], osHint, 'os', 'Я читаю книжку.', 'Я читаю книгу.', 'ja → -m'),
  gap('Ty (piszesz) list.', ['piszę', 'piszesz', 'pisze', 'piszą'], osHint, 'os', 'Ти пишеш листа.', 'Ты пишешь письмо.', 'ty → -sz'),
  gap('Mama (gotuje) obiad.', ['gotuję', 'gotujesz', 'gotuje', 'gotują'], osHint, 'os', 'Мама готує обід.', 'Мама готовит обед.', 'ona → -e'),
  gap('My (gramy) w piłkę.', ['gram', 'grasz', 'gramy', 'grają'], osHint, 'os', 'Ми граємо в м’яч.', 'Мы играем в мяч.', 'my → -my'),
  gap('Wy (śpiewacie) piosenkę.', ['śpiewam', 'śpiewamy', 'śpiewacie', 'śpiewają'], osHint, 'os', 'Ви співаєте пісню.', 'Вы поёте песню.', 'wy → -cie'),
  gap('Dzieci (biegają) po parku.', ['biega', 'biegamy', 'biegacie', 'biegają'], osHint, 'os', 'Діти бігають парком.', 'Дети бегают по парку.', 'oni → -ją'),
  gap('Ja (mówię) po polsku.', ['mówię', 'mówisz', 'mówi', 'mówią'], osHint, 'os', 'Я говорю польською.', 'Я говорю по-польски.', 'ja → -ę'),
  gap('Oni (idą) do szkoły.', ['idę', 'idziesz', 'idzie', 'idą'], osHint, 'os', 'Вони йдуть до школи.', 'Они идут в школу.', 'oni → -ą'),
  gap('Czy ty (masz) kota?', ['mam', 'masz', 'ma', 'mają'], osHint, 'os', 'Чи є в тебе кіт?', 'У тебя есть кот?', 'ty → -sz'),
  gap('My (jesteśmy) w domu.', ['jestem', 'jesteś', 'jesteśmy', 'są'], osHint, 'os', 'Ми вдома.', 'Мы дома.', 'my → -śmy')
]

/* ---------- 3. Czas przeszły: był, była, było ---------- */
const prHint = {
  on: l('On — końcówka -ł: kot spał, deszcz padał.', 'Він — закінчення -ł: kot spał (кіт спав).', 'Он — окончание -ł: kot spał (кот спал).'),
  ona: l('Ona — końcówka -ła: mama czytała.', 'Вона — закінчення -ła: mama czytała (мама читала).', 'Она — окончание -ła: mama czytała (мама читала).'),
  ono: l('Ono — końcówka -ło: dziecko płakało.', 'Воно — закінчення -ło: dziecko płakało (дитя плакало).', 'Оно — окончание -ło: dziecko płakało (ребёнок плакал).'),
  jaM: l('Ja (chłopiec) — końcówka -łem: byłem, zrobiłem.', 'Я (хлопець) — закінчення -łem: byłem (я був).', 'Я (мальчик) — окончание -łem: byłem (я был).'),
  jaF: l('Ja (dziewczynka) — końcówka -łam: byłam, zrobiłam.', 'Я (дівчинка) — закінчення -łam: byłam (я була).', 'Я (девочка) — окончание -łam: byłam (я была).'),
  oni: l('Oni (chłopcy, mężczyźni) — końcówka -li: grali.', 'Вони (хлопці, чоловіки) — закінчення -li: grali.', 'Они (мальчики, мужчины) — окончание -li: grali.'),
  one: l('One (dziewczynki, dzieci, zwierzęta) — końcówka -ły: bawiły się.', 'Вони (дівчатка, діти, тварини) — закінчення -ły: bawiły się.', 'Они (девочки, дети, животные) — окончание -ły: bawiły się.')
}
const prItems: Item[] = [
  gap('Tomek: Wczoraj (byłem) w kinie.', ['byłem', 'byłam', 'był'], prHint.jaM, 'jaM', 'Томек: Учора я був у кіно.', 'Томек: Вчера я был в кино.'),
  gap('Ola: Wczoraj (byłam) w parku.', ['byłem', 'byłam', 'była'], prHint.jaF, 'jaF', 'Оля: Учора я була в парку.', 'Оля: Вчера я была в парке.'),
  gap('Kot (spał) cały dzień.', ['spał', 'spała', 'spało'], prHint.on, 'on', 'Кіт спав цілий день.', 'Кот спал весь день.'),
  gap('Mama (czytała) książkę.', ['czytał', 'czytała', 'czytało'], prHint.ona, 'ona', 'Мама читала книжку.', 'Мама читала книгу.'),
  gap('Dziecko (płakało).', ['płakał', 'płakała', 'płakało'], prHint.ono, 'ono', 'Дитина плакала.', 'Ребёнок плакал.'),
  gap('Wczoraj (padał) deszcz.', ['padał', 'padała', 'padało'], prHint.on, 'on', 'Учора падав дощ.', 'Вчера шёл дождь.'),
  gap('Chłopcy (grali) w piłkę.', ['grali', 'grały', 'grało'], prHint.oni, 'oni', 'Хлопці грали в м’яч.', 'Мальчики играли в мяч.'),
  gap('Dziewczynki (tańczyły) na scenie.', ['tańczyli', 'tańczyły', 'tańczyło'], prHint.one, 'one', 'Дівчатка танцювали на сцені.', 'Девочки танцевали на сцене.'),
  gap('Dzieci (bawiły) się w ogrodzie.', ['bawili', 'bawiły', 'bawiło'], prHint.one, 'one', 'Діти гралися в саду.', 'Дети играли в саду.'),
  gap('Kasia: Rano (zjadłam) śniadanie.', ['zjadłem', 'zjadłam', 'zjadła'], prHint.jaF, 'jaF', 'Кася: Вранці я з’їла сніданок.', 'Кася: Утром я съела завтрак.'),
  gap('Piotr: Ja (zrobiłem) lekcje.', ['zrobiłem', 'zrobiłam', 'zrobił'], prHint.jaM, 'jaM', 'Петро: Я зробив уроки.', 'Пётр: Я сделал уроки.')
]

/* ---------- 4. Który czas? ---------- */
const TENSE: L[] = [
  { pl: 'przeszły (wczoraj)', uk: 'минулий (учора)', ru: 'прошедшее (вчера)' },
  { pl: 'teraźniejszy (teraz)', uk: 'теперішній (зараз)', ru: 'настоящее (сейчас)' },
  { pl: 'przyszły (jutro)', uk: 'майбутній (завтра)', ru: 'будущее (завтра)' }
]
const tHint = [
  l('To już było — czas przeszły (był, zrobiła).', 'Це вже було — минулий час (był, zrobiła).', 'Это уже было — прошедшее время (był, zrobiła).'),
  l('To dzieje się teraz — czas teraźniejszy.', 'Це відбувається зараз — теперішній час.', 'Это происходит сейчас — настоящее время.'),
  l('To dopiero będzie — czas przyszły (będę pisać, zrobię).', 'Це ще буде — майбутній час (będę pisać, zrobię).', 'Это ещё будет — будущее время (będę pisać, zrobię).')
]
const tn = (s: string, k: 0 | 1 | 2, uk: string, ru: string) => mark(s, TENSE, k, tHint[k]!, `t${k}`, uk, ru)
const tenseItems: Item[] = [
  tn('Wczoraj [byłem] w kinie.', 0, 'Учора я був у кіно.', 'Вчера я был в кино.'),
  tn('Teraz [czytam] książkę.', 1, 'Зараз я читаю книжку.', 'Сейчас я читаю книгу.'),
  tn('Jutro [będę pisać] list.', 2, 'Завтра я писатиму листа.', 'Завтра я буду писать письмо.'),
  tn('Kot [śpi] na kanapie.', 1, 'Кіт спить на дивані.', 'Кот спит на диване.'),
  tn('Latem [pojedziemy] nad morze.', 2, 'Влітку ми поїдемо на море.', 'Летом мы поедем на море.'),
  tn('Rano [zjadłam] śniadanie.', 0, 'Вранці я з’їла сніданок.', 'Утром я съела завтрак.'),
  tn('Dzieci [bawią się] w ogrodzie.', 1, 'Діти граються в саду.', 'Дети играют в саду.'),
  tn('W sobotę [będziemy grać] w piłkę.', 2, 'У суботу ми гратимемо в м’яч.', 'В субботу мы будем играть в мяч.'),
  tn('Mama [ugotowała] zupę.', 0, 'Мама зварила суп.', 'Мама сварила суп.'),
  tn('Jutro [zrobię] lekcje.', 2, 'Завтра я зроблю уроки.', 'Завтра я сделаю уроки.')
]

/* ---------- 5. Robię czy zrobię? (aspekt) ---------- */
const aspHint = {
  nd: l(
    'Trwa teraz albo dzieje się często (codziennie, właśnie) — robię, czytam, piszę.',
    'Триває зараз або буває часто (codziennie, właśnie) — robię (роблю), czytam (читаю).',
    'Длится сейчас или бывает часто (codziennie, właśnie) — robię (делаю), czytam (читаю).'
  ),
  d: l(
    'Skończę w przyszłości (jutro, zaraz, kiedy…) — zrobię, przeczytam, napiszę.',
    'Закінчу в майбутньому (jutro, zaraz, kiedy…) — zrobię (зроблю), przeczytam (прочитаю).',
    'Закончу в будущем (jutro, zaraz, kiedy…) — zrobię (сделаю), przeczytam (прочитаю).'
  )
}
const aspItems: Item[] = [
  gap('Codziennie (piszę) list do babci.', ['piszę', 'napiszę'], aspHint.nd, 'nd', 'Щодня я пишу листа бабусі.', 'Каждый день я пишу письмо бабушке.'),
  gap('Jutro (napiszę) list i wyślę go.', ['piszę', 'napiszę'], aspHint.d, 'd', 'Завтра я напишу листа й відправлю його.', 'Завтра я напишу письмо и отправлю его.'),
  gap('Teraz (czytam) książkę.', ['czytam', 'przeczytam'], aspHint.nd, 'nd', 'Зараз я читаю книжку.', 'Сейчас я читаю книгу.'),
  gap('Kiedy (przeczytam) książkę, oddam ci ją.', ['czytam', 'przeczytam'], aspHint.d, 'd', 'Коли я прочитаю книжку, віддам її тобі.', 'Когда я прочитаю книгу, отдам её тебе.'),
  gap('Właśnie (jem) obiad.', ['jem', 'zjem'], aspHint.nd, 'nd', 'Я якраз обідаю.', 'Я как раз обедаю.'),
  gap('Zaraz (zjem) obiad i przyjdę.', ['jem', 'zjem'], aspHint.d, 'd', 'Зараз з’їм обід і прийду.', 'Сейчас съем обед и приду.'),
  gap('Co wieczór (robię) lekcje.', ['robię', 'zrobię'], aspHint.nd, 'nd', 'Щовечора я роблю уроки.', 'Каждый вечер я делаю уроки.'),
  gap('Najpierw (zrobię) lekcje, potem wyjdę na dwór.', ['robię', 'zrobię'], aspHint.d, 'd', 'Спочатку зроблю уроки, потім вийду надвір.', 'Сначала сделаю уроки, потом выйду на улицу.')
]

/* ---------- 6. „nie” z czasownikami ---------- */
const nieHint = {
  osobno: l('„Nie” z czasownikiem piszemy osobno: nie wiem, nie lubię.', '«Nie» з дієсловом пишемо окремо: nie wiem (не знаю).', '«Nie» с глаголом пишем раздельно: nie wiem (не знаю).'),
  razem: l('Wyjątek: nienawidzić — piszemy razem (bez „nie” takie słowo nie istnieje).', 'Виняток: nienawidzić — пишемо разом (без «nie» такого слова немає).', 'Исключение: nienawidzić — пишем слитно (без «nie» такого слова нет).')
}
const nie = (s: string, w: string, together: boolean, uk: string, ru: string) =>
  gap(s, [`nie ${w}`, `nie${w}`], together ? nieHint.razem : nieHint.osobno, together ? 'razem' : 'osobno', uk, ru)
const nieItems: Item[] = [
  nie('Ja (nie lubię) szpinaku.', 'lubię', false, 'Я не люблю шпинату.', 'Я не люблю шпинат.'),
  nie('(Nie wiem), gdzie jest klucz.', 'wiem', false, 'Не знаю, де ключ.', 'Не знаю, где ключ.'),
  nie('Kot (nie śpi), tylko się bawi.', 'śpi', false, 'Кіт не спить, а грається.', 'Кот не спит, а играет.'),
  nie('Dziś (nie idę) do szkoły.', 'idę', false, 'Сьогодні я не йду до школи.', 'Сегодня я не иду в школу.'),
  nie('Ja (nie mam) czasu.', 'mam', false, 'У мене немає часу.', 'У меня нет времени.'),
  nie('On (nie umie) pływać.', 'umie', false, 'Він не вміє плавати.', 'Он не умеет плавать.'),
  nie('Ona (nienawidzi) pająków.', 'nawidzi', true, 'Вона ненавидить павуків.', 'Она ненавидит пауков.'),
  nie('Ja (nienawidzę) zimna.', 'nawidzę', true, 'Я ненавиджу холод.', 'Я ненавижу холод.')
]

const lv = (id: string, icon: string, title: L, rule: L, examples: string[], items: Item[], prompt: L, extra: Partial<Level> = {}, round = 6): Level =>
  ({ id, icon, title, rule, examples, game: { id, prompt, size: 'sentence', items, round }, ...extra })

export const czasownikiExercise: Exercise = {
  slug: 'czasowniki',
  group: 'czasownik',
  icon: '→',
  color: 'var(--g5)',
  soft: 'var(--g5-soft)',
  title: l('Czasowniki', 'Дієслова', 'Глаголы'),
  lead: l(
    'Co robi? Kto to robi? Kiedy? Czasowniki to akcja — jak rzeka, która ciągle płynie!',
    'Що робить? Хто це робить? Коли? Дієслова — це дія, як річка, що постійно тече!',
    'Что делает? Кто это делает? Когда? Глаголы — это действие, как река, которая всё время течёт!'
  ),
  badge: l('Mistrz akcji', 'Майстер дії', 'Мастер действия'),
  levels: [
    lv('co', 'co robi?',
      l('Co to jest czasownik?', 'Що таке дієслово?', 'Что такое глагол?'),
      l(
        'Czasownik mówi, co ktoś robi albo co się dzieje: bóbr [buduje], deszcz [pada]. Pytamy: co robi?',
        'Дієслово каже, що хтось робить або що відбувається: bóbr [buduje] — бобер будує. Питаємо: що робить?',
        'Глагол говорит, что кто-то делает или что происходит: bóbr [buduje] — бобр строит. Спрашиваем: что делает?'
      ),
      ['co robi? → [buduje]', 'co robi? → [śpiewa]', 'co się dzieje? → [pada]'],
      posItems, l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?')),
    lv('osoby', 'ja-ty',
      l('Ja czytam, ty czytasz, oni czytają', 'Ja czytam, ty czytasz, oni czytają', 'Ja czytam, ty czytasz, oni czytają'),
      l(
        'Końcówka mówi, kto to robi: ja czyta[m], ty czyta[sz], on czyta, my czyta[my], wy czyta[cie], oni czyta[ją].',
        'Закінчення каже, хто це робить: ja czyta[m], ty czyta[sz], on czyta, my czyta[my], wy czyta[cie], oni czyta[ją].',
        'Окончание говорит, кто это делает: ja czyta[m], ty czyta[sz], on czyta, my czyta[my], wy czyta[cie], oni czyta[ją].'
      ),
      ['ja czyta[m]', 'ty czyta[sz]', 'my czyta[my]', 'oni czyta[ją]'],
      osItems, SENT, {
        tip: {
          title: l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
          text: l(
            'Końcówki są podobne do ukraińskich: ти читаєш → czytasz, ми читаємо → czytamy.',
            'Закінчення схожі: ти чита[єш] → czyta[sz], ми чита[ємо] → czyta[my], ви чита[єте] → czyta[cie].',
            'Окончания похожи: ты чита[ешь] → czyta[sz], мы чита[ем] → czyta[my], вы чита[ете] → czyta[cie].'
          )
        }
      }),
    lv('przeszly', 'był',
      l('Był, była, było: czas przeszły', 'Був, була, було: минулий час', 'Был, была, было: прошедшее время'),
      l(
        'On by[ł], ona by[ła], ono by[ło]. Ja (chłopiec) by[łem], ja (dziewczynka) by[łam]. Oni gra[li], one gra[ły].',
        'Він by[ł], вона by[ła], воно by[ło]. Я (хлопець) by[łem], я (дівчинка) by[łam]. Вони (хлопці) gra[li], вони (дівчата) gra[ły].',
        'Он by[ł], она by[ła], оно by[ło]. Я (мальчик) by[łem], я (девочка) by[łam]. Они (мальчики) gra[li], они (девочки) gra[ły].'
      ),
      ['on by[ł]', 'ona by[ła]', 'ja by[łem] / by[łam]', 'oni gra[li] / one gra[ły]'],
      prItems, SENT, {
        tip: {
          title: l('Sztuczka', 'Хитрість: був → był', 'Хитрость: был → był'),
          text: l(
            'Jak po ukraińsku: був → był, була → była, було → było.',
            'Майже як українською: бу[в] → by[ł], бу[ла] → by[ła], бу[ло] → by[ło]. Польське ł звучить як «в»/«у»!',
            'Почти как по-русски: бы[л] → by[ł], бы[ла] → by[ła], бы[ло] → by[ło].'
          )
        }
      }),
    lv('czas', 'kiedy?',
      l('Wczoraj, teraz czy jutro?', 'Учора, зараз чи завтра?', 'Вчера, сейчас или завтра?'),
      l(
        'Czas przeszły — już było (byłem). Teraźniejszy — dzieje się teraz (czytam). Przyszły — dopiero będzie (będę czytać, przeczytam).',
        'Минулий — уже було (byłem). Теперішній — зараз (czytam). Майбутній — ще буде (będę czytać, przeczytam).',
        'Прошедшее — уже было (byłem). Настоящее — сейчас (czytam). Будущее — ещё будет (będę czytać, przeczytam).'
      ),
      ['wczoraj → [byłem]', 'teraz → [czytam]', 'jutro → [będę czytać]'],
      tenseItems, l('Który to czas?', 'Який це час?', 'Какое это время?')),
    lv('aspekt', 'robię',
      l('Robię czy zrobię?', 'Robię чи zrobię?', 'Robię или zrobię?'),
      l(
        '[Robię] — trwa teraz albo często. [Zrobię] — skończę w przyszłości. Tak samo: czytam / [prze]czytam, piszę / [na]piszę.',
        '[Robię] — роблю (зараз або часто). [Zrobię] — зроблю (закінчу потім). Так само: czytam / [prze]czytam, piszę / [na]piszę.',
        '[Robię] — делаю (сейчас или часто). [Zrobię] — сделаю (закончу потом). Так же: czytam / [prze]czytam, piszę / [na]piszę.'
      ),
      ['codziennie [robię]', 'jutro [zrobię]', 'teraz [czytam]', 'jutro [prze]czytam'],
      aspItems, SENT, {
        tip: {
          title: l('Sztuczka', 'Хитрість: роблю / зроблю', 'Хитрость: делаю / сделаю'),
          text: l(
            'Ukraiński ma to samo: роблю / зроблю → robię / zrobię.',
            'В українській те саме: роблю → [robię], зроблю → [z]robię, читаю → czytam, прочитаю → [prze]czytam.',
            'В русском то же: делаю → [robię], сделаю → [z]robię, читаю → czytam, прочитаю → [prze]czytam.'
          )
        }
      }),
    lv('nie', 'nie …',
      l('„Nie” z czasownikami', '«Nie» з дієсловами', '«Nie» с глаголами'),
      l(
        '„Nie” z czasownikami piszemy [osobno]: nie wiem, nie lubię, nie mam. Wyjątek: [nienawidzić].',
        '«Nie» з дієсловами пишемо [окремо]: nie wiem, nie lubię. Виняток: [nienawidzić].',
        '«Nie» с глаголами пишем [раздельно]: nie wiem, nie lubię. Исключение: [nienawidzić].'
      ),
      ['[nie ]wiem', '[nie ]lubię', '[nie ]mam', '[nienawidzę]'],
      nieItems, SENT),
    {
      ...lv('boss', '👑', l('Boss: wielki spływ', 'Бос: великий сплав', 'Босс: большой сплав'),
        l('Wszystko naraz: osoby, czas przeszły, robię czy zrobię, nie osobno.', 'Усе разом: особи, минулий час, robię чи zrobię, nie окремо.', 'Всё вместе: лица, прошедшее время, robię или zrobię, nie раздельно.'),
        [], [...osItems, ...prItems, ...aspItems, ...nieItems], SENT, {}, 10),
      boss: true
    }
  ]
}
