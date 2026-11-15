<script setup lang="ts">
import { NuxtLink } from '#components'
import { LANGS } from '~/i18n'
import { SITE } from '~/data/site'
import { subjects } from '~/data/subjects'

const { t, tl, tm, lang } = useT()
const lp = useLocalePath()
const { focus } = useSettings()

usePageSeo({
  title: () => t('home.metaTitle'),
  description: () => t('seo.home'),
  jsonLd: origin => ({
    '@type': 'WebSite',
    name: SITE.name,
    url: origin + lp('/'),
    description: t('seo.home'),
    publisher: { '@type': 'Organization', name: SITE.name, url: origin, email: SITE.email, logo: origin + '/icon-512.png' }
  })
})

const stepStyle = [
  { color: 'var(--g1-soft)', icon: 'eye' },
  { color: 'var(--pl-soft)', icon: 'hand' },
  { color: 'var(--g3-soft)', icon: 'star' }
]
const steps = computed(() =>
  tm<{ title: string; text: string }[]>('home.steps').map((s, i) => ({ ...s, n: i + 1, ...stepStyle[i]! }))
)

const adhdIcons = ['one', 'focus', 'clear', 'hint', 'sound', 'time'] as const
const adhd = computed(() =>
  tm<{ title: string; text: string }[]>('home.adhd').map((s, i) => ({ ...s, icon: adhdIcons[i]! }))
)

// у демо-словничку показуємо мову користувача (або українську, якщо обрана польська)
const glossLang = computed(() => (lang.value === 'pl' ? 'uk' : lang.value))
const glossary = computed(() =>
  tm<{ pl: string }[]>('glossary').map((g, i) => ({ pl: g.pl, tr: tl(glossLang.value, `glossary.${i}.tr`) }))
)

/** Para słów do sztuczki „ó ↔ і / о” */
const trick = [
  { pl: 'stół', uk: 'стіл', ru: 'стол' },
  { pl: 'lód', uk: 'лід', ru: 'лёд' },
  { pl: 'róg', uk: 'ріг', ru: 'рог' }
]
</script>

