import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, SENT, tip } from './helpers'

/* ================================================================
   PRZYIMKI — Domek Przyimków, przewodniczka: Myszka Zuzia
   ================================================================ */

/* ---------- 1. Gdzie jest myszka? ---------- */
const whereHint = l(
  'Przyimek mówi, gdzie coś jest: w, na, pod, nad, za, przed, obok, między.',
  'Прийменник каже, де щось є: w (в), na (на), pod (під), nad (над), za (за), przed (перед), obok (біля), między (між).',
  'Предлог говорит, где что-то находится: w (в), na (на), pod (под), nad (над), za (за), przed (перед), obok (рядом), między (между).'
)
const W8 = ['w', 'na', 'pod', 'nad', 'za', 'przed', 'obok', 'między']
const where = (s: string, ans: string, others: string[], uk: string, ru: string): Item => {
  const opts = [ans, ...others].sort((a, b) => W8.indexOf(a) - W8.indexOf(b))
  return gap(s, opts, whereHint, 'gdzie', uk, ru)
}
const whereItems: Item[] = [
  where('🐭📦 Myszka siedzi (w) pudełku.', 'w', ['na', 'pod'], 'Мишка сидить у коробці.', 'Мышка сидит в коробке.'),
  where('🐭⬆️🪑 Myszka stoi (na) krześle.', 'na', ['w', 'pod'], 'Мишка стоїть на стільці.', 'Мышка стоит на стуле.'),
  where('🐭⬇️🛏️ Myszka śpi (pod) łóżkiem.', 'pod', ['na', 'nad'], 'Мишка спить під ліжком.', 'Мышка спит под кроватью.'),
  where('💡⬆️🐭 Lampa wisi (nad) myszką.', 'nad', ['pod', 'na'], 'Лампа висить над мишкою.', 'Лампа висит над мышкой.'),
  where('🚪🐭 Myszka chowa się (za) drzwiami.', 'za', ['przed', 'na'], 'Мишка ховається за дверима.', 'Мышка прячется за дверью.'),
  where('🐭🏠 Myszka czeka (przed) domem.', 'przed', ['za', 'w'], 'Мишка чекає перед будинком.', 'Мышка ждёт перед домом.'),
  where('🐭🐱 Myszka siedzi (obok) kota.', 'obok', ['między', 'nad'], 'Мишка сидить біля кота.', 'Мышка сидит рядом с котом.'),
  where('🐱🐭🐶 Myszka stoi (między) kotem a psem.', 'między', ['obok', 'za'], 'Мишка стоїть між котом і псом.', 'Мышка стоит между котом и собакой.'),
  where('🐟💧 Ryba pływa (w) wodzie.', 'w', ['na', 'nad'], 'Риба плаває у воді.', 'Рыба плавает в воде.'),
  where('🐦🌳 Ptak siedzi (na) drzewie.', 'na', ['pod', 'w'], 'Птах сидить на дереві.', 'Птица сидит на дереве.')
]

