import type { L } from '~/types/content'
import type { Exercise, Item } from './types'
import { bossLv, l, lv, mark, tip } from './helpers'

/* ================================================================
   WSZYSTKIE CZĘŚCI MOWY — Arena Części Mowy, przewodnik: Lew Leon
   Wielki turniej: 10 części mowy, odmienne i nieodmienne.
   ================================================================ */

type Pos = 'rz' | 'cz' | 'prz' | 'licz' | 'zaim' | 'przys' | 'przyim' | 'spoj' | 'part' | 'wykrz'

const NAME: Record<Pos, L> = {
  rz: { pl: 'rzeczownik', uk: 'іменник', ru: 'существительное' },
  cz: { pl: 'czasownik', uk: 'дієслово', ru: 'глагол' },
  prz: { pl: 'przymiotnik', uk: 'прикметник', ru: 'прилагательное' },
  licz: { pl: 'liczebnik', uk: 'числівник', ru: 'числительное' },
  zaim: { pl: 'zaimek', uk: 'займенник', ru: 'местоимение' },
  przys: { pl: 'przysłówek', uk: 'прислівник', ru: 'наречие' },
  przyim: { pl: 'przyimek', uk: 'прийменник', ru: 'предлог' },
  spoj: { pl: 'spójnik', uk: 'сполучник', ru: 'союз' },
  part: { pl: 'partykuła', uk: 'частка', ru: 'частица' },
  wykrz: { pl: 'wykrzyknik', uk: 'вигук', ru: 'междометие' }
}
const Q: Record<Pos, L> = {
  rz: l('kto? co? — nazywa ludzi, zwierzęta, rzeczy', 'хто? що? — називає людей, тварин, речі', 'кто? что? — называет людей, животных, вещи'),
  cz: l('co robi? co się dzieje?', 'що робить? що відбувається?', 'что делает? что происходит?'),
  prz: l('jaki? jaka? jakie? — opisuje rzeczownik', 'який? яка? яке? — описує іменник', 'какой? какая? какое? — описывает существительное'),
  licz: l('ile? który z kolei?', 'скільки? котрий за порядком?', 'сколько? который по счёту?'),
  zaim: l('zastępuje inne słowo: on, mój, ten', 'замінює інше слово: on, mój, ten', 'заменяет другое слово: on, mój, ten'),
  przys: l('jak? gdzie? kiedy? — opisuje czasownik', 'як? де? коли? — описує дієслово', 'как? где? когда? — описывает глагол'),
  przyim: l('małe słowo przed rzeczownikiem: w, na, pod, do', 'маленьке слово перед іменником: w, na, pod, do', 'маленькое слово перед существительным: w, na, pod, do'),
  spoj: l('łączy słowa i zdania: i, ale, bo, że', 'з’єднує слова й речення: i, ale, bo, że', 'соединяет слова и предложения: i, ale, bo, że'),
  part: l('dodaje odcień: czy, niech, nie, tylko, -by', 'додає відтінок: czy, niech, nie, tylko, -by', 'добавляет оттенок: czy, niech, nie, tylko, -by'),
  wykrz: l('wyraża uczucia lub dźwięki: au, hura, miau', 'передає почуття чи звуки: au, hura, miau', 'передаёт чувства или звуки: au, hura, miau')
}
const hintFor = (k: Pos): L => l(
  `To ${NAME[k].pl}: ${Q[k].pl}.`,
  `Це ${NAME[k].uk} (${NAME[k].pl}): ${Q[k].uk}.`,
  `Это ${NAME[k].ru} (${NAME[k].pl}): ${Q[k].ru}.`
)

/* ---------- 1. Odmienne czy nieodmienne? ---------- */
const ON: L[] = [
  { pl: 'odmienna (zmienia się)', uk: 'змінна (змінюється)', ru: 'изменяемая (меняется)' },
  { pl: 'nieodmienna (zawsze tak samo)', uk: 'незмінна (завжди однакова)', ru: 'неизменяемая (всегда одинаковая)' }
]
const onHint = [
  l('To słowo się zmienia: kot → kota, kotem; czytam → czytasz. Część mowy odmienna.', 'Це слово змінюється: kot → kota, kotem; czytam → czytasz. Змінна частина мови.', 'Это слово меняется: kot → kota, kotem; czytam → czytasz. Изменяемая часть речи.'),
  l('To słowo zawsze wygląda tak samo: szybko, w, i, ach. Część mowy nieodmienna.', 'Це слово завжди однакове: szybko, w, i, ach. Незмінна частина мови.', 'Это слово всегда одинаковое: szybko, w, i, ach. Неизменяемая часть речи.')
]
const on = (w: string, k: 0 | 1, pos: Pos, uk: string, ru: string): Item =>
  ({ pre: '', post: '', mark: w, opts: ON, answer: k, hint: onHint[k]!, proof: NAME[pos].pl, tr: { uk, ru }, say: w, tag: `on${k}` })
