<script setup lang="ts">
import { mailto, SITE } from '~/data/site'

const { t, tpl } = useT()
const lp = useLocalePath()
usePageSeo({ title: () => t('contact.metaTitle'), description: () => t('seo.contact') })

const cards = computed(() => [
  { id: 'teacher', icon: '🍎', title: t('contact.teacherTitle'), text: t('contact.teacherText'), href: mailto(tpl('contact.mailTeacher')), btn: t('contact.teacherBtn') },
  { id: 'error', icon: '🔍', title: t('contact.errorTitle'), text: t('contact.errorText'), href: mailto(tpl('contact.mailError'), tpl('contact.mailErrorBody')), btn: t('contact.errorBtn') },
  { id: 'hello', icon: '✉️', title: t('contact.writeTitle'), text: t('contact.writeText'), href: mailto(tpl('contact.mailHello')), btn: t('contact.writeBtn') }
])
</script>

<template>
  <div class="contact">
    <section class="container contact__hero">
      <span class="chip">{{ t('contact.chip') }}</span>
      <h1>{{ t('contact.title') }}</h1>
      <p class="contact__lead">{{ t('contact.lead') }}</p>
      <div class="contact__direct">
        <a :href="`mailto:${SITE.email}`" class="direct">
          <small>{{ t('contact.emailLabel') }}</small>
          <b>{{ SITE.email }}</b>
        </a>
        <a :href="SITE.authorUrl" target="_blank" rel="noopener" class="direct">
          <small>{{ t('contact.siteLabel') }}</small>
          <b>{{ SITE.authorLabel }} ↗</b>
        </a>
      </div>
    </section>

    <section class="container contact__cards">
      <article v-for="c in cards" :id="c.id" :key="c.id" class="ccard">
        <span class="ccard__icon" aria-hidden="true">{{ c.icon }}</span>
        <h2>{{ c.title }}</h2>
        <p>{{ c.text }}</p>
        <a :href="c.href" class="btn btn--sm btn--primary">{{ c.btn }}</a>
      </article>
    </section>

    <section id="o-projekcie" class="container contact__about">
      <h2>{{ t('contact.aboutTitle') }}</h2>
      <p>{{ t('contact.aboutText') }}</p>
      <NuxtLink :to="lp('/polski')" class="btn btn--sm">{{ t('subjects.polski.cta') }} →</NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.contact { padding-block: 48px 24px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px; }
.contact__hero { display: grid; justify-items: start; gap: 16px; }
.contact__hero h1 { font-size: clamp(36px, 6vw, 60px); line-height: 1.05; }
.contact__lead { max-width: 60ch; font-size: 19px; color: var(--ink-soft); }
.contact__direct { display: flex; flex-wrap: wrap; gap: 14px; }
.direct { display: grid; gap: 2px; padding: 14px 20px; background: var(--white); border: var(--border); border-radius: 18px; box-shadow: var(--shadow-sm); transition: transform .15s var(--ease-bounce); }
.direct:hover { transform: translate(-2px, -2px); }
.direct small { font-weight: 700; font-size: 13px; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }
.direct b { font-family: var(--font-display); font-size: 20px; overflow-wrap: anywhere; }
.contact__cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 18px; }
.ccard { display: grid; align-content: start; justify-items: start; gap: 10px; padding: 24px; background: var(--white); border: var(--border); border-radius: 24px; box-shadow: var(--shadow-sm); scroll-margin-top: 100px; }
.ccard__icon { font-size: 34px; }
.ccard h2 { font-size: 24px; }
.ccard p { color: var(--ink-soft); }
.ccard .btn { margin-top: 6px; }
.contact__about { display: grid; justify-items: start; gap: 12px; padding: 28px; background: var(--g1-soft, var(--paper)); border: var(--border); border-radius: 24px; scroll-margin-top: 100px; }
.contact__about p { max-width: 70ch; color: var(--ink-soft); }
</style>
