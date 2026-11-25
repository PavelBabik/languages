import type { L } from '~/types/content'
import type { Exercise, Item } from './types'
import { bossLv, gap, l, lv, pickSentence, SENT, tip } from './helpers'

/* ================================================================
   SŁOWOTWÓRSTWO — Kopalnia Słów, przewodnik: Kret Kazik
   (kret kopie i znajduje korzenie słów)
   FRAZEOLOGIA — Teatr Powiedzonek, przewodniczka: Małpka Mia
   ================================================================ */

/* ---------- Rodzina wyrazów: który nie pasuje? ---------- */
const famHint = (root: string, odd: string): L => l(
  `Wszystkie słowa mają wspólny rdzeń „${root}”, tylko „${odd}” nie.`,
  `Усі слова мають спільний корінь «${root}», тільки «${odd}» — ні.`,
  `Все слова имеют общий корень «${root}», только «${odd}» — нет.`
)
const fam = (words: string[], odd: string, root: string, uk: string, ru: string) =>
  pickSentence(words, words.indexOf(odd), famHint(root, odd), 'fam', uk, ru)
const famItems: Item[] = [
  fam(['dom', 'domek', 'dym', 'domowy'], 'dym', 'dom', 'дім, будиночок, домашній; dym — дим', 'дом, домик, домашний; dym — дым'),
  fam(['las', 'leśny', 'lis', 'lasek'], 'lis', 'las / leś', 'ліс, лісовий, лісок; lis — лис', 'лес, лесной, лесок; lis — лиса'),
  fam(['kot', 'kotek', 'kocur', 'koc'], 'koc', 'kot / koc-ur', 'кіт, котик, котяра; koc — ковдра', 'кот, котик, котяра; koc — одеяло'),
  fam(['pisać', 'pisarz', 'piasek', 'napis'], 'piasek', 'pis', 'писати, письменник, напис; piasek — пісок', 'писать, писатель, надпись; piasek — песок'),
  fam(['szkoła', 'szkolny', 'szkoda', 'szkółka'], 'szkoda', 'szkoł / szkol / szkół', 'школа, шкільний, школка; szkoda — шкода', 'школа, школьный, школка; szkoda — жаль'),
  fam(['woda', 'wodny', 'wodospad', 'wózek'], 'wózek', 'wod', 'вода, водний, водоспад; wózek — візок', 'вода, водный, водопад; wózek — коляска'),
  fam(['góra', 'górski', 'górka', 'gruszka'], 'gruszka', 'gór', 'гора, гірський, гірка; gruszka — груша', 'гора, горный, горка; gruszka — груша'),
  fam(['ryba', 'rybak', 'rybka', 'rower'], 'rower', 'ryb', 'риба, рибак, рибка; rower — велосипед', 'рыба, рыбак, рыбка; rower — велосипед')
]

/* ---------- Zdrobnienia ---------- */
const zdHint = l(
  'Zdrobnienie mówi „mały, miły”: -ek, -ka, -ko, -eczka, -uś: kot → kotek.',
  'Зменшувальне слово каже «маленький, милий»: -ek, -ka, -ko, -eczka, -uś: kot → kotek (котик).',
  'Уменьшительное слово говорит «маленький, милый»: -ek, -ka, -ko, -eczka, -uś: kot → kotek (котик).'
)
const zd = (from: string, to: string, opts: string[], uk: string, ru: string) => gap(`${from} → mały: (${to})`, opts, zdHint, 'zd', uk, ru)
const zdItems: Item[] = [
  zd('kot', 'kotek', ['kotek', 'kotka', 'kociak'], 'котик', 'котик'),
  zd('dom', 'domek', ['domek', 'domik', 'domko'], 'будиночок', 'домик'),
  zd('pies', 'piesek', ['piesek', 'psik', 'piesko'], 'песик', 'пёсик'),
  zd('ręka', 'rączka', ['ręczka', 'rączka', 'rękek'], 'ручка, рученька', 'ручка'),
  zd('noga', 'nóżka', ['nogka', 'nóżka', 'nożek'], 'ніжка', 'ножка'),
  zd('słońce', 'słoneczko', ['słońcek', 'słoneczko', 'słońka'], 'сонечко', 'солнышко'),
  zd('książka', 'książeczka', ['książeczka', 'książkek', 'książunia'], 'книжечка', 'книжечка'),
  zd('kwiat', 'kwiatek', ['kwiatka', 'kwiatek', 'kwiecik'], 'квіточка', 'цветочек'),
  zd('mama', 'mamusia', ['mamek', 'mamusia', 'mamka'], 'матуся', 'мамочка')
]