/* ---------- 2. Przyimek + przypadek ---------- */
const caseHint = {
  do: l('Do, bez, od, dla, u, obok + dopełniacz (kogo? czego?): do szkoły, bez cukru.', 'Do, bez, od, dla, u, obok + родовий (кого? чого?): do szkoły, bez cukru.', 'Do, bez, od, dla, u, obok + родительный (кого? чего?): do szkoły, bez cukru.'),
  w: l('W, na, o, przy + miejscownik (gdzie? o kim? o czym?): w szkole, o kocie.', 'W, na, o, przy + місцевий (де? про кого? про що?): w szkole, o kocie.', 'W, na, o, przy + предложный (где? о ком? о чём?): w szkole, o kocie.'),
  z: l('Z (razem z kimś) + narzędnik (z kim? z czym?): z mamą, z psem.', 'Z (разом з кимось) + орудний (з ким? з чим?): z mamą, z psem.', 'Z (вместе с кем-то) + творительный (с кем? с чем?): z mamą, z psem.'),
  na: l('Na + biernik, gdy pytamy dokąd?: idę na plac zabaw.', 'Na + знахідний, коли питаємо куди?: idę na plac zabaw.', 'Na + винительный, когда спрашиваем куда?: idę na plac zabaw.')
}
const caseItems: Item[] = [
  gap('Idę do (szkoły).', ['szkoła', 'szkoły', 'szkole', 'szkołą'], caseHint.do, 'do', 'Я йду до школи.', 'Я иду в школу.'),
  gap('Jestem w (szkole).', ['szkoła', 'szkoły', 'szkole', 'szkołą'], caseHint.w, 'w', 'Я в школі.', 'Я в школе.'),
  gap('Rozmawiam z (mamą).', ['mama', 'mamy', 'mamie', 'mamą'], caseHint.z, 'z', 'Я розмовляю з мамою.', 'Я разговариваю с мамой.'),
  gap('To prezent dla (mamy).', ['mama', 'mamy', 'mamie', 'mamą'], caseHint.do, 'do', 'Це подарунок для мами.', 'Это подарок для мамы.'),
  gap('Herbata bez (cukru).', ['cukier', 'cukru', 'cukrze', 'cukrem'], caseHint.do, 'do', 'Чай без цукру.', 'Чай без сахара.'),
  gap('Myślę o (kocie).', ['kot', 'kota', 'kocie', 'kotem'], caseHint.w, 'w', 'Я думаю про кота.', 'Я думаю о коте.'),
  gap('Idę na spacer z (psem).', ['pies', 'psa', 'psie', 'psem'], caseHint.z, 'z', 'Я йду на прогулянку з псом.', 'Я иду гулять с собакой.'),
  gap('Książka leży na (stole).', ['stół', 'stołu', 'stole', 'stołem'], caseHint.w, 'w', 'Книжка лежить на столі.', 'Книга лежит на столе.'),
  gap('Idziemy na (plażę).', ['plaża', 'plaży', 'plażę', 'plażą'], caseHint.na, 'na', 'Ми йдемо на пляж.', 'Мы идём на пляж.'),
  gap('Mieszkam u (babci).', ['babcia', 'babci', 'babcię', 'babcią'], caseHint.do, 'do', 'Я живу в бабусі.', 'Я живу у бабушки.')
]

/* ---------- 3. W czy we? Z czy ze? ---------- */
const weHint = {
  we: l('We / ze — gdy następne słowo zaczyna się podobnie trudno: we wtorek, ze szkoły, ze mną.', 'We / ze — коли наступне слово починається «важко», схожими звуками: we wtorek, ze szkoły, ze mną.', 'We / ze — когда следующее слово начинается «трудно», похожими звуками: we wtorek, ze szkoły, ze mną.'),
  w: l('Zwykle wystarczy krótkie w albo z: w domu, z kotem.', 'Зазвичай досить короткого w або z: w domu, z kotem.', 'Обычно хватает короткого w или z: w domu, z kotem.')
}
const weItems: Item[] = [
  gap('(We) wtorek idę na basen.', ['w', 'we'], weHint.we, 'we', 'У вівторок я йду в басейн.', 'Во вторник я иду в бассейн.'),
  gap('(W) poniedziałek mam polski.', ['w', 'we'], weHint.w, 'w', 'У понеділок у мене польська.', 'В понедельник у меня польский.'),
  gap('Mieszkam (we) Wrocławiu.', ['w', 'we'], weHint.we, 'we', 'Я живу у Вроцлаві.', 'Я живу во Вроцлаве.'),
  gap('Mieszkam (w) Warszawie.', ['w', 'we'], weHint.w, 'w', 'Я живу у Варшаві.', 'Я живу в Варшаве.'),
  gap('Wracam (ze) szkoły.', ['z', 'ze'], weHint.we, 'we', 'Я повертаюся зі школи.', 'Я возвращаюсь из школы.'),
  gap('Idę (z) kotem.', ['z', 'ze'], weHint.w, 'w', 'Я йду з котом.', 'Я иду с котом.'),
  gap('Chodź (ze) mną!', ['z', 'ze'], weHint.we, 'we', 'Ходи зі мною!', 'Пойдём со мной!'),
  gap('Rozmawiam (z) tatą.', ['z', 'ze'], weHint.w, 'w', 'Я розмовляю з татом.', 'Я разговариваю с папой.'),
  gap('(We) środę jest test.', ['w', 'we'], weHint.we, 'we', 'У середу тест.', 'В среду тест.'),
  gap('Wyjmuję książkę (ze) szafy.', ['z', 'ze'], weHint.we, 'we', 'Я виймаю книжку з шафи.', 'Я достаю книгу из шкафа.')
]

