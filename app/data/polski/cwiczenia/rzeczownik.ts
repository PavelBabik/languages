import type { L } from '~/types/content'
import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, mark, tip } from './helpers'

/* ================================================================
   RZECZOWNIK — Lisia Nora, przewodnik: Lis Leon
   (lis wszystko nazywa: kto? co?)
   ================================================================ */

/* ---------- 1. Co to jest rzeczownik? ---------- */
const POS: L[] = [
  { pl: 'rzeczownik (kto? co?)', uk: 'іменник (хто? що?)', ru: 'существительное (кто? что?)' },
  { pl: 'czasownik (co robi?)', uk: 'дієслово (що робить?)', ru: 'глагол (что делает?)' },
  { pl: 'przymiotnik (jaki?)', uk: 'прикметник (який?)', ru: 'прилагательное (какой?)' }
]
const posHint = [
  l('Pytamy: kto? co? — to rzeczownik. Nazywa ludzi, zwierzęta, rzeczy, miejsca i uczucia.', 'Питаємо: хто? що? — це іменник. Він називає людей, тварин, речі, місця й почуття.', 'Спрашиваем: кто? что? — это существительное. Оно называет людей, животных, вещи, места и чувства.'),
  l('Pytamy: co robi? — to czasownik.', 'Питаємо: що робить? — це дієслово.', 'Спрашиваем: что делает? — это глагол.'),
  l('Pytamy: jaki? — to przymiotnik.', 'Питаємо: який? — це прикметник.', 'Спрашиваем: какой? — это прилагательное.')
]
const p = (s: string, k: 0 | 1 | 2, uk: string, ru: string) => mark(s, POS, k, posHint[k]!, `p${k}`, uk, ru)
const posItems: Item[] = [
  p('[Lis] mieszka w norze.', 0, 'Лис живе в норі.', 'Лис живёт в норе.'),
  p('Lis mieszka w [norze].', 0, 'Лис живе в норі.', 'Лис живёт в норе.'),
  p('Lis [mieszka] w norze.', 1, 'Лис живе в норі.', 'Лис живёт в норе.'),
  p('Mam [rudego] kota.', 2, 'У мене рудий кіт.', 'У меня рыжий кот.'),
  p('Czuję wielką [radość].', 0, 'Я відчуваю велику радість.', 'Я чувствую большую радость.'),
  p('[Przyjaźń] jest ważna.', 0, 'Дружба важлива.', 'Дружба важна.'),
  p('Dzieci [śpiewają] głośno.', 1, 'Діти голосно співають.', 'Дети громко поют.'),
  p('Na stole leży [jabłko].', 0, 'На столі лежить яблуко.', 'На столе лежит яблоко.'),
  p('To jest [stary] zamek.', 2, 'Це старий замок.', 'Это старый замок.'),
  p('Jedziemy do [Krakowa].', 0, 'Ми їдемо до Кракова.', 'Мы едем в Краков.')
]

/* ---------- 2. Rodzaj: ten, ta, to ---------- */
const GEN: L[] = [
  { pl: 'męski (ten)', uk: 'чоловічий (ten)', ru: 'мужской (ten)' },
  { pl: 'żeński (ta)', uk: 'жіночий (ta)', ru: 'женский (ta)' },
  { pl: 'nijaki (to)', uk: 'середній (to)', ru: 'средний (to)' }
]
const genHint = [
  l('Mówimy: ten … — rodzaj męski.', 'Кажемо: ten … — чоловічий рід.', 'Говорим: ten … — мужской род.'),
  l('Mówimy: ta … — rodzaj żeński.', 'Кажемо: ta … — жіночий рід.', 'Говорим: ta … — женский род.'),
  l('Mówimy: to … — rodzaj nijaki.', 'Кажемо: to … — середній рід.', 'Говорим: to … — средний род.')
]
const g = (w: string, k: 0 | 1 | 2, uk: string, ru: string, note?: string): Item =>
  ({ pre: '', post: '', mark: w, opts: GEN, answer: k, hint: genHint[k]!, proof: `${['ten', 'ta', 'to'][k]} ${w}${note ? ` — ${note}` : ''}`, tr: { uk, ru }, say: w, tag: `g${k}` })
const genItems: Item[] = [
  g('kot', 0, 'кіт', 'кот'),
  g('mama', 1, 'мама', 'мама'),
  g('okno', 2, 'вікно', 'окно'),
  g('książka', 1, 'книжка', 'книга'),
  g('dziecko', 2, 'дитина', 'ребёнок'),
  g('dom', 0, 'дім', 'дом'),
  g('pies', 0, 'пес (собака)', 'собака', 'po polsku męski!'),
  g('tata', 0, 'тато', 'папа', 'końcówka -a, ale to mężczyzna'),
  g('mężczyzna', 0, 'чоловік', 'мужчина', 'końcówka -a, ale męski'),
  g('noc', 1, 'ніч', 'ночь'),
  g('imię', 2, 'ім’я', 'имя'),
  g('słońce', 2, 'сонце', 'солнце'),
  g('kość', 1, 'кістка', 'кость'),
  g('morze', 2, 'море', 'море')
]