/* ---------- Przedrostki ---------- */
const prHint = {
  wy: l('Wy- — na zewnątrz: wyszła z domu.', 'Wy- — назовні (ви-): wyszła z domu — вийшла з дому.', 'Wy- — наружу (вы-): wyszła z domu — вышла из дома.'),
  w: l('W- — do środka: wszedł do kuchni.', 'W- — всередину (в-): wszedł do kuchni — увійшов до кухні.', 'W- — внутрь (в-): wszedł do kuchni — вошёл на кухню.'),
  przy: l('Przy- — dotarł tutaj: przyszła do nas.', 'Przy- — прибув сюди (при-): przyszła do nas — прийшла до нас.', 'Przy- — прибыл сюда (при-): przyszła do nas — пришла к нам.'),
  od: l('Od- — oddala się: odjechał ze stacji.', 'Od- — віддаляється (від-): odjechał ze stacji — від’їхав.', 'Od- — удаляется (от-): odjechał ze stacji — отъехал.'),
  pod: l('Pod- — zbliża się blisko: podszedł do miski.', 'Pod- — наближається (під-): podszedł do miski — підійшов.', 'Pod- — приближается (под-): podszedł do miski — подошёл.')
}
const prItems: Item[] = [
  gap('Mama (wyszła) z domu.', ['weszła', 'wyszła', 'przyszła'], prHint.wy, 'wy', 'Мама вийшла з дому.', 'Мама вышла из дома.'),
  gap('Tata (wszedł) do kuchni.', ['wszedł', 'wyszedł', 'odszedł'], prHint.w, 'w', 'Тато увійшов до кухні.', 'Папа вошёл на кухню.'),
  gap('Babcia (przyszła) do nas w gości.', ['wyszła', 'odeszła', 'przyszła'], prHint.przy, 'przy', 'Бабуся прийшла до нас у гості.', 'Бабушка пришла к нам в гости.'),
  gap('Pociąg (odjechał) ze stacji.', ['przyjechał', 'odjechał', 'wjechał'], prHint.od, 'od', 'Потяг від’їхав від станції.', 'Поезд отъехал от станции.'),
  gap('Kot (podszedł) do miski.', ['podszedł', 'wyszedł', 'odszedł'], prHint.pod, 'pod', 'Кіт підійшов до миски.', 'Кот подошёл к миске.'),
  gap('Autobus (przyjechał) na przystanek.', ['odjechał', 'przyjechał', 'wyjechał'], prHint.przy, 'przy', 'Автобус приїхав на зупинку.', 'Автобус приехал на остановку.'),
  gap('Dzieci (wybiegły) na podwórko.', ['wbiegły', 'wybiegły', 'przybiegły'], prHint.wy, 'wy', 'Діти вибігли на подвір’я.', 'Дети выбежали во двор.'),
  gap('Ptak (wleciał) przez okno do pokoju.', ['wyleciał', 'wleciał', 'odleciał'], prHint.w, 'w', 'Птах влетів крізь вікно до кімнати.', 'Птица влетела через окно в комнату.')
]

