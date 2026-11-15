import type { L } from '~/types/content'
import type { Exercise, Item, Level } from './types'
import { boss, by, l, level, word } from './litery'

/* ================================================================
   CZ / Ć  — i inne miękkie: ś, ź, ń, dź; sz / ś
   ================================================================ */
const ccHints: Record<string, L> = {
  softC: l(
    'Przed spółgłoską i na końcu słowa piszemy ć (z kreską).',
    'Перед приголосною і в кінці слова пишемо ć (з рискою).',
    'Перед согласной и в конце слова пишем ć (с чёрточкой).'
  ),
  softCi: l(
    'Przed samogłoską piszemy ci — bez kreski, z literą i.',
    'Перед голосною пишемо ci — без риски, з літерою i.',
    'Перед гласной пишем ci — без чёрточки, с буквой i.'
  ),
  softK: l(
    'Przed spółgłoską i na końcu — kreska: ś, ź, ń, dź.',
    'Перед приголосною і в кінці — риска: ś, ź, ń, dź.',
    'Перед согласной и в конце — чёрточка: ś, ź, ń, dź.'
  ),
  softI: l(
    'Przed samogłoską — litera i: si, zi, ni, dzi.',
    'Перед голосною — літера i: si, zi, ni, dzi.',
    'Перед гласной — буква i: si, zi, ni, dzi.'
  ),
  cz: l(
    'Twarde cz — jak ukraińskie „ч”: час → czas.',
    'Тверде cz — як українське «ч»: час → czas.',
    'Твёрдое cz — как русское «ч»: час → czas.'
  ),
  cTi: l(
    'Miękkie ć na końcu czasownika: pisać, robić — jak ukraińskie -ти.',
    'М’яке ć у кінці дієслова: pisać = писати (-ти → -ć).',
    'Мягкое ć в конце глагола: pisać = писать (-ть → -ć).'
  ),
  sz: l(
    'Twarde sz — jak ukraińskie „ш”: школа → szkoła.',
    'Тверде sz — як українське «ш»: школа → szkoła.',
    'Твёрдое sz — как русское «ш»: школа → szkoła.'
  ),
  endSz: l(
    'Teraz: ty … — czasownik kończy się na -sz: piszesz, masz, robisz.',
    'Теперішній час: ty (ти) … — дієслово закінчується на -sz: piszesz — ти пишеш (-ш → -sz).',
    'Настоящее время: ty (ты) … — глагол заканчивается на -sz: piszesz — ты пишешь (-шь → -sz).'
  ),
  jestes: l(
    'Wyjątek: ty jesteś — na końcu ś!',
    'Виняток: ty jesteś (ти є) — у кінці ś!',
    'Исключение: ty jesteś (ты есть) — в конце ś!'
  ),
  past: l(
    'Przeszłość: ty byłeś, ty zrobiłaś — na końcu -ś.',
    'Минулий час: ty byłeś (ти був), ty zrobiłaś (ти зробила) — у кінці -ś.',
    'Прошедшее время: ty byłeś (ты был), ty zrobiłaś (ты сделала) — в конце -ś.'
  ),
  sSoft: l(
    'Miękkie ś — jak miękkie „сь”: сніг → śnieg, світ → świat.',
    'М’яке ś — як м’яке «сь»: сніг → śnieg, світ → świat.',
    'Мягкое ś — как мягкое «сь»: снег → śnieg, свет → świat.'
  )
}
const cc = (spec: string, opts: string[], rule: string, uk: string, ru: string, proof?: string) => word(ccHints, spec, opts, rule, uk, ru, proof)
const CCI = ['ć', 'ci']

