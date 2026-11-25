# ease.lang

Безкоштовна платформа для дітей: **польська мова** (зараз) і **англійська** (далі).
Продовження [ease.math](../ease.math) — та сама основа (Nuxt 4), той самий стиль «наліпок», режим фокусу для дітей з РДУГ.

## Мови інтерфейсу

- `pl` — основна, без префікса: `/polski/klasa/4`
- `uk` — `/uk/polski/klasa/4`
- `ru` — `/ru/polski/klasa/4`

Сам урок польською (як у школі), а правила й завдання можна прочитати українською чи російською.

## Структура

```
app/
  data/
    site.ts                 назва сайту, e-mail
    subjects.ts             предмети: polski (готово), angielski (незабаром)
    polski/curriculum.ts    4–8 класи → 4 розділи → теми (як у «Słowa z uśmiechem»)
    polski/cwiczenia/       вправи без класів: litery.ts (ó/u, rz/ż, ch/h, mix), przypadki.ts
  i18n/{pl,uk,ru}.ts        тексти інтерфейсу
  pages/
    index.vue               лендінг
    polski/index.vue        вибір класу польської
    polski/klasa/[grade].vue  теми класу за розділами
    polski/cwiczenia/       список → [slug]/index.vue (карта рівнів) → [slug]/[level].vue (рівень)
    angielski.vue           «незабаром»
    kontakt.vue
  components/
    drill/Game.vue          рушій гри: серія 🔥, XP, звук, помилки повертаються в кінець, клавіші 1–9 / Enter
    drill/Reveal.vue        приклад-відкриття (тап): 'st[ó]ł → st[o]ły'
    drill/Example.vue       статичний приклад з підсвіткою (шпаргалка)
    demo/OuGame.vue         міні-гра «ó czy u?» (зразок майбутніх уроків)
    Mascot.vue              маскот Słówko
server/routes/              sitemap.xml, robots.txt
```

Розділи польської (як у підручнику): **Nauka o języku**, **Ortografia**, **Literatura i kultura**, **Mówienie i pisanie**.

Тема стає клікабельною, коли в `curriculum.ts` у неї `ready: true` (сторінки уроків — наступний крок).

## Вправи: «Велика подорож Країною Польської» (гра)

Кожна тема — край зі звірятком-провідником, рівні — зупинки на дорозі, нагорода — печатка в паспорт мандрівника.

| Край | Провідник | Тема |
|---|---|---|
| Wyspa Ó | Jeż Józek 🦔 | ó / u |
| Żabie Bagno | Żaba Żaneta 🐸 | rz / ż |
| Chmurne Góry | Chomik Hubert 🐹 | ch / h |
| Czarodziejskie Jezioro | Kaczka Czesia 🦆 | ć/ci, ś ź ń dź, cz/ć, sz/ś |
| Złota Łąka | Wąż Mądrek 🐍 | ę / ą, en/on |
| Zamek Dyktanda | Sowa Bożena 🦉 | диктант-мікс усіх букв |
| Miasto Siedmiu Bram | Kot Kacper 🐱 | відмінки |
| Las Liczebników | Wiewiórka Zosia 🐿️ | числівники |
| Dolina Przymiotników | Kameleon Kamil 🦎 | прикметники |
| Rzeka Czasowników | Bóbr Bartek 🦫 | дієслова |
| Sawanna Wielkich Liter | Żyrafa Zuzia 🦒 | велика літера |
| Papuzia Wyspa | Papuga Pola 🦜 | займенники |
| Ogród Przysłówków | Ślimak Szymek 🐌 | прислівники |
| Domek Przyimków | Myszka Zuzia 🐭 | прийменники |
| Pajęcza Sieć | Pająk Piotruś 🕷️ | сполучники й кома |
| Mrowisko Zdań | Mrówka Marta 🐜 | речення, підмет/присудок, члени речення |
| Lisia Nora | Lis Leon 🦊 | іменник: рід, число, власні назви |
| Wesoły Kurnik | Kogut Kuba 🐓 | вигуки, звуконаслідування, частки, -by |
| Arena Części Mowy | Lew Leopold 🦁 | усі 10 частин мови, змінні/незмінні |
| Kopalnia Słów | Kret Kazik ⛏️ | словотвір: родини, зменшувальні, префікси, професії |
| Teatr Powiedzonek | Małpka Mia 🐒 | фразеологізми |

