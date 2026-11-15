<script setup lang="ts">
import { exercise, exercises, levelStates } from '~/data/polski/cwiczenia'

const route = useRoute()
const ex = computed(() => exercise(String(route.params.slug)))
if (!ex.value) throw createError({ statusCode: 404, statusMessage: 'Nie ma takiego ćwiczenia', fatal: true })

const { t, lang, loc, showPl } = useT()
const lp = useLocalePath()
const { stars, xp, streak } = useProgress()
const sound = useSound()

usePageSeo({
  title: () => t('cw.oneMeta', { title: ex.value!.title.pl }),
  description: () => t('seo.cwOne', { title: loc(ex.value!.title) })
})

const st = computed(() => levelStates(ex.value!, stars.value))
const others = computed(() => exercises.filter(e => e.slug !== ex.value!.slug))
const href = (id: string) => lp(`/polski/cwiczenia/${ex.value!.slug}/${id}`)

/* zygzak ścieżki */
const OFF = [0, 1, 0, -1]
const shaking = ref(-1)
function locked(i: number) {
  shaking.value = i
  sound.play('bad')
  setTimeout(() => (shaking.value = -1), 500)
}

const cell = (c: string | { pl: string; uk: string; ru: string }) => (typeof c === 'string' ? c : c.pl)
const cellTr = (c: string | { pl: string; uk: string; ru: string }) => (typeof c === 'string' ? '' : c[lang.value])
</script>

