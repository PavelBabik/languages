<script setup lang="ts">
import type { Opt } from '~/data/polski/cwiczenia/types'
import type { AnimalKind } from '~/data/polski/cwiczenia/world'

/**
 * „Balony”: kolorowe balony z literami lecą do góry (powoli, w kółko).
 * Przebij dobry — wybuch konfetti; zły pęka z „pufff”.
 */
const props = defineProps<{ opts: Opt[]; answer: number; state: 'ask' | 'bad' | 'ok'; wrong: Set<number>; animal: AnimalKind; round: string; sentence: boolean }>()
const emit = defineEmits<{ (e: 'pick', k: number): void }>()
const sound = useSound()
const { lang, showPl } = useT()
const { focus } = useSettings()

const COLORS = ['#ff5d8f', '#4da3ff', '#3fcf7a', '#ffb627', '#9b6bff', '#ff7b54', '#19b5b0']
const popped = ref(new Set<number>())

const balloons = computed(() => {
  const n = props.opts.length
  return props.opts.map((o, k) => ({
    k,
    x: n === 1 ? 50 : 15 + (70 / (n - 1)) * k,
    label: typeof o === 'string' ? o : o.pl,
    tr: typeof o === 'string' ? '' : o[lang.value],
    color: COLORS[k % COLORS.length]!,
    dur: (focus.value ? 14 : 9) + ((k * 1.7) % 3),
    delay: -((k * 2.3) % 5) - 1.5,
    sway: 2.4 + (k % 3) * 0.5
  }))
})

function act(k: number) {
  if (props.state === 'ok' || props.wrong.has(k) || popped.value.has(k)) return
  popped.value = new Set(popped.value).add(k)
  sound.play('pop')
  emit('pick', k)
}
defineExpose({ act })

watch(() => props.round, () => (popped.value = new Set()))
</script>

<template>
  <div class="bl" :class="{ 'bl--done': state === 'ok', 'bl--sentence': sentence }">
    <span class="bl__cloud c1" aria-hidden="true" /><span class="bl__cloud c2" aria-hidden="true" />
    <div class="bl__grass" aria-hidden="true" />

    <div
      v-for="b in balloons"
      :key="`${round}-${b.k}`"
      class="lane"
      :style="{ left: `${b.x}%`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }"
    >
      <button
        type="button"
        class="balloon"
        :class="{
          'balloon--pop': popped.has(b.k) && b.k !== answer,
          'balloon--win': popped.has(b.k) && b.k === answer,
          'balloon--away': state === 'ok' && b.k !== answer
        }"
        :style="{ '--b': b.color, animationDuration: `${b.sway}s` }"
        :disabled="wrong.has(b.k) || state === 'ok'"
        @click="act(b.k)"
      >
        <span class="balloon__body">
          <span lang="pl">{{ b.label }}</span>
          <small v-if="showPl && b.tr">{{ b.tr }}</small>
        </span>
        <span class="balloon__knot" aria-hidden="true" />
        <span class="balloon__string" aria-hidden="true" />
        <span v-if="popped.has(b.k) && b.k !== answer" class="balloon__puff" aria-hidden="true">💨</span>
        <DrillBurst v-if="popped.has(b.k) && b.k === answer" />
      </button>
    </div>

    <div class="bl__pet">
      <Animal :kind="animal" :size="78" :mood="state === 'ok' ? 'joy' : state === 'bad' ? 'sad' : 'wow'" :act="state === 'ok' ? 'jump' : 'idle'" />
    </div>
  </div>
</template>

<style scoped>
.bl {
  position: relative;
  height: 330px;
  overflow: hidden;
  background: linear-gradient(180deg, #7fc8ff 0%, #c9ecff 60%, #eaf8ff 100%);
  border: var(--border);
  border-radius: 22px;
}
.bl__cloud { position: absolute; width: 110px; height: 34px; background: #fff; border-radius: 30px; opacity: .85; animation: drift 30s linear infinite; }
.bl__cloud::before { content: ''; position: absolute; left: 20px; top: -20px; width: 50px; height: 40px; background: #fff; border-radius: 50%; }
.c1 { top: 40px; left: -20%; }
.c2 { top: 120px; left: 40%; transform: scale(.7); animation-duration: 44s; }
@keyframes drift { to { translate: 140vw 0; } }
.bl__grass { position: absolute; left: 0; right: 0; bottom: 0; height: 40px; background: linear-gradient(#8fd96b, #5fb84a); border-top: 3px solid var(--ink); z-index: 3; }
.bl__pet { position: absolute; left: 50%; bottom: 18px; z-index: 4; translate: -50% 0; line-height: 0; pointer-events: none; }

.lane { position: absolute; bottom: 0; translate: -50% 0; animation: rise linear infinite; z-index: 2; }
.bl--done .lane { animation-play-state: paused; }
@keyframes rise { from { transform: translateY(120px); } to { transform: translateY(-420px); } }

.balloon { position: relative; display: grid; justify-items: center; padding: 0; background: none; border: 0; cursor: pointer; animation: sway ease-in-out infinite alternate; }
@keyframes sway { from { rotate: -6deg; } to { rotate: 6deg; } }
.balloon__body {
  display: grid;
  place-items: center;
  align-content: center;
  width: 92px;
  height: 108px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 44px;
  line-height: 1;
  color: #fff;
  text-shadow: 0 2px 0 rgb(0 0 0 / .25);
  background: radial-gradient(circle at 32% 28%, rgb(255 255 255 / .75) 0 9%, transparent 10%), var(--b);
  border: var(--border);
  border-radius: 50% 50% 48% 48% / 56% 56% 44% 44%;
  box-shadow: inset -8px -10px 0 rgb(0 0 0 / .12);
  transition: transform .15s var(--ease-bounce);
}
.bl--sentence .balloon__body { width: 108px; height: 96px; font-size: 18px; padding: 0 6px; }
.balloon__body small { font-family: var(--font-body); font-size: 11px; font-weight: 800; }
.balloon:hover .balloon__body { transform: scale(1.08); }
.balloon__knot { width: 12px; height: 9px; margin-top: -3px; background: var(--b); border: 2px solid var(--ink); border-radius: 3px; }
.balloon__string { width: 2px; height: 60px; background: var(--ink); opacity: .6; }
.balloon--pop .balloon__body, .balloon--pop .balloon__knot, .balloon--pop .balloon__string { animation: pop .3s ease-out forwards; }
.balloon--win .balloon__body { animation: win-pop .5s ease-out forwards; }
.balloon--win .balloon__knot, .balloon--win .balloon__string { opacity: 0; transition: opacity .3s; }
.balloon--away { animation: away 1s ease-in forwards; }
.balloon__puff { position: absolute; top: 30px; font-size: 40px; animation: puff .7s ease-out forwards; }
.balloon[disabled] { cursor: default; }
@keyframes pop { 0% { transform: scale(1); } 40% { transform: scale(1.3); opacity: .8; } 100% { transform: scale(.2); opacity: 0; } }
@keyframes win-pop { 0% { transform: scale(1); } 30% { transform: scale(1.35); background: var(--green); } 100% { transform: scale(1.1); background: var(--green); } }
@keyframes away { to { transform: translateY(-400px); opacity: 0; } }
@keyframes puff { from { transform: scale(.4); opacity: 1; } to { transform: scale(1.6) translateY(-20px); opacity: 0; } }

@media (max-width: 520px) {
  .balloon__body { width: 74px; height: 88px; font-size: 36px; }
  .bl--sentence .balloon__body { width: 76px; height: 76px; font-size: 13px; }
}
</style>
