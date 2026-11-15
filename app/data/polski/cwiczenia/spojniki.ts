import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, pickSentence, SENT, tip, WHICH } from './helpers'

/* ================================================================
   SPÓJNIKI I PRZECINEK — Pajęcza Sieć, przewodnik: Pająk Piotruś
   (spójnik łączy słowa i zdania jak nitka pajęczyny)
   ================================================================ */

/* ---------- 1. Który spójnik pasuje? ---------- */
const meanHint = {
  i: l('I — dodajemy coś (і, та): koty i psy.', 'I — додаємо (і, та): koty i psy.', 'I — добавляем (и): koty i psy.'),
  a: l('A — zestawiamy dwie różne rzeczy: ja czytam, a ty piszesz.', 'A — зіставляємо дві різні речі: ja czytam, a ty piszesz (а ти пишеш).', 'A — сопоставляем две разные вещи: ja czytam, a ty piszesz (а ты пишешь).'),
  ale: l('Ale — coś jest przeciwko (але): chcę, ale nie mogę.', 'Ale — щось навпаки (але): chcę, ale nie mogę.', 'Ale — что-то наоборот (но): chcę, ale nie mogę.'),
  bo: l('Bo — podajemy przyczynę (бо): nie idę, bo pada.', 'Bo — пояснюємо причину (бо): nie idę, bo pada.', 'Bo — объясняем причину (потому что): nie idę, bo pada.'),
  ze: l('Że — po wiem, myślę, mówię (що): wiem, że masz rację.', 'Że — після wiem, myślę, mówię (що): wiem, że masz rację.', 'Że — после wiem, myślę, mówię (что): wiem, że masz rację.'),
  wiec: l('Więc — skutek (тому): jest zimno, więc biorę czapkę.', 'Więc — наслідок (тож, тому): jest zimno, więc biorę czapkę.', 'Więc — следствие (поэтому): jest zimno, więc biorę czapkę.'),
  czy: l('Czy / lub / albo — wybór (чи, або): kawa czy herbata?', 'Czy / lub / albo — вибір (чи, або): kawa czy herbata?', 'Czy / lub / albo — выбор (или): kawa czy herbata?')
}
const meanItems: Item[] = [
  gap('Lubię koty (i) psy.', ['i', 'ale', 'bo'], meanHint.i, 'i', 'Я люблю котів і псів.', 'Я люблю котов и собак.'),
  gap('Chcę iść na dwór, (ale) pada deszcz.', ['i', 'ale', 'że'], meanHint.ale, 'ale', 'Я хочу надвір, але падає дощ.', 'Я хочу на улицу, но идёт дождь.'),
  gap('Nie idę do szkoły, (bo) jestem chory.', ['bo', 'ale', 'i'], meanHint.bo, 'bo', 'Я не йду до школи, бо хворий.', 'Я не иду в школу, потому что болею.'),
  gap('Wiem, (że) masz rację.', ['że', 'bo', 'i'], meanHint.ze, 'ze', 'Я знаю, що ти маєш рацію.', 'Я знаю, что ты прав.'),
  gap('Herbata (czy) kakao?', ['czy', 'bo', 'że'], meanHint.czy, 'czy', 'Чай чи какао?', 'Чай или какао?'),
  gap('Jest zimno, (więc) zakładam czapkę.', ['więc', 'bo', 'i'], meanHint.wiec, 'wiec', 'Холодно, тож я вдягаю шапку.', 'Холодно, поэтому я надеваю шапку.'),
  gap('Ja czytam, (a) brat rysuje.', ['a', 'bo', 'że'], meanHint.a, 'a', 'Я читаю, а брат малює.', 'Я читаю, а брат рисует.'),
  gap('Myślę, (że) jutro będzie słońce.', ['że', 'ale', 'więc'], meanHint.ze, 'ze', 'Я думаю, що завтра буде сонце.', 'Я думаю, что завтра будет солнце.'),
  gap('Jestem głodny, (więc) robię kanapkę.', ['więc', 'bo', 'czy'], meanHint.wiec, 'wiec', 'Я голодний, тож роблю бутерброд.', 'Я голоден, поэтому делаю бутерброд.'),
  gap('Mam brata (i) siostrę.', ['i', 'ale', 'bo'], meanHint.i, 'i', 'У мене є брат і сестра.', 'У меня есть брат и сестра.')
]

