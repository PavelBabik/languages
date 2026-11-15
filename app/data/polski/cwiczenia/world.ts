import type { L } from '~/types/content'

/**
 * Kraina Polskiego — świat gry.
 * Każdy temat = kraina z przewodnikiem-zwierzakiem. Poziomy = przystanki na drodze.
 * Za każdy przystanek dostajesz pieczątkę do paszportu podróżnika.
 *
 * W tekstach [x] = litera / końcówka na czerwono.
 */

export type AnimalKind = 'jez' | 'zaba' | 'chomik' | 'kot' | 'sowa' | 'kaczka' | 'waz' | 'wiewiorka' | 'kameleon' | 'bobr' | 'mysz' | 'papuga' | 'slimak' | 'pajak' | 'mrowka' | 'zyrafa'

const l = (pl: string, uk: string, ru: string): L => ({ pl, uk, ru })

export interface Land {
  name: L
  animal: AnimalKind
  guide: string
  /** kolory sceny: niebo, ziemia, ziemia ciemniejsza */
  sky: string
  ground: string
  ground2: string
  deco: string[]
  /** powitanie przewodnika na mapie krainy */
  hello: L
}

export const lands: Record<string, Land> = {
  'o-u': {
    name: l('Wyspa Ó', 'Острів Ó', 'Остров Ó'),
    animal: 'jez', guide: 'Jeż Józek',
    sky: '#bfe6ff', ground: '#8fd96b', ground2: '#5fb84a',
    deco: ['🌲', '🍄', '🌰', '🌳', '🦋'],
    hello: l(
      'Cześć! Jestem Józek. W moim imieniu jest [ó]! Na mojej wyspie mieszkają dwie siostry: [ó] i [u]. Brzmią tak samo — nauczę cię je rozróżniać.',
      'Привіт! Я Юзек. У моєму імені є [ó]! На моєму острові живуть дві сестри: [ó] та [u]. Звучать однаково — я навчу тебе їх розрізняти.',
      'Привет! Я Юзек. В моём имени есть [ó]! На моём острове живут две сестры: [ó] и [u]. Звучат одинаково — я научу тебя их различать.'
    )
  },
  'rz-z': {
    name: l('Żabie Bagno', 'Жаб’яче болото', 'Лягушачье болото'),
    animal: 'zaba', guide: 'Żaba Żaneta',
    sky: '#c6f1e6', ground: '#5ccaa0', ground2: '#3aa07c',
    deco: ['🪷', '🌾', '💧', '🐞', '🌿'],
    hello: l(
      'Kum-kum! Jestem Żaneta, mam w imieniu [ż]. Na bagnie mieszkają [rz] i [ż] — brzmią jak bliźniaki. Pokażę ci, jak je odróżnić!',
      'Ква-ква! Я Жанета, у моєму імені [ż]. На болоті живуть [rz] і [ż] — звучать як близнюки. Покажу, як їх розрізнити!',
      'Ква-ква! Я Жанета, в моём имени [ż]. На болоте живут [rz] и [ż] — звучат как близнецы. Покажу, как их различить!'
    )
  },
  'ch-h': {
    name: l('Chmurne Góry', 'Хмарні гори', 'Облачные горы'),
    animal: 'chomik', guide: 'Chomik Hubert',
    sky: '#d6e2ff', ground: '#a9b8f5', ground2: '#7d8fe0',
    deco: ['☁️', '⛰️', '🌻', '🌰', '🎈'],
    hello: l(
      'Hej! Jestem Hubert, [ch]omik. Mam i [ch], i [h]! W górach nauczysz się, kiedy pisać [ch], a kiedy [h]. Twój ukraiński bardzo pomoże!',
      'Гей! Я Губерт, [ch]omik — хом’як. У мене є і [ch], і [h]! У горах дізнаєшся, коли писати [ch], а коли [h]. Українська дуже допоможе!',
      'Эй! Я Губерт, [ch]omik — хомяк. У меня есть и [ch], и [h]! В горах узнаешь, когда писать [ch], а когда [h]. Русский очень поможет!'
    )
  },
  'cz-c': {
    name: l('Czarodziejskie Jezioro', 'Чарівне Озеро', 'Волшебное Озеро'),
    animal: 'kaczka', guide: 'Kaczka Czesia',
    sky: '#cdeffd', ground: '#7fd4c1', ground2: '#4bb39b',
    deco: ['🪷', '🌿', '💧', '🐟', '🌸'],
    hello: l(
      'Kwa-kwa! Jestem Czesia — w moim imieniu jest twarde [cz]. Na jeziorze mieszkają twarde [cz], [sz] i miękkie [ć], [ś], [ź], [ń], [dź]. Kreska czy „i”? A może ty pisze[sz], ale ty byłe[ś]? Pokażę ci!',
      'Кря-кря! Я Чеся — у моєму імені тверде [cz]. На озері живуть тверді [cz], [sz] і м’які [ć], [ś], [ź], [ń], [dź]. Риска чи «i»? А ще: ty pisze[sz], але ty byłe[ś]. Покажу!',
      'Кря-кря! Я Чеся — в моём имени твёрдое [cz]. На озере живут твёрдые [cz], [sz] и мягкие [ć], [ś], [ź], [ń], [dź]. Чёрточка или «i»? А ещё: ty pisze[sz], но ty byłe[ś]. Покажу!'
    )
  },
  'e-a': {
    name: l('Złota Łąka', 'Золота Галявина', 'Золотой Луг'),
    animal: 'waz', guide: 'Wąż Mądrek',
    sky: '#fff3c8', ground: '#f2c94c', ground2: '#d9a521',
    deco: ['🌻', '🐝', '🌾', '🍯', '🌼'],
    hello: l(
      'Sss… Jestem Mądrek, wąż. W słowie „w[ą]ż” jest [ą] z ogonkiem! Na łące nauczysz się, kiedy piszemy [ę] i [ą], a kiedy en i on.',
      'Ссс… Я Мондрек, вуж. У слові «w[ą]ż» є [ą] з хвостиком! На галявині дізнаєшся, коли пишемо [ę] та [ą], а коли en і on.',
      'Ссс… Я Мондрек, уж. В слове «w[ą]ż» есть [ą] с хвостиком! На лугу узнаешь, когда пишем [ę] и [ą], а когда en и on.'
    )
  },
  'litery-mix': {
    name: l('Zamek Dyktanda', 'Замок Диктанту', 'Замок Диктанта'),
    animal: 'sowa', guide: 'Sowa Bożena',
    sky: '#e7dcff', ground: '#c3a8f7', ground2: '#9a7de6',
    deco: ['👑', '📜', '✒️', '🏰', '⭐'],
    hello: l(
      'Witaj w zamku! Jestem Bożena, mądra sowa. Tu sprawdzisz wszystko naraz: [ó], [rz], [ż], [ch], [ć], [ę], [ą]. Gotowy na wielkie dyktando?',
      'Вітаю в замку! Я Божена, мудра сова. Тут перевіриш усе разом: [ó], [rz], [ż], [ch], [ć], [ę], [ą]. Готовий до великого диктанту?',
      'Добро пожаловать в замок! Я Божена, мудрая сова. Здесь проверишь всё вместе: [ó], [rz], [ż], [ch], [ć], [ę], [ą]. Готов к большому диктанту?'
    )
  },
  przypadki: {
    name: l('Miasto Siedmiu Bram', 'Місто Семи Брам', 'Город Семи Ворот'),
    animal: 'kot', guide: 'Kot Kacper',
    sky: '#ffe4c4', ground: '#ffbe7a', ground2: '#f09a4c',
    deco: ['🏰', '🚪', '🐟', '🧶', '🏠'],
    hello: l(
      'Miau! Jestem Kacper. W moim mieście jest siedem bram — to siedem przypadków. Każda brama ma swoje pytanie. Przejdziemy przez wszystkie!',
      'Няв! Я Кацпер. У моєму місті сім брам — це сім відмінків. Кожна брама має своє питання. Пройдемо через усі!',
      'Мяу! Я Кацпер. В моём городе семь ворот — это семь падежей. У каждых ворот свой вопрос. Пройдём через все!'
    )
  },
  liczebniki: {
    name: l('Las Liczebników', 'Ліс Числівників', 'Лес Числительных'),
    animal: 'wiewiorka', guide: 'Wiewiórka Zosia',
    sky: '#dff3d6', ground: '#7cc36a', ground2: '#4f9c43',
    deco: ['🌰', '🌲', '🍄', '🍂', '🌳'],
    hello: l(
      'Hej! Jestem Zosia i liczę orzeszki: jeden, dwa, trzy… pięć orzeszków! W moim lesie nauczysz się liczebników: ile? który? dwa czy dwie?',
      'Привіт! Я Зося і рахую горішки: jeden, dwa, trzy… pięć orzeszków! У моєму лісі вивчиш числівники: скільки? котрий? dwa чи dwie?',
      'Привет! Я Зося и считаю орешки: jeden, dwa, trzy… pięć orzeszków! В моём лесу выучишь числительные: сколько? который? dwa или dwie?'
    )
  },
  przymiotniki: {
    name: l('Dolina Przymiotników', 'Долина Прикметників', 'Долина Прилагательных'),
    animal: 'kameleon', guide: 'Kameleon Kamil',
    sky: '#e6ddff', ground: '#9fe0a8', ground2: '#6cbf7a',
    deco: ['🌈', '🎨', '🦋', '🌸', '🖍️'],
    hello: l(
      'Cześć! Jestem Kamil, kameleon. Zmieniam kolory: jestem [zielony], [czerwony], [niebieski]! Słowa, które mówią „jaki?”, to przymiotniki. W mojej dolinie nauczysz się ich wszystkich.',
      'Привіт! Я Каміль, хамелеон. Я змінюю кольори: я [zielony], [czerwony], [niebieski]! Слова, що відповідають «який?», — це прикметники. У моїй долині вивчиш їх усі.',
      'Привет! Я Камиль, хамелеон. Я меняю цвета: я [zielony], [czerwony], [niebieski]! Слова, которые отвечают «какой?», — это прилагательные. В моей долине выучишь их все.'
    )
  },
  czasowniki: {
    name: l('Rzeka Czasowników', 'Річка Дієслів', 'Река Глаголов'),
    animal: 'bobr', guide: 'Bóbr Bartek',
    sky: '#cfe9ff', ground: '#8ad1c2', ground2: '#4fa3a0',
    deco: ['🌊', '🪵', '🛶', '🐟', '🌿'],
    hello: l(
      'Cześć! Jestem Bartek, b[ó]br. Ciągle coś [robię]: [buduję], [pływam], [gryzę] patyki! Słowa, które mówią „co robi?”, to czasowniki. Popłyniemy razem rzeką?',
      'Привіт! Я Бартек, бобер (b[ó]br). Я весь час щось [robię]: [buduję], [pływam], [gryzę] гілки! Слова, що відповідають «що робить?», — це дієслова. Попливемо разом річкою?',
      'Привет! Я Бартек, бобр (b[ó]br). Я всё время что-то [robię]: [buduję], [pływam], [gryzę] ветки! Слова, которые отвечают «что делает?», — это глаголы. Поплывём вместе по реке?'
    )
  },
  'wielka-litera': {
    name: l('Sawanna Wielkich Liter', 'Савана Великих Літер', 'Саванна Заглавных Букв'),
    animal: 'zyrafa', guide: 'Żyrafa Zuzia',
    sky: '#ffe9b8', ground: '#f2cf6b', ground2: '#d6a83c',
    deco: ['🌴', '☀️', '🦓', '🌵', '🐘'],
    hello: l(
      'Cześć! Jestem [Z]uzia, żyrafa — najwyższa na sawannie, jak [W]IELKA litera! Imiona, miasta, kraje… Pokażę ci, kiedy litera ma rosnąć.',
      'Привіт! Я [Z]uzia, жирафа — найвища в савані, як [В]ЕЛИКА літера! Імена, міста, країни… Покажу, коли літера має рости.',
      'Привет! Я [Z]uzia, жираф — самая высокая в саванне, как [З]АГЛАВНАЯ буква! Имена, города, страны… Покажу, когда буква должна расти.'
    )
  },
  zaimki: {
    name: l('Papuzia Wyspa', 'Папужий Острів', 'Попугайский Остров'),
    animal: 'papuga', guide: 'Papuga Pola',
    sky: '#c8f4ff', ground: '#7fe0a0', ground2: '#3fbf73',
    deco: ['🌺', '🥥', '🌴', '🍍', '🦋'],
    hello: l(
      'Ara-ara! Jestem Pola. Nie lubię powtarzać: zamiast „Tomek, Tomek, Tomek” mówię [on]! Takie słowa to zaimki: [on], [ona], [mnie], [mój], [ten].',
      'Ара-ара! Я Поля. Не люблю повторювати: замість «Томек, Томек» кажу [on]! Такі слова — займенники: [on], [ona], [mnie], [mój], [ten].',
      'Ара-ара! Я Поля. Не люблю повторять: вместо «Томек, Томек» говорю [on]! Такие слова — местоимения: [on], [ona], [mnie], [mój], [ten].'
    )
  },
  przyslowki: {
    name: l('Ogród Przysłówków', 'Сад Прислівників', 'Сад Наречий'),
    animal: 'slimak', guide: 'Ślimak Szymek',
    sky: '#e0f7d0', ground: '#a6e07a', ground2: '#6fbf4a',
    deco: ['🌷', '🍓', '🌼', '🐞', '🌱'],
    hello: l(
      'Hej! Jestem Szymek. Chodzę [wolno], ale marzę, żeby biegać [szybko]! Słowa, które mówią jak? gdzie? kiedy? — to przysłówki.',
      'Гей! Я Шимек. Я ходжу [wolno] (повільно), але мрію бігати [szybko]! Слова, що кажуть як? де? коли? — це прислівники.',
      'Эй! Я Шимек. Я ползаю [wolno] (медленно), но мечтаю бегать [szybko]! Слова, которые говорят как? где? когда? — это наречия.'
    )
  },
  przyimki: {
    name: l('Domek Przyimków', 'Будиночок Прийменників', 'Домик Предлогов'),
    animal: 'mysz', guide: 'Myszka Zuzia',
    sky: '#ffe3ef', ground: '#f5b8cf', ground2: '#e08aab',
    deco: ['🧀', '📦', '🪑', '🛏️', '🚪'],
    hello: l(
      'Pi-pi! Jestem myszka. Bawię się w chowanego: jestem [w] pudełku, [pod] łóżkiem, [za] drzwiami! Te małe słówka to przyimki.',
      'Пі-пі! Я мишка. Граюся в хованки: я [w] pudełku (у коробці), [pod] łóżkiem (під ліжком), [za] drzwiami! Ці слівця — прийменники.',
      'Пи-пи! Я мышка. Играю в прятки: я [w] pudełku (в коробке), [pod] łóżkiem (под кроватью), [za] drzwiami! Эти слова — предлоги.'
    )
  },
  spojniki: {
    name: l('Pajęcza Sieć', 'Павукова Сітка', 'Паучья Сеть'),
    animal: 'pajak', guide: 'Pająk Piotruś',
    sky: '#e3e5ff', ground: '#b9bdf5', ground2: '#8a90e0',
    deco: ['🕸️', '🌙', '⭐', '🍂', '🌿'],
    hello: l(
      'Cześć! Jestem Piotruś i łączę wszystko nitkami. Słowa [i], [ale], [bo], [że] też łączą — to spójniki. A przecinek? Pokażę, gdzie go wpleść!',
      'Привіт! Я Петрусь і все з’єдную нитками. Слова [i], [ale], [bo], [że] теж з’єднують — це сполучники. А кома? Покажу, куди її вплести!',
      'Привет! Я Петрусь и всё соединяю нитками. Слова [i], [ale], [bo], [że] тоже соединяют — это союзы. А запятая? Покажу, куда её вплести!'
    )
  },
  zdanie: {
    name: l('Mrowisko Zdań', 'Мурашник Речень', 'Муравейник Предложений'),
    animal: 'mrowka', guide: 'Mrówka Marta',
    sky: '#fff0d6', ground: '#d9b07a', ground2: '#b5854a',
    deco: ['🌾', '🍃', '🪨', '🌰', '🍄'],
    hello: l(
      'Hej! Jestem Marta. Mrówki budują razem — a słowa razem budują zdanie! [Kto?] [Co robi?] [Gdzie?] Z takich cegiełek zrobimy wielkie mrowisko.',
      'Гей! Я Марта. Мурашки будують разом — а слова разом будують речення! [Хто?] [Що робить?] [Де?] З таких цеглинок збудуємо великий мурашник.',
      'Эй! Я Марта. Муравьи строят вместе — а слова вместе строят предложение! [Кто?] [Что делает?] [Где?] Из таких кирпичиков построим большой муравейник.'
    )
  }
}

