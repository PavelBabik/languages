<script setup lang="ts">
import { exercises, levelStates } from '~/data/polski/cwiczenia'

const { t, loc, locPl, showPl } = useT()
const lp = useLocalePath()
const { stars, xp, streak } = useProgress()

usePageSeo({ title: () => t('cw.metaTitle'), description: () => t('seo.cw') })

const list = computed(() => exercises.map(ex => ({ ex, st: levelStates(ex, stars.value) })))
const totalStops = computed(() => list.value.reduce((n, x) => n + x.st.total, 0))
const doneStops = computed(() => list.value.reduce((n, x) => n + x.st.done, 0))
const hop = ref('')
</script>

<template>
  <div class="wm">
    <!-- ======== świat ======== -->
    <section class="world">
      <WorldScene sky="#a8dcff" ground="#8fd96b" ground2="#5fb84a" :deco="['🎈', '🦋', '🌸', '✈️', '🌼', '🐝', '🌷']" />
      <div class="container world__hero">
        <span class="chip world__chip">🧭 {{ t('cw.chip') }}</span>
        <h1>{{ t('world.title') }}</h1>
        <PlLine v-if="showPl" text="Wielka podróż przez Krainę Polskiego" />
        <p class="world__lead">{{ t('world.lead') }}</p>
        <div class="team">
          <button
            v-for="x in list"
            :key="x.ex.slug"
            type="button"
            class="team__a"
            :title="x.ex.land?.guide"
            @click="hop = x.ex.slug"
            @animationend="hop = ''"
          >
            <Animal v-if="x.ex.land" :kind="x.ex.land.animal" :size="88" :act="hop === x.ex.slug ? 'jump' : 'idle'" :mood="hop === x.ex.slug ? 'joy' : 'happy'" />
          </button>
        </div>
        <ClientOnly>
          <div class="stats">
            <span class="stat stat--stamp">🎫 {{ t('world.stamps', { n: doneStops, total: totalStops }) }}</span>
            <span class="stat stat--xp">⚡ {{ xp }} XP</span>
            <span v-if="streak" class="stat stat--fire">🔥 {{ t('lvl.streak', { n: streak }) }}</span>
          </div>
        </ClientOnly>
      </div>

      <!-- ilustrowana mapa -->
      <div class="container">
        <WorldMap :list="list" />
      </div>
    </section>

    <!-- ======== paszport ======== -->
    <section class="container">
      <div class="pass">
        <header class="pass__head">
          <span class="pass__eagle" aria-hidden="true">🛂</span>
          <div>
            <h2>{{ t('world.passport') }}</h2>
            <PlLine v-if="showPl" text="Paszport podróżnika" />
            <p>{{ t('world.passportLead') }}</p>
          </div>
        </header>
        <ClientOnly>
          <div class="pass__pages">
            <div v-for="x in list" :key="x.ex.slug" class="page" :style="{ '--g': x.ex.land?.ground2 }">
              <b lang="pl">{{ x.ex.land?.name.pl }}</b>
              <div class="stamps">
                <span
                  v-for="(s, k) in x.st.list"
                  :key="s.lv.id"
                  class="stamp"
                  :class="{ on: s.done }"
                  :style="{ '--r': `${((k * 37) % 30) - 15}deg` }"
                  :title="s.lv.title.pl"
                >{{ s.done ? s.lv.icon : '' }}</span>
              </div>
            </div>
          </div>
          <h3 class="pass__h3">{{ t('world.friends') }}</h3>
          <div class="friends">
            <div v-for="x in list" :key="x.ex.slug" class="friend" :class="{ on: x.st.complete }">
              <Animal v-if="x.ex.land" :kind="x.ex.land.animal" :size="84" :gray="!x.st.complete" :mood="x.st.complete ? 'joy' : 'think'" />
              <span lang="pl">{{ x.st.complete ? x.ex.land?.guide : '?' }}</span>
              <small v-if="x.st.complete">🏅 {{ loc(x.ex.badge) }}</small>
            </div>
          </div>
          <p class="pass__hint">{{ t('world.friendHint') }}</p>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wm { display: grid; gap: 48px; padding-bottom: 40px; }