export const ccItems: Item[] = [
  /* ć / ci */
  cc('by(ć)', CCI, 'softC', 'бути', 'быть'),
  cc('pi(ć)', CCI, 'softC', 'пити', 'пить'),
  cc('koś(ć)', CCI, 'softC', 'кістка', 'кость'),
  cc('(ć)ma', CCI, 'softC', 'нічний метелик', 'мотылёк'),
  cc('(ć)wiczenie', CCI, 'softC', 'вправа', 'упражнение'),
  cc('pię(ć)', CCI, 'softC', 'п’ять', 'пять'),
  cc('(ci)asto', CCI, 'softCi', 'пиріг', 'пирог'),
  cc('(ci)ocia', CCI, 'softCi', 'тітка', 'тётя'),
  cc('(ci)epło', CCI, 'softCi', 'тепло', 'тепло'),
  cc('(ci)emno', CCI, 'softCi', 'темно', 'темно'),
  cc('ś(ci)ana', CCI, 'softCi', 'стіна', 'стена'),
  /* ś ź ń dź */
  cc('(ś)nieg', ['ś', 'si'], 'softK', 'сніг', 'снег'),
  cc('(si)ostra', ['ś', 'si'], 'softI', 'сестра', 'сестра'),
  cc('je(ś)li', ['ś', 'si'], 'softK', 'якщо', 'если'),
  cc('(si)edem', ['ś', 'si'], 'softI', 'сім', 'семь'),
  cc('(ź)le', ['ź', 'zi'], 'softK', 'погано', 'плохо'),
  cc('(zi)ma', ['ź', 'zi'], 'softI', 'зима', 'зима'),
  cc('ko(ń)', ['ń', 'ni'], 'softK', 'кінь', 'конь'),
  cc('ko(ni)e', ['ń', 'ni'], 'softI', 'коні', 'кони'),
  cc('sło(ń)ce', ['ń', 'ni'], 'softK', 'сонце', 'солнце'),
  cc('(ni)ebo', ['ń', 'ni'], 'softI', 'небо', 'небо'),
  cc('(dź)więk', ['dź', 'dzi'], 'softK', 'звук', 'звук'),
  cc('(dzi)eci', ['dź', 'dzi'], 'softI', 'діти', 'дети'),
  cc('łabę(dź)', ['dź', 'dzi'], 'softK', 'лебідь', 'лебедь'),
  cc('(dzi)eń', ['dź', 'dzi'], 'softI', 'день', 'день'),
  /* cz / ć */
  cc('(cz)as', ['cz', 'ć'], 'cz', 'час', 'время (час)'),
  cc('(cz)arny', ['cz', 'ć'], 'cz', 'чорний', 'чёрный'),
  cc('(cz)łowiek', ['cz', 'ć'], 'cz', 'людина (чоловік)', 'человек'),
  cc('(cz)tery', ['cz', 'ć'], 'cz', 'чотири', 'четыре'),
  cc('(cz)ekolada', ['cz', 'ć'], 'cz', 'шоколад', 'шоколад'),
  cc('u(cz)eń', ['cz', 'ć'], 'cz', 'учень', 'ученик'),
  cc('o(cz)y', ['cz', 'ć'], 'cz', 'очі', 'глаза (очи)'),
  cc('pisa(ć)', ['cz', 'ć'], 'cTi', 'писати', 'писать'),
  cc('robi(ć)', ['cz', 'ć'], 'cTi', 'робити', 'делать'),
  cc('mie(ć)', ['cz', 'ć'], 'cTi', 'мати', 'иметь'),
  cc('czyta(ć)', ['cz', 'ć'], 'cTi', 'читати', 'читать'),
  /* sz / ś */
  cc('(sz)koła', ['sz', 'ś'], 'sz', 'школа', 'школа'),
  cc('(sz)afa', ['sz', 'ś'], 'sz', 'шафа', 'шкаф'),
  cc('(sz)ary', ['sz', 'ś'], 'sz', 'сірий', 'серый'),
  cc('u(sz)y', ['sz', 'ś'], 'sz', 'вуха', 'уши'),
  cc('(sz)częście', ['sz', 'ś'], 'sz', 'щастя', 'счастье'),
  cc('(ś)wiat', ['sz', 'ś'], 'sSoft', 'світ', 'мир (свет)'),
  cc('(ś)miech', ['sz', 'ś'], 'sSoft', 'сміх', 'смех'),
  cc('(ś)limak', ['sz', 'ś'], 'sSoft', 'равлик', 'улитка'),
  cc('je(ś)ć', ['sz', 'ś'], 'sSoft', 'їсти', 'есть'),
  cc('sze(ś)ć', ['sz', 'ś'], 'sSoft', 'шість', 'шесть'),
  /* ty -sz / -ś */
  cc('ty pisze(sz)', ['sz', 'ś'], 'endSz', 'ти пишеш', 'ты пишешь'),
  cc('ty czyta(sz)', ['sz', 'ś'], 'endSz', 'ти читаєш', 'ты читаешь'),
  cc('ty ma(sz)', ['sz', 'ś'], 'endSz', 'ти маєш', 'у тебя есть'),
  cc('ty robi(sz)', ['sz', 'ś'], 'endSz', 'ти робиш', 'ты делаешь'),
  cc('ty mówi(sz)', ['sz', 'ś'], 'endSz', 'ти говориш', 'ты говоришь'),
  cc('ty idzie(sz)', ['sz', 'ś'], 'endSz', 'ти йдеш', 'ты идёшь'),
  cc('ty jeste(ś)', ['sz', 'ś'], 'jestes', 'ти є', 'ты есть'),
  cc('ty byłe(ś)', ['sz', 'ś'], 'past', 'ти був', 'ты был'),
  cc('ty była(ś)', ['sz', 'ś'], 'past', 'ти була', 'ты была'),
  cc('ty zrobiłe(ś)', ['sz', 'ś'], 'past', 'ти зробив', 'ты сделал'),
  cc('ty pisała(ś)', ['sz', 'ś'], 'past', 'ти писала', 'ты писала'),
  cc('gdzie byłe(ś)?', ['sz', 'ś'], 'past', 'де ти був?', 'где ты был?')
]