<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__copy">
          <div class="hero__chips">
            <span class="chip hero__chip"><span class="dot" /> {{ t('home.chipFree') }}</span>
            <span class="chip hero__chip hero__chip--adhd">{{ t('home.chipAdhd') }}</span>
          </div>
          <h1 class="hero__title">
            {{ t('home.title1') }}<br>
            {{ t('home.title2') }}
            <span class="scribble">
              {{ t('home.title3') }}
              <svg viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 16 C 50 4, 110 22, 216 8" fill="none" stroke="var(--pl)" stroke-width="7" stroke-linecap="round" />
              </svg>
            </span>.
          </h1>
          <p class="hero__lead">{{ t('home.lead') }}</p>
          <div class="hero__cta">
            <NuxtLink :to="lp('/polski')" class="btn btn--primary btn--lg">{{ t('home.ctaStart') }} <span aria-hidden="true">→</span></NuxtLink>
            <NuxtLink :to="lp('/#sprobuj')" class="btn btn--lg">{{ t('home.ctaDemo') }}</NuxtLink>
          </div>
          <ul class="hero__facts">
            <li><b>4–8</b> {{ t('home.factGrades') }}</li>
            <li><b>0 zł</b> {{ t('home.factFree') }}</li>
            <li><b>{{ t('home.factMin') }}</b> {{ t('home.factLesson') }}</li>
            <li><b>3</b> {{ t('home.factLangs') }}</li>
          </ul>
        </div>

        <div class="hero__art" aria-hidden="true">
          <div class="hero__blob" />
          <div class="hero__mascot">
            <Mascot :size="290" wave />
          </div>
          <div class="deco">
            <span class="tile t1" style="--r:-12deg">ą</span>
            <span class="tile t2" style="--r:10deg">ó</span>
            <span class="tile t3" style="--r:-6deg">rz</span>
            <span class="tile t4" style="--r:8deg">ż</span>
            <span class="tile t5" style="--r:-4deg">ę</span>
            <span class="bubble b1" style="--r:6deg" lang="pl">Cześć!</span>
            <span class="bubble b2" style="--r:-8deg" lang="en">Hi!</span>
            <span class="bubble b3" style="--r:4deg" lang="uk">Привіт!</span>
          </div>
        </div>
      </div>

      <div class="marquee deco" aria-hidden="true">
        <div class="marquee__track" lang="pl">
          <span v-for="i in 2" :key="i">{{ t('home.marquee') }}</span>
        </div>
      </div>
    </section>

    <!-- ================= SUBJECTS ================= -->
    <section id="przedmioty" class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">{{ t('home.subjectsEyebrow') }}</span>
          <h2 class="section-title">{{ t('home.subjectsTitle') }}</h2>
          <p class="head__lead">{{ t('home.subjectsLead') }}</p>
        </div>

        <div class="subjects">
          <component
            :is="s.available ? NuxtLink : 'div'"
            v-for="s in subjects"
            :key="s.id"
            :to="s.available ? lp(s.path) : undefined"
            class="subj"
            :class="{ 'subj--soon': !s.available }"
            :style="{ '--c': s.color, '--soft': s.soft }"
          >
            <div class="subj__top">
              <span class="subj__flag" aria-hidden="true">{{ s.id === 'polski' ? 'Ąę' : 'Aa' }}</span>
              <span v-if="s.available" class="chip subj__live">● {{ t('common.available') }}</span>
              <span v-else class="chip">{{ t('common.soon') }}</span>
            </div>
            <div class="subj__body">
              <span class="subj__label">{{ t(`subjects.${s.id}.label`) }}</span>
              <h3>{{ t(`subjects.${s.id}.name`) }}</h3>
              <p>{{ t(`subjects.${s.id}.text`) }}</p>
              <span v-if="s.id === 'polski'" class="chip subj__book">📘 {{ t('home.bookChip') }}</span>
            </div>
            <div class="subj__art deco" aria-hidden="true">
              <Mascot :color="s.color" :size="130" :mood="s.available ? 'happy' : 'think'" />
            </div>
            <div class="subj__foot">
              <span v-if="s.available" class="btn btn--sm subj__cta">{{ t(`subjects.${s.id}.cta`) }} →</span>
              <NuxtLink v-else :to="lp(s.path)" class="subj__more">{{ t('english.notify') }} →</NuxtLink>
            </div>
          </component>
        </div>
      </div>
    </section>

    <!-- ================= DEMO ================= -->
    <section id="sprobuj" class="section demo-sec">
      <div class="container demo-sec__inner">
        <div class="demo-sec__copy">
          <span class="eyebrow">{{ t('home.demoEyebrow') }}</span>
          <h2 class="section-title" lang="pl">{{ t('home.demoTitle') }}</h2>
          <p class="head__lead">{{ t('home.demoLead') }}</p>

          <div class="trick">
            <h3>💡 {{ t('home.trickTitle') }}</h3>
            <p>{{ t('home.trickText') }}</p>
            <table class="trick__table">
              <thead>
                <tr><th>PL</th><th>UA</th><th>RU</th></tr>
              </thead>
              <tbody>
                <tr v-for="w in trick" :key="w.pl">
                  <td lang="pl" v-html="w.pl.replace('ó', '<mark>ó</mark>')" />
                  <td lang="uk" v-html="w.uk.replace('і', '<mark>і</mark>')" />
                  <td lang="ru" v-html="w.ru.replace(/[оё]/, m => `<mark>${m}</mark>`)" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ClientOnly>
          <DemoOuGame />
          <template #fallback>
            <div class="game-ph sticker" />
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- ================= ADHD ================= -->
    <section id="adhd" class="section adhd">
      <div class="container adhd__inner">
        <div class="adhd__copy">
          <span class="eyebrow">{{ t('home.adhdEyebrow') }}</span>
          <h2 class="section-title">{{ t('home.adhdTitle') }}</h2>
          <p class="head__lead">{{ t('home.adhdLead') }}</p>
          <button
            type="button"
            class="btn btn--lg"
            :class="focus ? 'btn--focus-on' : 'btn--ink'"
            :aria-pressed="focus"
            @click="focus = !focus"
          >
            <span class="toggle" :class="{ on: focus }" aria-hidden="true"><i /></span>
            {{ focus ? t('settings.focusOn') : t('home.adhdBtn') }}
          </button>
        </div>

        <ul class="adhd__grid">
          <li v-for="f in adhd" :key="f.icon" class="adhd__item">
            <svg class="adhd__icon" viewBox="0 0 48 48" aria-hidden="true">
              <g stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
                <template v-if="f.icon === 'one'">
                  <rect x="5" y="5" width="16" height="16" rx="4" stroke-dasharray="3 4" opacity=".4" />
                  <rect x="27" y="5" width="16" height="16" rx="4" stroke-dasharray="3 4" opacity=".4" />
                  <rect x="5" y="27" width="16" height="16" rx="4" stroke-dasharray="3 4" opacity=".4" />
                  <rect x="25" y="25" width="20" height="20" rx="5" fill="var(--g1)" />
                </template>
                <template v-else-if="f.icon === 'focus'">
                  <circle cx="24" cy="24" r="19" fill="var(--white)" />
                  <circle cx="24" cy="24" r="11" fill="var(--g5-soft)" />
                  <circle cx="24" cy="24" r="4" fill="var(--g5)" />
                </template>
                <template v-else-if="f.icon === 'clear'">
                  <path d="M6 8 H42 V32 H22 L12 41 V32 H6 Z" fill="var(--white)" />
                  <path d="M24 13 V22" stroke-width="4" />
                  <circle cx="24" cy="27.5" r="2" fill="var(--ink)" stroke="none" />
                </template>
                <template v-else-if="f.icon === 'hint'">
                  <path d="M24 5 a13 13 0 0 1 8 23 V33 H16 V28 A13 13 0 0 1 24 5Z" fill="var(--g1)" />
                  <path d="M17 39 H31 M20 44 H28" />
                </template>
                <template v-else-if="f.icon === 'sound'">
                  <path d="M8 18 H16 L27 9 V39 L16 30 H8 Z" fill="var(--pl)" />
                  <path d="M33 17 Q37 24 33 31 M38 12 Q45 24 38 36" />
                </template>
                <template v-else>
                  <circle cx="24" cy="24" r="19" fill="var(--white)" />
                  <path d="M24 12 V24 L32 29" stroke-width="3.5" />
                </template>
              </g>
            </svg>
            <div>
              <h3>{{ f.title }}</h3>
              <p>{{ f.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ================= LANGUAGES ================= -->
    <section class="section">
      <div class="container langs">
        <div class="langs__copy">
          <span class="eyebrow">{{ t('home.langEyebrow') }}</span>
          <h2 class="section-title">{{ t('home.langTitle') }}</h2>
          <p class="head__lead">{{ t('home.langLead') }}</p>
        </div>

        <div class="demo sticker">
          <span class="demo__label">{{ t('home.langDemoLabel') }}</span>
          <ul class="demo__rows">
            <li v-for="l in LANGS" :key="l.code" class="demo__row" :class="{ current: l.code === lang }" :lang="l.code">
              <span class="demo__badge" :class="`demo__badge--${l.code}`">{{ l.label }}</span>
              <span class="demo__text">{{ tl(l.code, 'home.demoTask') }}</span>
            </li>
          </ul>
          <p class="demo__sentence" lang="pl">Mały <u>kot</u> śpi na <u>kanapie</u>.</p>
          <span class="demo__label">{{ t('home.langGlossary') }}</span>
          <div class="demo__gloss">
            <span v-for="g in glossary" :key="g.pl" class="gloss">
              <b lang="pl">{{ g.pl }}</b>
              <span :lang="glossLang">{{ g.tr }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= HOW ================= -->
    <section id="jak-to-dziala" class="section how">
      <div class="container">
        <div class="head head--center">
          <span class="eyebrow">{{ t('home.howEyebrow') }}</span>
          <h2 class="section-title">{{ t('home.howTitle') }}</h2>
        </div>
        <ol class="how__grid">
          <li v-for="s in steps" :key="s.n" class="how__card sticker" :style="{ background: s.color }">
            <span class="how__n">{{ s.n }}</span>
            <svg class="how__icon" viewBox="0 0 64 64" aria-hidden="true">
              <g stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
                <template v-if="s.icon === 'eye'">
                  <path d="M4 32 C 16 12, 48 12, 60 32 C 48 52, 16 52, 4 32Z" fill="var(--white)" />
                  <circle cx="32" cy="32" r="10" fill="var(--en)" />
                  <circle cx="35" cy="29" r="3" fill="var(--white)" stroke="none" />
                </template>
                <template v-else-if="s.icon === 'hand'">
                  <rect x="6" y="14" width="24" height="30" rx="6" fill="var(--white)" />
                  <rect x="34" y="14" width="24" height="30" rx="6" fill="var(--pl)" />
                  <text x="18" y="36" font-size="18" font-weight="700" text-anchor="middle" fill="var(--ink)" stroke="none" font-family="Fredoka, sans-serif">u</text>
                  <text x="46" y="36" font-size="18" font-weight="700" text-anchor="middle" fill="var(--white)" stroke="none" font-family="Fredoka, sans-serif">ó</text>
                  <path d="M40 50 l6 6 l10 -12" stroke-width="4" />
                </template>
                <template v-else>
                  <path d="M32 6 L39 24 L58 25 L43 37 L48 56 L32 45 L16 56 L21 37 L6 25 L25 24Z" fill="var(--g1)" />
                </template>
              </g>
            </svg>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= PARENTS ================= -->
    <section id="dla-rodzicow" class="section">
      <div class="container">
        <div class="parents">
          <div class="parents__copy">
            <span class="eyebrow eyebrow--light">{{ t('home.parentsEyebrow') }}</span>
            <h2 class="section-title">{{ t('home.parentsTitle') }}</h2>
            <p>{{ t('home.parentsText') }}</p>
          </div>
          <ul class="parents__list">
            <li v-for="item in tm<string[]>('home.parentsList')" :key="item"><span class="check">✓</span> {{ item }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- hero ---------- */
.hero { position: relative; padding-top: 56px; overflow: hidden; }
.hero__inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 40px;
  padding-bottom: 72px;
}
.hero__copy { display: grid; gap: 26px; justify-items: start; }
.hero__chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hero__chip { font-size: 15px; padding: 7px 14px; }
.hero__chip--adhd { background: var(--g5-soft); }
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 3px var(--green-soft); }
.hero__title { font-size: clamp(42px, 6.4vw, 80px); font-weight: 700; letter-spacing: -0.025em; }
.scribble { position: relative; display: inline-block; white-space: nowrap; }
.scribble svg { position: absolute; left: -2%; bottom: -6px; width: 104%; height: 22px; }
.hero__lead { font-size: 21px; color: var(--ink-soft); max-width: 36ch; }
.hero__cta { display: flex; flex-wrap: wrap; gap: 14px; }
.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  padding: 0;
  margin: 6px 0 0;
  list-style: none;
  color: var(--ink-soft);
  font-size: 16px;
}
.hero__facts b { display: block; font-family: var(--font-display); font-size: 28px; color: var(--ink); line-height: 1.1; }

.hero__art { position: relative; height: 480px; }
.hero__blob {
  position: absolute;
  inset: 30px 20px 20px 30px;
  background: var(--pl-soft);
  border: var(--border);
  border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%;
  box-shadow: var(--shadow-lg);
  animation: morph 12s ease-in-out infinite;
}
.hero__mascot { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -44%); }
.tile {
  position: absolute;
  display: grid;
  place-items: center;
  width: 74px;
  height: 74px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 40px;
  background: var(--white);
  border: var(--border);
  border-radius: 22px;
  box-shadow: var(--shadow);
  animation: float 4s ease-in-out infinite;
}
.t1 { top: 14px; left: 26px; background: var(--g1-soft); }
.t2 { top: 70px; right: 10px; animation-delay: .5s; background: var(--pl); color: var(--white); }
.t3 { bottom: 70px; left: 0; animation-delay: 1s; }
.t4 { bottom: 6px; left: 42%; animation-delay: 1.5s; background: var(--g3-soft); }
.t5 { bottom: 96px; right: 0; animation-delay: 2s; background: var(--en-soft); }
.bubble {
  position: absolute;
  padding: 8px 16px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 20px;
  background: var(--white);
  border: var(--border);
  border-radius: 18px 18px 18px 4px;
  box-shadow: var(--shadow-sm);
  animation: float 5s ease-in-out infinite;
}
.b1 { top: 0; left: 40%; animation-delay: .8s; }
.b2 { top: 40%; left: -2%; animation-delay: 1.8s; background: var(--en); color: var(--white); }
.b3 { top: 30%; right: -4%; animation-delay: 2.6s; background: var(--g1); }

