import type { L } from '~/types/content'

/**
 * Język polski, klasy 4–8 — plan tematów.
 * Działy jak w podręcznikach „Słowa z uśmiechem” (WSiP): nauka o języku, ortografia,
 * literatura i kultura, a także mówienie i pisanie (formy wypowiedzi).
 * Treści lekcji są nasze — piszemy je od zera według podstawy programowej.
 *
 * ready: true — lekcja gotowa i klikalna. Reszta pokazuje się jako „w przygotowaniu”.
 */

export type SectionId = 'jezyk' | 'ortografia' | 'literatura' | 'pisanie'

export const sections: { id: SectionId; color: string; soft: string; icon: string; title: L; text: L }[] = [
  {
    id: 'jezyk', color: 'var(--g5)', soft: 'var(--g5-soft)', icon: 'Aa',
    title: { pl: 'Nauka o języku', uk: 'Граматика', ru: 'Грамматика' },
    text: {
      pl: 'Części mowy, odmiana, zdania — jak działa polski.',
      uk: 'Частини мови, відмінювання, речення — як працює польська.',
      ru: 'Части речи, склонение, предложения — как устроен польский.'
    }
  },
  {
    id: 'ortografia', color: 'var(--g2)', soft: 'var(--g2-soft)', icon: 'ó',
    title: { pl: 'Ortografia', uk: 'Правопис', ru: 'Орфография' },
    text: {
      pl: 'Ó czy u, rz czy ż, ch czy h — z regułami i sztuczkami.',
      uk: 'Ó чи u, rz чи ż, ch чи h — з правилами й хитрощами.',
      ru: 'Ó или u, rz или ż, ch или h — с правилами и хитростями.'
    }
  },
  {
    id: 'literatura', color: 'var(--g6)', soft: 'var(--g6-soft)', icon: '📖',
    title: { pl: 'Literatura i kultura', uk: 'Література', ru: 'Литература' },
    text: {
      pl: 'Wiersze, baśnie, mity i lektury — co czytamy i jak o tym mówić.',
      uk: 'Вірші, казки, міфи й шкільні книжки — що читаємо і як про це говорити.',
      ru: 'Стихи, сказки, мифы и школьные книги — что читаем и как об этом говорить.'
    }
  },
  {
    id: 'pisanie', color: 'var(--g3)', soft: 'var(--g3-soft)', icon: '✎',
    title: { pl: 'Mówienie i pisanie', uk: 'Письмо й мовлення', ru: 'Письмо и речь' },
    text: {
      pl: 'List, opis, zaproszenie, opowiadanie — krok po kroku, ze wzorem.',
      uk: 'Лист, опис, запрошення, оповідання — крок за кроком, зі зразком.',
      ru: 'Письмо, описание, приглашение, рассказ — шаг за шагом, с образцом.'
    }
  }
]

export interface Topic {
  slug: string
  section: SectionId
  title: L
  ready?: boolean
}

export interface PlGrade {
  n: number
  color: string
  soft: string
  title: L
  tagline: L
}

export const plGrades: PlGrade[] = [
  {
    n: 4, color: 'var(--g4)', soft: 'var(--g4-soft)',
    title: { pl: 'Części mowy i pierwsze reguły', uk: 'Частини мови й перші правила', ru: 'Части речи и первые правила' },
    tagline: {
      pl: 'Rzeczownik, czasownik, przymiotnik, ó i rz, wiersz i baśń.',
      uk: 'Іменник, дієслово, прикметник, ó та rz, вірш і казка.',
      ru: 'Существительное, глагол, прилагательное, ó и rz, стих и сказка.'
    }
  },
  {
    n: 5, color: 'var(--g5)', soft: 'var(--g5-soft)',
    title: { pl: 'Odmiana i mity', uk: 'Відмінювання і міфи', ru: 'Склонение и мифы' },
    tagline: {
      pl: 'Przypadki, czasy, zaimki, mity greckie i opis postaci.',
      uk: 'Відмінки, часи, займенники, грецькі міфи й опис персонажа.',
      ru: 'Падежи, времена, местоимения, греческие мифы и описание героя.'
    }
  },
  {
    n: 6, color: 'var(--g6)', soft: 'var(--g6-soft)',
    title: { pl: 'Części zdania', uk: 'Члени речення', ru: 'Члены предложения' },
    tagline: {
      pl: 'Przydawka, dopełnienie, okolicznik, tryby i rodzaje literackie.',
      uk: 'Означення, додаток, обставина, способи дієслова й роди літератури.',
      ru: 'Определение, дополнение, обстоятельство, наклонения и роды литературы.'
    }
  },
  {
    n: 7, color: 'var(--g7)', soft: 'var(--g7-soft)',
    title: { pl: 'Imiesłowy i ballady', uk: 'Дієприкметники й балади', ru: 'Причастия и баллады' },
    tagline: {
      pl: 'Słowotwórstwo, zdania podrzędne, ballada, charakterystyka postaci.',
      uk: 'Будова слова, складнопідрядні речення, балада, характеристика персонажа.',
      ru: 'Состав слова, сложноподчинённые предложения, баллада, характеристика героя.'
    }
  },
  {
    n: 8, color: 'var(--g8)', soft: 'var(--g8-soft)',
    title: { pl: 'Egzamin ósmoklasisty', uk: 'Іспит восьмикласника', ru: 'Экзамен восьмиклассника' },
    tagline: {
      pl: 'Zdania złożone, frazeologia, lektury i rozprawka na egzamin.',
      uk: 'Складні речення, фразеологія, шкільні книжки й твір-міркування до іспиту.',
      ru: 'Сложные предложения, фразеология, школьные книги и сочинение к экзамену.'
    }
  }
]