export const ccExercise: Exercise = {
  slug: 'cz-c',
  group: 'litery',
  icon: 'ć',
  color: 'var(--g4)',
  soft: 'var(--g4-soft)',
  title: l('Ć, ci, cz, sz, ś', 'Ć, ci, cz, sz, ś', 'Ć, ci, cz, sz, ś'),
  lead: l(
    'Miękkie ć, ś, ź, ń, dź i twarde cz, sz. Kreska czy i? Twardo czy miękko? I końcówki: ty piszesz, ty byłeś.',
    'М’які ć, ś, ź, ń, dź і тверді cz, sz. Риска чи i? Твердо чи м’яко? І закінчення: ty piszesz, ty byłeś.',
    'Мягкие ć, ś, ź, ń, dź и твёрдые cz, sz. Чёрточка или i? Твёрдо или мягко? И окончания: ty piszesz, ty byłeś.'
  ),
  badge: l('Mistrz miękkich', 'Майстер м’яких', 'Мастер мягких'),
  levels: [
    level('ci', 'ć/ci',
      l('Ć czy ci?', 'Ć чи ci?', 'Ć или ci?'),
      l(
        'Przed spółgłoską i na końcu słowa piszemy ć. Przed samogłoską — ci.',
        'Перед приголосною і в кінці слова пишемо ć. Перед голосною — ci.',
        'Перед согласной и в конце слова пишем ć. Перед гласной — ci.'
      ),
      ['by[ć]', '[ć]ma', '[ci]asto', '[ci]ocia'],
      by(ccItems, 'softC', 'softCi').filter(i => i.opts[0] === 'ć' && i.opts[1] === 'ci')),
    level('soft', 'ś/si',
      l('Ś, ź, ń, dź — ta sama zasada', 'Ś, ź, ń, dź — те саме правило', 'Ś, ź, ń, dź — то же правило'),
      l(
        'Kreska przed spółgłoską i na końcu (koń, śnieg). Przed samogłoską — i (konie, siostra).',
        'Риска перед приголосною і в кінці (koń, śnieg). Перед голосною — i (konie, siostra).',
        'Чёрточка перед согласной и в конце (koń, śnieg). Перед гласной — i (konie, siostra).'
      ),
      ['ko[ń] → ko[ni]e', '[ś]nieg', '[si]ostra', '[zi]ma'],
      by(ccItems, 'softK', 'softI'), [], {}, 7),
    level('czc', 'cz≠ć',
      l('Cz czy ć? Twardo czy miękko', 'Cz чи ć? Твердо чи м’яко', 'Cz или ć? Твёрдо или мягко'),
      l(
        'Cz brzmi twardo, jak ukraińskie „ч”. Ć brzmi miękko — często na końcu czasowników: pisać, robić.',
        'Cz звучить твердо, як українське «ч». Ć — м’яко, часто в кінці дієслів: pisać, robić.',
        'Cz звучит твёрдо, как русское «ч». Ć — мягко, часто в конце глаголов: pisać, robić.'
      ),
      ['[cz]as', '[cz]tery', 'pisa[ć]', 'robi[ć]'],
      by(ccItems, 'cz', 'cTi'), [], {
        tip: {
          title: l('Sztuczka', 'Хитрість: ч і -ти', 'Хитрость: ч и -ть'),
          text: l(
            'Ukraińskie „ч” to cz. A -ти na końcu czasownika to -ć.',
            'Українське «ч» — це cz (час → czas). А -ти в кінці дієслова — це -ć (писати → pisać).',
            'Русское «ч» — это cz (час → czas). А -ть в конце глагола — это -ć (писать → pisać).'
          ),
          examples: ['чотири → [cz]tery', 'писати → pisa[ć]', 'читати → czyta[ć]']
        }
      }),
    level('szs', 'sz≠ś',
      l('Sz czy ś?', 'Sz чи ś?', 'Sz или ś?'),
      l(
        'Sz brzmi twardo, jak „ш”. Ś brzmi miękko, jak „сь”.',
        'Sz звучить твердо, як «ш». Ś — м’яко, як «сь».',
        'Sz звучит твёрдо, как «ш». Ś — мягко, как «сь».'
      ),
      ['[sz]koła', 'u[sz]y', '[ś]nieg', 'sze[ś]ć'],
      by(ccItems, 'sz', 'sSoft')),
    level('tysz', 'ty -sz',
      l('Ty piszesz, ale ty byłeś', 'Ty piszesz, але ty byłeś', 'Ty piszesz, но ty byłeś'),
      l(
        'Teraz: ty piszesz, ty masz — na końcu -sz. Wyjątek: ty jesteś. Przeszłość: ty byłeś, ty zrobiłaś — na końcu -ś.',
        'Тепер: ty piszesz, ty masz — у кінці -sz. Виняток: ty jesteś. Минуле: ty byłeś, ty zrobiłaś — у кінці -ś.',
        'Сейчас: ty piszesz, ty masz — в конце -sz. Исключение: ty jesteś. Прошлое: ty byłeś, ty zrobiłaś — в конце -ś.'
      ),
      ['ty pisze[sz]', 'ty ma[sz]', 'ty jeste[ś]', 'ty byłe[ś]'],
      by(ccItems, 'endSz', 'jestes', 'past'), [], {
        tip: {
          title: l('Sztuczka', 'Хитрість: -ш → -sz', 'Хитрость: -шь → -sz'),
          text: l(
            'Ukraińskie „ти пишеш” — na końcu „ш”. Po polsku też: piszesz.',
            'Українське «ти пиш[еш]» — у кінці «ш». Польською теж -[sz]: pisze[sz]!',
            'Русское «ты пиш[ешь]» — в конце «шь». По-польски -[sz]: pisze[sz]!'
          ),
          examples: ['пишеш → pisze[sz]', 'маєш → ma[sz]', 'ти був → byłe[ś]']
        }
      }, 7),
    boss('boss', ccItems)
  ]
}