/* ---------- Kto to robi? ---------- */
const ktHint = l(
  'Od czynności tworzymy nazwę osoby: -arz, -iciel, -ca, -nik: piec → piekarz.',
  'Від дії утворюємо назву особи: -arz, -iciel, -ca, -nik: piec → piekarz (пекар).',
  'От действия образуем название человека: -arz, -iciel, -ca, -nik: piec → piekarz (пекарь).'
)
const ktItems: Item[] = [
  gap('Kto piecze chleb? (piekarz)', ['piekarz', 'piekarnik', 'pieczywo'], ktHint, 'kt', 'Хто пече хліб? Пекар.', 'Кто печёт хлеб? Пекарь.'),
  gap('Kto uczy dzieci? (nauczyciel)', ['nauczyciel', 'nauka', 'uczeń'], ktHint, 'kt', 'Хто вчить дітей? Учитель.', 'Кто учит детей? Учитель.'),
  gap('Kto leczy ludzi? (lekarz)', ['lekarstwo', 'lekarz', 'leczenie'], ktHint, 'kt', 'Хто лікує людей? Лікар.', 'Кто лечит людей? Врач.'),
  gap('Kto pisze książki? (pisarz)', ['pisanie', 'pisak', 'pisarz'], ktHint, 'kt', 'Хто пише книжки? Письменник.', 'Кто пишет книги? Писатель.'),
  gap('Kto prowadzi autobus? (kierowca)', ['kierowca', 'kierownica', 'kierunek'], ktHint, 'kt', 'Хто керує автобусом? Водій.', 'Кто водит автобус? Водитель.'),
  gap('Kto sprzedaje w sklepie? (sprzedawca)', ['sprzedaż', 'sprzedawca', 'sklep'], ktHint, 'kt', 'Хто продає в магазині? Продавець.', 'Кто продаёт в магазине? Продавец.'),
  gap('Kto łowi ryby? (rybak)', ['rybka', 'rybak', 'rybny'], ktHint, 'kt', 'Хто ловить рибу? Рибак.', 'Кто ловит рыбу? Рыбак.')
]