Зупинка: 💬 провідник розповідає правило кількома репліками (ключові букви **червоним**, `[ó]` у тексті) → 👆 приклади-відкриття → 🎮 гра (тваринка йде дорогою до 🏁 і реагує на відповіді) → 🎫 печатка, зірки, XP.
Пройдений край = значок + провідник стає другом у паспорті.

**Міні-ігри** (`components/drill/mode/`), однаковий контент — різна механіка; дитина може перемикати:
- 🦘 `Jump` — стрибай на камінь з правильною буквою (неправильний кришиться у воду);
- 🎈 `Balloons` — лопни правильну кульку;
- 🧺 `Catch` — лови падаючі букви кошиком: тап по букві — вона одразу летить у кошик і перевіряється (або ← →, свайп);
- 👆 `Tap` — звичайні кнопки (і для завдань з >5 варіантами).

Головна сторінка вправ — ілюстрована карта світу (`components/WorldMap.vue`): море, острови-краї зі звірятками, золота дорога пройденого, позначка «Ти тут», туманні острови «незабаром». На телефоні карта вертикальна.

Ігровий інтерфейс (`drill/Game.vue`): монетки летять у лічильник, серія 🔥, після 5 поспіль — режим ⚡ SUPER ×2.
Рівень відкривається в повноекранному layout `layouts/game.vue` (без меню сайту).
Літери правила (`marks` у `world.ts`) автоматично підсвічуються червоним у всіх текстах краю.

- `app/data/polski/cwiczenia/world.ts` — краї, привітання, **пояснення** (`explain`) до кожної зупинки;
- `litery.ts` (ó/u, rz/ż, ch/h), `litery2.ts` (cz/ć…, ę/ą), `dyktando.ts`, `przypadki.ts`, `liczebniki.ts`, `przymiotniki.ts`, `czasowniki.ts`, `zaimki.ts`, `przyslowki.ts`, `przyimki.ts`, `spojniki.ts`, `zdanie.ts`, `wielka.ts`, `rzeczownik.ts`, `partykuly.ts`, `czesci.ts`, `slowa.ts` (спільні помічники — `helpers.ts`) — правила, приклади, слова й речення;
- `components/Animal.vue` — звірятка (SVG, настрої: happy/joy/wow/think/sad);
- `components/WorldScene.vue` — небо, хмари, пагорби краю; `components/Rich.vue` — текст з червоними `[буквами]`.

Прогрес (зірки, XP, серія днів) — у cookie `el_progress`, `el_xp`, `el_days`; звук — `el_sound`.

## Запуск

```bash
npm install
npm run dev   # http://localhost:3001
```

## Деплой на Vercel

Проєкт готовий до Vercel без додаткових налаштувань (Nuxt визначається автоматично, пресет `vercel`).

1. Запушити репозиторій на GitHub (`origin` → github.com/PavelBabik/languages).
2. На vercel.com → **Add New… → Project** → імпортувати репозиторій.
   - Framework Preset: **Nuxt.js** (визначиться сам)
   - Build Command: `nuxt build` (за замовчуванням), Output — за замовчуванням
   - Node.js: 20 або 22
3. (Необов’язково) Settings → Environment Variables:
   - `NUXT_PUBLIC_SITE_URL` = `https://ваш-домен` — для canonical, hreflang, sitemap і robots.txt.
     Без неї адреса береться із запиту, тож усе працює й на `*.vercel.app`.
4. Кожен push у `main` → новий продакшн-деплой; інші гілки → preview-посилання.

Перевірити збірку локально:

```bash
NITRO_PRESET=vercel npm run build
```