@keyframes morph {
  0%, 100% { border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%; }
  50% { border-radius: 56% 44% 52% 48% / 44% 56% 44% 56%; }
}

.marquee {
  overflow: hidden;
  background: var(--ink);
  color: var(--paper);
  border-block: var(--border);
  transform: rotate(-1.5deg);
  margin-inline: -20px;
}
.marquee__track {
  display: flex;
  width: max-content;
  padding-block: 14px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  white-space: nowrap;
  animation: marquee 36s linear infinite;
}
.marquee__track span { padding-right: 12px; }
@keyframes marquee { to { transform: translateX(-50%); } }

/* ---------- sections ---------- */
.head { display: grid; gap: 8px; margin-bottom: 44px; max-width: 640px; }
.head--center { text-align: center; justify-items: center; margin-inline: auto; }
.head__lead { color: var(--ink-soft); font-size: 19px; }

/* ---------- subjects ---------- */
.subjects { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; }
.subj {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 340px;
  padding: 26px;
  background: var(--soft);
  border: var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform .2s var(--ease-bounce), box-shadow .2s ease;
}
a.subj:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-lg); }
.subj--soon { background: var(--white); border-style: dashed; box-shadow: none; }
.subj__top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.subj__flag {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  color: var(--white);
  background: var(--c);
  border: var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}
