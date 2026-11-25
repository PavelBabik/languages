import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, SENT, tip } from './helpers'

/* ================================================================
   WYKRZYKNIKI I PARTYKUŁY — Wesoły Kurnik, przewodnik: Kogut Kuba
   („Kukuryku!” — to właśnie wykrzyknik)
   ================================================================ */

/* ---------- 1. Wykrzykniki: emocje ---------- */
const wyHint = {
  au: l('Au! — gdy coś boli.', 'Au! — коли щось болить (ой!).', 'Au! — когда что-то болит (ой!).'),
  hura: l('Hura! — wielka radość.', 'Hura! — велика радість (ура!).', 'Hura! — большая радость (ура!).'),
  brr: l('Brr! — gdy jest zimno albo coś jest straszne.', 'Brr! — коли холодно або страшно.', 'Brr! — когда холодно или страшно.'),
  ojej: l('Ojej! — zaskoczenie, mały kłopot.', 'Ojej! — здивування, маленька прикрість (ой-ой!).', 'Ojej! — удивление, маленькая неприятность (ой-ой!).'),
  fuj: l('Fuj! — coś jest obrzydliwe.', 'Fuj! — щось огидне (фу!).', 'Fuj! — что-то противное (фу!).'),
  ach: l('Ach! — zachwyt.', 'Ach! — захоплення (ах!).', 'Ach! — восторг (ах!).'),
  psst: l('Psst! — prosimy o ciszę albo wołamy po cichu.', 'Psst! — просимо тиші або кличемо пошепки (тсс!).', 'Psst! — просим тишины или зовём шёпотом (тсс!).'),
  hej: l('Hej! — wołamy kogoś.', 'Hej! — кличемо когось (гей!).', 'Hej! — зовём кого-то (эй!).')
}
const wyItems: Item[] = [
  gap('(Au)! Uderzyłem się w kolano.', ['au', 'hura', 'ach'], wyHint.au, 'au', 'Ой! Я вдарився коліном.', 'Ой! Я ударился коленом.'),
  gap('(Hura)! Wygraliśmy mecz!', ['brr', 'hura', 'fuj'], wyHint.hura, 'hura', 'Ура! Ми виграли матч!', 'Ура! Мы выиграли матч!'),
  gap('(Brr), jak zimno na dworze!', ['brr', 'hura', 'ach'], wyHint.brr, 'brr', 'Бррр, як холодно надворі!', 'Бррр, как холодно на улице!'),
  gap('(Ojej), wylało mi się mleko!', ['hura', 'ojej', 'ach'], wyHint.ojej, 'ojej', 'Ой-ой, у мене розлилося молоко!', 'Ой-ой, у меня разлилось молоко!'),
  gap('(Fuj), ta zupa jest zimna!', ['ach', 'hura', 'fuj'], wyHint.fuj, 'fuj', 'Фу, цей суп холодний!', 'Фу, этот суп холодный!'),
  gap('(Ach), jaki piękny zachód słońca!', ['ach', 'fuj', 'au'], wyHint.ach, 'ach', 'Ах, який гарний захід сонця!', 'Ах, какой красивый закат!'),
  gap('(Psst), dziecko śpi!', ['hura', 'psst', 'hej'], wyHint.psst, 'psst', 'Тсс, дитина спить!', 'Тсс, ребёнок спит!'),
  gap('(Hej), poczekaj na mnie!', ['hej', 'fuj', 'brr'], wyHint.hej, 'hej', 'Гей, зачекай на мене!', 'Эй, подожди меня!')
]

