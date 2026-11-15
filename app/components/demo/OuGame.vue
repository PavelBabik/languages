<script setup lang="ts">
import type { L } from '~/types/content'

/**
 * Mini-gra „ó czy u?” na stronie głównej — pokazuje, jak będą wyglądać lekcje:
 * jedno słowo na ekranie, podpowiedź zamiast błędu, tłumaczenie obok.
 */
type Word = { pre: string; post: string; ans: 'ó' | 'u'; full: string; uk: string; ru: string; hint: L }

const words: Word[] = [
  {
    pre: 'st', post: 'ł', ans: 'ó', full: 'stół', uk: 'стіл', ru: 'стол',
    hint: {
      pl: 'stół → stoły. Ó wymienia się na o, więc piszemy ó.',
      uk: 'stół → stoły: ó змінюється на o, тому пишемо ó. А українською «стіл» — і на місці ó!',
      ru: 'stół → stoły: ó чередуется с o, поэтому пишем ó. И по-русски «стол» — с о!'
    }
  },
  {
    pre: 'm', post: 'cha', ans: 'u', full: 'mucha', uk: 'муха', ru: 'муха',
    hint: {
      pl: 'Mucha nie wymienia się na o. Takie słowa zapamiętujemy — piszemy u.',
      uk: 'У слові mucha немає заміни на o — пишемо u. Українською теж «муха» з у.',
      ru: 'В слове mucha нет замены на o — пишем u. По-русски тоже «муха» с у.'
    }
  },
  {
    pre: 'l', post: 'd', ans: 'ó', full: 'lód', uk: 'лід', ru: 'лёд',
    hint: {
      pl: 'lód → lody. Jest wymiana na o, więc piszemy ó.',
      uk: 'lód → lody: є заміна на o — пишемо ó. Українською «лід» — знову і!',
      ru: 'lód → lody: есть замена на o — пишем ó. По-русски «лёд» — тоже о (ё).'
    }
  },
  {
    pre: 'b', post: 't', ans: 'u', full: 'but', uk: 'черевик', ru: 'ботинок',
    hint: {
      pl: 'but → buty. U zostaje u, nie zmienia się na o.',
      uk: 'but → buty: u залишається u, на o не змінюється.',
      ru: 'but → buty: u остаётся u, на o не меняется.'
    }
  },
  {
    pre: 'r', post: 'g', ans: 'ó', full: 'róg', uk: 'ріг', ru: 'рог',
    hint: {
      pl: 'róg → rogi. Ó wymienia się na o.',
      uk: 'róg → rogi: ó змінюється на o. Українською «ріг» — і на місці ó.',
      ru: 'róg → rogi: ó чередуется с o. По-русски «рог» — с о.'
    }
  }
]

const { t, lang, showPl } = useT()

const i = ref(0)
const state = ref<'ask' | 'bad' | 'ok'>('ask')
const missed = ref(new Set<number>())
const finished = ref(false)
const w = computed(() => words[i.value]!)
const firstTry = computed(() => words.length - missed.value.size)

function pick(letter: 'ó' | 'u') {
  if (state.value === 'ok') return
  if (letter === w.value.ans) {
    state.value = 'ok'
    say(w.value.full)
  } else {
    state.value = 'bad'
    missed.value.add(i.value)
  }
}

function next() {
  if (i.value + 1 >= words.length) finished.value = true
  else {
    i.value++
    state.value = 'ask'
  }
}

function restart() {
  i.value = 0
  state.value = 'ask'
  missed.value = new Set()
  finished.value = false
}

const canSpeak = ref(false)
onMounted(() => (canSpeak.value = 'speechSynthesis' in window))
function say(text: string) {
  if (!canSpeak.value) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'pl-PL'
  u.rate = 0.85
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}
</script>