export const slowotworstwoExercise: Exercise = {
  slug: 'slowotworstwo',
  group: 'slowotworstwo',
  icon: '⛏',
  color: 'var(--g8)',
  soft: 'var(--g8-soft)',
  title: l('Słowotwórstwo', 'Словотвір', 'Словообразование'),
  lead: l(
    'Jak rodzą się słowa? Dom → domek → domowy. Wyjść, wejść, przyjść. Piec → piekarz. Kopiemy do korzeni!',
    'Як народжуються слова? Dom → domek → domowy. Wyjść, wejść, przyjść. Piec → piekarz. Копаємо до коренів!',
    'Как рождаются слова? Dom → domek → domowy. Wyjść, wejść, przyjść. Piec → piekarz. Копаем до корней!'
  ),
  badge: l('Mistrz korzeni', 'Майстер коренів', 'Мастер корней'),
  levels: [
    lv('rodzina', 'dom…',
      l('Rodzina wyrazów', 'Родина слів', 'Семья слов'),
      l(
        'Słowa z tej samej rodziny mają wspólny rdzeń: [dom], [dom]ek, [dom]owy. Słowo podobne z wyglądu, ale o innym znaczeniu — to obcy!',
        'Слова однієї родини мають спільний корінь: [dom], [dom]ek, [dom]owy. Схоже на вигляд слово з іншим значенням — чужинець!',
        'Слова одной семьи имеют общий корень: [dom], [dom]ek, [dom]owy. Похожее на вид слово с другим значением — чужак!'
      ),
      ['[dom] → [dom]ek → [dom]owy', '[las] → [leś]ny', 'dym — obcy!'],
      famItems, l('Które słowo nie pasuje do rodziny?', 'Яке слово не з цієї родини?', 'Какое слово не из этой семьи?')),
    lv('zdrobnienia', 'kotek',
      l('Zdrobnienia: kot → kotek', 'Зменшувальні: kot → kotek', 'Уменьшительные: kot → kotek'),
      l(
        'Małe i miłe: kot → kot[ek], ręka → rącz[ka], słońce → słonecz[ko], mama → mam[usia].',
        'Маленьке й миле: kot → kot[ek], ręka → rącz[ka], słońce → słonecz[ko], mama → mam[usia].',
        'Маленькое и милое: kot → kot[ek], ręka → rącz[ka], słońce → słonecz[ko], mama → mam[usia].'
      ),
      ['kot → kot[ek]', 'noga → nóż[ka]', 'słońce → słonecz[ko]'],
      zdItems, l('Jak będzie małe i miłe?', 'Як буде маленьке й миле?', 'Как будет маленькое и милое?'), 'sentence',
      tip(l('Sztuczka', 'Хитрість: як українською', 'Хитрость: как по-русски'),
        l('Po ukraińsku: котик, ніжка, сонечко — tak samo „zmiękczamy” słowa.', 'Українською так само: кот[ик] → kot[ek], ніж[ка] → nóż[ka], сонеч[ко] → słonecz[ko].', 'По-русски так же: кот[ик] → kot[ek], нож[ка] → nóż[ka], солныш[ко] → słonecz[ko].'))),
    lv('przedrostki', 'wy-/w-',
      l('Wyjść, wejść, przyjść', 'Wyjść, wejść, przyjść', 'Wyjść, wejść, przyjść'),
      l(
        'Mały początek zmienia sens: [wy]szła (na zewnątrz), [w]szedł (do środka), [przy]szła (tutaj), [od]jechał (daleko), [pod]szedł (blisko).',
        'Маленький початок змінює зміст: [wy]szła (вийшла), [w]szedł (увійшов), [przy]szła (прийшла), [od]jechał (від’їхав), [pod]szedł (підійшов).',
        'Маленькое начало меняет смысл: [wy]szła (вышла), [w]szedł (вошёл), [przy]szła (пришла), [od]jechał (отъехал), [pod]szedł (подошёл).'
      ),
      ['[wy]jść', '[w]ejść', '[przy]jść', '[od]jechać', '[pod]ejść'],
      prItems, SENT, 'sentence',
      tip(l('Sztuczka', 'Хитрість: ви-, в-, при-, від-, під-', 'Хитрость: вы-, в-, при-, от-, под-'),
        l('Jak po ukraińsku: ви- = wy-, в- = w-, при- = przy-, від- = od-, під- = pod-.', 'Майже як українською: [ви]- = [wy]-, [в]- = [w]-, [при]- = [przy]-, [від]- = [od]-, [під]- = [pod]-.', 'Почти как по-русски: [вы]- = [wy]-, [в]- = [w]-, [при]- = [przy]-, [от]- = [od]-, [под]- = [pod]-.'))),
    lv('kto', 'piekarz',
      l('Kto to robi? Piec → piekarz', 'Хто це робить? Piec → piekarz', 'Кто это делает? Piec → piekarz'),
      l(
        'Od czynności powstaje nazwa osoby: piec → pie[karz], uczyć → naucz[yciel], prowadzić (kierować) → kierow[ca].',
        'Від дії з’являється назва особи: piec → pie[karz] (пекар), uczyć → naucz[yciel], kierować → kierow[ca] (водій).',
        'От действия появляется название человека: piec → pie[karz] (пекарь), uczyć → naucz[yciel], kierować → kierow[ca] (водитель).'
      ),
      ['piec → pie[karz]', 'leczyć → le[karz]', 'pisać → pis[arz]', 'kierować → kierow[ca]'],
      ktItems, SENT),
    bossLv([...famItems, ...zdItems, ...prItems, ...ktItems],
      l('Boss: najgłębszy tunel', 'Бос: найглибший тунель', 'Босс: самый глубокий тоннель'),
      l('Wszystko o budowie słów naraz!', 'Усе про будову слів разом!', 'Всё о строении слов вместе!'),
      l('Co pasuje?', 'Що підходить?', 'Что подходит?'))
  ]
}

/* ================================================================
   FRAZEOLOGIA
   ================================================================ */
const fzHint = (meaning: L): L => meaning
const fz = (idiom: string, means: L[], good: number, uk: string, ru: string): Item =>
  ({ pre: '', post: '', mark: idiom, opts: means, answer: good, hint: fzHint(means[good]!), tr: { uk, ru }, say: idiom, tag: 'fz' })