/* ---------- 2. Przecinek przed ale, bo, że, więc, a ---------- */
const commaHint = l(
  'Przed ale, bo, że, więc, a, który, gdy stawiamy przecinek.',
  'Перед ale, bo, że, więc, a, który, gdy ставимо кому.',
  'Перед ale, bo, że, więc, a, który, gdy ставим запятую.'
)
const noCommaHint = l(
  'Przed i, oraz, lub, albo, czy (pojedynczymi) nie stawiamy przecinka.',
  'Перед i, oraz, lub, albo, czy (одиночними) коми не ставимо.',
  'Перед i, oraz, lub, albo, czy (одиночными) запятую не ставим.'
)
const yes = (a: string, b: string, uk: string, ru: string) => pickSentence([`${a}, ${b}`, `${a} ${b}`], 0, commaHint, 'tak', uk, ru)
const no = (a: string, b: string, uk: string, ru: string) => pickSentence([`${a}, ${b}`, `${a} ${b}`], 1, noCommaHint, 'nie', uk, ru)
const commaItems: Item[] = [
  yes('Chcę iść', 'ale pada deszcz.', 'Я хочу піти, але падає дощ.', 'Я хочу пойти, но идёт дождь.'),
  no('Lubię koty', 'i psy.', 'Я люблю котів і псів.', 'Я люблю котов и собак.'),
  yes('Wiem', 'że jutro jest test.', 'Я знаю, що завтра тест.', 'Я знаю, что завтра тест.'),
  no('Herbata', 'czy kakao?', 'Чай чи какао?', 'Чай или какао?'),
  yes('Zostaję w domu', 'bo jestem chory.', 'Я лишаюся вдома, бо хворий.', 'Я остаюсь дома, потому что болею.'),
  no('Wezmę jabłko', 'lub gruszkę.', 'Я візьму яблуко або грушу.', 'Я возьму яблоко или грушу.'),
  yes('Jest późno', 'więc idę spać.', 'Пізно, тож я йду спати.', 'Поздно, поэтому я иду спать.'),
  no('Mama gotuje', 'i śpiewa.', 'Мама готує й співає.', 'Мама готовит и поёт.'),
  yes('To jest pies', 'który szczeka.', 'Це пес, який гавкає.', 'Это собака, которая лает.'),
  yes('Ja czytam', 'a brat gra.', 'Я читаю, а брат грає.', 'Я читаю, а брат играет.')
]

/* ---------- 3. Przecinek w wyliczeniu i przy zwracaniu się ---------- */
const listHint = {
  lista: l('Wyliczamy kilka rzeczy — między nimi przecinki, przed ostatnim „i” — bez przecinka.', 'Перелічуємо кілька речей — між ними коми, перед останнім «i» — без коми.', 'Перечисляем несколько вещей — между ними запятые, перед последним «i» — без запятой.'),
  wolacz: l('Gdy zwracamy się do kogoś, oddzielamy imię przecinkiem: Mamo, chodź!', 'Коли звертаємося до когось, ім’я відділяємо комою: Mamo, chodź!', 'Когда обращаемся к кому-то, имя отделяем запятой: Mamo, chodź!')
}
const listItems: Item[] = [
  pickSentence(['Kupiłem jabłka, gruszki i banany.', 'Kupiłem jabłka gruszki i banany.', 'Kupiłem jabłka, gruszki, i banany.'], 0, listHint.lista, 'lista', 'Я купив яблука, груші й банани.', 'Я купил яблоки, груши и бананы.'),
  pickSentence(['Mam psa kota i chomika.', 'Mam psa, kota i chomika.', 'Mam psa, kota, i chomika.'], 1, listHint.lista, 'lista', 'У мене є пес, кіт і хом’як.', 'У меня есть собака, кот и хомяк.'),
  pickSentence(['Mamo, chodź tutaj!', 'Mamo chodź tutaj!'], 0, listHint.wolacz, 'wolacz', 'Мамо, йди сюди!', 'Мама, иди сюда!'),
  pickSentence(['Kasiu pomóż mi!', 'Kasiu, pomóż mi!'], 1, listHint.wolacz, 'wolacz', 'Касю, допоможи мені!', 'Катя, помоги мне!'),
  pickSentence(['W plecaku mam zeszyt, piórnik i książkę.', 'W plecaku mam zeszyt piórnik, i książkę.'], 0, listHint.lista, 'lista', 'У рюкзаку в мене зошит, пенал і книжка.', 'В рюкзаке у меня тетрадь, пенал и книга.'),
  pickSentence(['Dzień dobry, pani Anno!', 'Dzień dobry pani Anno!'], 0, listHint.wolacz, 'wolacz', 'Добрий день, пані Анно!', 'Добрый день, пани Анна!'),
  pickSentence(['Lubię czerwony, żółty i zielony kolor.', 'Lubię czerwony żółty i zielony kolor.'], 0, listHint.lista, 'lista', 'Я люблю червоний, жовтий і зелений колір.', 'Я люблю красный, жёлтый и зелёный цвет.'),
  pickSentence(['Tato gdzie jest klucz?', 'Tato, gdzie jest klucz?'], 1, listHint.wolacz, 'wolacz', 'Тату, де ключ?', 'Папа, где ключ?')
]