const t = (slug: string, section: SectionId, pl: string, uk: string, ru: string, ready = false): Topic =>
  ({ slug, section, title: { pl, uk, ru }, ready })

export const plTopics: Record<number, Topic[]> = {
  4: [
    t('glosk-litery-sylaby', 'jezyk', 'Głoski, litery i sylaby', 'Звуки, літери і склади', 'Звуки, буквы и слоги'),
    t('alfabet', 'jezyk', 'Alfabet i kolejność alfabetyczna', 'Алфавіт і абетковий порядок', 'Алфавит и алфавитный порядок'),
    t('rzeczownik', 'jezyk', 'Rzeczownik', 'Іменник', 'Существительное'),
    t('czasownik', 'jezyk', 'Czasownik', 'Дієслово', 'Глагол'),
    t('przymiotnik', 'jezyk', 'Przymiotnik', 'Прикметник', 'Прилагательное'),
    t('przyslowek', 'jezyk', 'Przysłówek', 'Прислівник', 'Наречие'),
    t('liczebnik', 'jezyk', 'Liczebnik', 'Числівник', 'Числительное'),
    t('zdanie-rownowaznik', 'jezyk', 'Zdanie i równoważnik zdania', 'Речення і речення без дієслова', 'Предложение и предложение без глагола'),
    t('podmiot-orzeczenie', 'jezyk', 'Podmiot i orzeczenie', 'Підмет і присудок', 'Подлежащее и сказуемое'),
    t('o-u', 'ortografia', 'Ó czy u?', 'Ó чи u?', 'Ó или u?'),
    t('rz-z', 'ortografia', 'Rz czy ż?', 'Rz чи ż?', 'Rz или ż?'),
    t('ch-h', 'ortografia', 'Ch czy h?', 'Ch чи h?', 'Ch или h?'),
    t('wielka-litera', 'ortografia', 'Wielka litera', 'Велика літера', 'Заглавная буква'),
    t('nie-z-czasownikami', 'ortografia', '„Nie” z czasownikami', '«Nie» з дієсловами', '«Nie» с глаголами'),
    t('wiersz', 'literatura', 'Wiersz: wers, strofa, rym', 'Вірш: рядок, строфа, рима', 'Стихотворение: строка, строфа, рифма'),
    t('basn-legenda', 'literatura', 'Baśń i legenda', 'Казка і легенда', 'Сказка и легенда'),
    t('swiat-przedstawiony', 'literatura', 'Bohater, miejsce i czas akcji', 'Герой, місце і час дії', 'Герой, место и время действия'),
    t('komiks', 'literatura', 'Komiks', 'Комікс', 'Комикс'),
    t('zaproszenie-ogloszenie', 'pisanie', 'Zaproszenie i ogłoszenie', 'Запрошення та оголошення', 'Приглашение и объявление'),
    t('list', 'pisanie', 'List', 'Лист', 'Письмо'),
    t('opis-przedmiotu', 'pisanie', 'Opis przedmiotu', 'Опис предмета', 'Описание предмета'),
    t('dialog', 'pisanie', 'Dialog i myślnik', 'Діалог і тире', 'Диалог и тире')
  ],
  5: [
    t('przypadki', 'jezyk', 'Przypadki rzeczownika', 'Відмінки іменника', 'Падежи существительного'),
    t('czasy-czasownika', 'jezyk', 'Czas, osoba i liczba czasownika', 'Час, особа і число дієслова', 'Время, лицо и число глагола'),
    t('stopniowanie', 'jezyk', 'Stopniowanie przymiotnika', 'Ступені порівняння прикметника', 'Степени сравнения прилагательного'),
    t('zaimek', 'jezyk', 'Zaimek', 'Займенник', 'Местоимение'),
    t('przyimek-spojnik', 'jezyk', 'Przyimek i spójnik', 'Прийменник і сполучник', 'Предлог и союз'),
    t('zdanie-zlozone', 'jezyk', 'Zdanie pojedyncze i złożone', 'Просте і складне речення', 'Простое и сложное предложение'),
    t('nie-z-przymiotnikami', 'ortografia', '„Nie” z przymiotnikami', '«Nie» з прикметниками', '«Nie» с прилагательными'),
    t('przecinek', 'ortografia', 'Przecinek w zdaniu', 'Кома в реченні', 'Запятая в предложении'),
    t('skroty', 'ortografia', 'Skróty i skrótowce', 'Скорочення та абревіатури', 'Сокращения и аббревиатуры'),
    t('mity', 'literatura', 'Mity greckie', 'Грецькі міфи', 'Греческие мифы'),
    t('porownanie-przenosnia', 'literatura', 'Porównanie i przenośnia', 'Порівняння і метафора', 'Сравнение и метафора'),
    t('bajka', 'literatura', 'Bajka i morał', 'Байка і мораль', 'Басня и мораль'),
    t('opis-postaci', 'pisanie', 'Opis postaci', 'Опис персонажа', 'Описание персонажа'),
    t('plan-wydarzen', 'pisanie', 'Plan wydarzeń', 'План подій', 'План событий'),
    t('opowiadanie', 'pisanie', 'Opowiadanie twórcze', 'Власне оповідання', 'Собственный рассказ')
  ],
  6: [
    t('czesci-zdania', 'jezyk', 'Przydawka, dopełnienie, okolicznik', 'Означення, додаток, обставина', 'Определение, дополнение, обстоятельство'),
    t('tryby', 'jezyk', 'Tryby czasownika', 'Способи дієслова', 'Наклонения глагола'),
    t('strona-czynna-bierna', 'jezyk', 'Strona czynna i bierna', 'Активний і пасивний стан', 'Действительный и страдательный залог'),
    t('wypowiedzenia', 'jezyk', 'Zdania złożone współrzędnie', 'Складносурядні речення', 'Сложносочинённые предложения'),
    t('koncowki', 'ortografia', 'Końcówki -ą, -ę, -om', 'Закінчення -ą, -ę, -om', 'Окончания -ą, -ę, -om'),
    t('nie-z-czesciami-mowy', 'ortografia', '„Nie” z różnymi częściami mowy', '«Nie» з різними частинами мови', '«Nie» с разными частями речи'),
    t('rodzaje-literackie', 'literatura', 'Liryka, epika, dramat', 'Лірика, епос, драма', 'Лирика, эпос, драма'),
    t('srodki-stylistyczne', 'literatura', 'Epitet, uosobienie, wyraz dźwiękonaśladowczy', 'Епітет, уособлення, звуконаслідування', 'Эпитет, олицетворение, звукоподражание'),
    t('opis-krajobrazu', 'pisanie', 'Opis krajobrazu', 'Опис пейзажу', 'Описание пейзажа'),
    t('sprawozdanie', 'pisanie', 'Sprawozdanie', 'Звіт про подію', 'Отчёт о событии')
  ],
  7: [
    t('slowotworstwo', 'jezyk', 'Słowotwórstwo: rdzeń, przedrostek, przyrostek', 'Будова слова: корінь, префікс, суфікс', 'Состав слова: корень, приставка, суффикс'),
    t('imieslowy', 'jezyk', 'Imiesłowy', 'Дієприкметники й дієприслівники', 'Причастия и деепричастия'),
    t('zdania-podrzedne', 'jezyk', 'Zdania złożone podrzędnie', 'Складнопідрядні речення', 'Сложноподчинённые предложения'),
    t('nie-z-imieslowami', 'ortografia', '„Nie” z imiesłowami', '«Nie» з дієприкметниками', '«Nie» с причастиями'),
    t('ballada', 'literatura', 'Ballada', 'Балада', 'Баллада'),
    t('fraszka-tren', 'literatura', 'Fraszka i tren', 'Фрашка і трен', 'Фрашка и трен'),
    t('komedia', 'literatura', 'Komedia', 'Комедія', 'Комедия'),
    t('charakterystyka', 'pisanie', 'Charakterystyka postaci', 'Характеристика персонажа', 'Характеристика героя'),
    t('rozprawka', 'pisanie', 'Rozprawka', 'Твір-міркування', 'Сочинение-рассуждение')
  ],
  8: [
    t('zdania-wielokrotnie-zlozone', 'jezyk', 'Zdania wielokrotnie złożone', 'Багатокомпонентні складні речення', 'Сложные предложения с несколькими частями'),
    t('mowa-zalezna', 'jezyk', 'Mowa zależna i niezależna', 'Непряма і пряма мова', 'Косвенная и прямая речь'),
    t('frazeologizmy', 'jezyk', 'Frazeologizmy', 'Фразеологізми', 'Фразеологизмы'),
    t('interpunkcja-8', 'ortografia', 'Interpunkcja w zdaniu złożonym', 'Розділові знаки в складному реченні', 'Знаки препинания в сложном предложении'),
    t('epopeja', 'literatura', 'Epopeja', 'Епопея', 'Эпопея'),
    t('lektury-egzamin', 'literatura', 'Lektury obowiązkowe na egzamin', 'Обов’язкові твори до іспиту', 'Обязательные книги к экзамену'),
    t('przemowienie', 'pisanie', 'Przemówienie', 'Промова', 'Речь (выступление)'),
    t('rozprawka-egzamin', 'pisanie', 'Rozprawka na egzaminie', 'Твір-міркування на іспиті', 'Сочинение-рассуждение на экзамене')
  ]
}

export const plGrade = (n: number) => plGrades.find(g => g.n === n)
