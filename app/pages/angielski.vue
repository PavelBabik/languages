<script setup lang="ts">
import { mailto } from '~/data/site'

const { t, tm, tpl } = useT()
const lp = useLocalePath()
usePageSeo({ title: () => t('english.metaTitle'), description: () => t('seo.english') })
</script>

<template>
  <section class="container en">
    <div class="en__copy">
      <span class="chip en__chip">{{ t('english.chip') }}</span>
      <h1>{{ t('english.title') }}</h1>
      <p class="en__lead">{{ t('english.lead') }}</p>
      <ul class="en__list">
        <li v-for="item in tm<string[]>('english.list')" :key="item"><span aria-hidden="true">✦</span> {{ item }}</li>
      </ul>
      <div class="en__cta">
        <a :href="mailto(tpl('english.mailNotify'))" class="btn btn--primary">{{ t('english.notify') }}</a>
        <NuxtLink :to="lp('/polski')" class="btn">{{ t('english.toPolish') }} →</NuxtLink>
      </div>
    </div>
    <div class="en__art" aria-hidden="true">
      <Mascot color="var(--en)" :size="240" mood="wow" />
      <span class="word w1 deco" lang="en">apple</span>
      <span class="word w2 deco" lang="en">cat</span>
      <span class="word w3 deco" lang="en">hello</span>
    </div>
  </section>
</template>

<style scoped>
.en { display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; gap: 40px; padding-block: 56px 32px; }
.en__copy { display: grid; justify-items: start; gap: 18px; }
.en__chip { background: var(--en-soft); }
.en h1 { font-size: clamp(40px, 6vw, 68px); font-weight: 700; }
.en__lead { max-width: 52ch; font-size: 20px; color: var(--ink-soft); }
.en__list { display: grid; gap: 10px; padding: 0; margin: 0; list-style: none; font-family: var(--font-display); font-size: 19px; }
.en__list span { color: var(--en); }
.en__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px; }
.en__art { position: relative; display: grid; place-items: center; min-height: 360px; background: var(--en-soft); border: var(--border); border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%; box-shadow: var(--shadow-lg); }
.word { position: absolute; padding: 6px 14px; font-family: var(--font-display); font-weight: 600; font-size: 20px; background: var(--white); border: var(--border); border-radius: 16px 16px 16px 4px; box-shadow: var(--shadow-sm); animation: float 5s ease-in-out infinite; }
.w1 { top: 14%; left: 6%; }
.w2 { bottom: 16%; right: 8%; animation-delay: 1s; }
.w3 { top: 8%; right: 12%; animation-delay: 2s; }
@media (max-width: 860px) {
  .en { grid-template-columns: 1fr; }
  .en__art { min-height: 300px; }
}
</style>