/* ---------- 4. Razem czy osobno? ---------- */
const sepHint = {
  osobno: l('Przyimek z innym słowem piszemy osobno: na pewno, z powrotem, po polsku, do widzenia.', 'Прийменник з іншим словом пишемо окремо: na pewno, z powrotem, po polsku, do widzenia.', 'Предлог с другим словом пишем раздельно: na pewno, z powrotem, po polsku, do widzenia.'),
  razem: l('Te słowa zrosły się w jedno — piszemy razem: naprawdę, dlatego, naraz, nadal.', 'Ці слова зрослися в одне — пишемо разом: naprawdę, dlatego, naraz, nadal.', 'Эти слова срослись в одно — пишем слитно: naprawdę, dlatego, naraz, nadal.')
}
const sep = (s: string, a: string, b: string, together: boolean, uk: string, ru: string) => {
  /* a — wersja osobno, b — razem */
  const s2 = s.replace('{}', `(${together ? b : a})`)
  return gap(s2, [a, b], together ? sepHint.razem : sepHint.osobno, together ? 'razem' : 'osobno', uk, ru)
}
const sepItems: Item[] = [
  sep('Jutro {} przyjdę.', 'na pewno', 'napewno', false, 'Завтра я точно прийду.', 'Завтра я точно приду.'),
  sep('Mówię {}.', 'po polsku', 'popolsku', false, 'Я говорю польською.', 'Я говорю по-польски.'),
  sep('Wracam {} do domu.', 'z powrotem', 'zpowrotem', false, 'Я повертаюся назад додому.', 'Я возвращаюсь обратно домой.'),
  sep('{}, pani!', 'do widzenia', 'dowidzenia', false, 'До побачення, пані!', 'До свидания!'),
  sep('Jesteś {} dobry!', 'na prawdę', 'naprawdę', true, 'Ти справді добрий!', 'Ты правда хороший!'),
  sep('Pada deszcz, {} biorę parasol.', 'dla tego', 'dlatego', true, 'Падає дощ, тому я беру парасольку.', 'Идёт дождь, поэтому я беру зонт.'),
  sep('Wszyscy krzyczą {}!', 'na raz', 'naraz', true, 'Усі кричать одночасно!', 'Все кричат одновременно!'),
  sep('Deszcz {} pada.', 'na dal', 'nadal', true, 'Дощ досі падає.', 'Дождь всё ещё идёт.'),
  sep('Mam {} dwa koty.', 'na razie', 'narazie', false, 'Поки що в мене два коти.', 'Пока у меня два кота.'),
  sep('Kot jest {} domu.', 'na zewnątrz', 'nazewnątrz', false, 'Кіт надворі (поза домом).', 'Кот снаружи дома.')
]