/** Litery, które podświetlamy w każdym tekście krainy. */
export const marks: Record<string, string[]> = {
  'o-u': ['ó', 'u'],
  'rz-z': ['rz', 'ż'],
  'ch-h': ['ch', 'h'],
  'cz-c': ['dź', 'ć', 'ś', 'ź', 'ń'],
  'e-a': ['ę', 'ą'],
  'litery-mix': ['ó', 'ż', 'ć', 'ś', 'ę', 'ą']
}

/** Krainy, które dopiero powstają (mgła na mapie). */
export const soonLands: { name: L; icon: string }[] = [
]

/**
 * Dodatkowe dymki z wyjaśnieniem (po regule), klucz: `${slug}:${levelId}`.
 * Krótko, po kolei, z przykładami — przewodnik „opowiada”.
 */
export const explain: Record<string, L[]> = {
  /* ---------- Ó / U ---------- */
  'o-u:alt': [
    l(
      'Jak to sprawdzić? Powiedz słowo w liczbie mnogiej albo w innej formie: st[ó]ł → st[o]ły, r[ó]g → r[o]gi.',
      'Як перевірити? Скажи слово в множині або в іншій формі: st[ó]ł → st[o]ły, r[ó]g → r[o]gi.',
      'Как проверить? Скажи слово во множественном числе или в другой форме: st[ó]ł → st[o]ły, r[ó]g → r[o]gi.'
    ),
    l(
      'Słyszysz [o], [e] albo [a]? To znak, że piszemy [ó]! A b[u]t → b[u]ty — u zostaje, więc piszemy [u].',
      'Чуєш [o], [e] або [a]? Це знак, що пишемо [ó]! А b[u]t → b[u]ty — u лишається, тому пишемо [u].',
      'Слышишь [o], [e] или [a]? Это знак, что пишем [ó]! А b[u]t → b[u]ty — u остаётся, поэтому пишем [u].'
    )
  ],
  'o-u:end': [
    l(
      'Ó lubi końcówkę -[ów]: Krak[ów], Rzesz[ów]. Tak kończą się też słowa po „nie ma”: nie ma kot[ów], ps[ów].',
      'Ó любить закінчення -[ów]: Krak[ów], Rzesz[ów]. Так закінчуються й слова після «nie ma»: nie ma kot[ów] — немає котів.',
      'Ó любит окончание -[ów]: Krak[ów], Rzesz[ów]. Так заканчиваются и слова после «nie ma»: nie ma kot[ów] — нет котов.'
    ),
    l(
      'Ważne: [ó] nigdy nie stoi na samym końcu słowa. Na końcu zawsze jest -[ów], a nie samo ó.',
      'Важливо: [ó] ніколи не стоїть у самому кінці слова. У кінці завжди -[ów], а не саме ó.',
      'Важно: [ó] никогда не стоит в самом конце слова. В конце всегда -[ów], а не просто ó.'
    )
  ],
  'o-u:start': [
    l(
      'Prawie każde słowo, które zaczyna się od tego dźwięku, piszemy przez [u]: [u]cho, [u]lica, [u]czeń, [u]śmiech.',
      'Майже кожне слово, яке починається з цього звуку, пишемо з [u]: [u]cho, [u]lica, [u]czeń, [u]śmiech.',
      'Почти каждое слово, которое начинается с этого звука, пишем с [u]: [u]cho, [u]lica, [u]czeń, [u]śmiech.'
    ),
    l(
      'Jedyny częsty wyjątek: [ó]smy. Ale to łatwe — [ó]smy → [o]siem!',
      'Єдиний частий виняток: [ó]smy (восьмий). Але це легко — [ó]smy → [o]siem!',
      'Единственное частое исключение: [ó]smy (восьмой). Но это легко — [ó]smy → [o]siem!'
    )
  ],
  'o-u:endU': [
    l(
      'Małe i słodkie słowa lubią u: mal[utki], pod[uszka], koż[uszek], mal[uch]. A także -[unek]: rys[unek].',
      'Маленькі й милі слова люблять u: mal[utki], pod[uszka], koż[uszek], mal[uch]. А ще -[unek]: rys[unek].',
      'Маленькие и милые слова любят u: mal[utki], pod[uszka], koż[uszek], mal[uch]. А ещё -[unek]: rys[unek].'
    ),
    l(
      'Czasowniki na -[uje] też zawsze z u: on mal[uje], bud[uje], rys[uje]. I ja mal[uję]!',
      'Дієслова на -[uje] теж завжди з u: on mal[uje] — він малює, bud[uje], rys[uje].',
      'Глаголы на -[uje] тоже всегда с u: on mal[uje] — он рисует, bud[uje], rys[uje].'
    )
  ],
  'o-u:memoO': [
    l(
      'Tych słów nie sprawdzisz regułą. Najlepiej: zobacz, powiedz na głos i wyobraź sobie obrazek.',
      'Ці слова правилом не перевіриш. Найкраще: подивись, скажи вголос і уяви картинку.',
      'Эти слова правилом не проверишь. Лучше всего: посмотри, скажи вслух и представь картинку.'
    ),
    l(
      'Moje zdanie do zapamiętania: „Kr[ó]l ż[ó]łw wszedł na g[ó]rę i zjadł og[ó]rek.”',
      'Моє речення, щоб запам’ятати: «Kr[ó]l ż[ó]łw wszedł na g[ó]rę i zjadł og[ó]rek.» — Король-черепаха виліз на гору й з’їв огірок.',
      'Моё предложение, чтобы запомнить: «Kr[ó]l ż[ó]łw wszedł na g[ó]rę i zjadł og[ó]rek.» — Король-черепаха забрался на гору и съел огурец.'
    )
  ],
  'o-u:memoU': [
    l(
      'Tu u się nie zmienia: m[u]cha → m[u]chy, k[u]ra → k[u]ry. Po ukraińsku też jest „у”: муха, буря.',
      'Тут u не змінюється: m[u]cha → m[u]chy, k[u]ra → k[u]ry. Українською теж «у»: муха, буря.',
      'Здесь u не меняется: m[u]cha → m[u]chy, k[u]ra → k[u]ry. По-русски тоже «у»: муха, буря.'
    ),
    l(
      'Zdanie do zapamiętania: „M[u]cha i k[u]ra uciekają przed b[u]rzą pod chm[u]rą.”',
      'Речення, щоб запам’ятати: «M[u]cha i k[u]ra uciekają przed b[u]rzą pod chm[u]rą.» — Муха й курка тікають від бурі під хмарою.',
      'Предложение, чтобы запомнить: «M[u]cha i k[u]ra uciekają przed b[u]rzą pod chm[u]rą.» — Муха и курица убегают от бури под тучей.'
    )
  ],

  /* ---------- RZ / Ż ---------- */
  'rz-z:alt': [
    l(
      'Szukaj słowa z tej samej rodziny: mo[rz]e → mo[r]ski, dob[rz]e → dob[r]y. Słyszysz [r]? Pisz [rz]!',
      'Шукай споріднене слово: mo[rz]e → mo[r]ski, dob[rz]e → dob[r]y. Чуєш [r]? Пиши [rz]!',
      'Ищи однокоренное слово: mo[rz]e → mo[r]ski, dob[rz]e → dob[r]y. Слышишь [r]? Пиши [rz]!'
    ),
    l(
      'Działa też w odmianie: rowe[r] → na rowe[rz]e, kolo[r] → o kolo[rz]e, gó[r]a → w gó[rz]e.',
      'Працює і при відмінюванні: rowe[r] → na rowe[rz]e, kolo[r] → o kolo[rz]e, gó[r]a → w gó[rz]e.',
      'Работает и при склонении: rowe[r] → na rowe[rz]e, kolo[r] → o kolo[rz]e, gó[r]a → w gó[rz]e.'
    )
  ],
  'rz-z:after': [
    l(
      'Po literach b, d, g, k, p, t, w, ch, j piszemy [rz]: b[rz]eg, d[rz]ewo, g[rz]yb, k[rz]esło.',
      'Після літер b, d, g, k, p, t, w, ch, j пишемо [rz]: b[rz]eg, d[rz]ewo, g[rz]yb, k[rz]esło.',
      'После букв b, d, g, k, p, t, w, ch, j пишем [rz]: b[rz]eg, d[rz]ewo, g[rz]yb, k[rz]esło.'
    ),
    l(
      'Uwaga na ucho! Po p, t, k słyszysz „sz”: p[rz]ez brzmi jak „pszez”. Ale piszemy [rz]! Wyjątki: pszczoła, kształt.',
      'Обережно! Після p, t, k чути «ш»: p[rz]ez звучить як «пшез». Але пишемо [rz]! Винятки: pszczoła, kształt.',
      'Осторожно! После p, t, k слышно «ш»: p[rz]ez звучит как «пшез». Но пишем [rz]! Исключения: pszczoła, kształt.'
    )
  ],
  'rz-z:end': [
    l(
      'Kto coś robi? Leka[rz] leczy, kucha[rz] gotuje, pisa[rz] pisze. Końcówki -[arz] i -[erz] zawsze z rz.',
      'Хто щось робить? Leka[rz] лікує, kucha[rz] готує, pisa[rz] пише. Закінчення -[arz] і -[erz] завжди з rz.',
      'Кто что-то делает? Leka[rz] лечит, kucha[rz] готовит, pisa[rz] пишет. Окончания -[arz] и -[erz] всегда с rz.'
    ),
    l(
      'Wierszyk: „Leka[rz], kucha[rz], ryce[rz], żołnie[rz] — na końcu zawsze [rz]!”',
      'Віршик: «Leka[rz], kucha[rz], ryce[rz], żołnie[rz] — na końcu zawsze [rz]!» — у кінці завжди rz.',
      'Стишок: «Leka[rz], kucha[rz], ryce[rz], żołnie[rz] — na końcu zawsze [rz]!» — в конце всегда rz.'
    )
  ],
  'rz-z:altZ': [
    l(
      'Ż też ma przyjaciół! Zmienia się w [g]: no[g]a → nó[ż]ka, księ[g]a → ksią[ż]ka.',
      'У ż теж є друзі! Він змінюється на [g]: no[g]a → nó[ż]ka, księ[g]a → ksią[ż]ka.',
      'У ż тоже есть друзья! Он меняется на [g]: no[g]a → nó[ż]ka, księ[g]a → ksią[ż]ka.'
    ),
    l(
      'Albo w [z], [s], [h]: wo[z]ić → wo[ż]ę, wy[s]oko → wy[ż]ej, dru[h] → dru[ż]yna.',
      'Або на [z], [s], [h]: wo[z]ić → wo[ż]ę, wy[s]oko → wy[ż]ej, dru[h] → dru[ż]yna.',
      'Или на [z], [s], [h]: wo[z]ić → wo[ż]ę, wy[s]oko → wy[ż]ej, dru[h] → dru[ż]yna.'
    )
  ],
  'rz-z:memoZ': [
    l(
      'Niektóre słowa z ż trzeba po prostu znać: [ż]aba, je[ż], ró[ż]a, łó[ż]ko, [ż]yrafa.',
      'Деякі слова з ż треба просто знати: [ż]aba, je[ż], ró[ż]a, łó[ż]ko, [ż]yrafa.',
      'Некоторые слова с ż надо просто знать: [ż]aba, je[ż], ró[ż]a, łó[ż]ko, [ż]yrafa.'
    ),
    l(
      'Zdanie do zapamiętania: „[Ż]aba i je[ż] śpią w łó[ż]ku pod ró[ż]ą.”',
      'Речення, щоб запам’ятати: «[Ż]aba i je[ż] śpią w łó[ż]ku pod ró[ż]ą.» — Жаба та їжак сплять у ліжку під трояндою.',
      'Предложение, чтобы запомнить: «[Ż]aba i je[ż] śpią w łó[ż]ku pod ró[ż]ą.» — Лягушка и ёж спят в кровати под розой.'
    )
  ],

  /* ---------- CH / H ---------- */
  'ch-h:alt': [
    l(
      'Ch ma przyjaciela [sz]: mu[ch]a → mu[sz]e, u[ch]o → u[sz]y, ci[ch]o → ci[sz]a.',
      'У ch є друг [sz]: mu[ch]a → mu[sz]e, u[ch]o → u[sz]y, ci[ch]o → ci[sz]a.',
      'У ch есть друг [sz]: mu[ch]a → mu[sz]e, u[ch]o → u[sz]y, ci[ch]o → ci[sz]a.'
    ),
    l(
      'To działa jak magia: su[ch]y → su[sz]a, du[ch] → du[sz]a. Słyszysz sz — piszesz [ch]!',
      'Це працює як магія: su[ch]y → su[sz]a, du[ch] → du[sz]a. Чуєш sz — пишеш [ch]!',
      'Это работает как магия: su[ch]y → su[sz]a, du[ch] → du[sz]a. Слышишь sz — пишешь [ch]!'
    )
  ],
  'ch-h:end': [
    l(
      'Na samym końcu słowa prawie zawsze jest [ch]: da[ch], stra[ch], brzu[ch], zapa[ch].',
      'У самому кінці слова майже завжди [ch]: da[ch], stra[ch], brzu[ch], zapa[ch].',
      'В самом конце слова почти всегда [ch]: da[ch], stra[ch], brzu[ch], zapa[ch].'
    ),
    l(
      'Po literze s też [ch]: s[ch]ody, s[ch]ować. A jedyny wyjątek na końcu to dru[h].',
      'Після літери s теж [ch]: s[ch]ody, s[ch]ować. А єдиний виняток у кінці — dru[h].',
      'После буквы s тоже [ch]: s[ch]ody, s[ch]ować. А единственное исключение в конце — dru[h].'
    )
  ],
  'ch-h:memoCh': [
    l(
      'Tu pomaga twój język! Ukraińskie i rosyjskie „х” to często polskie [ch]: хліб → [ch]leb, хмара → [ch]mura.',
      'Тут допомагає твоя мова! Українське «х» — це часто польське [ch]: хліб → [ch]leb, хмара → [ch]mura.',
      'Здесь помогает твой язык! Русское «х» — это часто польское [ch]: хлеб → [ch]leb, хор → [ch]ór.'
    ),
    l(
      'Spróbuj: хом’як → [ch]omik. To ja! 🐹',
      'Спробуй: хом’як → [ch]omik. Це я! 🐹',
      'Попробуй: хомяк → [ch]omik. Это я! 🐹'
    )
  ],
  'ch-h:h': [
    l(
      'H mieszka w słowach z innych języków: [h]otel, [h]istoria, [h]umor, [h]ipopotam.',
      'H живе в словах з інших мов: [h]otel, [h]istoria, [h]umor, [h]ipopotam.',
      'H живёт в словах из других языков: [h]otel, [h]istoria, [h]umor, [h]ipopotam.'
    ),
    l(
      'Po ukraińsku jest tam często „г”: готель → [h]otel, гімн → [h]ymn. I moje imię: [H]ubert!',
      'Українською там часто «г»: готель → [h]otel, гімн → [h]ymn. І моє ім’я: [H]ubert — Губерт!',
      'По-русски там иногда «г»: гимн → [h]ymn, гамак → [h]amak. И моё имя: [H]ubert — Губерт!'
    )
  ],

  /* ---------- CZ / Ć ---------- */
  'cz-c:ci': [
    l('Słuchaj: by[ć], pi[ć], pię[ć] — na końcu słowa zawsze [ć] z kreską.', 'Слухай: by[ć], pi[ć], pię[ć] — у кінці слова завжди [ć] з рискою.', 'Слушай: by[ć], pi[ć], pię[ć] — в конце слова всегда [ć] с чёрточкой.'),
    l('A gdy po nim jest samogłoska, kreska znika i pojawia się „i”: [ci]asto, [ci]ocia, ś[ci]ana.', 'А коли після нього голосна, риска зникає і з’являється «i»: [ci]asto, [ci]ocia, ś[ci]ana.', 'А когда после него гласная, чёрточка исчезает и появляется «i»: [ci]asto, [ci]ocia, ś[ci]ana.')
  ],
  'cz-c:soft': [
    l('Ś, ź, ń, dź działają tak samo jak ć: ko[ń], [ś]nieg, [ź]le, łabę[dź].', 'Ś, ź, ń, dź працюють так само, як ć: ko[ń], [ś]nieg, [ź]le, łabę[dź].', 'Ś, ź, ń, dź работают так же, как ć: ko[ń], [ś]nieg, [ź]le, łabę[dź].'),
    l('Przed samogłoską: ko[ni]e, [si]ostra, [zi]ma, [dzi]eci. Kreska albo „i” — nigdy oba!', 'Перед голосною: ko[ni]e, [si]ostra, [zi]ma, [dzi]eci. Риска або «i» — ніколи обидва!', 'Перед гласной: ko[ni]e, [si]ostra, [zi]ma, [dzi]eci. Чёрточка или «i» — никогда обе!')
  ],
  'cz-c:czc': [
    l('Cz to twarde „ч”: [cz]as, [cz]arny, [cz]tery. Ć to miękki dźwięk, jak „ть” w słowie „мати”.', 'Cz — це тверде «ч»: [cz]as, [cz]arny, [cz]tery. Ć — м’який звук, як «ть» у слові «мати».', 'Cz — это твёрдое «ч»: [cz]as, [cz]arny, [cz]tery. Ć — мягкий звук, как «ть» в слове «мать».'),
    l('Czasowniki w bezokoliczniku kończą się na [ć]: pisa[ć], robi[ć], czyta[ć].', 'Дієслова в неозначеній формі закінчуються на [ć]: pisa[ć] — писати, robi[ć] — робити.', 'Глаголы в неопределённой форме заканчиваются на [ć]: pisa[ć] — писать, robi[ć] — делать.')
  ],
  'cz-c:tysz': [
    l('Gdy mówisz do kogoś „ty” teraz, czasownik kończy się na [sz]: ty pisze[sz], ty ma[sz], ty robi[sz].', 'Коли говориш комусь «ty» (ти) зараз, дієслово закінчується на [sz]: ty pisze[sz] — ти пишеш.', 'Когда говоришь кому-то «ty» (ты) сейчас, глагол заканчивается на [sz]: ty pisze[sz] — ты пишешь.'),
    l('Ale: ty jeste[ś]! A w przeszłości zawsze [ś]: ty byłe[ś], ty zrobiła[ś], gdzie byłe[ś]?', 'Але: ty jeste[ś]! А в минулому завжди [ś]: ty byłe[ś] — ти був, ty zrobiła[ś] — ти зробила.', 'Но: ty jeste[ś]! А в прошлом всегда [ś]: ty byłe[ś] — ты был, ty zrobiła[ś] — ты сделала.')
  ],
  'cz-c:szs': [
    l('[Sz] jak „ш”: [sz]koła, [sz]afa, u[sz]y. [Ś] jak miękkie „сь”: [ś]nieg, [ś]wiat.', '[Sz] як «ш»: [sz]koła, [sz]afa, u[sz]y. [Ś] як м’яке «сь»: [ś]nieg, [ś]wiat.', '[Sz] как «ш»: [sz]koła, [sz]afa, u[sz]y. [Ś] как мягкое «сь»: [ś]nieg, [ś]wiat.'),
    l('Słowo z oboma: [sz]e[ś]ć — sześć, jak „шість”!', 'Слово з обома: [sz]e[ś]ć — шість!', 'Слово с обоими: [sz]e[ś]ć — шесть!')
  ],

  /* ---------- Ę / Ą ---------- */
  'e-a:verbs': [
    l('Kiedy mówisz o sobie (ja), czasownik kończy się na [ę]: ja id[ę], ja pisz[ę].', 'Коли говориш про себе (ja — я), дієслово закінчується на [ę]: ja id[ę] — я йду.', 'Когда говоришь о себе (ja — я), глагол заканчивается на [ę]: ja id[ę] — я иду.'),
    l('Kiedy mówisz o nich (oni), na końcu jest [ą]: oni id[ą], oni pisz[ą]. Nigdy „idom”!', 'Коли говориш про них (oni — вони), у кінці [ą]: oni id[ą]. Ніколи «idom»!', 'Когда говоришь о них (oni — они), в конце [ą]: oni id[ą]. Никогда «idom»!')
  ],
  'e-a:cases': [
    l('Kogo? co? widzę — mam[ę], babci[ę], książk[ę].', 'Кого? що? бачу — mam[ę], babci[ę], książk[ę].', 'Кого? что? вижу — mam[ę], babci[ę], książk[ę].'),
    l('Z kim? z czym? — z mam[ą], z babci[ą], kred[ą].', 'З ким? з чим? — z mam[ą], z babci[ą], kred[ą].', 'С кем? с чем? — z mam[ą], z babci[ą], kred[ą].')
  ],
  'e-a:alt': [
    l('Ą i ę to rodzeństwo — w jednej rodzinie słów zamieniają się miejscami: z[ą]b → z[ę]by.', 'Ą та ę — брат і сестра: в одній родині слів міняються місцями: z[ą]b → z[ę]by.', 'Ą и ę — брат и сестра: в одной семье слов меняются местами: z[ą]b → z[ę]by.'),
    l('Słyszysz ogonek w innej formie? Pisz ogonek: r[ę]ka → r[ą]czka, ksi[ą]żka → ksi[ę]ga.', 'Чуєш хвостик в іншій формі? Пиши хвостик: r[ę]ka → r[ą]czka.', 'Слышишь хвостик в другой форме? Пиши хвостик: r[ę]ka → r[ą]czka.')
  ],
  'e-a:trick': [
    l('Ukraińskie „у” często zmienia się w [ą]: зуб → z[ą]b, дуб → d[ą]b, суд → s[ą]d.', 'Українське «у» часто стає [ą]: зуб → z[ą]b, дуб → d[ą]b, суд → s[ą]d.', 'Русское «у» часто становится [ą]: зуб → z[ą]b, дуб → d[ą]b, суд → s[ą]d.'),
    l('A „я” zmienia się w [ę]: п’ять → pi[ę]ć, м’ясо → mi[ę]so, пам’ять → pami[ę]ć.', 'А «я» стає [ę]: п’ять → pi[ę]ć, м’ясо → mi[ę]so, пам’ять → pami[ę]ć.', 'А «я» становится [ę]: пять → pi[ę]ć, мясо → mi[ę]so, память → pami[ę]ć.')
  ],
  'e-a:en': [
    l('Polskie słowa mają ogonki: r[ę]ka, m[ą]ka, g[ę]ś.', 'Польські слова мають хвостики: r[ę]ka, m[ą]ka, g[ę]ś.', 'Польские слова имеют хвостики: r[ę]ka, m[ą]ka, g[ę]ś.'),
    l('Słowa z innych języków — bez ogonków: t[em]po, k[on]to, c[en]trum, k[om]pot.', 'Слова з інших мов — без хвостиків: t[em]po, k[on]to, c[en]trum, k[om]pot.', 'Слова из других языков — без хвостиков: t[em]po, k[on]to, c[en]trum, k[om]pot.')
  ],

  /* ---------- LICZEBNIKI ---------- */
  'liczebniki:typ': [
    l('Ile orzeszków? — [pięć]. Który orzeszek? — [piąty]. Pytanie mówi, jaki to liczebnik.', 'Скільки горішків? — [pięć]. Котрий горішок? — [piąty]. Питання підказує, який це числівник.', 'Сколько орешков? — [pięć]. Который орешек? — [piąty]. Вопрос подсказывает, какое это числительное.'),
    l('Porządkowy odmienia się jak przymiotnik: [pierwszy] dzień, [pierwsza] klasa, na [piątym] piętrze.', 'Порядковий змінюється як прикметник: [pierwszy] dzień, [pierwsza] klasa.', 'Порядковое изменяется как прилагательное: [pierwszy] dzień, [pierwsza] klasa.')
  ],
  'liczebniki:nascie': [
    l('Zwykle: liczba + -naście: dwa[naście], trzy[naście], siedem[naście].', 'Зазвичай: число + -naście: dwa[naście], trzy[naście], siedem[naście].', 'Обычно: число + -naście: dwa[naście], trzy[naście], siedem[naście].'),
    l('Uwaga: czter[naście] (nie czterynaście), pi[ęt]naście, sze[s]naście, dziewi[ęt]naście.', 'Увага: czter[naście] (не czterynaście), pi[ęt]naście, sze[s]naście, dziewi[ęt]naście.', 'Внимание: czter[naście] (не czterynaście), pi[ęt]naście, sze[s]naście, dziewi[ęt]naście.')
  ],
  'liczebniki:dziesiat': [
    l('Dwa[dzieścia] — 20. Trzy[dzieści], czter[dzieści] — 30 i 40.', 'Dwa[dzieścia] — 20. Trzy[dzieści], czter[dzieści] — 30 і 40.', 'Dwa[dzieścia] — 20. Trzy[dzieści], czter[dzieści] — 30 и 40.'),
    l('Od 50 do 90 — [dziesiąt]: pięć[dziesiąt], osiem[dziesiąt].', 'Від 50 до 90 — [dziesiąt]: pięć[dziesiąt] — п’ятдесят.', 'От 50 до 90 — [dziesiąt]: pięć[dziesiąt] — пятьдесят.')
  ],
  'liczebniki:set': [
    l('Dwie[ście] — 200. Trzy[sta], cztery[sta] — 300 i 400.', 'Dwie[ście] — 200 (двісті). Trzy[sta], cztery[sta] — 300 і 400.', 'Dwie[ście] — 200 (двести). Trzy[sta], cztery[sta] — 300 и 400.'),
    l('Od 500 — [set]: pięć[set], sześć[set], dziewięć[set].', 'Від 500 — [set]: pięć[set] — п’ятсот.', 'От 500 — [set]: pięć[set] — пятьсот.')
  ],
  'liczebniki:dwa': [
    l('[Dwa] — dla męskich rzeczy i zwierząt oraz nijakich: dwa psy, dwa okna. [Dwie] — dla żeńskich: dwie siostry.', '[Dwa] — для чоловічого й середнього роду: dwa psy, dwa okna. [Dwie] — для жіночого: dwie siostry.', '[Dwa] — для мужского и среднего рода: dwa psy, dwa okna. [Dwie] — для женского: dwie siostry.'),
    l('[Dwóch] — dla chłopców i mężczyzn. [Dwoje] — dla dzieci.', '[Dwóch] — для хлопців і чоловіків. [Dwoje] — для дітей.', '[Dwóch] — для мальчиков и мужчин. [Dwoje] — для детей.')
  ],
  'liczebniki:ile': [
    l('Dwa, trzy, cztery — [koty]. Pięć, sześć, siedem… — [kotów].', 'Два, три, чотири — [koty]. П’ять, шість, сім… — [kotów].', 'Два, три, четыре — [koty]. Пять, шесть, семь… — [kotów].'),
    l('Uwaga: 12, 13, 14 też — [kotów]. A 22, 23, 24 — znowu [koty]!', 'Увага: 12, 13, 14 теж — [kotów]. А 22, 23, 24 — знову [koty]!', 'Внимание: 12, 13, 14 тоже — [kotów]. А 22, 23, 24 — снова [koty]!')
  ],

  /* ---------- PRZYMIOTNIKI ---------- */
  'przymiotniki:co': [
    l('Zapytaj: jaki rower? — [czerwony]. Jaka sowa? — [mądra]. To są przymiotniki!', 'Запитай: який велосипед? — [czerwony]. Яка сова? — [mądra]. Це прикметники!', 'Спроси: какой велосипед? — [czerwony]. Какая сова? — [mądra]. Это прилагательные!'),
    l('Rzeczownik mówi kto? co? (rower, sowa). Czasownik — co robi? (śpi, biega). A przymiotnik dodaje kolor i cechę.', 'Іменник — хто? що? (rower, sowa). Дієслово — що робить? (śpi, biega). А прикметник додає колір і ознаку.', 'Существительное — кто? что? (rower, sowa). Глагол — что делает? (śpi, biega). А прилагательное добавляет цвет и признак.')
  ],
  'przymiotniki:rodzaj': [
    l('Przymiotnik słucha rzeczownika: duż[y] dom (on), duż[a] książka (ona), duż[e] okno (ono).', 'Прикметник слухається іменника: duż[y] dom (він), duż[a] książka (вона), duż[e] okno (воно).', 'Прилагательное слушается существительного: duż[y] dom (он), duż[a] książka (она), duż[e] okno (оно).'),
    l('Po k i g piszemy -i zamiast -y: wysok[i], drog[i], polsk[i]. I -ie zamiast -e: słodk[ie].', 'Після k і g пишемо -i замість -y: wysok[i], drog[i], polsk[i]. І -ie замість -e: słodk[ie].', 'После k и g пишем -i вместо -y: wysok[i], drog[i], polsk[i]. И -ie вместо -e: słodk[ie].')
  ],
  'przymiotniki:mnoga': [
    l('Gdy mówisz o chłopcach i mężczyznach, przymiotnik się zmienia: mił[y] → mil[i], dobr[y] → dobrz[y], wysok[i] → wysoc[y].', 'Коли говориш про хлопців і чоловіків, прикметник змінюється: mił[y] → mil[i], dobr[y] → dobrz[y], wysok[i] → wysoc[y].', 'Когда говоришь о мальчиках и мужчинах, прилагательное меняется: mił[y] → mil[i], dobr[y] → dobrz[y], wysok[i] → wysoc[y].'),
    l('Dla dziewczynek, dzieci, zwierząt i rzeczy — zawsze -e: mił[e] koty, dobr[e] dzieci, wysoki[e] drzewa.', 'Для дівчаток, дітей, тварин і речей — завжди -e: mił[e] koty, dobr[e] dzieci, wysoki[e] drzewa.', 'Для девочек, детей, животных и вещей — всегда -e: mił[e] koty, dobr[e] dzieci, wysoki[e] drzewa.')
  ],
  'przymiotniki:stopien': [
    l('Dwa zwierzęta? Kot jest szyb[szy] niż żółw. Słówko „niż” to znak stopnia wyższego.', 'Дві тварини? Kot jest szyb[szy] niż żółw — кіт швидший за черепаху. Слово «niż» — знак вищого ступеня.', 'Два животных? Kot jest szyb[szy] niż żółw — кот быстрее черепахи. Слово «niż» — знак сравнительной степени.'),
    l('Najszybszy ze wszystkich? Dodaj [naj-]: [naj]szybszy, [naj]starszy, [naj]mądrzejszy.', 'Найшвидший з усіх? Додай [naj-]: [naj]szybszy, [naj]starszy, [naj]mądrzejszy.', 'Самый быстрый из всех? Добавь [naj-]: [naj]szybszy, [naj]starszy, [naj]mądrzejszy.')
  ],
  'przymiotniki:nieregularne': [
    l('Nie mówimy „dobrszy” ani „duższy”! Mówimy: [lepszy], [większy].', 'Не кажемо «dobrszy» чи «duższy»! Кажемо: [lepszy], [większy].', 'Не говорим «dobrszy» или «duższy»! Говорим: [lepszy], [większy].'),
    l('Zapamiętaj czwórkę: dobry–[lepszy], zły–[gorszy], duży–[większy], mały–[mniejszy]. A potem tylko [naj-]: [naj]lepszy!', 'Запам’ятай четвірку: dobry–[lepszy], zły–[gorszy], duży–[większy], mały–[mniejszy]. А далі тільки [naj-]: [naj]lepszy!', 'Запомни четвёрку: dobry–[lepszy], zły–[gorszy], duży–[większy], mały–[mniejszy]. А дальше только [naj-]: [naj]lepszy!')
  ],
  'przymiotniki:nie': [
    l('Zwykły przymiotnik + nie = jedno słowo: [nie]dobry, [nie]miły, [nie]wysoki.', 'Звичайний прикметник + nie = одне слово: [nie]dobry, [nie]miły, [nie]wysoki.', 'Обычное прилагательное + nie = одно слово: [nie]dobry, [nie]miły, [nie]wysoki.'),
    l('Ale gdy porównujesz (-szy, naj-), „nie” stoi osobno: [nie ]lepszy, [nie ]starszy, [nie ]najlepszy.', 'Але коли порівнюєш (-szy, naj-), «nie» стоїть окремо: [nie ]lepszy, [nie ]starszy, [nie ]najlepszy.', 'Но когда сравниваешь (-szy, naj-), «nie» стоит отдельно: [nie ]lepszy, [nie ]starszy, [nie ]najlepszy.')
  ],

  /* ---------- CZASOWNIKI ---------- */
  'czasowniki:co': [
    l('Zapytaj: co robi bóbr? — [buduje]. Co robią dzieci? — [śpiewają]. To są czasowniki!', 'Запитай: що робить бобер? — [buduje]. Що роблять діти? — [śpiewają]. Це дієслова!', 'Спроси: что делает бобр? — [buduje]. Что делают дети? — [śpiewają]. Это глаголы!'),
    l('Czasownik to też to, co się dzieje: deszcz [pada], słońce [świeci], woda [płynie].', 'Дієслово — це й те, що відбувається: deszcz [pada] — дощ падає, woda [płynie] — вода тече.', 'Глагол — это и то, что происходит: deszcz [pada] — идёт дождь, woda [płynie] — вода течёт.')
  ],
  'czasowniki:osoby': [
    l('Słuchaj końcówki: ja czyta[m], ty czyta[sz], on czyta. Końcówka zdradza, kto to robi!', 'Слухай закінчення: ja czyta[m], ty czyta[sz], on czyta. Закінчення підказує, хто це робить!', 'Слушай окончание: ja czyta[m], ty czyta[sz], on czyta. Окончание выдаёт, кто это делает!'),
    l('My czyta[my], wy czyta[cie], oni czyta[ją]. Niektóre: ja mówi[ę], oni id[ą].', 'My czyta[my], wy czyta[cie], oni czyta[ją]. Деякі: ja mówi[ę], oni id[ą].', 'My czyta[my], wy czyta[cie], oni czyta[ją]. Некоторые: ja mówi[ę], oni id[ą].')
  ],
  'czasowniki:przeszly': [
    l('Wczoraj kot spa[ł], mama czyta[ła], dziecko płaka[ło] — jak po ukraińsku: спав, читала, плакало.', 'Учора кіт spa[ł], мама czyta[ła], дитя płaka[ło] — як українською: спав, читала, плакало.', 'Вчера кот spa[ł], мама czyta[ła], ребёнок płaka[ło] — как по-русски: спал, читала, плакало.'),
    l('O sobie: chłopiec mówi „by[łem]”, dziewczynka — „by[łam]”. Chłopcy gra[li], dziewczynki gra[ły].', 'Про себе: хлопець каже «by[łem]», дівчинка — «by[łam]». Хлопці gra[li], дівчата gra[ły].', 'О себе: мальчик говорит «by[łem]», девочка — «by[łam]». Мальчики gra[li], девочки gra[ły].')
  ],
  'czasowniki:czas': [
    l('Słówka-pomocnicy: [wczoraj], [rano], [latem] → często przeszły. [Teraz], [właśnie] → teraźniejszy. [Jutro], [w sobotę] → przyszły.', 'Слова-помічники: [wczoraj], [rano] → часто минулий. [Teraz], [właśnie] → теперішній. [Jutro], [w sobotę] → майбутній.', 'Слова-помощники: [wczoraj], [rano] → часто прошедшее. [Teraz], [właśnie] → настоящее. [Jutro], [w sobotę] → будущее.'),
    l('Przyszły ma dwie formy: [będę] pisać albo [na]piszę. Obie mówią o jutrze!', 'Майбутній має дві форми: [będę] pisać або [na]piszę. Обидві — про завтра!', 'Будущее имеет две формы: [będę] pisać или [na]piszę. Обе — про завтра!')
  ],
  'czasowniki:aspekt': [
    l('[Robię] — to trwa albo powtarza się: codziennie robię lekcje.', '[Robię] — це триває або повторюється: codziennie robię lekcje — щодня роблю уроки.', '[Robię] — это длится или повторяется: codziennie robię lekcje — каждый день делаю уроки.'),
    l('[Z]robię — skończę i będzie gotowe: jutro zrobię lekcje. Mały dodatek z-, prze-, na- zmienia wszystko!', '[Z]robię — закінчу, і буде готово: jutro zrobię lekcje. Маленька приставка z-, prze-, na- змінює все!', '[Z]robię — закончу, и будет готово: jutro zrobię lekcje. Маленькая приставка z-, prze-, na- меняет всё!')
  ],
  'czasowniki:nie': [
    l('„Nie” stoi przed czasownikiem osobno, jak mały strażnik: [nie ]wiem, [nie ]lubię, [nie ]śpi.', '«Nie» стоїть перед дієсловом окремо, як маленький вартовий: [nie ]wiem — не знаю.', '«Nie» стоит перед глаголом отдельно, как маленький часовой: [nie ]wiem — не знаю.'),
    l('Jeden wyjątek: [nienawidzić] — piszemy razem, bo słowa „nawidzić” nie ma.', 'Один виняток: [nienawidzić] — пишемо разом, бо слова «nawidzić» немає.', 'Одно исключение: [nienawidzić] — пишем слитно, потому что слова «nawidzić» нет.')
  ],

  /* ---------- WIELKA LITERA ---------- */
  'wielka-litera:nazwy': [
    l('Każdy ma swoje imię: [A]nna, [T]omek, a nawet pies [B]urek. Imiona zawsze rosną!', 'Кожен має своє ім’я: [A]nna, [T]omek, навіть пес [B]urek. Імена завжди «ростуть»!', 'У каждого своё имя: [A]nna, [T]omek, даже собака [B]urek. Имена всегда «растут»!'),
    l('Miejsca też: [W]arszawa, [P]olska, [W]isła. Ale „ulica”, „miasto”, „rzeka” to zwykłe słowa — małą literą.', 'Місця теж: [W]arszawa, [P]olska, [W]isła. А «ulica», «miasto», «rzeka» — звичайні слова, з малої.', 'Места тоже: [W]arszawa, [P]olska, [W]isła. А «ulica», «miasto», «rzeka» — обычные слова, со строчной.')
  ],
  'wielka-litera:polak': [
    l('Kto? — [P]olak, [U]krainka, [N]iemiec. Mieszkańcy kraju piszemy wielką literą.', 'Хто? — [P]olak, [U]krainka, [N]iemiec. Жителів країни пишемо з великої.', 'Кто? — [P]olak, [U]krainka, [N]iemiec. Жителей страны пишем с заглавной.'),
    l('Jaki? — [p]olski, [u]kraiński. Przymiotnik zawsze małą literą!', 'Який? — [p]olski, [u]kraiński. Прикметник завжди з малої!', 'Какой? — [p]olski, [u]kraiński. Прилагательное всегда со строчной!')
  ],
  'wielka-litera:czas': [
    l('[p]oniedziałek, [w]torek, [s]tyczeń, [m]aj — małą literą, jak po ukraińsku.', '[p]oniedziałek, [w]torek, [s]tyczeń, [m]aj — з малої, як в українській.', '[p]oniedziałek, [w]torek, [s]tyczeń, [m]aj — со строчной, как в русском.'),
    l('Ale święta są ważne — rosną: [B]oże Narodzenie, [W]ielkanoc, [D]zień [M]atki.', 'А свята важливі — «ростуть»: [B]oże Narodzenie, [W]ielkanoc, [D]zień [M]atki.', 'А праздники важные — «растут»: [B]oże Narodzenie, [W]ielkanoc, [D]zień [M]atki.')
  ],

  /* ---------- ZAIMKI ---------- */
  'zaimki:osobowe': [
    l('Tomek gra. [On] jest szczęśliwy. Zaimek zastępuje imię, żeby nie powtarzać.', 'Tomek gra. [On] jest szczęśliwy. Займенник замінює ім’я, щоб не повторювати.', 'Tomek gra. [On] jest szczęśliwy. Местоимение заменяет имя, чтобы не повторять.'),
    l('Uwaga: [oni] to chłopcy, a [one] to dziewczynki, zwierzęta i rzeczy.', 'Увага: [oni] — хлопці, а [one] — дівчатка, тварини й речі.', 'Внимание: [oni] — мальчики, а [one] — девочки, животные и вещи.')
  ],
  'zaimki:formy': [
    l('Ja → daj [mi], nie ma [mnie]. Ty → widzę [cię], dam [ci].', 'Ja → daj [mi] (дай мені), nie ma [mnie] (мене немає). Ty → widzę [cię] (бачу тебе).', 'Ja → daj [mi] (дай мне), nie ma [mnie] (меня нет). Ty → widzę [cię] (вижу тебя).'),
    l('On → lubię [go], z [nim]. Ona → kocham [ją], pomagam [jej], o [niej].', 'On → lubię [go] (люблю його), z [nim]. Ona → kocham [ją], pomagam [jej] (допомагаю їй).', 'On → lubię [go] (люблю его), z [nim]. Ona → kocham [ją], pomagam [jej] (помогаю ей).')
  ],
  'zaimki:moj': [
    l('Czyj pies? — [mój]. Czyja mama? — [moja]. Czyje okno? — [moje].', 'Чий пес? — [mój]. Чия мама? — [moja]. Чиє вікно? — [moje].', 'Чья собака (pies)? — [mój]. Чья мама? — [moja]. Чьё окно? — [moje].'),
    l('Tak samo: [twój], [twoja], [twoje] i [nasz], [nasza], [nasze].', 'Так само: [twój], [twoja], [twoje] і [nasz], [nasza], [nasze].', 'Так же: [twój], [twoja], [twoje] и [nasz], [nasza], [nasze].')
  ],
  'zaimki:ten': [
    l('[Ten] — gdy mówimy „on”: ten kot. [Ta] — „ona”: ta książka. [To] — „ono”: to okno.', '[Ten] — для «він»: ten kot. [Ta] — «вона»: ta książka. [To] — «воно»: to okno.', '[Ten] — для «он»: ten kot. [Ta] — «она»: ta książka. [To] — «оно»: to okno.')
  ],

  /* ---------- PRZYSŁÓWKI ---------- */
  'przyslowki:co': [
    l('Jak idę? — [wolno]. Gdzie śpię? — [tutaj]. Kiedy pojadę? — [jutro]. To przysłówki!', 'Як я йду? — [wolno]. Де сплю? — [tutaj]. Коли поїду? — [jutro]. Це прислівники!', 'Как я ползу? — [wolno]. Где сплю? — [tutaj]. Когда поеду? — [jutro]. Это наречия!'),
    l('Przysłówek się nie odmienia — zawsze wygląda tak samo.', 'Прислівник не змінюється — завжди виглядає однаково.', 'Наречие не изменяется — всегда выглядит одинаково.')
  ],
  'przyslowki:od': [
    l('Jaki ślimak? — [wolny]. Jak idzie? — [wolno]. Przymiotnik dla rzeczy, przysłówek dla czynności.', 'Який равлик? — [wolny]. Як іде? — [wolno]. Прикметник — для речі, прислівник — для дії.', 'Какая улитка? — [wolny]. Как ползёт? — [wolno]. Прилагательное — для вещи, наречие — для действия.'),
    l('Uwaga: dobry → [dobrze], zły → [źle], ładny → [ładnie].', 'Увага: dobry → [dobrze], zły → [źle], ładny → [ładnie].', 'Внимание: dobry → [dobrze], zły → [źle], ładny → [ładnie].')
  ],
  'przyslowki:stopien': [
    l('Wolno → [wolniej] → [naj]wolniej. Szybko → [szybciej] → [naj]szybciej.', 'Wolno → [wolniej] → [naj]wolniej. Szybko → [szybciej] → [naj]szybciej.', 'Wolno → [wolniej] → [naj]wolniej. Szybko → [szybciej] → [naj]szybciej.'),
    l('Łobuzy: dobrze → [lepiej], źle → [gorzej], dużo → [więcej], mało → [mniej].', 'Розбишаки: dobrze → [lepiej], źle → [gorzej], dużo → [więcej], mało → [mniej].', 'Хулиганы: dobrze → [lepiej], źle → [gorzej], dużo → [więcej], mało → [mniej].')
  ],
  'przyslowki:nie': [
    l('Przysłówek na -o, -e łączy się z „nie”: [nie]daleko, [nie]dobrze, [nie]wygodnie.', 'Прислівник на -o, -e пишемо з «nie» разом: [nie]daleko, [nie]dobrze.', 'Наречие на -o, -e пишем с «nie» слитно: [nie]daleko, [nie]dobrze.'),
    l('Osobno: [nie ]tu, [nie ]teraz, [nie ]zawsze, [nie ]bardzo i [nie ]lepiej.', 'Окремо: [nie ]tu, [nie ]teraz, [nie ]zawsze, [nie ]bardzo і [nie ]lepiej.', 'Раздельно: [nie ]tu, [nie ]teraz, [nie ]zawsze, [nie ]bardzo и [nie ]lepiej.')
  ],

  /* ---------- PRZYIMKI ---------- */
  'przyimki:gdzie': [
    l('Gdzie jestem? [W] pudełku, [na] krześle, [pod] łóżkiem, [nad] stołem.', 'Де я? [W] pudełku, [na] krześle, [pod] łóżkiem, [nad] stołem.', 'Где я? [W] pudełku, [na] krześle, [pod] łóżkiem, [nad] stołem.'),
    l('A może [za] drzwiami, [przed] domem, [obok] kota albo [między] kotem a psem?', 'А може [za] drzwiami, [przed] domem, [obok] kota чи [między] kotem a psem?', 'А может [za] drzwiami, [przed] domem, [obok] kota или [między] kotem a psem?')
  ],
  'przyimki:przypadek': [
    l('Przyimek to szef: mówi rzeczownikowi, jaką ma mieć końcówkę. Do szkoł[y], w szkol[e].', 'Прийменник — начальник: каже іменнику, яке закінчення мати. Do szkoł[y], w szkol[e].', 'Предлог — начальник: говорит существительному, какое окончание иметь. Do szkoł[y], w szkol[e].'),
    l('[Do], [bez], [dla], [od], [u] → kogo? czego? [W], [o] → o kim? o czym? [Z] (razem) → z kim?', '[Do], [bez], [dla], [od], [u] → кого? чого? [W], [o] → про кого? [Z] (разом) → з ким?', '[Do], [bez], [dla], [od], [u] → кого? чего? [W], [o] → о ком? [Z] (вместе) → с кем?')
  ],
  'przyimki:we': [
    l('Spróbuj powiedzieć „w wtorek” — trudno! Dlatego mówimy [we] wtorek, [we] Wrocławiu.', 'Спробуй сказати «w wtorek» — важко! Тому кажемо [we] wtorek, [we] Wrocławiu.', 'Попробуй сказать «w wtorek» — трудно! Поэтому говорим [we] wtorek, [we] Wrocławiu.'),
    l('Tak samo [ze]: [ze] szkoły, [ze] mną, [ze] szafy. A zwykle — krótko: [w] domu, [z] kotem.', 'Так само [ze]: [ze] szkoły, [ze] mną. А зазвичай — коротко: [w] domu, [z] kotem.', 'Так же [ze]: [ze] szkoły, [ze] mną. А обычно — коротко: [w] domu, [z] kotem.')
  ],
  'przyimki:osobno': [
    l('Przyimek lubi stać osobno: [na pewno], [po polsku], [z powrotem], [do widzenia].', 'Прийменник любить стояти окремо: [na pewno], [po polsku], [z powrotem], [do widzenia].', 'Предлог любит стоять отдельно: [na pewno], [po polsku], [z powrotem], [do widzenia].'),
    l('Ale kilka słów się skleiło: [naprawdę], [dlatego], [naraz], [nadal]. Je trzeba zapamiętać.', 'Але кілька слів склеїлися: [naprawdę], [dlatego], [naraz], [nadal]. Їх треба запам’ятати.', 'Но несколько слов склеились: [naprawdę], [dlatego], [naraz], [nadal]. Их надо запомнить.')
  ],

  /* ---------- SPÓJNIKI ---------- */
  'spojniki:znaczenie': [
    l('Spójnik to nitka: łączy słowa (koty [i] psy) albo całe zdania (chcę, [ale] nie mogę).', 'Сполучник — це нитка: з’єднує слова (koty [i] psy) або цілі речення (chcę, [ale] nie mogę).', 'Союз — это нитка: соединяет слова (koty [i] psy) или целые предложения (chcę, [ale] nie mogę).'),
    l('[Bo] mówi „dlaczego”, [więc] mówi „co z tego wynika”, [że] łączy „wiem / myślę” z resztą.', '[Bo] каже «чому», [więc] — «що з цього виходить», [że] — як «що»: wiem, że…', '[Bo] говорит «почему», [więc] — «что из этого следует», [że] — как «что»: wiem, że…')
  ],
  'spojniki:przecinek': [
    l('Przed [ale], [bo], [że], [więc], [a], [który] zawsze stawiamy przecinek.', 'Перед [ale], [bo], [że], [więc], [a], [który] завжди ставимо кому.', 'Перед [ale], [bo], [że], [więc], [a], [który] всегда ставим запятую.'),
    l('Przed [i], [lub], [albo], [czy] — zwykle bez przecinka: koty i psy.', 'Перед [i], [lub], [albo], [czy] — зазвичай без коми: koty i psy.', 'Перед [i], [lub], [albo], [czy] — обычно без запятой: koty i psy.')
  ],
  'spojniki:wyliczanie': [
    l('Gdy wyliczasz, rozdzielaj przecinkami: jabłka[,] gruszki i banany. Przed ostatnim „i” — bez przecinka.', 'Коли перелічуєш, розділяй комами: jabłka[,] gruszki i banany. Перед останнім «i» — без коми.', 'Когда перечисляешь, разделяй запятыми: jabłka[,] gruszki i banany. Перед последним «i» — без запятой.'),
    l('Gdy wołasz kogoś, imię oddziel przecinkiem: Mamo[,] chodź! Kasiu[,] pomóż!', 'Коли звертаєшся, ім’я відділяй комою: Mamo[,] chodź! Kasiu[,] pomóż!', 'Когда обращаешься, имя отделяй запятой: Mamo[,] chodź! Kasiu[,] pomóż!')
  ],

  /* ---------- ZDANIE ---------- */
  'zdanie:rownowaznik': [
    l('Każde zdanie ma czasownik — jak każde mrowisko ma królową: Kot [śpi].', 'Кожне речення має дієслово — як кожен мурашник має королеву: Kot [śpi].', 'В каждом предложении есть глагол — как в каждом муравейнике есть королева: Kot [śpi].'),
    l('Cisza! Smacznego! Uwaga, pies! — tu nie ma czasownika. To równoważniki zdań.', 'Cisza! Smacznego! Uwaga, pies! — тут немає дієслова. Це еквіваленти речень.', 'Cisza! Smacznego! Uwaga, pies! — здесь нет глагола. Это эквиваленты предложений.')
  ],
  'zdanie:znaki': [
    l('Opowiadasz — [.] Pytasz — [?] Prosisz albo wołasz — [!]', 'Розповідаєш — [.] Питаєш — [?] Просиш або кличеш — [!]', 'Рассказываешь — [.] Спрашиваешь — [?] Просишь или зовёшь — [!]'),
    l('Słówka [czy], [gdzie], [kto], [ile] na początku — to prawie zawsze pytanie.', 'Слівця [czy], [gdzie], [kto], [ile] на початку — це майже завжди питання.', 'Слова [czy], [gdzie], [kto], [ile] в начале — это почти всегда вопрос.')
  ],
  'zdanie:podmiot': [
    l('Najpierw znajdź czasownik — to orzeczenie: Kot [śpi]. Potem zapytaj: kto śpi? — [Kot]. To podmiot.', 'Спочатку знайди дієслово — це присудок: Kot [śpi]. Потім спитай: хто спить? — [Kot]. Це підмет.', 'Сначала найди глагол — это сказуемое: Kot [śpi]. Потом спроси: кто спит? — [Kot]. Это подлежащее.'),
    l('Podmiot nie zawsze stoi pierwszy: Wczoraj padał [deszcz] — co padało? deszcz!', 'Підмет не завжди перший: Wczoraj padał [deszcz] — що падало? дощ!', 'Подлежащее не всегда первое: Wczoraj padał [deszcz] — что шло? дождь!')
  ],
  'zdanie:czesci': [
    l('Przydawka ozdabia rzeczownik: [mały] kot, [mój] brat. Pytamy: jaki? czyj?', 'Означення прикрашає іменник: [mały] kot, [mój] brat. Питаємо: який? чий?', 'Определение украшает существительное: [mały] kot, [mój] brat. Спрашиваем: какой? чей?'),
    l('Dopełnienie — kogo? co? (czytam [książkę]). Okolicznik — gdzie? kiedy? jak? (śpi [na kanapie], biegnie [szybko]).', 'Додаток — кого? що? (czytam [książkę]). Обставина — де? коли? як? (śpi [na kanapie]).', 'Дополнение — кого? что? (czytam [książkę]). Обстоятельство — где? когда? как? (śpi [na kanapie]).')
  ],
  'zdanie:zlozone': [
    l('Policz czasowniki jak mrówki: jeden — pojedyncze, dwa — złożone.', 'Порахуй дієслова, як мурашок: одне — просте, два — складне.', 'Посчитай глаголы, как муравьёв: один — простое, два — сложное.'),
    l('W złożonym często jest przecinek i spójnik: Kot [śpi], a pies [szczeka].', 'У складному часто є кома і сполучник: Kot [śpi], a pies [szczeka].', 'В сложном часто есть запятая и союз: Kot [śpi], a pies [szczeka].')
  ],

  /* ---------- PRZYPADKI ---------- */
  'przypadki:M': [
    l(
      'Zadaj pytanie: kto? co? Odpowiedź to mianownik — tak jak w słowniku: [kot], [mama], [okno].',
      'Постав питання: kto? co? (хто? що?) Відповідь — це mianownik, як у словнику: [kot], [mama], [okno].',
      'Задай вопрос: kto? co? (кто? что?) Ответ — это mianownik, как в словаре: [kot], [mama], [okno].'
    ),
    l(
      'Kto śpi? — [kot] śpi. Co świeci? — [słońce] świeci. Ten, kto coś robi, stoi w mianowniku.',
      'Хто спить? — [kot] śpi. Що світить? — [słońce] świeci. Той, хто щось робить, стоїть у називному.',
      'Кто спит? — [kot] śpi. Что светит? — [słońce] świeci. Тот, кто что-то делает, стоит в именительном.'
    )
  ],
  'przypadki:D': [
    l(
      'Dopełniacz to brama „braku”: nie ma kot[a], nie ma mam[y], nie ma okn[a].',
      'Dopełniacz — брама «нестачі»: nie ma kot[a], nie ma mam[y], nie ma okn[a] — немає кота, мами, вікна.',
      'Dopełniacz — ворота «нехватки»: nie ma kot[a], nie ma mam[y], nie ma okn[a] — нет кота, мамы, окна.'
    ),
    l(
      'Też po: do, bez, od, dla, obok, u. Idę do szkoł[y]. Herbata bez cukr[u].',
      'А ще після: do, bez, od, dla, obok, u. Idę do szkoł[y]. Herbata bez cukr[u].',
      'А ещё после: do, bez, od, dla, obok, u. Idę do szkoł[y]. Herbata bez cukr[u].'
    )
  ],
  'przypadki:C': [
    l(
      'Celownik — komu coś dajesz? Daję mleko kot[u], kwiaty mam[ie].',
      'Celownik — кому щось даєш? Daję mleko kot[u], kwiaty mam[ie].',
      'Celownik — кому что-то даёшь? Daję mleko kot[u], kwiaty mam[ie].'
    ),
    l(
      'Też: pomagam, dziękuję, wierzę — komu? Pomagam brat[u], dziękuję koled[ze].',
      'А ще: pomagam, dziękuję, wierzę — кому? Pomagam brat[u], dziękuję koled[ze].',
      'А ещё: pomagam, dziękuję, wierzę — кому? Pomagam brat[u], dziękuję koled[ze]. Внимание: «благодарю кого», а по-польски — komu!'
    )
  ],
  'przypadki:B': [
    l(
      'Biernik — kogo? co? widzę, mam, lubię: Widzę kot[a], kocham mam[ę], myję okn[o].',
      'Biernik — кого? що? бачу, маю, люблю: Widzę kot[a], kocham mam[ę], myję okn[o].',
      'Biernik — кого? что? вижу, имею, люблю: Widzę kot[a], kocham mam[ę], myję okn[o].'
    ),
    l(
      'Sekret: rzeczy rodzaju męskiego wyglądają jak mianownik (widzę samolot), a zwierzęta i ludzie — jak dopełniacz (widzę ps[a]).',
      'Секрет: неживі речі чоловічого роду виглядають як називний (widzę samolot), а тварини й люди — як родовий (widzę ps[a]).',
      'Секрет: неодушевлённые мужского рода выглядят как именительный (widzę samolot), а животные и люди — как родительный (widzę ps[a]).'
    )
  ],
  'przypadki:N': [
    l(
      'Narzędnik — z kim? czym? Idę z kot[em], z mam[ą]. Piszę długopis[em].',
      'Narzędnik — з ким? чим? Idę z kot[em], z mam[ą]. Piszę długopis[em].',
      'Narzędnik — с кем? чем? Idę z kot[em], z mam[ą]. Piszę długopis[em].'
    ),
    l(
      'Po „jestem” też narzędnik: Jestem uczni[em]. Tata jest lekarz[em]. Końcówki: -[em] i -[ą].',
      'Після «jestem» теж орудний: Jestem uczni[em] — я учень. Закінчення: -[em] і -[ą].',
      'После «jestem» тоже творительный: Jestem uczni[em] — я ученик. Окончания: -[em] и -[ą].'
    )
  ],
  'przypadki:Ms': [
    l(
      'Miejscownik zawsze ma małego przyjaciela-przyimek: o, w, na, przy, po.',
      'Miejscownik завжди має маленького друга-прийменник: o, w, na, przy, po.',
      'Miejscownik всегда с маленьким другом-предлогом: o, w, na, przy, po.'
    ),
    l(
      'Myślę o ko[cie]. Mieszkam w Krako[wie]. Kot śpi na kanap[ie]. Często końcówka -[e] / -[ie].',
      'Myślę o ko[cie]. Mieszkam w Krako[wie]. Kot śpi na kanap[ie]. Часто закінчення -[e] / -[ie].',
      'Myślę o ko[cie]. Mieszkam w Krako[wie]. Kot śpi na kanap[ie]. Часто окончание -[e] / -[ie].'
    )
  ],
  'przypadki:W': [
    l(
      'Wołacz — gdy kogoś wołasz: Mam[o]! Tat[o]! Kasi[u]! Piotr[ze]!',
      'Wołacz — коли когось кличеш: Mam[o]! Tat[o]! Kasi[u]! Piotr[ze]!',
      'Wołacz — когда кого-то зовёшь: Mam[o]! Tat[o]! Kasi[u]! Piotr[ze]!'
    ),
    l(
      'Po ukraińsku jest tak samo: мамо! тату! Po rosyjsku prawie go nie ma — dlatego łatwo zapomnieć.',
      'Українською так само: мамо! тату! Тож тобі буде легко!',
      'По-русски его почти нет — поэтому легко забыть. Запомни: Mam[o]! а не «Mama!».'
    )
  ],
  'przypadki:trap': [
    l(
      'Pułapka nr 1: po „nie” biernik zmienia się w dopełniacz. Mam kanapk[ę] → Nie mam kanapk[i].',
      'Пастка №1: після «nie» знахідний стає родовим. Mam kanapk[ę] → Nie mam kanapk[i].',
      'Ловушка №1: после «nie» винительный становится родительным. Mam kanapk[ę] → Nie mam kanapk[i].'
    ),
    l(
      'Pułapka nr 2: słuchać, szukać, uczyć się, bać się, używać — zawsze dopełniacz: słucham muzyk[i], szukam telefon[u].',
      'Пастка №2: słuchać, szukać, uczyć się, bać się, używać — завжди родовий: słucham muzyk[i] (а не muzykę!).',
      'Ловушка №2: słuchać, szukać, uczyć się, bać się, używać — всегда родительный: słucham muzyk[i] (а не muzykę!).'
    )
  ]
}
