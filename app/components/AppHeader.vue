<script setup lang="ts">
import { plGrades } from '~/data/polski/curriculum'

const { t, loc } = useT()
const lp = useLocalePath()
const route = useRoute()

const links = computed(() => [
  { to: lp('/polski'), label: t('nav.polish') },
  { to: lp('/polski/cwiczenia'), label: t('nav.exercises') },
  { to: lp('/angielski'), label: t('nav.english') },
  { to: lp('/#adhd'), label: t('nav.adhd') },
  { to: lp('/#dla-rodzicow'), label: t('nav.parents') }
])

/* ── Mobile menu ── */
const open = ref(false)
const burger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const close = (refocus = false) => {
  if (!open.value) return
  open.value = false
  if (refocus) nextTick(() => burger.value?.focus())
}
const toggle = () => (open.value ? close() : (open.value = true))

watch(() => route.fullPath, () => close())
useHead({ htmlAttrs: { class: () => (open.value ? 'menu-open' : '') } })
watch(open, (v) => {
  if (import.meta.client && v) nextTick(() => panel.value?.querySelector<HTMLElement>('a, button')?.focus())
})
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(true) }
const onResize = () => { if (window.innerWidth > 1080) close() }
onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
})

const currentGrade = computed(() => Number(route.params.grade) || 0)
</script>

<template>
  <LangHint />
  <header class="header" :class="{ 'header--open': open }">
    <div class="container header__inner">
      <Logo />
      <nav class="header__nav" :aria-label="t('nav.menu')">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
      </nav>
      <div class="header__right">
        <SettingsBar />
        <NuxtLink :to="lp('/polski')" class="btn btn--primary btn--sm header__cta">{{ t('nav.start') }}</NuxtLink>
        <button
          ref="burger"
          type="button"
          class="burger"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? t('nav.menuClose') : t('nav.menuOpen')"
          @click="toggle"
        >
          <span class="burger__icon" aria-hidden="true"><i /><i /><i /></span>
          <span class="burger__label">{{ t('nav.menu') }}</span>
        </button>
      </div>
    </div>

    <Transition name="mm">
      <div v-if="open" class="mm">
        <div class="mm__backdrop" aria-hidden="true" @click="close()" />
        <nav id="mobile-menu" ref="panel" class="mm__panel" :aria-label="t('nav.menu')">
          <div class="container mm__inner">
            <p class="mm__label">{{ t('nav.polishGrades') }}</p>
            <div class="mm__grades">
              <NuxtLink
                v-for="g in plGrades"
                :key="g.n"
                :to="lp(`/polski/klasa/${g.n}`)"
                class="mm__grade"
                :class="{ active: currentGrade === g.n }"
                :style="{ '--c': g.color, '--soft': g.soft }"
                :aria-current="currentGrade === g.n ? 'page' : undefined"
              >
                <b>{{ g.n }}</b>
                <span>{{ loc(g.title) }}</span>
              </NuxtLink>
            </div>

            <div class="mm__links">
              <NuxtLink :to="lp('/polski')" class="mm__link">
                <span class="mm__ico" aria-hidden="true">Ą</span>{{ t('nav.polish') }}
              </NuxtLink>
              <NuxtLink :to="lp('/polski/cwiczenia')" class="mm__link">
                <span class="mm__ico" aria-hidden="true">ó</span>{{ t('nav.exercises') }}
              </NuxtLink>
              <NuxtLink :to="lp('/angielski')" class="mm__link">
                <span class="mm__ico" aria-hidden="true">Aa</span>{{ t('nav.english') }}
              </NuxtLink>
              <NuxtLink :to="lp('/#adhd')" class="mm__link">
                <span class="mm__ico" aria-hidden="true">◎</span>{{ t('nav.adhd') }}
              </NuxtLink>
              <NuxtLink :to="lp('/#dla-rodzicow')" class="mm__link">
                <span class="mm__ico" aria-hidden="true">♥</span>{{ t('nav.parents') }}
              </NuxtLink>
              <NuxtLink :to="lp('/kontakt')" class="mm__link">
                <span class="mm__ico" aria-hidden="true">✉</span>{{ t('footer.contact') }}
              </NuxtLink>
            </div>

            <div class="mm__settings">
              <p class="mm__label">{{ t('nav.settings') }}</p>
              <SettingsBar />
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 90%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid color-mix(in srgb, var(--ink) 8%, transparent);
}
.header--open { background: var(--paper); }
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 76px;
}
.header__nav {
  display: flex;
  gap: 4px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 17px;
}
.header__nav a {
  padding: 8px 14px;
  border-radius: 999px;
  transition: background .2s;
  white-space: nowrap;
}
.header__nav a:hover { background: var(--white); }
.header__right { display: flex; align-items: center; gap: 12px; }