const onItems: Item[] = [
  on('kot', 0, 'rz', 'кіт', 'кот'),
  on('szybko', 1, 'przys', 'швидко', 'быстро'),
  on('i', 1, 'spoj', 'і', 'и'),
  on('czytać', 0, 'cz', 'читати', 'читать'),
  on('w', 1, 'przyim', 'в, у', 'в'),
  on('piękny', 0, 'prz', 'гарний', 'красивый'),
  on('ach', 1, 'wykrz', 'ах', 'ах'),
  on('on', 0, 'zaim', 'він', 'он'),
  on('trzy', 0, 'licz', 'три', 'три'),
  on('czy', 1, 'part', 'чи', 'ли'),
  on('jutro', 1, 'przys', 'завтра', 'завтра'),
  on('mama', 0, 'rz', 'мама', 'мама')
]

/* ---------- 2–3. Rozpoznaj w zdaniu ---------- */
const ODM: Pos[] = ['rz', 'cz', 'prz', 'licz', 'zaim']
const NIE: Pos[] = ['przys', 'przyim', 'spoj', 'part', 'wykrz']
const ALL: Pos[] = [...ODM, ...NIE]
const opts = (set: Pos[]) => set.map(k => NAME[k])
const rec = (set: Pos[], s: string, k: Pos, uk: string, ru: string) => mark(s, opts(set), set.indexOf(k), hintFor(k), k, uk, ru)

const odmItems: Item[] = [
  rec(ODM, 'Mój [kot] śpi.', 'rz', 'Мій кіт спить.', 'Мой кот спит.'),
  rec(ODM, 'Mój kot [śpi].', 'cz', 'Мій кіт спить.', 'Мой кот спит.'),
  rec(ODM, '[Mój] kot śpi.', 'zaim', 'Мій кіт спить.', 'Мой кот спит.'),
  rec(ODM, 'Mam [trzy] siostry.', 'licz', 'У мене три сестри.', 'У меня три сестры.'),
  rec(ODM, 'To [wesoły] pies.', 'prz', 'Це веселий пес.', 'Это весёлая собака.'),
  rec(ODM, '[Ona] lubi czekoladę.', 'zaim', 'Вона любить шоколад.', 'Она любит шоколад.'),
  rec(ODM, 'Ona lubi [czekoladę].', 'rz', 'Вона любить шоколад.', 'Она любит шоколад.'),
  rec(ODM, 'Jestem w [piątej] klasie.', 'licz', 'Я в п’ятому класі.', 'Я в пятом классе.'),
  rec(ODM, 'Dzieci [biegają] po łące.', 'cz', 'Діти бігають лукою.', 'Дети бегают по лугу.'),
  rec(ODM, 'Mam [zielony] plecak.', 'prz', 'У мене зелений рюкзак.', 'У меня зелёный рюкзак.')
]
const nieItems: Item[] = [
  rec(NIE, 'Kot śpi [na] kanapie.', 'przyim', 'Кіт спить на дивані.', 'Кот спит на диване.'),
  rec(NIE, 'Kot śpi [spokojnie].', 'przys', 'Кіт спить спокійно.', 'Кот спит спокойно.'),
  rec(NIE, 'Lubię koty [i] psy.', 'spoj', 'Я люблю котів і псів.', 'Я люблю котов и собак.'),
  rec(NIE, '[Hura]! Wakacje!', 'wykrz', 'Ура! Канікули!', 'Ура! Каникулы!'),
  rec(NIE, '[Czy] masz rower?', 'part', 'Чи є в тебе велосипед?', 'У тебя есть велосипед?'),
  rec(NIE, '[Jutro] jedziemy nad morze.', 'przys', 'Завтра ми їдемо на море.', 'Завтра мы едем на море.'),
  rec(NIE, 'Idę [do] szkoły.', 'przyim', 'Я йду до школи.', 'Я иду в школу.'),
  rec(NIE, 'Chcę iść, [ale] pada.', 'spoj', 'Хочу піти, але падає дощ.', 'Хочу пойти, но идёт дождь.'),
  rec(NIE, '[Niech] żyje lato!', 'part', 'Хай живе літо!', 'Да здравствует лето!'),
  rec(NIE, '[Au]! To boli!', 'wykrz', 'Ой! Це боляче!', 'Ой! Это больно!')
]
const allItems: Item[] = [
  rec(ALL, '[Wczoraj] widziałem lisa.', 'przys', 'Учора я бачив лиса.', 'Вчера я видел лису.'),
  rec(ALL, 'Wczoraj widziałem [lisa].', 'rz', 'Учора я бачив лиса.', 'Вчера я видел лису.'),
  rec(ALL, 'Wczoraj [widziałem] lisa.', 'cz', 'Учора я бачив лиса.', 'Вчера я видел лису.'),
  rec(ALL, 'Mam [dwa] rude koty.', 'licz', 'У мене два руді коти.', 'У меня два рыжих кота.'),
  rec(ALL, 'Mam dwa [rude] koty.', 'prz', 'У мене два руді коти.', 'У меня два рыжих кота.'),
  rec(ALL, '[Ojej], ten kot spadł!', 'wykrz', 'Ой-ой, цей кіт упав!', 'Ой-ой, этот кот упал!'),
  rec(ALL, 'Kot schował się [pod] stół.', 'przyim', 'Кіт сховався під стіл.', 'Кот спрятался под стол.'),
  rec(ALL, 'Pada, [więc] zostaję w domu.', 'spoj', 'Падає дощ, тож я лишаюся вдома.', 'Идёт дождь, поэтому я остаюсь дома.'),
  rec(ALL, 'Daj [mi] książkę.', 'zaim', 'Дай мені книжку.', 'Дай мне книгу.'),
  rec(ALL, 'Zjadłem [tylko] jedno ciastko.', 'part', 'Я з’їв лише одне тістечко.', 'Я съел только одно пирожное.')
]

