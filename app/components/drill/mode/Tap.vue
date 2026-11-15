<script setup lang="ts">
import type { Opt } from '~/data/polski/cwiczenia/types'

/** Tryb „klasyczny”: duże kolorowe przyciski. */
const props = defineProps<{ opts: Opt[]; answer: number; state: 'ask' | 'bad' | 'ok'; wrong: Set<number>; round: string; sentence: boolean }>()
const emit = defineEmits<{ (e: 'pick', k: number): void }>()
const { lang, showPl } = useT()
const letters = computed(() => props.opts.every(o => typeof o === 'string' && o.length <= 3))
const COLORS = ['#ffd6e0', '#d6ecff', '#dff7d6', '#fff0b8', '#ece3ff', '#ffe1d0', '#d2f2f0']
</script>

<template>
  <div class="tap" :class="{ 'tap--letters': letters }">
    <button
      v-for="(o, k) in opts"
      :key="`${round}-${k}`"
      type="button"
      class="tap__b"
      :class="{ right: state === 'ok' && k === answer, wrong: wrong.has(k) }"
      :style="{ '--bg': COLORS[k % COLORS.length], animationDelay: `${k * 0.05}s` }"
      :disabled="wrong.has(k) || (state === 'ok' && k !== answer)"
      @click="emit('pick', k)"
    >
      <kbd aria-hidden="true">{{ k + 1 }}</kbd>
      <span lang="pl">{{ typeof o === 'string' ? o : o.pl }}</span>
      <small v-if="showPl && typeof o !== 'string'" :lang="lang">{{ o[lang] }}</small>
    </button>
  </div>
</template>

<style scoped>
.tap { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; padding: 10px 0 6px; }
.tap__b {
  position: relative;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 2px;
  min-width: 140px;
  min-height: 64px;
  padding: 10px 18px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  background: var(--bg);
  border: var(--border);
  border-radius: 20px;
  box-shadow: 0 6px 0 var(--ink);
  cursor: pointer;
  animation: pop-in .35s var(--ease-bounce) backwards;
  transition: transform .12s, box-shadow .12s;
}
.tap--letters .tap__b { min-width: 0; width: 104px; height: 104px; font-size: 50px; border-radius: 28px; }
.tap__b:hover { transform: translateY(-3px); box-shadow: 0 9px 0 var(--ink); }
.tap__b:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--ink); }
.tap__b.right { color: #fff; background: var(--green); animation: pop-big .45s var(--ease-bounce); }
.tap__b.wrong { animation: shake .4s; }
.tap__b[disabled]:not(.right) { opacity: .3; pointer-events: none; }
.tap__b.right[disabled] { pointer-events: none; }
.tap__b small { font-family: var(--font-body); font-size: 13px; font-weight: 700; opacity: .75; }
.tap__b kbd { position: absolute; top: 5px; left: 9px; font-family: inherit; font-size: 11px; opacity: .5; }
@keyframes pop-big { 0% { transform: scale(.6); } 60% { transform: scale(1.18); } 100% { transform: scale(1); } }
@media (max-width: 520px) {
  .tap__b { min-width: calc(50% - 6px); flex: 1 1 calc(50% - 6px); font-size: 19px; }
  .tap--letters .tap__b { flex: none; width: 90px; height: 90px; font-size: 42px; }
  .tap__b kbd { display: none; }
}
</style>
