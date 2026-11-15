import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, SENT, tip } from './helpers'

/* ================================================================
   ZAIMKI — Papuzia Wyspa, przewodniczka: Papuga Pola
   (papuga nie lubi powtarzać — zamiast „Tomek, Tomek” mówi „on”)
   ================================================================ */

/* ---------- 1. On, ona, ono, oni, one ---------- */
const osHint = {
  on: l('Chłopiec, pan, pies, kot — zastępujemy słowem on.', 'Хлопець, пан, пес, кіт — замінюємо словом on (він).', 'Мальчик, господин, собака (pies), кот — заменяем словом on (он).'),
  ona: l('Dziewczynka, pani, mama, książka — ona.', 'Дівчинка, пані, мама, книжка — ona (вона).', 'Девочка, госпожа, мама, книга — ona (она).'),
  ono: l('Dziecko, okno, słońce — ono.', 'Дитя, вікно, сонце — ono (воно).', 'Ребёнок, окно, солнце — ono (оно).'),
  oni: l('Chłopcy, mężczyźni (albo chłopiec i dziewczynka) — oni.', 'Хлопці, чоловіки (або хлопець і дівчинка) — oni.', 'Мальчики, мужчины (или мальчик и девочка) — oni.'),
  one: l('Dziewczynki, koty, książki — one.', 'Дівчатка, коти, книжки — one.', 'Девочки, коты, книги — one.')
}
const OS = ['on', 'ona', 'ono', 'oni', 'one']
const os = (s: string, k: keyof typeof osHint, uk: string, ru: string) => gap(s, OS, osHint[k], k, uk, ru)
const osItems: Item[] = [
  os('Tomek gra w piłkę. (On) jest szczęśliwy.', 'on', 'Томек грає в м’яч. Він щасливий.', 'Томек играет в мяч. Он счастлив.'),
  os('Ola czyta. (Ona) lubi książki.', 'ona', 'Оля читає. Вона любить книжки.', 'Оля читает. Она любит книги.'),
  os('Dziecko płacze. (Ono) jest głodne.', 'ono', 'Дитина плаче. Вона голодна.', 'Ребёнок плачет. Он голодный.'),
  os('Chłopcy biegają. (Oni) są szybcy.', 'oni', 'Хлопці бігають. Вони швидкі.', 'Мальчики бегают. Они быстрые.'),
  os('Dziewczynki śpiewają. (One) mają ładne głosy.', 'one', 'Дівчатка співають. У них гарні голоси.', 'Девочки поют. У них красивые голоса.'),
  os('Mój pies jest mały. (On) ma dwa lata.', 'on', 'Мій пес маленький. Йому два роки.', 'Моя собака маленькая. Ей два года.'),
  os('Koty śpią. (One) są zmęczone.', 'one', 'Коти сплять. Вони втомлені.', 'Коты спят. Они устали.'),
  os('Tata i mama pracują. (Oni) wrócą wieczorem.', 'oni', 'Тато й мама працюють. Вони повернуться ввечері.', 'Папа и мама работают. Они вернутся вечером.'),
  os('Słońce świeci. (Ono) jest gorące.', 'ono', 'Сонце світить. Воно гаряче.', 'Солнце светит. Оно горячее.'),
  os('Moja babcia gotuje. (Ona) robi pierogi.', 'ona', 'Моя бабуся готує. Вона робить вареники.', 'Моя бабушка готовит. Она делает вареники.')
]