.subj__live { background: var(--white); }
.subj__body { position: relative; z-index: 1; display: grid; gap: 8px; justify-items: start; max-width: 68%; }
.subj__label { font-family: var(--font-display); font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-soft); }
.subj h3 { font-size: clamp(32px, 4vw, 44px); }
.subj p { color: var(--ink-soft); }
.subj__book { margin-top: 6px; background: var(--white); }
.subj__art { position: absolute; right: 18px; bottom: 60px; }
.subj--soon .subj__art { opacity: .55; }
.subj__foot { margin-top: auto; position: relative; z-index: 1; }
.subj__cta { pointer-events: none; }
.subj__more { font-family: var(--font-display); font-weight: 600; color: var(--en); text-decoration: underline; text-underline-offset: 4px; }

/* ---------- demo ---------- */
.demo-sec { background: var(--g1-soft); border-block: var(--border); }
.demo-sec__inner { display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: center; }
.demo-sec__copy { display: grid; gap: 14px; justify-items: start; }
.trick {
  display: grid;
  gap: 8px;
  width: 100%;
  margin-top: 10px;
  padding: 20px;
  background: var(--white);
  border: var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}
.trick h3 { font-size: 22px; }
.trick p { color: var(--ink-soft); }
.trick__table { width: 100%; border-collapse: separate; border-spacing: 0 6px; font-family: var(--font-display); font-size: 22px; text-align: center; }
.trick__table th { font-size: 12px; letter-spacing: .08em; color: var(--muted); }
.trick__table td { padding: 6px 4px; background: var(--paper); }
.trick__table td:first-child { border-radius: 12px 0 0 12px; }
.trick__table td:last-child { border-radius: 0 12px 12px 0; }
.trick__table :deep(mark) { padding: 0 3px; background: var(--g1); border-radius: 6px; }
.game-ph { min-height: 440px; border-radius: var(--radius-lg); }

