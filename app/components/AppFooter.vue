<script setup lang="ts">
import { mailto, SITE } from '~/data/site'
import { plGrades } from '~/data/polski/curriculum'

const { t, tpl } = useT()
const lp = useLocalePath()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <Logo />
        <p>{{ t('footer.about') }}</p>
      </div>
      <div class="footer__cols">
        <div>
          <h4>{{ t('footer.learn') }}</h4>
          <NuxtLink v-for="g in plGrades" :key="g.n" :to="lp(`/polski/klasa/${g.n}`)">{{ t('common.gradeN', { n: g.n }) }}</NuxtLink>
        </div>
        <div>
          <h4>{{ t('footer.more') }}</h4>
          <NuxtLink :to="lp('/polski/cwiczenia')">{{ t('nav.exercises') }}</NuxtLink>
          <NuxtLink :to="lp('/angielski')">{{ t('footer.english') }}</NuxtLink>
          <NuxtLink :to="lp('/#adhd')">{{ t('nav.adhd') }}</NuxtLink>
          <NuxtLink :to="lp('/#dla-rodzicow')">{{ t('nav.parents') }}</NuxtLink>
        </div>
        <div>
          <h4>{{ t('footer.project') }}</h4>
          <NuxtLink :to="lp('/kontakt')">{{ t('footer.aboutUs') }}</NuxtLink>
          <a :href="mailto(tpl('contact.mailVolunteer'))">{{ t('footer.volunteer') }}</a>
          <a :href="mailto(tpl('contact.mailError'))">{{ t('footer.reportError') }}</a>
          <NuxtLink :to="lp('/kontakt')">{{ t('footer.contact') }}</NuxtLink>
          <a :href="SITE.authorUrl" target="_blank" rel="noopener">{{ SITE.authorLabel }}</a>
        </div>
      </div>
    </div>
    <div class="container footer__bottom">
      <span>© 2026 {{ SITE.name }}</span>
      <span>{{ t('footer.made') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 40px;
  padding-top: 64px;
  background: var(--white);
  border-top: var(--border);
}
.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
}
.footer__brand { max-width: 380px; display: grid; gap: 16px; color: var(--ink-soft); }
.footer__cols { display: flex; gap: 64px; flex-wrap: wrap; }
.footer__cols div { display: grid; gap: 8px; align-content: start; }
.footer__cols h4 { font-size: 18px; margin-bottom: 4px; }
.footer__cols a { color: var(--ink-soft); }
.footer__cols a:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
.footer__bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 48px;
  padding-block: 24px;
  border-top: 2px dashed color-mix(in srgb, var(--ink) 18%, transparent);
  font-size: 15px;
  color: var(--muted);
}
</style>
