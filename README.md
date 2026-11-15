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
  i18n/{pl,uk,ru}.ts        тексти інтерфейсу
  pages/
    index.vue               лендінг
    polski/index.vue        вибір класу польської
    polski/klasa/[grade].vue  теми класу за розділами
    angielski.vue           «незабаром»
    kontakt.vue
  components/
    demo/OuGame.vue         міні-гра «ó czy u?» (зразок майбутніх уроків)
    Mascot.vue              маскот Słówko
server/routes/              sitemap.xml, robots.txt
```

Розділи польської (як у підручнику): **Nauka o języku**, **Ortografia**, **Literatura i kultura**, **Mówienie i pisanie**.

Тема стає клікабельною, коли в `curriculum.ts` у неї `ready: true` (сторінки уроків — наступний крок).

## Запуск

```bash
npm install
npm run dev   # http://localhost:3001
```