.world { position: relative; isolation: isolate; padding-bottom: 150px; border-bottom: var(--border); }
.world__hero { display: grid; justify-items: center; gap: 12px; padding-top: 40px; text-align: center; }
.world__chip { background: var(--white); }
.world__hero h1 { max-width: 16ch; font-size: clamp(36px, 6.4vw, 70px); font-weight: 700; line-height: 1.02; color: var(--ink); text-shadow: 3px 3px 0 #fff; }
.world__lead { max-width: 58ch; font-size: 19px; font-weight: 700; color: var(--ink-soft); }
.team { display: flex; flex-wrap: wrap; justify-content: center; gap: 0 6px; margin-top: 4px; }
.team__a { padding: 0; background: none; border: 0; cursor: pointer; }
.stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.stat { padding: 6px 14px; font-family: var(--font-display); font-weight: 700; font-size: 17px; background: var(--white); border: 2px solid var(--ink); border-radius: 99px; box-shadow: 0 3px 0 var(--ink); }
.stat--stamp { background: #fff3c4; }
.stat--xp { background: var(--en-soft); }
.stat--fire { background: var(--red-soft); }

/* paszport */
.pass { padding: clamp(20px, 4vw, 34px); background: #1e3a6e; border: var(--border); border-radius: 30px; box-shadow: 0 8px 0 var(--ink); color: #fff; }
.pass__head { display: flex; gap: 16px; align-items: center; margin-bottom: 18px; }
.pass__eagle { font-size: 48px; }
.pass__head h2 { font-size: clamp(26px, 4vw, 38px); color: #ffd84d; }
.pass__head p { color: #cfdcf7; font-weight: 700; }
.pass__head :deep(.pl-line) { color: #cfdcf7; }
.pass__pages { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr)); gap: 12px; }
.page { display: grid; align-content: start; gap: 10px; padding: 14px 16px; color: var(--ink); background: #fffaf0; background-image: repeating-linear-gradient(0deg, transparent 0 23px, #efe4cf 23px 24px); border: 2px solid var(--ink); border-radius: 16px; }
.page b { font-family: var(--font-display); font-size: 18px; }
.stamps { display: flex; flex-wrap: wrap; gap: 8px; }
.stamp { display: grid; place-items: center; width: 46px; height: 46px; font-family: var(--font-display); font-weight: 700; font-size: 13px; color: var(--g); border: 2px dashed #d2c6ad; border-radius: 50%; transform: rotate(var(--r)); }
.stamp.on { border: 3px double var(--g); background: color-mix(in srgb, var(--g) 12%, transparent); box-shadow: inset 0 0 0 2px var(--g); animation: pop-in .4s var(--ease-bounce); }
.pass__h3 { margin: 22px 0 8px; font-size: 22px; color: #ffd84d; }
.friends { display: flex; flex-wrap: wrap; gap: 12px; }
.friend { display: grid; justify-items: center; gap: 2px; min-width: 110px; padding: 8px 10px 10px; color: var(--ink); background: rgb(255 255 255 / .12); border: 2px dashed rgb(255 255 255 / .4); border-radius: 18px; text-align: center; }
.friend span { font-family: var(--font-display); font-weight: 700; color: #fff; }
.friend small { color: #ffd84d; font-weight: 800; }
.friend.on { background: #fffaf0; border: 2px solid var(--ink); }
.friend.on span { color: var(--ink); }
.friend.on small { color: var(--hl); }
.pass__hint { margin-top: 12px; color: #cfdcf7; font-size: 15px; }

@media (max-width: 680px) {
  .world { padding-bottom: 110px; }
}
</style>
