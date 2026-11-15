<script setup lang="ts">
import { LANGS } from '~/i18n'

defineProps<{ compact?: boolean }>()
const { lang, preferred, focus } = useSettings()
const { t } = useT()
const switchLang = useSwitchLang()
</script>

<template>
  <div class="settings" :class="{ 'settings--compact': compact }">
    <div class="langs" role="radiogroup" :aria-label="t('settings.lang')">
      <NuxtLink
        v-for="l in LANGS"
        :key="l.code"
        :to="switchLang(l.code)"
        role="radio"
        class="langs__btn"
        :class="{ active: lang === l.code }"
        :aria-checked="lang === l.code"
        :title="l.name"
        :lang="l.code"
        :hreflang="l.code"
        @click="preferred = l.code"
      >
        {{ l.label }}
      </NuxtLink>
    </div>

    <button
      type="button"
      class="focus-btn"
      :class="{ active: focus }"
      :aria-pressed="focus"
      :title="`${t('settings.focusLong')} — ${t('settings.focusHint')}`"
      @click="focus = !focus"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="3.5" :fill="focus ? 'currentColor' : 'none'" />
        </g>
      </svg>
      <span v-if="!compact" class="focus-btn__label">{{ t('settings.focus') }}</span>
    </button>
  </div>
</template>

<style scoped>
.settings { display: flex; align-items: center; gap: 8px; }
.langs {
  display: inline-flex;
  padding: 3px;
  background: var(--white);
  border: 2px solid var(--ink);
  border-radius: 999px;
}
.langs__btn {
  display: inline-grid;
  place-items: center;
  min-width: 44px;
  height: 34px;
  padding: 0 9px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
}
.langs__btn:hover { background: var(--paper); }
.langs__btn.active { background: var(--ink); color: var(--white); }

.focus-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 12px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  background: var(--white);
  border: 2px solid var(--ink);
  border-radius: 999px;
  cursor: pointer;
}
.focus-btn:hover { background: var(--paper); }
.focus-btn.active { background: var(--g5); color: var(--white); }
.settings--compact .focus-btn { width: 40px; padding: 0; justify-content: center; }
@media (max-width: 520px) {
  .focus-btn__label { display: none; }
  .focus-btn { width: 40px; padding: 0; justify-content: center; }
  .langs__btn { min-width: 38px; padding: 0 6px; font-size: 13px; }
}
</style>