/* ---------- ADHD ---------- */
.adhd { background: var(--g5-soft); border-bottom: var(--border); }
.adhd__inner { display: grid; grid-template-columns: 1fr 1.25fr; gap: 56px; align-items: center; }
.adhd__copy { display: grid; gap: 14px; justify-items: start; }
.adhd__copy .btn { margin-top: 12px; }
.btn--focus-on { --btn-bg: var(--g5); color: var(--white); }
.toggle { position: relative; width: 44px; height: 26px; background: color-mix(in srgb, var(--white) 25%, transparent); border: 2px solid currentColor; border-radius: 99px; }
.toggle i { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; background: currentColor; border-radius: 50%; transition: transform .25s var(--ease-bounce); }
.toggle.on i { transform: translateX(18px); }
.adhd__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 0; margin: 0; list-style: none; }
.adhd__item { display: flex; gap: 14px; align-items: flex-start; padding: 18px; background: var(--white); border: var(--border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.adhd__icon { flex: none; width: 48px; height: 48px; }
.adhd__item h3 { font-size: 19px; margin-bottom: 4px; }
.adhd__item p { font-size: 15px; color: var(--ink-soft); line-height: 1.4; }

/* ---------- languages ---------- */
.langs { display: grid; grid-template-columns: 1fr 1.15fr; gap: 56px; align-items: center; }
.langs__copy { display: grid; gap: 14px; }
.demo { display: grid; gap: 14px; padding: 26px; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); }
.demo__label { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
.demo__rows { display: grid; gap: 10px; padding: 0; margin: 0; list-style: none; }
.demo__row { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--paper); border: 2px solid color-mix(in srgb, var(--ink) 12%, transparent); border-radius: 16px; font-size: 16px; line-height: 1.35; }
.demo__row.current { background: var(--g1-soft); border-color: var(--ink); }
.demo__text { flex: 1; }
.demo__badge { flex: none; min-width: 46px; padding: 3px 8px; font-family: var(--font-display); font-weight: 700; font-size: 13px; text-align: center; color: var(--white); border-radius: 8px; }
.demo__badge--pl { background: #dc143c; }
.demo__badge--uk { background: #1f5fbf; }
.demo__badge--ru { background: var(--ink-soft); }
.demo__sentence { padding: 12px 16px; font-family: var(--font-display); font-size: 26px; text-align: center; background: var(--white); border: 2px dashed var(--ink-soft); border-radius: 16px; }
.demo__sentence u { text-decoration-color: var(--pl); text-decoration-thickness: 4px; text-underline-offset: 6px; }
.demo__gloss { display: flex; flex-wrap: wrap; gap: 8px; }
.gloss { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; font-size: 15px; background: var(--white); border: 2px solid var(--ink); border-radius: 999px; }
.gloss b { font-family: var(--font-display); font-weight: 600; }
.gloss span { color: var(--ink-soft); }
.gloss span::before { content: '→ '; color: var(--muted); }

/* ---------- how ---------- */
.how__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 0; margin: 0; list-style: none; }
.how__card { position: relative; display: grid; gap: 10px; padding: 30px 26px; border-radius: var(--radius-lg); }
.how__card:nth-child(1) { transform: rotate(-1deg); }
.how__card:nth-child(2) { transform: translateY(24px) rotate(1deg); }
.how__n { position: absolute; top: -18px; right: 22px; display: grid; place-items: center; width: 44px; height: 44px; font-family: var(--font-display); font-weight: 700; font-size: 22px; background: var(--ink); color: var(--white); border-radius: 50%; }
.how__icon { width: 64px; height: 64px; margin-bottom: 6px; }
.how__card h3 { font-size: 28px; }
.how__card p { color: var(--ink-soft); }

/* ---------- parents ---------- */
.parents { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; padding: clamp(32px, 5vw, 64px); background: var(--ink); color: var(--paper); border-radius: 40px; box-shadow: 10px 10px 0 var(--pl); }
.parents__copy { display: grid; gap: 14px; }
.parents__copy p { color: color-mix(in srgb, var(--paper) 78%, transparent); font-size: 19px; }
.eyebrow--light { color: var(--g1); }
.parents__list { display: grid; gap: 14px; padding: 0; margin: 0; list-style: none; }
.parents__list li { display: flex; align-items: center; gap: 14px; padding: 16px 18px; font-family: var(--font-display); font-weight: 500; font-size: 19px; background: color-mix(in srgb, var(--paper) 8%, transparent); border: 2px solid color-mix(in srgb, var(--paper) 16%, transparent); border-radius: 18px; }
.check { display: grid; place-items: center; flex: none; width: 32px; height: 32px; background: var(--g3); color: var(--ink); font-weight: 800; border-radius: 50%; }

/* ---------- responsive ---------- */
@media (max-width: 960px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__art { height: 380px; max-width: 460px; width: 100%; margin-inline: auto; }
  .hero__mascot :deep(svg) { width: 220px; height: 220px; }
  .subjects { grid-template-columns: 1fr; }
  .demo-sec__inner, .adhd__inner, .langs { grid-template-columns: 1fr; gap: 32px; }
  .how__grid { grid-template-columns: 1fr; }
  .how__card:nth-child(n) { transform: none; }
  .parents { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .hero { padding-top: 28px; }
  .hero__lead { font-size: 18px; }
  .hero__facts { gap: 20px; }
  .tile { width: 58px; height: 58px; font-size: 30px; border-radius: 18px; }
  .bubble { font-size: 16px; padding: 6px 12px; }
  .subj__body { max-width: 100%; }
  .subj__art { display: none; }
  .adhd__grid { grid-template-columns: 1fr; }
}
</style>