/* ================================================================
   Ę / Ą
   ================================================================ */
const eaHints: Record<string, L> = {
  verbJa: l(
    'Ja… — czasownik kończy się na -ę: idę, piszę, robię.',
    'Ja (я)… — дієслово закінчується на -ę: idę — я йду.',
    'Ja (я)… — глагол заканчивается на -ę: idę — я иду.'
  ),
  verbOni: l(
    'Oni… — czasownik kończy się na -ą: idą, piszą, robią.',
    'Oni (вони)… — дієслово закінчується на -ą: idą — вони йдуть.',
    'Oni (они)… — глагол заканчивается на -ą: idą — они идут.'
  ),
  altAE: l(
    'Ą i ę wymieniają się: ząb → zęby, ręka → rączka.',
    'Ą та ę чергуються: ząb → zęby, ręka → rączka.',
    'Ą и ę чередуются: ząb → zęby, ręka → rączka.'
  ),
  uU: l(
    'Ukraińskie „у” to często polskie ą: зуб → ząb, дуб → dąb.',
    'Українське «у» — це часто польське ą: зуб → ząb, дуб → dąb.',
    'Русское «у» — это часто польское ą: зуб → ząb, дуб → dąb.'
  ),
  uJa: l(
    'Ukraińskie „я” to często polskie ę: п’ять → pięć, м’ясо → mięso.',
    'Українське «я» — це часто польське ę: п’ять → pięć, м’ясо → mięso.',
    'Русское «я» — это часто польское ę: пять → pięć, мясо → mięso.'
  ),
  native: l(
    'To polskie słowo — piszemy ę albo ą.',
    'Це польське слово — пишемо ę або ą.',
    'Это польское слово — пишем ę или ą.'
  ),
  foreign: l(
    'To słowo z innego języka — piszemy en, em, on, om.',
    'Це слово з іншої мови — пишемо en, em, on, om.',
    'Это слово из другого языка — пишем en, em, on, om.'
  )
}
const ea = (spec: string, opts: string[], rule: string, uk: string, ru: string, proof?: string) => word(eaHints, spec, opts, rule, uk, ru, proof)
const AE = ['ą', 'ę']