/* ---------- 3. Jeden — dużo ---------- */
const numHint = {
  reg: l('Liczba mnoga: koty, domy, mamy, okna — końcówki -y, -i, -e, -a.', 'Множина: koty, domy, mamy, okna — закінчення -y, -i, -e, -a.', 'Множественное число: koty, domy, mamy, okna — окончания -y, -i, -e, -a.'),
  irr: l('Niektóre słowa zmieniają się mocno — trzeba je zapamiętać: dziecko → dzieci, człowiek → ludzie.', 'Деякі слова сильно змінюються — їх треба запам’ятати: dziecko → dzieci, człowiek → ludzie.', 'Некоторые слова сильно меняются — их надо запомнить: dziecko → dzieci, człowiek → ludzie.')
}
const n = (one: string, many: string, opts: string[], irr: boolean, uk: string, ru: string) =>
  gap(`jeden: ${one} → dużo: (${many})`, opts, irr ? numHint.irr : numHint.reg, irr ? 'irr' : 'reg', uk, ru)
const numItems: Item[] = [
  n('kot', 'koty', ['koty', 'kotów', 'kota'], false, 'коти', 'коты'),
  n('dom', 'domy', ['domy', 'domi', 'domów'], false, 'будинки', 'дома'),
  n('mama', 'mamy', ['mamy', 'mamie', 'mamą'], false, 'мами', 'мамы'),
  n('okno', 'okna', ['okna', 'okny', 'okien'], false, 'вікна', 'окна'),
  n('pies', 'psy', ['piesy', 'psy', 'psa'], false, 'пси', 'собаки'),
  n('dziecko', 'dzieci', ['dziecka', 'dzieci', 'dzieckowie'], true, 'діти', 'дети'),
  n('człowiek', 'ludzie', ['człowieki', 'ludzie', 'człowiekowie'], true, 'люди', 'люди'),
  n('oko', 'oczy', ['oka', 'oczy', 'oki'], true, 'очі', 'глаза'),
  n('ucho', 'uszy', ['ucha', 'uszy', 'uchy'], true, 'вуха', 'уши'),
  n('ręka', 'ręce', ['ręki', 'ręce', 'rąka'], true, 'руки', 'руки'),
  n('brat', 'bracia', ['braty', 'bracia', 'bratowie'], true, 'брати', 'братья'),
  n('przyjaciel', 'przyjaciele', ['przyjaciele', 'przyjaciely', 'przyjaciół'], false, 'друзі', 'друзья')
]

/* ---------- 4. Nazwa własna czy pospolita? ---------- */
const WP: L[] = [
  { pl: 'nazwa własna (wielka litera)', uk: 'власна назва (з великої)', ru: 'имя собственное (с заглавной)' },
  { pl: 'nazwa pospolita (mała litera)', uk: 'загальна назва (з малої)', ru: 'нарицательное (со строчной)' }
]
const wpHint = [
  l('To imię jednej, konkretnej osoby, zwierzęcia albo miejsca — nazwa własna, wielka litera.', 'Це ім’я однієї конкретної особи, тварини чи місця — власна назва, з великої.', 'Это имя одного конкретного человека, животного или места — имя собственное, с заглавной.'),
  l('To zwykła nazwa wielu podobnych rzeczy — nazwa pospolita, mała litera.', 'Це звичайна назва багатьох схожих речей — загальна назва, з малої.', 'Это обычное название многих похожих вещей — нарицательное, со строчной.')
]
const wp = (w: string, k: 0 | 1, uk: string, ru: string): Item =>
  ({ pre: '', post: '', mark: w, opts: WP, answer: k, hint: wpHint[k]!, tr: { uk, ru }, say: w, tag: `w${k}` })
const wpItems: Item[] = [
  wp('Warszawa', 0, 'Варшава', 'Варшава'),
  wp('miasto', 1, 'місто', 'город'),
  wp('Burek', 0, 'Бурек (кличка пса)', 'Бурек (кличка собаки)'),
  wp('pies', 1, 'пес', 'собака'),
  wp('Wisła', 0, 'Вісла', 'Висла'),
  wp('rzeka', 1, 'річка', 'река'),
  wp('Anna', 0, 'Анна', 'Анна'),
  wp('dziewczynka', 1, 'дівчинка', 'девочка'),
  wp('Polska', 0, 'Польща', 'Польша'),
  wp('kraj', 1, 'країна', 'страна')
]