export const spojnikiExercise: Exercise = {
  slug: 'spojniki',
  group: 'spojnik',
  icon: ',',
  color: 'var(--g7)',
  soft: 'var(--g7-soft)',
  title: l('Spójniki i przecinek', 'Сполучники і кома', 'Союзы и запятая'),
  lead: l(
    'I, a, ale, bo, że, więc… Spójniki łączą słowa jak nitki pajęczyny. A gdzie postawić przecinek?',
    'I, a, ale, bo, że, więc… Сполучники з’єднують слова, як нитки павутини. А де поставити кому?',
    'I, a, ale, bo, że, więc… Союзы соединяют слова, как нити паутины. А где поставить запятую?'
  ),
  badge: l('Mistrz przecinków', 'Майстер ком', 'Мастер запятых'),
  levels: [
    lv('znaczenie', 'i/ale',
      l('I, a, ale, bo, że, więc', 'I, a, ale, bo, że, więc', 'I, a, ale, bo, że, więc'),
      l(
        'Spójnik łączy: [i] — dodaje, [ale] — przeciwko, [bo] — dlaczego, [że] — co (wiem, że…), [więc] — co z tego wynika.',
        'Сполучник з’єднує: [i] — і, [ale] — але, [bo] — бо, [że] — що, [więc] — тож.',
        'Союз соединяет: [i] — и, [ale] — но, [bo] — потому что, [że] — что, [więc] — поэтому.'
      ),
      ['koty [i] psy', 'chcę, [ale] nie mogę', 'nie idę, [bo] pada', 'wiem, [że] wiesz'],
      meanItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: як українською', 'Хитрость'),
        l('Ale = але, bo = бо, że = що, więc = тож.', 'Майже як українською: [ale] = але, [bo] = бо, [że] = що, [a] = а.', 'Запомни: [ale] = но, [bo] = потому что, [że] = что, [więc] = поэтому.'))),
    lv('przecinek', ', ale',
      l('Przecinek przed ale, bo, że', 'Кома перед ale, bo, że', 'Запятая перед ale, bo, że'),
      l(
        'Przed [ale], [bo], [że], [więc], [a], [który] — przecinek! Przed [i], [lub], [czy] — bez przecinka.',
        'Перед [ale], [bo], [że], [więc], [a], [który] — кома! Перед [i], [lub], [czy] — без коми.',
        'Перед [ale], [bo], [że], [więc], [a], [który] — запятая! Перед [i], [lub], [czy] — без запятой.'
      ),
      ['chcę[,] ale nie mogę', 'wiem[,] że…', 'koty i psy (bez przecinka)'],
      commaItems, WHICH, 'sentence',
      tip(l('Uwaga', 'Увага: «і» без коми', 'Внимание: «и» без запятой'),
        l('Jak po ukraińsku: przed „i” zwykle bez przecinka.', 'Як в українській: перед «і» зазвичай без коми, а перед «але», «бо», «що» — з комою.', 'Как в русском: перед «и» обычно без запятой, а перед «но», «потому что», «что» — с запятой.'))),
    lv('wyliczanie', 'a, b i c',
      l('Wyliczanie i wołanie', 'Перелік і звертання', 'Перечисление и обращение'),
      l(
        'Wyliczamy: jabłka[,] gruszki i banany — przed ostatnim „i” bez przecinka. Wołamy: Mamo[,] chodź!',
        'Перелічуємо: jabłka[,] gruszki i banany — перед останнім «i» без коми. Звертаємося: Mamo[,] chodź!',
        'Перечисляем: jabłka[,] gruszki i banany — перед последним «i» без запятой. Обращаемся: Mamo[,] chodź!'
      ),
      ['jabłka[,] gruszki i banany', 'Mamo[,] chodź!', 'Kasiu[,] pomóż!'],
      listItems, WHICH),
    bossLv([...meanItems, ...commaItems, ...listItems],
      l('Boss: wielka pajęczyna', 'Бос: велика павутина', 'Босс: большая паутина'),
      l('Wszystko naraz: który spójnik i gdzie przecinek.', 'Усе разом: який сполучник і де кома.', 'Всё вместе: какой союз и где запятая.'))
  ]
}