export const eaItems: Item[] = [
  /* ja -ę / oni -ą */
  ea('ja id(ę)', ['ę', 'e', 'em'], 'verbJa', 'я йду', 'я иду'),
  ea('ja pisz(ę)', ['ę', 'e', 'em'], 'verbJa', 'я пишу', 'я пишу'),
  ea('ja robi(ę)', ['ę', 'e', 'em'], 'verbJa', 'я роблю', 'я делаю'),
  ea('ja mówi(ę)', ['ę', 'e', 'em'], 'verbJa', 'я кажу', 'я говорю'),
  ea('ja nios(ę)', ['ę', 'e', 'em'], 'verbJa', 'я несу', 'я несу'),
  ea('oni id(ą)', ['ą', 'o', 'om'], 'verbOni', 'вони йдуть', 'они идут'),
  ea('oni pisz(ą)', ['ą', 'o', 'om'], 'verbOni', 'вони пишуть', 'они пишут'),
  ea('oni robi(ą)', ['ą', 'o', 'om'], 'verbOni', 'вони роблять', 'они делают'),
  ea('oni czytaj(ą)', ['ą', 'o', 'om'], 'verbOni', 'вони читають', 'они читают'),
  ea('oni śpiewaj(ą)', ['ą', 'o', 'om'], 'verbOni', 'вони співають', 'они поют'),
  /* wymiana ą ↔ ę */
  ea('z(ą)b', AE, 'altAE', 'зуб', 'зуб', 'ząb → zęby'),
  ea('z(ę)by', AE, 'altAE', 'зуби', 'зубы', 'zęby → ząb'),
  ea('d(ą)b', AE, 'altAE', 'дуб', 'дуб', 'dąb → dęby'),
  ea('r(ę)ka', AE, 'altAE', 'рука', 'рука', 'ręka → rączka'),
  ea('r(ą)czka', AE, 'altAE', 'ручка', 'ручка', 'rączka → ręka'),
  ea('w(ą)ż', AE, 'altAE', 'змія (вуж)', 'змея (уж)', 'wąż → węże'),
  ea('ksi(ą)żka', AE, 'altAE', 'книжка', 'книга', 'książka → księga'),
  ea('ksi(ę)ga', AE, 'altAE', 'книга', 'книга', 'księga → książka'),
  /* у → ą, я → ę */
  ea('m(ą)ka', AE, 'uU', 'борошно (мука)', 'мука'),
  ea('s(ą)d', AE, 'uU', 'суд', 'суд'),
  ea('kr(ą)g', AE, 'uU', 'круг', 'круг'),
  ea('m(ą)ż', AE, 'uU', 'чоловік (муж)', 'муж'),
  ea('pi(ę)ć', AE, 'uJa', 'п’ять', 'пять'),
  ea('mi(ę)so', AE, 'uJa', 'м’ясо', 'мясо'),
  ea('pami(ę)ć', AE, 'uJa', 'пам’ять', 'память'),
  ea('j(ę)zyk', AE, 'uJa', 'язик (мова)', 'язык'),
  ea('świ(ę)ty', AE, 'uJa', 'святий', 'святой'),
  /* ę/ą czy en/on */
  ea('r(ę)ka', ['ę', 'en'], 'native', 'рука', 'рука'),
  ea('m(ą)ka', ['ą', 'on'], 'native', 'борошно', 'мука'),
  ea('g(ę)ś', ['ę', 'en'], 'native', 'гуска', 'гусь'),
  ea('pi(ę)kny', ['ę', 'en'], 'native', 'гарний', 'красивый'),
  ea('w(ą)s', ['ą', 'on'], 'native', 'вус', 'ус'),
  ea('t(em)po', ['ę', 'em'], 'foreign', 'темп', 'темп'),
  ea('k(on)to', ['ą', 'on'], 'foreign', 'рахунок', 'счёт'),
  ea('c(en)trum', ['ę', 'en'], 'foreign', 'центр', 'центр'),
  ea('p(om)pa', ['ą', 'om'], 'foreign', 'насос', 'насос'),
  ea('r(on)do', ['ą', 'on'], 'foreign', 'кільце (дорожнє)', 'круговое движение'),
  ea('k(om)pot', ['ą', 'om'], 'foreign', 'компот', 'компот'),
  ea('t(em)peratura', ['ę', 'em'], 'foreign', 'температура', 'температура')
]