export const przyimkiExercise: Exercise = {
  slug: 'przyimki',
  group: 'przyimek',
  icon: 'w/na',
  color: 'var(--g2)',
  soft: 'var(--g2-soft)',
  title: l('Przyimki', 'Прийменники', 'Предлоги'),
  lead: l(
    'W, na, pod, za… Małe słówka, które mówią gdzie, dokąd i z kim. Uwaga: w czy we? na pewno czy napewno?',
    'W, na, pod, za… Маленькі слівця, що кажуть де, куди і з ким. Увага: w чи we? na pewno чи napewno?',
    'W, na, pod, za… Маленькие слова, которые говорят где, куда и с кем. Внимание: w или we? na pewno или napewno?'
  ),
  badge: l('Mistrz przyimków', 'Майстер прийменників', 'Мастер предлогов'),
  levels: [
    lv('gdzie', '🐭📦',
      l('Gdzie jest myszka?', 'Де мишка?', 'Где мышка?'),
      l(
        'Przyimek to małe słowo przed rzeczownikiem: [w] pudełku, [na] krześle, [pod] łóżkiem, [za] drzwiami.',
        'Прийменник — маленьке слово перед іменником: [w] pudełku (у коробці), [na] krześle, [pod] łóżkiem (під ліжком).',
        'Предлог — маленькое слово перед существительным: [w] pudełku (в коробке), [na] krześle, [pod] łóżkiem (под кроватью).'
      ),
      ['[w] pudełku', '[na] krześle', '[pod] łóżkiem', '[między] kotem a psem'],
      whereItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
        l('Prawie jak po ukraińsku: під → pod, над → nad, за → za, перед → przed, між → między.', 'Майже як українською: під → [pod], над → [nad], за → [za], перед → [przed], між → [między]. А «біля» — [obok].', 'Почти как по-русски: под → [pod], над → [nad], за → [za], перед → [przed], между → [między]. А «рядом» — [obok].'))),
    lv('przypadek', 'do + ?',
      l('Przyimek rządzi przypadkiem', 'Прийменник керує відмінком', 'Предлог управляет падежом'),
      l(
        'Po przyimku rzeczownik zmienia końcówkę: do szkoł[y], w szkol[e], z mam[ą], dla mam[y].',
        'Після прийменника іменник змінює закінчення: do szkoł[y], w szkol[e], z mam[ą], dla mam[y].',
        'После предлога существительное меняет окончание: do szkoł[y], w szkol[e], z mam[ą], dla mam[y].'
      ),
      ['do szkoł[y]', 'w szkol[e]', 'z mam[ą]', 'bez cukr[u]'],
      caseItems, SENT),
    lv('we', 'w/we',
      l('W czy we? Z czy ze?', 'W чи we? Z чи ze?', 'W или we? Z или ze?'),
      l(
        'Zwykle w i z: [w] domu, [z] kotem. Ale gdy trudno wymówić — [we] i [ze]: we wtorek, ze szkoły, ze mną.',
        'Зазвичай w і z: [w] domu, [z] kotem. Але коли важко вимовити — [we] і [ze]: we wtorek, ze szkoły, ze mną.',
        'Обычно w и z: [w] domu, [z] kotem. Но когда трудно произнести — [we] и [ze]: we wtorek, ze szkoły, ze mną.'
      ),
      ['[we] wtorek', '[w] poniedziałek', '[ze] szkoły', '[z] kotem'],
      weItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: як «у/уві», «з/зі»', 'Хитрость: как «в/во», «с/со»'),
        l('Jak po ukraińsku: з → зі (зі мною → ze mną).', 'Як українське «з → зі»: зі мною → [ze] mną, зі школи → [ze] szkoły.', 'Как русское «в → во», «с → со»: во вторник → [we] wtorek, со мной → [ze] mną.'))),
    lv('osobno', 'na pewno',
      l('Razem czy osobno?', 'Разом чи окремо?', 'Слитно или раздельно?'),
      l(
        'Przyimek z innym słowem piszemy [osobno]: na pewno, po polsku, z powrotem. Ale niektóre zrosły się [razem]: naprawdę, dlatego, naraz, nadal.',
        'Прийменник з іншим словом пишемо [окремо]: na pewno, po polsku, z powrotem. Але деякі зрослися [разом]: naprawdę, dlatego, naraz, nadal.',
        'Предлог с другим словом пишем [раздельно]: na pewno, po polsku, z powrotem. Но некоторые срослись [слитно]: naprawdę, dlatego, naraz, nadal.'
      ),
      ['[na pewno]', '[po polsku]', '[naprawdę]', '[dlatego]'],
      sepItems, SENT),
    bossLv([...whereItems, ...caseItems, ...weItems, ...sepItems],
      l('Boss: wielka zabawa w chowanego', 'Бос: велика гра в хованки', 'Босс: большие прятки'),
      l('Wszystko naraz: gdzie, jaki przypadek, w czy we, razem czy osobno.', 'Усе разом: де, який відмінок, w чи we, разом чи окремо.', 'Всё вместе: где, какой падеж, w или we, слитно или раздельно.'))
  ]
}