/* ---------- 2. Mnie, mi, cię, go, jej… ---------- */
const formHint = {
  ja: l('Ja → mnie (kogo? czego?), mi (komu?): daj mi, nie ma mnie.', 'Ja → mnie (кого? чого?), mi (кому?): daj mi — дай мені.', 'Ja → mnie (кого? чего?), mi (кому?): daj mi — дай мне.'),
  ty: l('Ty → cię / ciebie (kogo?), ci / tobie (komu?).', 'Ty → cię / ciebie (кого?), ci / tobie (кому?).', 'Ty → cię / ciebie (кого?), ci / tobie (кому?).'),
  on: l('On → go / jego (kogo?), mu / jemu (komu?). Po przyimku: niego, nim.', 'On → go / jego (кого?), mu / jemu (кому?). Після прийменника: niego, nim (з ним).', 'On → go / jego (кого?), mu / jemu (кому?). После предлога: niego, nim (с ним).'),
  ona: l('Ona → ją (kogo? co?), jej (komu? czego?). Po przyimku: niej.', 'Ona → ją (кого? що?), jej (кому? чого?). Після прийменника: niej (про неї).', 'Ona → ją (кого? что?), jej (кому? чего?). После предлога: niej (о ней).')
}
const formItems: Item[] = [
  gap('Daj (mi) książkę, proszę.', ['ja', 'mnie', 'mi'], formHint.ja, 'ja', 'Дай мені книжку, будь ласка.', 'Дай мне книгу, пожалуйста.'),
  gap('Nie ma (mnie) w domu.', ['ja', 'mnie', 'mi'], formHint.ja, 'ja', 'Мене немає вдома.', 'Меня нет дома.'),
  gap('Widzę (cię)!', ['ty', 'cię', 'ci'], formHint.ty, 'ty', 'Я тебе бачу!', 'Я тебя вижу!'),
  gap('Dam (ci) cukierka.', ['ty', 'cię', 'ci'], formHint.ty, 'ty', 'Я дам тобі цукерку.', 'Я дам тебе конфету.'),
  gap('To prezent dla (ciebie).', ['ty', 'ci', 'ciebie'], formHint.ty, 'ty', 'Це подарунок для тебе.', 'Это подарок для тебя.'),
  gap('Lubię (go).', ['on', 'go', 'mu'], formHint.on, 'on', 'Я його люблю.', 'Я его люблю.'),
  gap('Idę z (nim) do kina.', ['on', 'go', 'nim'], formHint.on, 'on', 'Я йду з ним у кіно.', 'Я иду с ним в кино.'),
  gap('Kocham (ją).', ['ona', 'ją', 'jej'], formHint.ona, 'ona', 'Я її кохаю (люблю).', 'Я её люблю.'),
  gap('Pomagam (jej).', ['ona', 'ją', 'jej'], formHint.ona, 'ona', 'Я їй допомагаю.', 'Я ей помогаю.'),
  gap('Myślę o (niej).', ['ona', 'jej', 'niej'], formHint.ona, 'ona', 'Я думаю про неї.', 'Я думаю о ней.')
]

/* ---------- 3. Mój, moja, moje ---------- */
const posHint = {
  m: l('Jaki? (on) — mój, twój, nasz: mój pies.', 'Який? (він) — mój, twój, nasz: mój pies (мій пес).', 'Какой? (он) — mój, twój, nasz: mój pies (моя собака).'),
  f: l('Jaka? (ona) — moja, twoja, nasza: moja mama.', 'Яка? (вона) — moja, twoja, nasza: moja mama.', 'Какая? (она) — moja, twoja, nasza: moja mama.'),
  n: l('Jakie? (ono) — moje, twoje, nasze: moje okno.', 'Яке? (воно) — moje, twoje, nasze: moje okno.', 'Какое? (оно) — moje, twoje, nasze: moje okno.')
}
const posItems: Item[] = [
  gap('To jest (moja) mama.', ['mój', 'moja', 'moje'], posHint.f, 'f', 'Це моя мама.', 'Это моя мама.'),
  gap('(Mój) pies jest wesoły.', ['mój', 'moja', 'moje'], posHint.m, 'm', 'Мій пес веселий.', 'Моя собака весёлая.'),
  gap('Otwieram (moje) okno.', ['mój', 'moja', 'moje'], posHint.n, 'n', 'Я відчиняю моє вікно.', 'Я открываю моё окно.'),
  gap('Czy to (twoja) książka?', ['twój', 'twoja', 'twoje'], posHint.f, 'f', 'Це твоя книжка?', 'Это твоя книга?'),
  gap('Gdzie jest (twój) plecak?', ['twój', 'twoja', 'twoje'], posHint.m, 'm', 'Де твій рюкзак?', 'Где твой рюкзак?'),
  gap('(Nasz) dom jest duży.', ['nasz', 'nasza', 'nasze'], posHint.m, 'm', 'Наш дім великий.', 'Наш дом большой.'),
  gap('(Nasza) szkoła jest blisko.', ['nasz', 'nasza', 'nasze'], posHint.f, 'f', 'Наша школа близько.', 'Наша школа близко.'),
  gap('To (nasze) auto.', ['nasz', 'nasza', 'nasze'], posHint.n, 'n', 'Це наше авто.', 'Это наша машина.'),
  gap('(Twoje) imię jest ładne.', ['twój', 'twoja', 'twoje'], posHint.n, 'n', 'Твоє ім’я гарне.', 'Твоё имя красивое.')
]