<template>
  <div v-if="ex" class="mp" :style="{ '--c': ex.color, '--soft': ex.soft }">
    <div class="world" :style="{ '--g': ex.land?.ground, '--g2': ex.land?.ground2 }">
    <WorldScene v-if="ex.land" :sky="ex.land.sky" :ground="ex.land.ground" :ground2="ex.land.ground2" :deco="ex.land.deco" />
    <section class="mp__hero">
      <div class="container mp__hero-inner">
        <NuxtLink :to="lp('/polski/cwiczenia')" class="mp__back">← {{ t('cw.back') }}</NuxtLink>
        <div class="mp__title">
          <span class="mp__icon" aria-hidden="true">{{ ex.icon }}</span>
          <div>
            <small class="mp__land" lang="pl">📍 {{ ex.land?.name.pl }}</small>
            <h1 lang="pl">{{ ex.title.pl }}</h1>
            <p v-if="showPl" class="mp__tr">{{ loc(ex.title) }}</p>
          </div>
        </div>
        <div v-if="ex.land" class="hello">
          <Animal :kind="ex.land.animal" :size="110" mood="happy" />
          <div class="hello__bubble">
            <b lang="pl">{{ ex.land.guide }}</b>
            <Rich :text="loc(ex.land.hello)" tag="p" :marks="ex.marks" />
          </div>
        </div>
        <ClientOnly>
          <div class="stats">
            <span class="stat">✓ {{ t('lvl.levels', { n: st.done, total: st.total }) }}</span>
            <span class="stat stat--star">★ {{ st.stars }}/{{ st.total * 3 }}</span>
            <span class="stat stat--xp">⚡ {{ xp }} XP</span>
            <span v-if="streak" class="stat stat--fire">🔥 {{ t('lvl.streak', { n: streak }) }}</span>
          </div>
          <div class="mp__bar"><span :style="{ width: `${(st.done / st.total) * 100}%` }" /></div>
        </ClientOnly>
      </div>
    </section>

    <section class="container">
      <ClientOnly>
        <ol class="path">
          <li
            v-for="s in st.list"
            :key="s.lv.id"
            class="node"
            :class="{ 'node--done': s.done, 'node--locked': !s.open, 'node--now': s.i === st.current, 'node--boss': s.lv.boss }"
            :style="{ '--off': OFF[s.i % 4] }"
          >
            <div class="node__wrap">
              <NuxtLink v-if="s.open" :to="href(s.lv.id)" class="node__btn" :aria-label="`${t('lvl.level', { n: s.i + 1 })}: ${s.lv.title.pl}`">
                <span>{{ s.lv.icon }}</span>
              </NuxtLink>
              <button v-else type="button" class="node__btn" :class="{ shake: shaking === s.i }" :aria-label="t('lvl.locked')" @click="locked(s.i)">
                <span>🔒</span>
              </button>
              <span v-if="s.i === st.current" class="node__here" aria-hidden="true">
                <Animal v-if="ex.land" :kind="ex.land.animal" :size="74" act="walk" />
                <b>{{ t('lvl.start') }}</b>
              </span>
            </div>
            <span class="node__stars" :aria-label="`${s.stars}/3`">
              <i v-for="k in 3" :key="k" :class="{ on: k <= s.stars }">★</i>
            </span>
            <span class="node__label">
              <small>{{ s.lv.boss ? t('lvl.boss') : t('lvl.level', { n: s.i + 1 }) }}</small>
              <b lang="pl">{{ s.lv.title.pl }}</b>
              <em v-if="showPl">{{ loc(s.lv.title) }}</em>
            </span>
            <span v-if="shaking === s.i" class="node__toast">{{ t('lvl.lockedText') }}</span>
          </li>
          <li class="node node--trophy" :class="{ 'node--got': st.complete }" :style="{ '--off': 0 }">
            <div class="node__wrap"><span class="node__btn"><span>🏆</span></span></div>
            <span class="node__label">
              <small>{{ t('lvl.badge') }}</small>
              <b>{{ loc(ex.badge) }}</b>
            </span>
          </li>
        </ol>
        <template #fallback><div class="path path--ph" /></template>
      </ClientOnly>
    </section>
    </div>

    <section class="container">
      <details class="cheat">
        <summary>📘 {{ t('lvl.cheat') }}</summary>
        <div class="cheat__list">
          <article v-for="(lv, i) in ex.levels.filter(x => !x.boss)" :key="lv.id" class="cheat__item">
            <h3><span>{{ i + 1 }}</span> <b lang="pl">{{ lv.title.pl }}</b></h3>
            <Rich :text="lv.rule.pl" tag="p" lang="pl" :marks="ex.marks" />
            <Rich v-if="showPl" :text="loc(lv.rule)" tag="p" class="cheat__tr" :marks="ex.marks" />
            <div v-if="lv.examples.length" class="cheat__ex">
              <DrillExample v-for="x in lv.examples" :key="x" :text="x" />
            </div>
          </article>
        </div>
        <figure v-if="ex.table" class="tbl">
          <figcaption>{{ loc(ex.table.caption) }}</figcaption>
          <div class="tbl__scroll">
            <table>
              <thead>
                <tr><th v-for="(h, k) in ex.table.head" :key="k" scope="col">{{ k < 2 ? loc(h) : h.pl }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, k) in ex.table.rows" :key="k">
                  <template v-for="(c, j) in row" :key="j">
                    <th v-if="j === 0" scope="row">
                      <span lang="pl">{{ cell(c) }}</span>
                      <small v-if="showPl && cellTr(c)">{{ cellTr(c) }}</small>
                    </th>
                    <td v-else lang="pl" :class="{ q: j === 1 }">{{ cell(c) }}</td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>
      </details>
    </section>

    <nav class="container others">
      <NuxtLink v-for="e in others" :key="e.slug" :to="lp(`/polski/cwiczenia/${e.slug}`)" class="others__a" :style="{ '--c': e.color }">
        <span aria-hidden="true">{{ e.icon }}</span> <b lang="pl">{{ e.title.pl }}</b>
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped>
.mp { display: grid; gap: 40px; padding-bottom: 32px; }
.world { position: relative; isolation: isolate; padding-bottom: 150px; border-bottom: var(--border); }
.mp__hero { padding-block: 28px 20px; }
.mp__land { display: inline-block; padding: 2px 10px; font-family: var(--font-display); font-weight: 600; font-size: 15px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; }
.hello { display: flex; align-items: flex-end; gap: 4px; max-width: 680px; }
.hello__bubble { position: relative; display: grid; gap: 4px; margin-bottom: 30px; padding: 14px 18px; font-size: 17px; font-weight: 700; line-height: 1.4; background: var(--white); border: var(--border); border-radius: 22px 22px 22px 4px; box-shadow: 0 5px 0 var(--ink); }
.hello__bubble b { font-family: var(--font-display); font-size: 15px; color: var(--g2); }
.mp__hero-inner { display: grid; justify-items: start; gap: 14px; }
.mp__back { font-family: var(--font-display); font-weight: 600; color: var(--ink-soft); }
.mp__back:hover { color: var(--ink); }
.mp__title { display: flex; align-items: center; gap: 18px; }
.mp__icon { flex: none; display: grid; place-items: center; width: 80px; height: 80px; font-family: var(--font-display); font-weight: 700; font-size: 38px; color: var(--white); background: var(--c); border: var(--border); border-radius: 24px; box-shadow: var(--shadow); }
.mp__title h1 { font-size: clamp(34px, 6vw, 58px); line-height: 1.05; }
.mp__tr { font-family: var(--font-display); font-weight: 600; font-size: 20px; color: var(--ink-soft); }
.mp__lead { max-width: 62ch; font-size: 19px; color: var(--ink-soft); }
.stats { display: flex; flex-wrap: wrap; gap: 8px; }
.stat { padding: 5px 12px; font-family: var(--font-display); font-weight: 700; font-size: 16px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; }
.stat--star { background: var(--g1-soft); }
.stat--xp { background: var(--en-soft); }
.stat--fire { background: var(--red-soft); }
.mp__bar { width: min(100%, 520px); height: 16px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; overflow: hidden; }
.mp__bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--g1), var(--c)); transition: width .6s var(--ease-bounce); }