/* ---------- 2. Jak mówią zwierzęta? ---------- */
const zwHint = l(
  'Dźwięki zwierząt to też wykrzykniki (wyrazy dźwiękonaśladowcze).',
  'Звуки тварин — теж вигуки (звуконаслідувальні слова).',
  'Звуки животных — тоже междометия (звукоподражания).'
)
const ZW = ['miau', 'hau', 'muu', 'kwa', 'kukuryku', 'kum', 'bee', 'chrum']
const zw = (s: string, ans: string, uk: string, ru: string) => {
  const others = ZW.filter(x => x !== ans)
  const i = ans.length % others.length
  return gap(s, [ans, others[i]!, others[(i + 3) % others.length]!].sort(), zwHint, 'zw', uk, ru)
}
const zwItems: Item[] = [
  zw('🐱 Kot mówi: (miau)!', 'miau', 'Кіт каже: няв!', 'Кот говорит: мяу!'),
  zw('🐶 Pies szczeka: (hau)!', 'hau', 'Пес гавкає: гав!', 'Собака лает: гав!'),
  zw('🐮 Krowa ryczy: (muu)!', 'muu', 'Корова мукає: му!', 'Корова мычит: му!'),
  zw('🦆 Kaczka kwacze: (kwa)!', 'kwa', 'Качка крякає: кря!', 'Утка крякает: кря!'),
  zw('🐓 Kogut pieje: (kukuryku)!', 'kukuryku', 'Півень співає: кукуріку!', 'Петух кричит: кукареку!'),
  zw('🐸 Żaba rechocze: (kum)!', 'kum', 'Жаба квакає: ква!', 'Лягушка квакает: ква!'),
  zw('🐑 Owca beczy: (bee)!', 'bee', 'Вівця мекає: бе!', 'Овца блеет: бе!'),
  zw('🐷 Świnka mówi: (chrum)!', 'chrum', 'Свинка каже: рох!', 'Свинка говорит: хрю!')
]

/* ---------- 3. Partykuły ---------- */
const paHint = {
  czy: l('Czy — zaczyna pytanie: Czy masz kota?', 'Czy — починає питання: Czy masz kota? (Чи є в тебе кіт?)', 'Czy — начинает вопрос: Czy masz kota? (У тебя есть кот?)'),
  niech: l('Niech — życzenie albo polecenie: Niech żyje! Niech przyjdzie.', 'Niech — побажання чи наказ (нехай): Niech żyje!', 'Niech — пожелание или приказ (пусть): Niech żyje!'),
  tylko: l('Tylko — „i nic więcej”.', 'Tylko — тільки, лише.', 'Tylko — только.'),
  nawet: l('Nawet — „i to też”, coś zaskakującego.', 'Nawet — навіть.', 'Nawet — даже.'),
  wlasnie: l('Właśnie — „dokładnie to”, „przed chwilą”.', 'Właśnie — саме, якраз.', 'Właśnie — именно, как раз.'),
  nie: l('Nie — przeczenie.', 'Nie — заперечення (не).', 'Nie — отрицание (не).')
}
const PA = ['czy', 'niech', 'tylko', 'nawet', 'właśnie', 'nie']
const pa = (s: string, ans: keyof typeof paHint | 'właśnie', uk: string, ru: string) => {
  const key = ans === 'właśnie' ? 'wlasnie' : ans
  const others = PA.filter(x => x !== ans)
  const pick = [ans, others[ans.length % others.length]!, others[(ans.length + 2) % others.length]!]
  return gap(s, pick.sort((a, b) => PA.indexOf(a) - PA.indexOf(b)), paHint[key as keyof typeof paHint], key, uk, ru)
}
const paItems: Item[] = [
  pa('(Czy) masz kota?', 'czy', 'Чи є в тебе кіт?', 'У тебя есть кот?'),
  pa('(Niech) żyje król!', 'niech', 'Хай живе король!', 'Да здравствует король!'),
  pa('Mam (tylko) jedno jabłko.', 'tylko', 'У мене лише одне яблуко.', 'У меня только одно яблоко.'),
  pa('(Nawet) kot się śmiał!', 'nawet', 'Навіть кіт сміявся!', 'Даже кот смеялся!'),
  pa('To (właśnie) ten pies!', 'właśnie', 'Це саме той пес!', 'Это именно та собака!'),
  pa('Ja (nie) lubię szpinaku.', 'nie', 'Я не люблю шпинату.', 'Я не люблю шпинат.'),
  pa('(Czy) pójdziesz ze mną?', 'czy', 'Чи підеш зі мною?', 'Пойдёшь со мной?'),
  pa('(Niech) Ola przyjdzie jutro.', 'niech', 'Нехай Оля прийде завтра.', 'Пусть Оля придёт завтра.'),
  pa('Zjadłem (tylko) pół kanapki.', 'tylko', 'Я з’їв лише половину бутерброда.', 'Я съел только половину бутерброда.')
]