/* ---------- 4. Ten, ta, to ---------- */
const tenHint = {
  ten: l('Ten — dla on: ten kot, ten dom.', 'Ten — для він: ten kot (цей кіт).', 'Ten — для он: ten kot (этот кот).'),
  ta: l('Ta — dla ona: ta książka.', 'Ta — для вона: ta książka (ця книжка).', 'Ta — для она: ta książka (эта книга).'),
  to: l('To — dla ono: to okno, to dziecko.', 'To — для воно: to okno (це вікно).', 'To — для оно: to okno (это окно).')
}
const TEN = ['ten', 'ta', 'to']
const tenItems: Item[] = [
  gap('(Ten) kot jest mój.', TEN, tenHint.ten, 'ten', 'Цей кіт мій.', 'Этот кот мой.'),
  gap('(Ta) książka jest ciekawa.', TEN, tenHint.ta, 'ta', 'Ця книжка цікава.', 'Эта книга интересная.'),
  gap('(To) dziecko się śmieje.', TEN, tenHint.to, 'to', 'Ця дитина сміється.', 'Этот ребёнок смеётся.'),
  gap('Lubię (ten) film.', TEN, tenHint.ten, 'ten', 'Я люблю цей фільм.', 'Я люблю этот фильм.'),
  gap('(Ta) dziewczynka to moja siostra.', TEN, tenHint.ta, 'ta', 'Ця дівчинка — моя сестра.', 'Эта девочка — моя сестра.'),
  gap('Zamknij (to) okno.', TEN, tenHint.to, 'to', 'Зачини це вікно.', 'Закрой это окно.'),
  gap('(Ten) chłopiec jest wysoki.', TEN, tenHint.ten, 'ten', 'Цей хлопець високий.', 'Этот мальчик высокий.'),
  gap('(Ta) zupa jest gorąca.', TEN, tenHint.ta, 'ta', 'Цей суп гарячий.', 'Этот суп горячий.')
]

