<script setup lang="ts">
/**
 * Przykład do odkrycia (tap):
 *  'st[ó]ł → st[o]ły' — lewa strona widoczna, prawa ukryta;
 *  '[u]cho'           — fragment w [ ] ukryty jako „?”.
 */
const props = defineProps<{ text: string; index?: number }>()
const emit = defineEmits<{ (e: 'open'): void }>()
const sound = useSound()

const open = ref(false)
const arrow = computed(() => props.text.includes(' → '))
const left = computed(() => (arrow.value ? props.text.split(' → ')[0]! : props.text))
const right = computed(() => (arrow.value ? props.text.split(' → ')[1]! : ''))
const split = (s: string) => s.split(/\[(.+?)\]/)
const plain = (s: string) => s.replace(/[[\]]/g, '')

function tap() {
  if (open.value) return say()
  open.value = true
  sound.play('pop')
  emit('open')
  say()
}
function say() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const txt = plain(arrow.value ? right.value : props.text)
  const u = new SpeechSynthesisUtterance(txt)
  u.lang = 'pl-PL'
  u.rate = 0.85
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}
</script>

<template>
  <button
    type="button"
    class="rv"
    :class="{ open }"
    :style="{ '--d': `${(index ?? 0) * 0.08}s` }"
    :aria-expanded="open"
    @click="tap"
  >
    <span class="rv__side" lang="pl">
      <template v-for="(p, i) in split(left)" :key="i">
        <template v-if="i % 2 === 0">{{ p }}</template>
        <mark v-else-if="arrow || open" class="hl">{{ p }}</mark>
        <span v-else class="q">?</span>
      </template>
    </span>
    <template v-if="arrow">
      <span class="rv__arrow" aria-hidden="true">→</span>
      <span v-if="open" class="rv__side rv__right" lang="pl">
        <template v-for="(p, i) in split(right)" :key="i">
          <template v-if="i % 2 === 0">{{ p }}</template>
          <mark v-else class="hl hl--2">{{ p }}</mark>
        </template>
      </span>
      <span v-else class="q q--wide">?</span>
    </template>
    <span class="rv__ico" aria-hidden="true">{{ open ? '🔊' : '👆' }}</span>
  </button>
</template>

<style scoped>
.rv {
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 72px;
  padding: 14px 44px 14px 20px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(22px, 4.5vw, 30px);
  background: var(--white);
  border: var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  cursor: pointer;
  animation: pop-in .4s var(--ease-bounce) var(--d) backwards;
  transition: transform .15s var(--ease-bounce), box-shadow .15s ease, background-color .2s;
}
.rv:not(.open) { background: var(--soft, var(--g1-soft)); }
.rv:not(.open):hover { transform: translate(-2px, -2px) rotate(-1deg); box-shadow: 7px 7px 0 var(--ink); }
.rv.open { animation: flip .45s var(--ease-bounce); }
.rv__arrow { color: var(--muted); }
.rv__right { animation: pop-in .4s var(--ease-bounce); }
.hl { padding: 0 2px; color: var(--hl); background: transparent; border-bottom: 4px solid currentColor; }
.hl--2 { color: var(--green); }
.q {
  display: inline-grid;
  place-items: center;
  min-width: 1.1em;
  padding: 0 4px;
  color: var(--white);
  background: var(--hl);
  border: 2px solid var(--ink);
  border-radius: 10px;
  animation: wiggle 1.6s ease-in-out infinite;
}
.q--wide { min-width: 2.6em; }
.rv__ico { position: absolute; right: 12px; top: 50%; font-size: 18px; transform: translateY(-50%); }
@keyframes flip { 0% { transform: rotateX(0); } 50% { transform: rotateX(70deg); } 100% { transform: rotateX(0); } }
@keyframes wiggle { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-8deg) scale(1.08); } }
</style>
