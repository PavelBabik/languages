<script setup lang="ts">
import { plGrades, plTopics, sections } from '~/data/polski/curriculum'

const { t, loc, locPl, showPl, plural } = useT()
const lp = useLocalePath()

usePageSeo({ title: () => t('polski.metaTitle'), description: () => t('seo.polski') })

const count = (n: number) => plTopics[n]?.length ?? 0
</script>

<template>
  <div class="pl">
    <section class="container pl__hero">
      <span class="chip pl__chip">{{ t('polski.chip') }}</span>
      <h1>{{ t('polski.title') }}</h1>
      <PlLine v-if="showPl" text="Język polski" />
      <p class="pl__lead">{{ t('polski.lead') }}</p>
    </section>

    <!-- ćwiczenia bez klas -->
    <section class="container">
      <NuxtLink :to="lp('/polski/cwiczenia')" class="cwb">
        <span class="cwb__tiles" aria-hidden="true"><i>ó</i><i>rz</i><i>ch</i><i>7</i></span>
        <span class="cwb__copy">
          <b>{{ t('polski.cwTitle') }}</b>
          <span>{{ t('polski.cwText') }}</span>
        </span>
        <span class="btn btn--primary btn--sm">{{ t('polski.cwBtn') }} →</span>
      </NuxtLink>
    </section>

    <!-- klasy -->
    <section class="container">
      <h2 class="pl__h2">{{ t('polski.gradesTitle') }}</h2>
      <div class="grades">
        <NuxtLink
          v-for="g in plGrades"
          :key="g.n"
          :to="lp(`/polski/klasa/${g.n}`)"
          class="gcard"
          :style="{ '--c': g.color, '--soft': g.soft }"
        >
          <span class="gcard__num">{{ g.n }}</span>
          <span class="gcard__label">{{ t('common.gradeN', { n: g.n }) }}</span>
          <h3>{{ loc(g.title) }}</h3>
          <PlLine v-if="showPl" :text="locPl(g.title)" />
          <p>{{ loc(g.tagline) }}</p>
          <span class="gcard__foot">
            <span class="chip">{{ plural('common.topics', count(g.n)) }}</span>
            <span class="gcard__go" aria-hidden="true">→</span>
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- działy -->
    <section class="container">
      <span class="eyebrow">{{ t('polski.sectionsEyebrow') }}</span>
      <h2 class="pl__h2">{{ t('polski.sectionsTitle') }}</h2>
      <ul class="secs">
        <li v-for="s in sections" :key="s.id" class="sec" :style="{ '--c': s.color, '--soft': s.soft }">
          <span class="sec__icon" aria-hidden="true">{{ s.icon }}</span>
          <div>
            <h3>{{ loc(s.title) }}</h3>
            <PlLine v-if="showPl" :text="locPl(s.title)" />
            <p>{{ loc(s.text) }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- podręcznik -->
    <section class="container">
      <div class="book">
        <span class="book__icon" aria-hidden="true">📘</span>
        <div class="book__copy">
          <h2>{{ t('polski.bookTitle') }}</h2>
          <p>{{ t('polski.bookText') }}</p>
          <small>{{ t('polski.bookNote') }}</small>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pl { display: grid; gap: 56px; padding-block: 48px 32px; }
.pl__hero { display: grid; justify-items: start; gap: 14px; }
.pl__chip { background: var(--pl-soft); }
.pl__hero h1 { font-size: clamp(44px, 7vw, 76px); font-weight: 700; }
.pl__lead { max-width: 58ch; font-size: 20px; color: var(--ink-soft); }
.pl__h2 { margin: 6px 0 24px; font-size: clamp(28px, 4vw, 40px); }

.grades { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr)); gap: 20px; }
.gcard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 22px;
  background: var(--soft);
  border: var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: transform .2s var(--ease-bounce), box-shadow .2s ease;
}
.gcard:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-lg); }
.gcard__num {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-bottom: 6px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 32px;
  color: var(--white);
  background: var(--c);
  border: var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}
.gcard__label { font-family: var(--font-display); font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-soft); }
.gcard h3 { font-size: 26px; }
.gcard p { color: var(--ink-soft); font-size: 16px; }
.gcard__foot { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: auto; padding-top: 10px; }
.gcard__go { display: grid; place-items: center; width: 40px; height: 40px; font-size: 20px; background: var(--white); border: 2px solid var(--ink); border-radius: 50%; transition: transform .2s var(--ease-bounce); }
.gcard:hover .gcard__go { transform: translateX(4px); }

.secs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; padding: 0; margin: 0; list-style: none; }
.sec { display: flex; gap: 16px; align-items: flex-start; padding: 20px; background: var(--white); border: var(--border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.sec__icon { flex: none; display: grid; place-items: center; width: 56px; height: 56px; font-family: var(--font-display); font-weight: 700; font-size: 24px; background: var(--soft); border: var(--border); border-radius: 16px; }
.sec h3 { font-size: 22px; }
.sec p { margin-top: 4px; color: var(--ink-soft); font-size: 16px; }

.book { display: flex; gap: 22px; align-items: flex-start; padding: clamp(22px, 4vw, 36px); background: var(--g1-soft); border: var(--border); border-radius: var(--radius-lg); }
.book__icon { font-size: 48px; line-height: 1; }
.book__copy { display: grid; gap: 10px; }
.book h2 { font-size: clamp(24px, 3.4vw, 32px); }
.book p { max-width: 70ch; color: var(--ink-soft); }
.book small { font-size: 14px; color: var(--muted); }

@media (max-width: 720px) {
  .secs { grid-template-columns: 1fr; }
  .book { flex-direction: column; }
}
.cwb { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 24px; padding: 22px 24px; background: var(--pl-soft); border: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow); transition: transform .2s var(--ease-bounce), box-shadow .2s ease; }
.cwb:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-lg); }
.cwb__tiles { display: flex; gap: 6px; }
.cwb__tiles i { display: grid; place-items: center; width: 46px; height: 46px; font-family: var(--font-display); font-style: normal; font-weight: 700; font-size: 22px; background: var(--white); border: 2px solid var(--ink); border-radius: 12px; }
.cwb__tiles i:nth-child(2n) { transform: rotate(-6deg); }
.cwb__copy { display: grid; gap: 4px; flex: 1; min-width: 220px; }
.cwb__copy b { font-family: var(--font-display); font-size: 24px; }
.cwb__copy span { color: var(--ink-soft); }
</style>