<template>
  <div class="game sticker">
    <template v-if="!finished">
      <div class="game__top">
        <span class="game__q">{{ t('demo.question') }}</span>
        <span class="game__dots" :aria-label="t('demo.progress', { i: i + 1, n: words.length })">
          <i v-for="(_, k) in words" :key="k" :class="{ done: k < i || (k === i && state === 'ok'), now: k === i }" />
        </span>
      </div>

      <p class="game__word" lang="pl" :class="state">
        <span>{{ w.pre }}</span>
        <span class="game__gap">{{ state === 'ok' ? w.ans : '?' }}</span>
        <span>{{ w.post }}</span>
      </p>

      <div class="game__btns">
        <button
          v-for="l in (['ó', 'u'] as const)"
          :key="l"
          type="button"
          class="letter"
          :class="{ right: state === 'ok' && l === w.ans }"
          :disabled="state === 'ok' && l !== w.ans"
          lang="pl"
          @click="pick(l)"
        >
          {{ l }}
        </button>
      </div>

      <div class="game__say" :class="state" aria-live="polite">
        <template v-if="state === 'ask'">
          <button v-if="canSpeak" type="button" class="listen" @click="say(w.full)">🔊 {{ t('demo.listen') }}</button>
        </template>
        <template v-else>
          <b>{{ state === 'ok' ? t('demo.ok') : t('demo.bad') }}</b>
          <span lang="pl">{{ w.hint.pl }}</span>
          <span v-if="showPl" class="game__tr" :lang="lang">{{ w.hint[lang] }}</span>
          <span v-if="state === 'ok'" class="game__chips">
            <span class="chip" lang="uk"><b>UA</b> {{ w.uk }}</span>
            <span class="chip" lang="ru"><b>RU</b> {{ w.ru }}</span>
          </span>
        </template>
      </div>

      <button v-if="state === 'ok'" type="button" class="btn btn--primary game__next" @click="next">{{ t('demo.next') }} →</button>
    </template>

    <div v-else class="game__end">
      <Mascot :size="120" mood="wow" />
      <h3>{{ t('demo.done') }}</h3>
      <p class="game__stars" aria-hidden="true">
        <span v-for="k in 3" :key="k" :class="{ on: firstTry >= [3, 4, 5][k - 1]! }">★</span>
      </p>
      <p>{{ t('demo.doneText', { n: firstTry, total: words.length }) }}</p>
      <button type="button" class="btn" @click="restart">↺ {{ t('demo.again') }}</button>
    </div>
  </div>
</template>

<style scoped>
.game {
  display: grid;
  justify-items: center;
  gap: 18px;
  min-height: 440px;
  padding: 26px 22px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
.game__top { display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%; }
.game__q { font-family: var(--font-display); font-weight: 600; font-size: 18px; color: var(--ink-soft); }
.game__dots { display: flex; gap: 6px; }
.game__dots i { width: 14px; height: 14px; border: 2px solid var(--ink); border-radius: 50%; background: var(--white); }
.game__dots i.now { background: var(--g1); }
.game__dots i.done { background: var(--green); }

.game__word {
  display: flex;
  align-items: baseline;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(56px, 12vw, 88px);
  line-height: 1;
  letter-spacing: .02em;
}
.game__gap {
  display: inline-grid;
  place-items: center;
  min-width: .9em;
  margin-inline: 4px;
  color: var(--muted);
  border-bottom: 5px dashed var(--muted);
}
.ok .game__gap { color: var(--pl); border-bottom: 5px solid var(--pl); animation: pop-in .35s var(--ease-bounce); }
.game__word.bad { animation: shake .4s; }

.game__btns { display: flex; gap: 16px; }
.letter {
  width: 88px;
  height: 88px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  background: var(--white);
  border: var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform .15s var(--ease-bounce), box-shadow .15s ease;
}
.letter:hover { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--ink); }
.letter:active { transform: translate(3px, 3px); box-shadow: 0 0 0 var(--ink); }
.letter.right { background: var(--green-soft); }
.letter[disabled] { opacity: .35; pointer-events: none; }

.game__say {
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  min-height: 64px;
  padding: 12px 16px;
  text-align: center;
  font-size: 16px;
  line-height: 1.4;
  background: var(--paper);
  border-radius: 18px;
}
.game__say.ok { background: var(--green-soft); }
.game__say.bad { background: var(--g1-soft); }
.game__say b { font-family: var(--font-display); font-weight: 600; font-size: 19px; }
.game__tr { color: var(--ink-soft); font-size: 15px; }
.game__chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 4px; }
.game__chips b { font-size: 11px; color: var(--muted); }
.listen {
  padding: 8px 16px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  background: var(--white);
  border: 2px solid var(--ink);
  border-radius: 99px;
  cursor: pointer;
}
.listen:hover { background: var(--g1-soft); }

.game__end { display: grid; justify-items: center; align-content: center; gap: 12px; min-height: 390px; text-align: center; }
.game__end h3 { font-size: 30px; }
.game__stars { display: flex; gap: 6px; font-size: 44px; line-height: 1; color: var(--paper-deep); -webkit-text-stroke: 2px var(--ink); }
.game__stars .on { color: var(--g1); }

@media (max-width: 420px) {
  .letter { width: 76px; height: 76px; font-size: 42px; }
}
</style>