export const rzeczownikExercise: Exercise = {
  slug: 'rzeczownik',
  group: 'rzeczownik',
  icon: 'kto?',
  color: 'var(--g2)',
  soft: 'var(--g2-soft)',
  title: l('Rzeczownik', 'Іменник', 'Существительное'),
  lead: l(
    'Kto? Co? Rzeczownik nazywa wszystko: kota, mamę, Kraków, a nawet radość. Ten, ta czy to? Jeden czy dużo?',
    'Хто? Що? Іменник називає все: кота, маму, Краків і навіть радість. Ten, ta чи to? Один чи багато?',
    'Кто? Что? Существительное называет всё: кота, маму, Краков и даже радость. Ten, ta или to? Один или много?'
  ),
  badge: l('Mistrz nazw', 'Майстер назв', 'Мастер названий'),
  levels: [
    lv('co', 'kto?',
      l('Co to jest rzeczownik?', 'Що таке іменник?', 'Что такое существительное?'),
      l(
        'Rzeczownik odpowiada na pytanie kto? co? Nazywa ludzi ([mama]), zwierzęta ([lis]), rzeczy ([stół]), miejsca ([Kraków]) i uczucia ([radość]).',
        'Іменник відповідає на питання хто? що? Називає людей ([mama]), тварин ([lis]), речі ([stół]), місця ([Kraków]) і почуття ([radość]).',
        'Существительное отвечает на вопрос кто? что? Называет людей ([mama]), животных ([lis]), вещи ([stół]), места ([Kraków]) и чувства ([radość]).'
      ),
      ['kto? → [mama]', 'co? → [stół]', 'co? → [radość]'],
      posItems, l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?')),
    lv('rodzaj', 'ten ta to',
      l('Ten, ta, to: rodzaj', 'Ten, ta, to: рід', 'Ten, ta, to: род'),
      l(
        'Powiedz przed słowem [ten], [ta] albo [to]: ten kot (męski), ta mama (żeński), to okno (nijaki).',
        'Скажи перед словом [ten], [ta] або [to]: ten kot (чоловічий), ta mama (жіночий), to okno (середній).',
        'Скажи перед словом [ten], [ta] или [to]: ten kot (мужской), ta mama (женский), to okno (средний).'
      ),
      ['[ten] kot', '[ta] mama', '[to] okno', '[ten] tata'],
      genItems, l('Jaki to rodzaj?', 'Який це рід?', 'Какой это род?'), 'sentence',
      tip(l('Pułapki', 'Пастки: інакше, ніж в українській', 'Ловушки: не как в русском'),
        l('Pies to „ten” (męski), choć po ukraińsku „собака” — żeński. Tata i mężczyzna kończą się na -a, ale to „ten”.', '[Pies] — «ten» (чоловічий), хоча «собака» — жіночий. [Tata] і [mężczyzna] закінчуються на -a, але це «ten».', '[Pies] — «ten» (мужской), хотя «собака» — женский. [Tata] и [mężczyzna] кончаются на -a, но это «ten».'))),
    lv('liczba', '1 → 2',
      l('Jeden kot, dużo kotów: liczba mnoga', 'Один кіт, багато котів: множина', 'Один кот, много котов: множественное число'),
      l(
        'Zwykle dodajemy końcówkę: kot → kot[y], okno → okn[a]. Ale są łobuzy: dziecko → [dzieci], człowiek → [ludzie], oko → [oczy].',
        'Зазвичай додаємо закінчення: kot → kot[y], okno → okn[a]. Але є розбишаки: dziecko → [dzieci], człowiek → [ludzie], oko → [oczy].',
        'Обычно добавляем окончание: kot → kot[y], okno → okn[a]. Но есть хулиганы: dziecko → [dzieci], człowiek → [ludzie], oko → [oczy].'
      ),
      ['kot → kot[y]', 'pies → [psy]', 'dziecko → [dzieci]', 'człowiek → [ludzie]'],
      numItems, l('Jak będzie dużo?', 'Як буде багато?', 'Как будет много?'), 'sentence',
      tip(l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
        l('Po ukraińsku też: людина → люди, дитина → діти, око → очі.', 'Українською теж так: людина → люди = człowiek → [ludzie], око → очі = oko → [oczy].', 'По-русски тоже так: человек → люди = człowiek → [ludzie], ребёнок → дети = dziecko → [dzieci].'))),
    lv('wlasne', 'Anna',
      l('Nazwa własna czy pospolita?', 'Власна чи загальна назва?', 'Собственное или нарицательное?'),
      l(
        'Nazwa własna to imię jednej, konkretnej rzeczy: [W]isła, [B]urek — wielka litera. Pospolita — zwykła nazwa: rzeka, pies.',
        'Власна назва — ім’я однієї конкретної речі: [W]isła, [B]urek — з великої. Загальна — звичайна назва: rzeka, pies.',
        'Собственное — имя одной конкретной вещи: [W]isła, [B]urek — с заглавной. Нарицательное — обычное название: rzeka, pies.'
      ),
      ['[W]isła — rzeka', '[B]urek — pies', '[A]nna — dziewczynka'],
      wpItems, l('Jaka to nazwa?', 'Яка це назва?', 'Какое это название?')),
    bossLv([...genItems, ...numItems, ...wpItems],
      l('Boss: lisia zagadka', 'Бос: лисяча загадка', 'Босс: лисья загадка'),
      l('Wszystko o rzeczowniku naraz!', 'Усе про іменник разом!', 'Всё о существительном вместе!'),
      l('Co pasuje?', 'Що підходить?', 'Что подходит?'))
  ]
}