export const zaimkiExercise: Exercise = {
  slug: 'zaimki',
  group: 'zaimek',
  icon: 'on',
  color: 'var(--g3)',
  soft: 'var(--g3-soft)',
  title: l('Zaimki', 'Займенники', 'Местоимения'),
  lead: l(
    'On, ona, mnie, cię, mój, ten… Zaimki zastępują inne słowa, żeby nie powtarzać!',
    'On, ona, mnie, cię, mój, ten… Займенники замінюють інші слова, щоб не повторювати!',
    'On, ona, mnie, cię, mój, ten… Местоимения заменяют другие слова, чтобы не повторять!'
  ),
  badge: l('Mistrz zaimków', 'Майстер займенників', 'Мастер местоимений'),
  levels: [
    lv('osobowe', 'on/ona',
      l('On, ona, ono, oni, one', 'On, ona, ono, oni, one', 'On, ona, ono, oni, one'),
      l(
        'Zamiast powtarzać „Tomek, Tomek”, mówimy [on]. Ola — [ona], dziecko — [ono], chłopcy — [oni], dziewczynki i koty — [one].',
        'Замість «Томек, Томек» кажемо [on]. Оля — [ona], дитина — [ono], хлопці — [oni], дівчатка й коти — [one].',
        'Вместо «Томек, Томек» говорим [on]. Оля — [ona], ребёнок — [ono], мальчики — [oni], девочки и коты — [one].'
      ),
      ['Tomek → [on]', 'Ola → [ona]', 'dziecko → [ono]', 'chłopcy → [oni]', 'koty → [one]'],
      osItems, SENT, 'sentence',
      tip(l('Uwaga', 'Увага: oni та one', 'Внимание: oni и one'),
        l('Po polsku są dwa „oni”: oni i one.', 'Українське «вони» польською — це два слова: [oni] (хлопці, чоловіки) і [one] (дівчатка, тварини, речі).', 'Русское «они» по-польски — это два слова: [oni] (мальчики, мужчины) и [one] (девочки, животные, вещи).'))),
    lv('formy', 'mi/cię',
      l('Mnie, mi, cię, go, jej', 'Mnie, mi, cię, go, jej', 'Mnie, mi, cię, go, jej'),
      l(
        'Zaimek też się odmienia: ja → [mnie], [mi]; ty → [cię], [ci]; on → [go], [mu]; ona → [ją], [jej]. Po przyimku: z [nim], o [niej].',
        'Займенник теж відмінюється: ja → [mnie], [mi]; ty → [cię], [ci]; on → [go], [mu]; ona → [ją], [jej]. Після прийменника: z [nim], o [niej].',
        'Местоимение тоже склоняется: ja → [mnie], [mi]; ty → [cię], [ci]; on → [go], [mu]; ona → [ją], [jej]. После предлога: z [nim], o [niej].'
      ),
      ['daj [mi]', 'widzę [cię]', 'lubię [go]', 'z [nim]', 'o [niej]'],
      formItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
        l('Jak po ukraińsku: мені → mi, тебе → cię, його → go, їй → jej.', 'Схоже: мені → [mi], тебе → [cię], тобі → [ci], його → [go], їй → [jej], з ним → z [nim].', 'Похоже: мне → [mi], тебя → [cię], тебе → [ci], его → [go], ей → [jej], с ним → z [nim].'))),
    lv('moj', 'mój',
      l('Mój, moja, moje', 'Mój, moja, moje', 'Mój, moja, moje'),
      l(
        'Czyje to? [Mój] pies, [moja] mama, [moje] okno. Tak samo: twój / twoja / twoje, nasz / nasza / nasze.',
        'Чиє це? [Mój] pies (мій), [moja] mama (моя), [moje] okno (моє). Так само: twój / twoja / twoje, nasz / nasza / nasze.',
        'Чьё это? [Mój] pies (мой), [moja] mama (моя), [moje] okno (моё). Так же: twój / twoja / twoje, nasz / nasza / nasze.'
      ),
      ['[mój] pies', '[moja] mama', '[moje] okno', '[nasz] dom'],
      posItems, SENT),
    lv('ten', 'ten/ta',
      l('Ten, ta, to', 'Ten, ta, to', 'Ten, ta, to'),
      l(
        'Pokazujemy palcem: [ten] kot, [ta] książka, [to] okno.',
        'Показуємо пальцем: [ten] kot (цей), [ta] książka (ця), [to] okno (це).',
        'Показываем пальцем: [ten] kot (этот), [ta] książka (эта), [to] okno (это).'
      ),
      ['[ten] kot', '[ta] książka', '[to] okno'],
      tenItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: цей, ця, це', 'Хитрость: этот, эта, это'),
        l('Цей → ten, ця → ta, це → to.', 'Цей → [ten], ця → [ta], це → [to]. Легко!', 'Этот → [ten], эта → [ta], это → [to]. Легко!'))),
    bossLv([...osItems, ...formItems, ...posItems, ...tenItems],
      l('Boss: papuzia gadanina', 'Бос: папужина балаканина', 'Босс: попугайская болтовня'),
      l('Wszystkie zaimki naraz!', 'Усі займенники разом!', 'Все местоимения вместе!'))
  ]
}