/* ---------- 4. -by razem z czasownikiem ---------- */
const byHint = l(
  'Cząstkę -by z czasownikiem piszemy razem: chciałbym, zrobiłabyś, pojechalibyśmy.',
  'Частку -by з дієсловом пишемо разом: chciałbym (я хотів би), zrobiłabyś.',
  'Частицу -by с глаголом пишем слитно: chciałbym (я хотел бы), zrobiłabyś.'
)
const by = (s: string, w: string, uk: string, ru: string) => {
  /* w np. 'chciał|bym' */
  const [a, b] = w.split('|') as [string, string]
  return gap(s.replace('{}', `(${a}${b})`), [`${a}${b}`, `${a} ${b}`], byHint, 'by', uk, ru)
}
const byItems: Item[] = [
  by('Ja {} lody.', 'chciał|bym', 'Я хотів би морозиво.', 'Я хотел бы мороженое.'),
  by('Czy {} mi pomóc?', 'mógł|byś', 'Чи міг би ти мені допомогти?', 'Не мог бы ты мне помочь?'),
  by('Ona {} to szybciej.', 'zrobiła|by', 'Вона зробила б це швидше.', 'Она сделала бы это быстрее.'),
  by('My {} nad morze.', 'pojechali|byśmy', 'Ми поїхали б на море.', 'Мы поехали бы на море.'),
  by('Ja {} psa.', 'chciała|bym', 'Я хотіла б пса.', 'Я хотела бы собаку.'),
  by('Gdzie {} mieszkać?', 'chciał|byś', 'Де б ти хотів жити?', 'Где бы ты хотел жить?'),
  by('Oni {} w piłkę cały dzień.', 'grali|by', 'Вони грали б у м’яч цілий день.', 'Они играли бы в мяч целый день.')
]

