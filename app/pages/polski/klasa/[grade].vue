<script setup lang="ts">
import { plGrade, plGrades, plTopics, sections } from '~/data/polski/curriculum'
import { mailto } from '~/data/site'

const route = useRoute()
const n = computed(() => Number(route.params.grade))
const grade = computed(() => plGrade(n.value))
if (!grade.value) throw createError({ statusCode: 404, statusMessage: 'Nie ma takiej klasy', fatal: true })

const { t, tpl, loc, locPl, showPl, plural } = useT()
const lp = useLocalePath()

usePageSeo({
  title: () => t('grade.metaTitle', { n: n.value, title: loc(grade.value!.title) }),
  description: () => t('seo.grade', { n: n.value, tagline: loc(grade.value!.tagline) })
})

const groups = computed(() =>
  sections
    .map(s => ({ ...s, topics: (plTopics[n.value] ?? []).filter(x => x.section === s.id) }))
    .filter(s => s.topics.length)
)
const total = computed(() => plTopics[n.value]?.length ?? 0)
</script>

<template>
  <div v-if="grade" class="gp" :style="{ '--c': grade.color, '--soft': grade.soft }">
    <section class="gp__hero">
      <div class="container gp__hero-inner">
        <NuxtLink :to="lp('/polski')" class="gp__back">← {{ t('grade.back') }}</NuxtLink>
        <div class="gp__title">
          <span class="gp__num">{{ grade.n }}</span>
          <div>
            <span class="gp__label">{{ t('nav.polish') }} · {{ t('common.gradeN', { n: grade.n }) }}</span>
            <h1>{{ loc(grade.title) }}</h1>
            <PlLine v-if="showPl" :text="locPl(grade.title)" />
          </div>
        </div>
        <p class="gp__lead">{{ loc(grade.tagline) }}</p>
        <span class="chip">{{ plural('common.topics', total) }}</span>
      </div>
    </section>

    <section class="container gp__body">
      <div v-for="s in groups" :key="s.id" class="grp" :style="{ '--sc': s.color, '--ss': s.soft }">
        <header class="grp__head">
          <span class="grp__icon" aria-hidden="true">{{ s.icon }}</span>
          <div>
            <h2>{{ loc(s.title) }}</h2>
            <PlLine v-if="showPl" :text="locPl(s.title)" />
          </div>
        </header>
        <ol class="topics">
          <li v-for="(tp, i) in s.topics" :key="tp.slug">
            <component
              :is="tp.ready ? 'a' : 'div'"
              class="topic"
              :class="{ 'topic--soon': !tp.ready }"
            >
              <span class="topic__n">{{ i + 1 }}</span>
              <span class="topic__text">
                <b lang="pl">{{ tp.title.pl }}</b>
                <small v-if="showPl">{{ loc(tp.title) }}</small>
              </span>
              <span v-if="!tp.ready" class="topic__soon">{{ t('common.inPrep') }}</span>
            </component>
          </li>
        </ol>
      </div>

      <aside class="soon">
        <Mascot :size="110" :color="grade.color" mood="think" class="deco" />
        <div>
          <h2>{{ t('grade.soonTitle') }}</h2>
          <p>{{ t('grade.soonText') }}</p>
        </div>
        <a :href="mailto(tpl('grade.mailTopic', { n: grade.n }))" class="btn btn--primary btn--sm">{{ t('grade.soonBtn') }}</a>
      </aside>

      <nav class="others" :aria-label="t('grade.otherGrades')">
        <span>{{ t('grade.otherGrades') }}:</span>
        <NuxtLink
          v-for="g in plGrades"
          :key="g.n"
          :to="lp(`/polski/klasa/${g.n}`)"
          class="others__g"
          :class="{ active: g.n === grade.n }"
          :style="{ '--c': g.color }"
          :aria-current="g.n === grade.n ? 'page' : undefined"
        >{{ g.n }}</NuxtLink>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.gp__hero { padding-block: 40px 44px; background: var(--soft); border-bottom: var(--border); }
.gp__hero-inner { display: grid; justify-items: start; gap: 16px; }
.gp__back { font-family: var(--font-display); font-weight: 600; color: var(--ink-soft); }
.gp__back:hover { color: var(--ink); }
.gp__title { display: flex; align-items: center; gap: 18px; }
.gp__num {
  flex: none;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  color: var(--white);
  background: var(--c);
  border: var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}
.gp__label { font-family: var(--font-display); font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-soft); }
.gp__title h1 { font-size: clamp(32px, 5vw, 52px); }
.gp__lead { max-width: 60ch; font-size: 19px; color: var(--ink-soft); }

.gp__body { display: grid; gap: 40px; padding-block: 44px 24px; }
.grp { display: grid; gap: 16px; }
.grp__head { display: flex; align-items: center; gap: 14px; }
.grp__icon { flex: none; display: grid; place-items: center; width: 52px; height: 52px; font-family: var(--font-display); font-weight: 700; font-size: 22px; background: var(--ss); border: var(--border); border-radius: 16px; }
.grp__head h2 { font-size: 28px; }

.topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 12px; padding: 0; margin: 0; list-style: none; }
.topic {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 100%;
  padding: 14px 16px;
  background: var(--white);
  border: var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}
a.topic:hover { background: var(--ss); }
.topic--soon { border-style: dashed; box-shadow: none; }
.topic__n { flex: none; display: grid; place-items: center; width: 36px; height: 36px; font-family: var(--font-display); font-weight: 700; background: var(--ss); border: 2px solid var(--ink); border-radius: 50%; }
.topic__text { display: grid; flex: 1; min-width: 0; line-height: 1.25; }
.topic__text b { font-family: var(--font-display); font-weight: 600; font-size: 18px; }
.topic__text small { margin-top: 2px; font-size: 14px; color: var(--ink-soft); }
.topic__soon { flex: none; padding: 3px 9px; font-size: 12px; font-weight: 800; color: var(--muted); background: var(--paper); border-radius: 99px; }

.soon { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 24px; padding: 24px; background: var(--g1-soft); border: var(--border); border-radius: var(--radius-lg); }
.soon > div { flex: 1; min-width: 220px; }
.soon h2 { font-size: 24px; }
.soon p { color: var(--ink-soft); }

.others { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-family: var(--font-display); font-weight: 600; color: var(--ink-soft); }
.others__g { display: grid; place-items: center; width: 44px; height: 44px; font-size: 20px; color: var(--ink); background: var(--white); border: 2px solid var(--ink); border-radius: 14px; }
.others__g:hover, .others__g.active { color: var(--white); background: var(--c); }

@media (max-width: 520px) {
  .gp__num { width: 64px; height: 64px; font-size: 36px; border-radius: 18px; }
  .gp__title { align-items: flex-start; }
}
</style>