const M = {
  lucky: l('życzyć powodzenia', 'бажати успіху', 'желать удачи'),
  angry: l('być w złym humorze', 'бути в поганому настрої', 'быть в плохом настроении'),
  easy: l('coś bardzo łatwego', 'щось дуже легке', 'что-то очень лёгкое'),
  run: l('szybko uciec', 'швидко втекти', 'быстро убежать'),
  smart: l('być mądrym i zaradnym', 'бути розумним і спритним', 'быть умным и находчивым'),
  worse: l('z jednego kłopotu w gorszy', 'з однієї біди в гіршу', 'из одной беды в худшую'),
  relief: l('poczuć ulgę', 'відчути полегшення', 'почувствовать облегчение'),
  lie: l('nie dotrzymywać obietnic', 'не дотримувати обіцянок', 'не сдерживать обещаний'),
  deaf: l('nikt nie słucha', 'ніхто не слухає', 'никто не слушает'),
  sleep: l('spać bardzo mocno', 'дуже міцно спати', 'очень крепко спать'),
  hungry: l('być bardzo głodnym', 'бути дуже голодним', 'быть очень голодным'),
  time: l('czas szybko mija', 'час швидко минає', 'время быстро идёт')
}
const fzItems: Item[] = [
  fz('trzymać kciuki', [M.lucky, M.angry, M.run], 0, 'тримати кулаки', 'держать кулачки'),
  fz('mieć muchy w nosie', [M.easy, M.angry, M.smart], 1, 'бути не в гуморі', 'быть не в духе'),
  fz('bułka z masłem', [M.run, M.relief, M.easy], 2, 'раз плюнути', 'проще простого'),
  fz('wziąć nogi za pas', [M.run, M.lucky, M.sleep], 0, 'накивати п’ятами', 'дать дёру'),
  fz('mieć głowę na karku', [M.angry, M.smart, M.lie], 1, 'мати голову на плечах', 'иметь голову на плечах'),
  fz('z deszczu pod rynnę', [M.relief, M.easy, M.worse], 2, 'з вогню та в полум’я', 'из огня да в полымя'),
  fz('kamień spadł z serca', [M.relief, M.deaf, M.hungry], 0, 'камінь з душі впав', 'камень с души упал'),
  fz('rzucać słowa na wiatr', [M.smart, M.lie, M.time], 1, 'кидати слова на вітер', 'бросать слова на ветер'),
  fz('mówić jak do ściany', [M.deaf, M.lucky, M.easy], 0, 'як горохом об стіну', 'как об стенку горох'),
  fz('spać jak suseł', [M.time, M.run, M.sleep], 2, 'спати як ховрах (дуже міцно)', 'спать как сурок'),
  fz('głodny jak wilk', [M.hungry, M.angry, M.smart], 0, 'голодний як вовк', 'голодный как волк')
]
const fillHint = l('To stałe powiedzenie — słów nie zmieniamy.', 'Це сталий вислів — слів не змінюємо.', 'Это устойчивое выражение — слова не меняем.')
const fillItems: Item[] = [
  gap('Ten test to (bułka) z masłem.', ['bułka', 'chleb', 'kanapka'], fillHint, 'fill', 'Цей тест — раз плюнути.', 'Этот тест — проще простого.', 'bułka z masłem = bardzo łatwe'),
  gap('Trzymam za ciebie (kciuki)!', ['palce', 'kciuki', 'ręce'], fillHint, 'fill', 'Тримаю за тебе кулаки!', 'Держу за тебя кулачки!', 'trzymać kciuki = życzyć powodzenia'),
  gap('Brat ma dziś (muchy) w nosie.', ['pszczoły', 'mrówki', 'muchy'], fillHint, 'fill', 'Брат сьогодні не в гуморі.', 'Брат сегодня не в духе.', 'mieć muchy w nosie = być złym'),
  gap('Złodziej wziął (nogi) za pas.', ['nogi', 'ręce', 'buty'], fillHint, 'fill', 'Злодій накивав п’ятами.', 'Вор дал дёру.', 'wziąć nogi za pas = uciec'),
  gap('Kamień spadł mi z (serca).', ['głowy', 'serca', 'ręki'], fillHint, 'fill', 'Камінь з душі впав.', 'Камень с души упал.', 'kamień spadł z serca = ulga'),
  gap('Jestem głodny jak (wilk).', ['kot', 'wilk', 'lis'], fillHint, 'fill', 'Я голодний як вовк.', 'Я голоден как волк.', 'głodny jak wilk = bardzo głodny'),
  gap('Śpi jak (suseł).', ['suseł', 'kret', 'zając'], fillHint, 'fill', 'Спить як ховрах.', 'Спит как сурок.', 'spać jak suseł = spać mocno'),
  gap('Z deszczu pod (rynnę).', ['dach', 'rynnę', 'parasol'], fillHint, 'fill', 'З вогню та в полум’я.', 'Из огня да в полымя.', 'z deszczu pod rynnę = gorzej')
]