export const partykulyExercise: Exercise = {
  slug: 'partykuly',
  group: 'partykula',
  icon: 'ach!',
  color: 'var(--g1)',
  soft: 'var(--g1-soft)',
  title: l('Wykrzykniki i partykuły', 'Вигуки й частки', 'Междометия и частицы'),
  lead: l(
    'Au! Hura! Kukuryku! Wykrzykniki to emocje i dźwięki. A partykuły — małe słówka: czy, niech, tylko, nawet, -by.',
    'Au! Hura! Kukuryku! Вигуки — це емоції й звуки. А частки — маленькі слівця: czy, niech, tylko, nawet, -by.',
    'Au! Hura! Kukuryku! Междометия — это эмоции и звуки. А частицы — маленькие слова: czy, niech, tylko, nawet, -by.'
  ),
  badge: l('Mistrz okrzyków', 'Майстер вигуків', 'Мастер возгласов'),
  levels: [
    lv('emocje', 'au!',
      l('Au! Hura! Brr! — wykrzykniki', 'Au! Hura! Brr! — вигуки', 'Au! Hura! Brr! — междометия'),
      l(
        'Wykrzyknik wyraża uczucia: ból — [au], radość — [hura], zimno — [brr], zachwyt — [ach], obrzydzenie — [fuj].',
        'Вигук передає почуття: біль — [au], радість — [hura], холод — [brr], захоплення — [ach], огида — [fuj].',
        'Междометие передаёт чувства: боль — [au], радость — [hura], холод — [brr], восторг — [ach], отвращение — [fuj].'
      ),
      ['[Au]! Boli!', '[Hura]! Wygrana!', '[Brr], zimno!', '[Fuj], niesmaczne!'],
      wyItems, SENT, 'sentence',
      tip(l('Uwaga', 'Увага: знак оклику', 'Внимание: восклицательный знак'),
        l('Po wykrzykniku stawiamy ! albo przecinek: Au! Brr, zimno!', 'Після вигуку ставимо [!] або кому: Au! Brr[,] zimno!', 'После междометия ставим [!] или запятую: Au! Brr[,] zimno!'))),
    lv('zwierzeta', 'miau',
      l('Jak mówią zwierzęta?', 'Як говорять тварини?', 'Как говорят животные?'),
      l(
        'Kot — [miau], pies — [hau], krowa — [muu], kaczka — [kwa], kogut — [kukuryku]! To też wykrzykniki.',
        'Кіт — [miau], пес — [hau], корова — [muu], качка — [kwa], півень — [kukuryku]! Це теж вигуки.',
        'Кот — [miau], собака — [hau], корова — [muu], утка — [kwa], петух — [kukuryku]! Это тоже междометия.'
      ),
      ['🐱 [miau]', '🐶 [hau]', '🐮 [muu]', '🐓 [kukuryku]'],
      zwItems, SENT, 'sentence',
      tip(l('Ciekawostka', 'Цікавинка', 'Интересно'),
        l('Po ukraińsku kot mówi „няв”, a po polsku „miau”. Kogut: кукуріку → kukuryku!', 'Українською кіт каже «няв», а польською «[miau]». Жаба: «ква» → «[kum]»!', 'По-русски кот говорит «мяу», и по-польски «[miau]». А лягушка: «ква» → «[kum]»!'))),
    lv('partykuly', 'czy?',
      l('Czy, niech, tylko, nawet', 'Czy, niech, tylko, nawet', 'Czy, niech, tylko, nawet'),
      l(
        'Partykuła to małe słówko, które dodaje odcień: [czy] — pytanie, [niech] — życzenie, [tylko] — nic więcej, [nawet] — i to też.',
        'Частка — маленьке слівце, що додає відтінок: [czy] — питання, [niech] — нехай, [tylko] — лише, [nawet] — навіть.',
        'Частица — маленькое слово, добавляющее оттенок: [czy] — вопрос, [niech] — пусть, [tylko] — только, [nawet] — даже.'
      ),
      ['[Czy] masz kota?', '[Niech] żyje!', 'Mam [tylko] jedno.', '[Nawet] kot się śmiał.'],
      paItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: «чи» = czy', 'Хитрость'),
        l('Ukraińskie „чи” to polskie „czy”, a „нехай” to „niech”.', 'Українське «чи» = [czy], «нехай» = [niech], «навіть» = [nawet], «тільки» = [tylko].', 'Русское «ли» в вопросе = [czy], «пусть» = [niech], «даже» = [nawet], «только» = [tylko].'))),
    lv('by', '-by',
      l('Chciałbym — razem!', 'Chciałbym — разом!', 'Chciałbym — слитно!'),
      l(
        'Cząstka [-by] przykleja się do czasownika: chciał[bym], zrobiła[byś], pojechali[byśmy].',
        'Частка [-by] приклеюється до дієслова: chciał[bym] (я хотів би), zrobiła[byś].',
        'Частица [-by] приклеивается к глаголу: chciał[bym] (я хотел бы), zrobiła[byś].'
      ),
      ['chciał[bym]', 'mógł[byś]', 'zrobiła[by]', 'pojechali[byśmy]'],
      byItems, SENT, 'sentence',
      tip(l('Uwaga', 'Увага: не як в українській', 'Внимание: не как в русском'),
        l('Po ukraińsku piszemy osobno: хотів би. Po polsku razem: chciałbym.', 'Українською окремо: «хотів би». Польською — разом: [chciałbym]!', 'По-русски раздельно: «хотел бы». По-польски — слитно: [chciałbym]!'))),
    bossLv([...wyItems, ...zwItems, ...paItems, ...byItems],
      l('Boss: poranny koncert w kurniku', 'Бос: ранковий концерт у курнику', 'Босс: утренний концерт в курятнике'),
      l('Wszystko naraz: okrzyki, dźwięki, partykuły i -by.', 'Усе разом: вигуки, звуки, частки й -by.', 'Всё вместе: возгласы, звуки, частицы и -by.'))
  ]
}