/* ── Burger ── */
.burger {
  display: none;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px 0 12px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--ink);
  background: var(--white);
  border: 2px solid var(--ink);
  border-radius: 999px;
  cursor: pointer;
}
.burger:hover { background: var(--paper); }
.header--open .burger { background: var(--ink); color: var(--white); }
.burger__icon { position: relative; width: 18px; height: 14px; }
.burger__icon i {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2.5px;
  background: currentColor;
  border-radius: 2px;
  transition: transform .2s, opacity .2s, top .2s;
}
.burger__icon i:nth-child(1) { top: 0; }
.burger__icon i:nth-child(2) { top: 5.75px; }
.burger__icon i:nth-child(3) { top: 11.5px; }
.header--open .burger__icon i:nth-child(1) { top: 5.75px; transform: rotate(45deg); }
.header--open .burger__icon i:nth-child(2) { opacity: 0; }
.header--open .burger__icon i:nth-child(3) { top: 5.75px; transform: rotate(-45deg); }

/* ── Panel ── */
.mm { position: absolute; top: 100%; left: 0; right: 0; }
.mm__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100dvh;
  z-index: -1;
  background: color-mix(in srgb, var(--ink) 35%, transparent);
}
.mm__panel {
  max-height: calc(100dvh - 76px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--paper);
  border-bottom: var(--border);
  box-shadow: 0 10px 0 color-mix(in srgb, var(--ink) 10%, transparent);
}
.mm__inner { display: grid; gap: 20px; padding-block: 20px 28px; }
.mm__label {
  margin: 0 0 -8px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--muted);
}
.mm__grades { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.mm__grade {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 56px;
  padding: 8px 10px;
  background: var(--white);
  border: 2px solid var(--ink);
  border-radius: 16px;
  min-width: 0;
}
.mm__grade b {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--white);
  background: var(--c);
  border-radius: 10px;
}
.mm__grade span { font-size: 14px; line-height: 1.2; hyphens: auto; overflow-wrap: break-word; }
.mm__grade:hover { background: var(--soft); }
.mm__grade.active { background: var(--soft); box-shadow: var(--shadow-sm); }
.mm__links { display: grid; gap: 4px; }
.mm__link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 6px 12px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 19px;
  border-radius: 14px;
}
.mm__link:hover { background: var(--white); }
.mm__link[aria-current='page']:not([href*='#']) { background: var(--white); box-shadow: inset 0 0 0 2px var(--ink); }
.mm__ico {
  flex: none;
  font-family: var(--font-display);
  font-size: 15px !important;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  font-size: 18px;
  background: var(--white);
  border: 2px solid var(--ink);
  border-radius: 50%;
}
.mm__settings { display: none; gap: 16px; }

.mm-enter-active, .mm-leave-active { transition: opacity .18s ease; }
.mm-enter-active .mm__panel, .mm-leave-active .mm__panel { transition: transform .18s ease; }
.mm-enter-from, .mm-leave-to { opacity: 0; }
.mm-enter-from .mm__panel, .mm-leave-to .mm__panel { transform: translateY(-12px); }

@media (min-width: 1081px) {
  .mm { display: none; }
}
@media (max-width: 1080px) {
  .header__nav { display: none; }
  .burger { display: inline-flex; }
}
@media (max-width: 640px) {
  .header__cta { display: none; }
  .header__inner :deep(.logo__text) { display: none; }
}
@media (max-width: 520px) {
  .burger { width: 44px; padding: 0; justify-content: center; }
  .burger__label { display: none; }
}
@media (max-width: 340px) {
  /* Na najwęższych ekranach ustawienia przenosimy do menu. */
  .header__right > :deep(.settings) { display: none; }
  .mm__settings { display: grid; }
}
@media (max-width: 359px) {
  .mm__grades { grid-template-columns: minmax(0, 1fr); }
  .mm__grade { min-height: 48px; }
}
@media (min-width: 560px) {
  .mm__grades { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}
</style>

<style>
html.menu-open { overflow: hidden; }
</style>