/* ścieżka */
.path { position: relative; display: grid; justify-items: center; gap: 26px; max-width: 560px; margin: 0 auto; padding: 10px 0; list-style: none; --step: 80px; }
.path::before { content: ''; position: absolute; top: 40px; bottom: 60px; left: 50%; width: 0; border-left: 10px dotted rgb(255 255 255 / .95); transform: translateX(-5px); filter: drop-shadow(0 2px 0 rgb(31 29 54 / .2)); }
.path--ph { min-height: 600px; }
.node { position: relative; display: grid; justify-items: center; gap: 4px; transform: translateX(calc(var(--off) * var(--step))); text-align: center; }
.node__wrap { position: relative; }
.node__btn {
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  color: var(--white);
  background: var(--c);
  border: var(--border);
  border-radius: 50%;
  box-shadow: 0 7px 0 var(--ink);
  cursor: pointer;
  transition: transform .15s var(--ease-bounce), box-shadow .15s ease;
}
.node__btn span { text-shadow: 0 2px 0 rgb(0 0 0 / .2); }
a.node__btn:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 10px 0 var(--ink); }
a.node__btn:active { transform: translateY(5px); box-shadow: 0 2px 0 var(--ink); }
.node__btn { background: var(--g2); }
.node--done .node__btn { background: var(--green); }
.node--locked .node__btn { color: var(--ink); background: var(--paper); box-shadow: 0 5px 0 var(--paper-deep); border-color: var(--paper-deep); font-size: 26px; }
.node--now .node__btn { animation: bob 1.4s ease-in-out infinite; outline: 6px solid var(--g1); outline-offset: 4px; }
.node--boss .node__btn { width: 104px; height: 104px; font-size: 40px; background: var(--g1); }
.node--boss.node--locked .node__btn { background: var(--paper); }
.node__here { position: absolute; left: calc(100% + 10px); top: 50%; display: flex; align-items: center; gap: 4px; transform: translateY(-50%); white-space: nowrap; }
.node__here b { padding: 4px 12px; font-family: var(--font-display); font-size: 18px; background: var(--white); border: 2px solid var(--ink); border-radius: 14px 14px 14px 4px; box-shadow: var(--shadow-sm); }
.node__stars { display: flex; gap: 2px; margin-top: 4px; font-size: 20px; color: var(--paper-deep); -webkit-text-stroke: 1.5px var(--ink); }
.node__stars i { font-style: normal; }
.node__stars .on { color: var(--g1); animation: pop-in .4s var(--ease-bounce); }
.node--locked .node__stars { visibility: hidden; }
.node__label { display: grid; max-width: 240px; padding: 6px 12px; line-height: 1.2; background: rgb(255 255 255 / .92); border: 2px solid var(--ink); border-radius: 14px; }
.node__label small { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.node__label b { font-family: var(--font-display); font-weight: 600; font-size: 17px; }
.node__label em { font-style: normal; font-size: 13px; color: var(--ink-soft); }
.node--locked .node__label b { color: var(--muted); }
.node__toast { position: absolute; top: -34px; padding: 4px 12px; font-size: 14px; font-weight: 800; color: var(--white); background: var(--ink); border-radius: 10px; white-space: nowrap; animation: pop-in .3s var(--ease-bounce); }
.node--trophy .node__btn { width: 96px; height: 96px; font-size: 46px; background: var(--paper); box-shadow: 0 5px 0 var(--paper-deep); filter: grayscale(1); opacity: .6; }
.node--trophy.node--got .node__btn { background: var(--g1); filter: none; opacity: 1; box-shadow: 0 7px 0 var(--ink); animation: bob 2s ease-in-out infinite; }
.shake { animation: shake .4s; }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

/* ściągawka */
.cheat { background: var(--white); border: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.cheat summary { padding: 18px 22px; font-family: var(--font-display); font-weight: 600; font-size: 21px; cursor: pointer; }
.cheat__list { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 14px; padding: 0 22px 22px; }
.cheat__item { display: grid; gap: 6px; align-content: start; padding: 16px; background: var(--soft); border-radius: var(--radius); }
.cheat__item h3 { display: flex; align-items: center; gap: 8px; font-size: 18px; }
.cheat__item h3 span { display: grid; place-items: center; width: 28px; height: 28px; font-size: 14px; color: var(--white); background: var(--c); border-radius: 50%; }
.cheat__tr { font-size: 14px; color: var(--ink-soft); }
.cheat__ex { display: flex; flex-wrap: wrap; gap: 6px; }
.cheat__ex :deep(.ex) { font-size: 15px; }
.tbl { margin: 0 22px 22px; }
.tbl figcaption { margin-bottom: 10px; font-family: var(--font-display); font-weight: 600; font-size: 19px; }
.tbl__scroll { overflow-x: auto; border: 2px solid var(--ink); border-radius: var(--radius); }
table { width: 100%; min-width: 500px; border-collapse: collapse; font-size: 16px; }
th, td { padding: 9px 12px; text-align: left; border-bottom: 2px solid var(--paper); }
thead th { font-family: var(--font-display); font-weight: 600; background: var(--soft); }
tbody th, td { font-family: var(--font-display); font-weight: 600; }
tbody th small { display: block; font-size: 12px; color: var(--ink-soft); }
td.q { font-weight: 500; color: var(--ink-soft); }

.others { display: flex; flex-wrap: wrap; gap: 10px; }
.others__a { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; background: var(--white); border: 2px solid var(--ink); border-radius: 14px; }
.others__a span { display: grid; place-items: center; min-width: 30px; height: 30px; padding: 0 4px; font-family: var(--font-display); font-weight: 700; color: var(--white); background: var(--c); border-radius: 9px; }
.others__a:hover { background: var(--paper); }

@media (max-width: 620px) {
  .path { --step: 46px; }
  .node__here { left: auto; right: calc(100% + 6px); flex-direction: row-reverse; }
  .node__here :deep(svg), .node__here > :first-child { display: none; }
  .mp__icon { width: 64px; height: 64px; font-size: 30px; border-radius: 18px; }
}
</style>