export const frazeologiaExercise: Exercise = {
  slug: 'frazeologia',
  group: 'frazeologia',
  icon: '🎭',
  color: 'var(--g5)',
  soft: 'var(--g5-soft)',
  title: l('Frazeologia: powiedzonka', 'Фразеологія: приказки', 'Фразеология: поговорки'),
  lead: l(
    'Mieć muchy w nosie? Bułka z masłem? To nie o jedzeniu! Powiedzonka znaczą coś innego niż słowa.',
    'Mieć muchy w nosie? Bułka z masłem? Це не про їжу! Сталі вислови означають щось інше, ніж слова.',
    'Mieć muchy w nosie? Bułka z masłem? Это не про еду! Устойчивые выражения значат не то, что слова.'
  ),
  badge: l('Mistrz powiedzonek', 'Майстер висловів', 'Мастер выражений'),
  levels: [
    lv('znaczenie', 'co znaczy?',
      l('Co to znaczy?', 'Що це означає?', 'Что это значит?'),
      l(
        'Związek frazeologiczny to kilka słów, które razem znaczą coś nowego: „[bułka z masłem]” = coś bardzo łatwego.',
        'Фразеологізм — кілька слів, що разом означають щось нове: «[bułka z masłem]» = щось дуже легке.',
        'Фразеологизм — несколько слов, которые вместе значат что-то новое: «[bułka z masłem]» = что-то очень лёгкое.'
      ),
      ['[bułka z masłem] → łatwe', '[trzymać kciuki] → powodzenia', '[mieć muchy w nosie] → zły humor'],
      fzItems, l('Co znaczy to powiedzonko?', 'Що означає цей вислів?', 'Что значит это выражение?'), 'sentence',
      tip(l('Sztuczka', 'Хитрість: шукай українського брата', 'Хитрость: ищи русского брата'),
        l('Wiele powiedzonek ma ukraińskiego brata: kamień spadł z serca = камінь з душі впав.', 'Багато висловів мають українського брата: [kamień spadł z serca] = камінь з душі впав, [głodny jak wilk] = голодний як вовк.', 'У многих выражений есть русский брат: [kamień spadł z serca] = камень с души упал, [głodny jak wilk] = голодный как волк.'))),
    lv('uzupelnij', '… z masłem',
      l('Dokończ powiedzonko', 'Доповни вислів', 'Закончи выражение'),
      l(
        'W powiedzonku nie zmieniamy słów: „bułka z masłem”, nie „chleb z masłem”! Trzymamy [kciuki], a nie palce.',
        'У вислові слова не змінюємо: «bułka z masłem», а не «chleb z masłem»! Тримаємо [kciuki] (великі пальці), а не кулаки.',
        'В выражении слова не меняем: «bułka z masłem», а не «chleb z masłem»! Держим [kciuki] (большие пальцы), а не кулачки.'
      ),
      ['[bułka] z masłem', 'trzymać [kciuki]', 'głodny jak [wilk]'],
      fillItems, SENT, 'sentence',
      tip(l('Uwaga', 'Увага: kciuki, а не кулаки', 'Внимание: kciuki, а не кулачки'),
        l('Po polsku trzymamy kciuki (duże palce), a po ukraińsku — кулаки.', 'Українською «тримаємо кулаки», а польською — [kciuki] (великі пальці)!', 'По-русски «держим кулачки», а по-польски — [kciuki] (большие пальцы)!'))),
    bossLv([...fzItems, ...fillItems],
      l('Boss: wielki spektakl', 'Бос: велика вистава', 'Босс: большой спектакль'),
      l('Wszystkie powiedzonka naraz!', 'Усі вислови разом!', 'Все выражения вместе!'),
      l('Co pasuje?', 'Що підходить?', 'Что подходит?'))
  ]
}