export const czesciExercise: Exercise = {
  slug: 'czesci-mowy',
  group: 'czesci',
  icon: '10',
  color: 'var(--g6)',
  soft: 'var(--g6-soft)',
  title: l('Wszystkie części mowy', 'Усі частини мови', 'Все части речи'),
  lead: l(
    'Wielki turniej! Dziesięć części mowy wchodzi na arenę. Rozpoznasz każdą?',
    'Великий турнір! Десять частин мови виходять на арену. Впізнаєш кожну?',
    'Большой турнир! Десять частей речи выходят на арену. Узнаешь каждую?'
  ),
  badge: l('Król części mowy', 'Король частин мови', 'Король частей речи'),
  levels: [
    lv('odmienne', '⇄',
      l('Odmienne czy nieodmienne?', 'Змінні чи незмінні?', 'Изменяемые или неизменяемые?'),
      l(
        'Pięć części mowy się zmienia (odmienne): rzeczownik, czasownik, przymiotnik, liczebnik, zaimek. Pięć — nigdy (nieodmienne): przysłówek, przyimek, spójnik, partykuła, wykrzyknik.',
        'П’ять частин мови змінюються: іменник, дієслово, прикметник, числівник, займенник. П’ять — ніколи: прислівник, прийменник, сполучник, частка, вигук.',
        'Пять частей речи изменяются: существительное, глагол, прилагательное, числительное, местоимение. Пять — никогда: наречие, предлог, союз, частица, междометие.'
      ),
      ['kot → kot[a] → kot[em]', 'czyta[m] → czyta[sz]', 'szybko → szybko (bez zmian)', 'w → w (bez zmian)'],
      onItems, l('Odmienna czy nieodmienna?', 'Змінна чи незмінна?', 'Изменяемая или неизменяемая?'), 'sentence',
      tip(l('Sztuczka', 'Хитрість: спробуй змінити', 'Хитрость: попробуй изменить'),
        l('Spróbuj powiedzieć słowo z „nie ma …” albo „dwa …”. Zmienia się? Odmienna!', 'Спробуй сказати слово з «nie ma …» або змінити особу. Змінюється? Змінна!', 'Попробуй сказать слово с «nie ma …» или поменять лицо. Меняется? Изменяемая!'))),
    lv('odm', '5 + ',
      l('Pięć odmiennych', 'П’ять змінних', 'Пять изменяемых'),
      l(
        'Rzeczownik — kto? co? Czasownik — co robi? Przymiotnik — jaki? Liczebnik — ile? który? Zaimek — zastępuje: on, mój, ten.',
        'Іменник — хто? що? Дієслово — що робить? Прикметник — який? Числівник — скільки? котрий? Займенник — замінює: on, mój, ten.',
        'Существительное — кто? что? Глагол — что делает? Прилагательное — какой? Числительное — сколько? который? Местоимение — заменяет: on, mój, ten.'
      ),
      ['[kot] (rzeczownik)', '[śpi] (czasownik)', '[wesoły] (przymiotnik)', '[trzy] (liczebnik)', '[mój] (zaimek)'],
      odmItems, l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?')),
    lv('nieodm', '5 −',
      l('Pięć nieodmiennych', 'П’ять незмінних', 'Пять неизменяемых'),
      l(
        'Przysłówek — jak? gdzie? kiedy? Przyimek — w, na, do. Spójnik — i, ale, bo. Partykuła — czy, niech, tylko. Wykrzyknik — au, hura.',
        'Прислівник — як? де? коли? Прийменник — w, na, do. Сполучник — i, ale, bo. Частка — czy, niech, tylko. Вигук — au, hura.',
        'Наречие — как? где? когда? Предлог — w, na, do. Союз — i, ale, bo. Частица — czy, niech, tylko. Междометие — au, hura.'
      ),
      ['[szybko] (przysłówek)', '[na] (przyimek)', '[ale] (spójnik)', '[czy] (partykuła)', '[hura] (wykrzyknik)'],
      nieItems, l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?')),
    bossLv(allItems,
      l('Finał turnieju: wszystkie 10!', 'Фінал турніру: усі 10!', 'Финал турнира: все 10!'),
      l('Dziesięć części mowy naraz. Zadaj pytanie do słowa i wybierz!', 'Десять частин мови разом. Постав питання до слова й обери!', 'Десять частей речи вместе. Задай вопрос к слову и выбери!'),
      l('Jaka to część mowy?', 'Яка це частина мови?', 'Какая это часть речи?'))
  ]
}