/* -ę / -ą w przypadkach — zdania */
const caseHint = {
  B: l(
    'Kogo? co? (biernik) — rodzaj żeński kończy się na -ę: widzę mamę.',
    'Кого? що? (знахідний) — жіночий рід закінчується на -ę: widzę mamę.',
    'Кого? что? (винительный) — женский род заканчивается на -ę: widzę mamę.'
  ),
  N: l(
    'Z kim? z czym? (narzędnik) — końcówka -ą: idę z mamą.',
    'З ким? з чим? (орудний) — закінчення -ą: idę z mamą.',
    'С кем? с чем? (творительный) — окончание -ą: idę z mamą.'
  )
}
function cs(pre: string, ans: string, post: string, opts: string[], c: 'B' | 'N', uk: string, ru: string): Item {
  return { pre, post, opts, answer: opts.indexOf(ans), hint: caseHint[c], tr: { uk, ru }, tag: c }
}
const caseItems: Item[] = [
  cs('Widzę mam', 'ę', '.', ['ę', 'e', 'ą'], 'B', 'Я бачу маму.', 'Я вижу маму.'),
  cs('Kocham babci', 'ę', '.', ['ę', 'e', 'ą'], 'B', 'Я люблю бабусю.', 'Я люблю бабушку.'),
  cs('Czytam książk', 'ę', '.', ['ę', 'e', 'ą'], 'B', 'Я читаю книжку.', 'Я читаю книгу.'),
  cs('Jem zup', 'ę', '.', ['ę', 'e', 'ą'], 'B', 'Я їм суп.', 'Я ем суп.'),
  cs('Idę z mam', 'ą', '.', ['ą', 'o', 'ę'], 'N', 'Я йду з мамою.', 'Я иду с мамой.'),
  cs('Rozmawiam z babci', 'ą', '.', ['ą', 'o', 'ę'], 'N', 'Я розмовляю з бабусею.', 'Я разговариваю с бабушкой.'),
  cs('Piszę kred', 'ą', '.', ['ą', 'o', 'ę'], 'N', 'Я пишу крейдою.', 'Я пишу мелом.'),
  cs('Bawię się z siostr', 'ą', '.', ['ą', 'o', 'ę'], 'N', 'Я граюся з сестрою.', 'Я играю с сестрой.')
]

const casesLevel: Level = {
  id: 'cases',
  icon: '-ę -ą',
  title: l('-ę i -ą w przypadkach', '-ę та -ą у відмінках', '-ę и -ą в падежах'),
  rule: l(
    'Kogo? co? — mamę (-ę). Z kim? z czym? — z mamą (-ą).',
    'Кого? що? — mamę (-ę). З ким? з чим? — z mamą (-ą).',
    'Кого? что? — mamę (-ę). С кем? с чем? — z mamą (-ą).'
  ),
  examples: ['Widzę mam[ę].', 'Idę z mam[ą].'],
  game: { id: 'cases', prompt: l('Która końcówka pasuje?', 'Яке закінчення підходить?', 'Какое окончание подходит?'), size: 'sentence', items: caseItems, round: 6 }
}

export const eaExercise: Exercise = {
  slug: 'e-a',
  group: 'litery',
  icon: 'ę',
  color: 'var(--g1)',
  soft: 'var(--g1-soft)',
  title: l('Ę i ą', 'Ę та ą', 'Ę и ą'),
  lead: l(
    'Litery z ogonkiem! Kiedy piszemy ę i ą, a kiedy en, on?',
    'Літери з хвостиком! Коли пишемо ę та ą, а коли en, on?',
    'Буквы с хвостиком! Когда пишем ę и ą, а когда en, on?'
  ),
  badge: l('Mistrz ogonków', 'Майстер хвостиків', 'Мастер хвостиков'),
  levels: [
    level('verbs', 'ja -ę',
      l('Ja -ę, oni -ą', 'Ja -ę, oni -ą', 'Ja -ę, oni -ą'),
      l(
        'Ja idę, ja piszę — na końcu -ę. Oni idą, oni piszą — na końcu -ą.',
        'Ja idę (я йду) — у кінці -ę. Oni idą (вони йдуть) — у кінці -ą.',
        'Ja idę (я иду) — в конце -ę. Oni idą (они идут) — в конце -ą.'
      ),
      ['ja id[ę]', 'ja pisz[ę]', 'oni id[ą]', 'oni pisz[ą]'],
      by(eaItems, 'verbJa', 'verbOni')),
    casesLevel,
    level('alt', 'ą↔ę',
      l('Ą zmienia się w ę', 'Ą змінюється на ę', 'Ą меняется на ę'),
      l(
        'W jednej rodzinie słów ą i ę się wymieniają: ząb → zęby, ręka → rączka.',
        'В одній родині слів ą та ę чергуються: ząb → zęby, ręka → rączka.',
        'В одной семье слов ą и ę чередуются: ząb → zęby, ręka → rączka.'
      ),
      ['z[ą]b → z[ę]by', 'r[ę]ka → r[ą]czka', 'd[ą]b → d[ę]by'],
      by(eaItems, 'altAE')),
    level('trick', 'у=ą',
      l('Sztuczka: у → ą, я → ę', 'Хитрість: у → ą, я → ę', 'Хитрость: у → ą, я → ę'),
      l(
        'Ukraińskie „у” to często ą (зуб → ząb). Ukraińskie „я” to często ę (п’ять → pięć).',
        'Українське «у» — часто ą (зуб → ząb). Українське «я» — часто ę (п’ять → pięć).',
        'Русское «у» — часто ą (зуб → ząb). Русское «я» — часто ę (пять → pięć).'
      ),
      ['дуб → d[ą]b', 'суд → s[ą]d', 'п’ять → pi[ę]ć', 'м’ясо → mi[ę]so'],
      by(eaItems, 'uU', 'uJa')),
    level('en', 'en/ę',
      l('Ę czy en? Ą czy on?', 'Ę чи en? Ą чи on?', 'Ę или en? Ą или on?'),
      l(
        'W polskich słowach — ę i ą (ręka, mąka). W słowach z innych języków — en, em, on, om (tempo, konto).',
        'У польських словах — ę та ą (ręka, mąka). У словах з інших мов — en, em, on, om (tempo, konto).',
        'В польских словах — ę и ą (ręka, mąka). В словах из других языков — en, em, on, om (tempo, konto).'
      ),
      ['r[ę]ka', 'm[ą]ka', 't[em]po', 'k[on]to'],
      by(eaItems, 'native', 'foreign')),
    boss('boss', eaItems)
  ]
}
