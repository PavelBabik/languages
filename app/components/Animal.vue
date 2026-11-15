<script setup lang="ts">
import type { AnimalKind } from '~/data/polski/cwiczenia/world'
/**
 * Zwierzaki-przewodnicy po Krainie Polskiego (rysowane w SVG, bez plików):
 *  jez    — Jeż Józek (ó / u)
 *  zaba   — Żaba Żaneta (rz / ż)
 *  chomik — Chomik Hubert (ch / h)
 *  kot    — Kot Kacper (przypadki)
 *  sowa   — Sowa Bożena (dyktando)
 * mood: happy | joy | wow | think | sad;  act: idle | jump | shake | walk
 */
type Mood = 'happy' | 'joy' | 'wow' | 'think' | 'sad'

const props = withDefaults(
  defineProps<{ kind: AnimalKind; mood?: Mood; act?: 'idle' | 'jump' | 'shake' | 'walk'; size?: number; gray?: boolean }>(),
  { mood: 'happy', act: 'idle', size: 140, gray: false }
)

const INK = 'var(--ink)'

/* kolce jeża: zygzak po górnym łuku */
const spikes = (() => {
  const cx = 70, cy = 82, n = 15
  let d = ''
  for (let i = 0; i <= n * 2; i++) {
    const a = Math.PI * (1.02 + (i / (n * 2)) * 0.96)
    const r = i % 2 ? 64 : 46
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)} `
  }
  return `${d} L${cx + 46} ${cy + 20} Q70 ${cy + 52} ${cx - 46} ${cy + 20} Z`
})()

/* gdzie są oczy i usta u każdego zwierzaka */
const face = computed(() => {
  switch (props.kind) {
    case 'jez': return { eyes: [[58, 84], [82, 84]], mouth: [70, 104], cheeks: [[47, 98], [93, 98]], r: 5.5 }
    case 'zaba': return { eyes: [[47, 44], [93, 44]], mouth: [70, 84], cheeks: [[38, 78], [102, 78]], r: 7 }
    case 'chomik': return { eyes: [[55, 70], [85, 70]], mouth: [70, 90], cheeks: [[40, 86], [100, 86]], r: 6 }
    case 'kot': return { eyes: [[54, 70], [86, 70]], mouth: [70, 90], cheeks: [[40, 84], [100, 84]], r: 6.5 }
    case 'kaczka': return { eyes: [[57, 52], [83, 52]], mouth: [70, 0], cheeks: [[44, 66], [96, 66]], r: 5.5 }
    case 'waz': return { eyes: [[57, 52], [83, 52]], mouth: [70, 72], cheeks: [[45, 64], [95, 64]], r: 6.5 }
    case 'wiewiorka': return { eyes: [[50, 60], [74, 60]], mouth: [62, 82], cheeks: [[38, 74], [86, 74]], r: 5.5 }
    case 'mysz': return { eyes: [[59, 72], [81, 72]], mouth: [70, 90], cheeks: [[47, 84], [93, 84]], r: 5.5 }
    case 'papuga': return { eyes: [[58, 46], [82, 46]], mouth: [70, 0], cheeks: [[48, 58], [92, 58]], r: 5.5 }
    case 'slimak': return { eyes: [[28, 40], [50, 38]], mouth: [38, 88], cheeks: [[24, 82], [52, 82]], r: 5 }
    case 'pajak': return { eyes: [[58, 74], [82, 74]], mouth: [70, 92], cheeks: [[48, 88], [92, 88]], r: 7 }
    case 'mrowka': return { eyes: [[42, 72], [62, 72]], mouth: [52, 88], cheeks: [[32, 84], [70, 84]], r: 5.5 }
    case 'zyrafa': return { eyes: [[60, 38], [80, 38]], mouth: [70, 58], cheeks: [[50, 48], [90, 48]], r: 5 }
    case 'bobr': return { eyes: [[56, 52], [84, 52]], mouth: [70, 0], cheeks: [[42, 66], [98, 66]], r: 6 }
    case 'kameleon': return { eyes: [[46, 60], [72, 58]], mouth: [56, 80], cheeks: [[32, 74], [84, 72]], r: 6 }
    default: return { eyes: [[52, 62], [88, 62]], mouth: [70, 84], cheeks: [[40, 82], [100, 82]], r: 7 }
  }
})
</script>

<template>
  <svg
    class="animal"
    :class="[`animal--${act}`, { 'animal--gray': gray }]"
    :width="size"
    :height="size"
    viewBox="0 0 140 140"
    aria-hidden="true"
  >
    <ellipse cx="70" cy="135" rx="36" ry="4.5" fill="rgba(31,29,54,.15)" class="animal__shadow" />
    <g class="animal__body">
      <!-- ================= JEŻ ================= -->
      <template v-if="kind === 'jez'">
        <path :d="spikes" fill="#8a5a3c" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M40 60 L48 50 M58 44 L62 34 M80 34 L84 44 M94 50 L102 60" stroke="#5f3b26" stroke-width="3" stroke-linecap="round" />
        <circle cx="46" cy="68" r="8" fill="#f2c99a" :stroke="INK" stroke-width="3" />
        <circle cx="94" cy="68" r="8" fill="#f2c99a" :stroke="INK" stroke-width="3" />
        <ellipse cx="70" cy="94" rx="34" ry="30" fill="#f7dcb4" :stroke="INK" stroke-width="3.5" />
        <!-- szalik -->
        <path d="M40 112 Q70 128 100 112 L102 122 Q70 138 38 122 Z" fill="#e8364f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M86 122 L92 136 L100 132 L96 120" fill="#e8364f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="70" cy="100" rx="6" ry="4.5" :fill="INK" />
      </template>

      <!-- ================= ŻABA ================= -->
      <template v-else-if="kind === 'zaba'">
        <ellipse cx="70" cy="112" rx="34" ry="20" fill="#5cc36a" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="70" cy="116" rx="20" ry="12" fill="#c9f0b8" />
        <ellipse cx="70" cy="76" rx="50" ry="34" fill="#6fd47c" :stroke="INK" stroke-width="3.5" />
        <circle cx="47" cy="44" r="18" fill="#6fd47c" :stroke="INK" stroke-width="3.5" />
        <circle cx="93" cy="44" r="18" fill="#6fd47c" :stroke="INK" stroke-width="3.5" />
        <circle cx="47" cy="44" r="12" fill="#fff" />
        <circle cx="93" cy="44" r="12" fill="#fff" />
        <!-- kokarda -->
        <path d="M70 34 L56 26 L56 42 Z M70 34 L84 26 L84 42 Z" fill="#ff7bb0" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="70" cy="34" r="4.5" fill="#ff7bb0" :stroke="INK" stroke-width="2.5" />
        <circle cx="64" cy="70" r="2" :fill="INK" /><circle cx="76" cy="70" r="2" :fill="INK" />
      </template>

      <!-- ================= CHOMIK ================= -->
      <template v-else-if="kind === 'chomik'">
        <circle cx="38" cy="40" r="12" fill="#f0a64a" :stroke="INK" stroke-width="3.5" />
        <circle cx="102" cy="40" r="12" fill="#f0a64a" :stroke="INK" stroke-width="3.5" />
        <circle cx="38" cy="40" r="6" fill="#ffb3c1" />
        <circle cx="102" cy="40" r="6" fill="#ffb3c1" />
        <path d="M70 26 C112 26 124 60 122 88 C120 118 98 132 70 132 C42 132 20 118 18 88 C16 60 28 26 70 26Z" fill="#f4b45e" :stroke="INK" stroke-width="3.5" />
        <path d="M70 62 C96 62 106 84 104 102 C102 120 88 128 70 128 C52 128 38 120 36 102 C34 84 44 62 70 62Z" fill="#fff4e2" />
        <ellipse cx="34" cy="90" rx="14" ry="12" fill="#fff4e2" />
        <ellipse cx="106" cy="90" rx="14" ry="12" fill="#fff4e2" />
        <path d="M66 82 L74 82 L70 86 Z" fill="#ff8aa0" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        <!-- łapki z ziarenkiem -->
        <ellipse cx="70" cy="110" rx="9" ry="11" fill="#c98b3a" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="58" cy="108" rx="7" ry="5" fill="#f4b45e" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="82" cy="108" rx="7" ry="5" fill="#f4b45e" :stroke="INK" stroke-width="2.5" />
      </template>

      <!-- ================= KOT ================= -->
      <template v-else-if="kind === 'kot'">
        <path d="M104 118 C130 114 132 90 118 82" fill="none" :stroke="INK" stroke-width="12" stroke-linecap="round" />
        <path d="M104 118 C130 114 132 90 118 82" fill="none" stroke="#ff9b3d" stroke-width="6" stroke-linecap="round" />
        <ellipse cx="70" cy="116" rx="30" ry="18" fill="#ff9b3d" :stroke="INK" stroke-width="3.5" />
        <path d="M30 52 L34 14 L58 36 Z" fill="#ff9b3d" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M110 52 L106 14 L82 36 Z" fill="#ff9b3d" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M36 42 L38 24 L50 36 Z M104 42 L102 24 L90 36 Z" fill="#ffb3c1" />
        <ellipse cx="70" cy="70" rx="46" ry="40" fill="#ffab55" :stroke="INK" stroke-width="3.5" />
        <path d="M62 32 L64 44 M70 30 L70 44 M78 32 L76 44" stroke="#d9772a" stroke-width="4" stroke-linecap="round" />
        <ellipse cx="70" cy="88" rx="20" ry="14" fill="#fff1df" />
        <path d="M65 80 L75 80 L70 86 Z" fill="#ff7b93" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        <path d="M26 82 L46 84 M26 92 L46 89 M114 82 L94 84 M114 92 L94 89" :stroke="INK" stroke-width="2.2" stroke-linecap="round" />
        <!-- czapka podróżnika -->
        <path d="M44 38 Q70 18 96 38 Z" fill="#2f6fdb" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M84 36 Q104 34 112 42 Q98 44 86 42 Z" fill="#2f6fdb" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
      </template>

      <!-- ================= KACZKA ================= -->
      <template v-else-if="kind === 'kaczka'">
        <ellipse cx="56" cy="132" rx="9" ry="4" fill="#ff9a3c" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="84" cy="132" rx="9" ry="4" fill="#ff9a3c" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="70" cy="106" rx="42" ry="28" fill="#ffd84d" :stroke="INK" stroke-width="3.5" />
        <path d="M30 100 Q14 92 22 80 Q38 84 42 98 Z" fill="#ffc21f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M110 100 Q126 92 118 80 Q102 84 98 98 Z" fill="#ffc21f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <circle cx="70" cy="56" r="34" fill="#ffe066" :stroke="INK" stroke-width="3.5" />
        <path d="M66 22 Q70 12 76 20" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
        <!-- kwiatek -->
        <g transform="translate(94 28)">
          <circle cx="0" cy="-7" r="5" fill="#ff8fb8" :stroke="INK" stroke-width="2" />
          <circle cx="7" cy="0" r="5" fill="#ff8fb8" :stroke="INK" stroke-width="2" />
          <circle cx="0" cy="7" r="5" fill="#ff8fb8" :stroke="INK" stroke-width="2" />
          <circle cx="-7" cy="0" r="5" fill="#ff8fb8" :stroke="INK" stroke-width="2" />
          <circle cx="0" cy="0" r="4" fill="#ffd23f" :stroke="INK" stroke-width="2" />
        </g>
        <!-- dziób -->
        <path d="M52 70 Q70 60 88 70 Q70 80 52 70 Z" fill="#ff9a3c" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path v-if="mood === 'happy' || mood === 'joy' || mood === 'wow'" d="M56 74 Q70 92 84 74 Q70 80 56 74 Z" fill="#ff7b2c" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path v-else d="M56 72 Q70 80 84 72" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
      </template>

      <!-- ================= WĄŻ ================= -->
      <template v-else-if="kind === 'waz'">
        <ellipse cx="70" cy="120" rx="52" ry="14" fill="#62c05a" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="70" cy="122" rx="36" ry="7" fill="#c8f2b8" />
        <ellipse cx="72" cy="104" rx="40" ry="13" fill="#74d36b" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="72" cy="106" rx="26" ry="6" fill="#c8f2b8" />
        <path d="M56 100 C52 90 56 84 62 80 L80 80 C86 84 90 90 86 100 Z" fill="#74d36b" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <ellipse cx="70" cy="56" rx="38" ry="30" fill="#86e07c" :stroke="INK" stroke-width="3.5" />
        <circle cx="50" cy="36" r="4" fill="#4fae47" /><circle cx="88" cy="34" r="5" fill="#4fae47" /><circle cx="70" cy="30" r="3.5" fill="#4fae47" />
        <circle cx="38" cy="112" r="3.5" fill="#3f9c38" /><circle cx="104" cy="116" r="3.5" fill="#3f9c38" /><circle cx="96" cy="100" r="3" fill="#3f9c38" />
        <!-- muszka -->
        <path d="M70 88 L56 81 L56 95 Z M70 88 L84 81 L84 95 Z" fill="#ffb627" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="70" cy="88" r="4" fill="#ffb627" :stroke="INK" stroke-width="2.5" />
        <path v-if="mood === 'joy'" d="M70 80 L70 92 M70 92 L66 98 M70 92 L74 98" stroke="#e8364f" stroke-width="2.5" stroke-linecap="round" fill="none" />
      </template>

      <!-- ================= WIEWIÓRKA ================= -->
      <template v-else-if="kind === 'wiewiorka'">
        <path d="M86 128 C132 122 140 62 116 32 C104 16 80 24 90 42 C104 62 102 98 82 114 Z" fill="#d9772a" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M104 44 C118 62 118 96 100 116" fill="none" stroke="#f0a35a" stroke-width="6" stroke-linecap="round" />
        <ellipse cx="62" cy="112" rx="28" ry="22" fill="#e8913f" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="62" cy="116" rx="16" ry="14" fill="#ffe2c0" />
        <path d="M36 44 L40 18 L56 36 Z" fill="#e8913f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M88 44 L86 18 L70 36 Z" fill="#e8913f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M40 18 L36 10 M40 18 L44 10 M86 18 L82 10 M86 18 L90 10" :stroke="INK" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="62" cy="64" r="32" fill="#f09a4a" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="62" cy="78" rx="17" ry="12" fill="#ffe2c0" />
        <ellipse cx="62" cy="73" rx="4" ry="3" :fill="INK" />
        <!-- żołądź -->
        <ellipse cx="62" cy="112" rx="9" ry="11" fill="#c98b3a" :stroke="INK" stroke-width="2.5" />
        <path d="M52 106 Q62 96 72 106 Z" fill="#7a4b22" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <ellipse cx="50" cy="110" rx="6" ry="5" fill="#e8913f" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="74" cy="110" rx="6" ry="5" fill="#e8913f" :stroke="INK" stroke-width="2.5" />
      </template>

      <!-- ================= MYSZ ================= -->
      <template v-else-if="kind === 'mysz'">
        <path d="M94 120 C118 124 128 108 122 96 C118 88 108 92 112 100" fill="none" stroke="#ff9ab0" stroke-width="5" stroke-linecap="round" />
        <ellipse cx="70" cy="114" rx="28" ry="18" fill="#b9bccb" :stroke="INK" stroke-width="3.5" />
        <circle cx="40" cy="42" r="21" fill="#b9bccb" :stroke="INK" stroke-width="3.5" />
        <circle cx="100" cy="42" r="21" fill="#b9bccb" :stroke="INK" stroke-width="3.5" />
        <circle cx="40" cy="42" r="12" fill="#ffb3c6" />
        <circle cx="100" cy="42" r="12" fill="#ffb3c6" />
        <ellipse cx="70" cy="74" rx="32" ry="28" fill="#c8cbd8" :stroke="INK" stroke-width="3.5" />
        <circle cx="70" cy="84" r="5" fill="#ff7b93" :stroke="INK" stroke-width="2" />
        <path d="M48 84 L30 80 M48 88 L30 90 M92 84 L110 80 M92 88 L110 90" :stroke="INK" stroke-width="2" stroke-linecap="round" />
        <path d="M60 108 L80 108 L76 126 L64 126 Z" fill="#ffd23f" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="67" cy="115" r="2" fill="#e0a800" /><circle cx="73" cy="120" r="2" fill="#e0a800" />
      </template>

      <!-- ================= PAPUGA ================= -->
      <template v-else-if="kind === 'papuga'">
        <path d="M60 120 L54 138 M66 122 L66 138 M74 122 L80 138" stroke="#4d86ff" stroke-width="7" stroke-linecap="round" />
        <ellipse cx="70" cy="98" rx="30" ry="34" fill="#ff5d5d" :stroke="INK" stroke-width="3.5" />
        <path d="M42 86 Q30 108 44 126 Q54 112 52 90 Z" fill="#4d86ff" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M98 86 Q110 108 96 126 Q86 112 88 90 Z" fill="#ffd23f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="70" cy="104" rx="16" ry="20" fill="#ffb3a8" />
        <path d="M60 26 Q62 10 70 20 Q74 6 80 22 Q90 12 86 30" fill="#ffd23f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <circle cx="70" cy="50" r="28" fill="#ff6b6b" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="58" cy="46" rx="11" ry="10" fill="#fff" />
        <ellipse cx="82" cy="46" rx="11" ry="10" fill="#fff" />
        <path d="M62 58 Q70 54 80 58 Q82 70 70 78 Q66 70 62 58 Z" fill="#ffb627" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path v-if="mood === 'happy' || mood === 'joy' || mood === 'wow'" d="M64 64 Q70 72 76 64" fill="none" :stroke="INK" stroke-width="2.5" stroke-linecap="round" />
      </template>

      <!-- ================= ŚLIMAK ================= -->
      <template v-else-if="kind === 'slimak'">
        <path d="M10 126 Q20 104 34 100 L112 112 Q126 120 120 128 Z" fill="#b6ec8a" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <circle cx="86" cy="84" r="34" fill="#ffb15c" :stroke="INK" stroke-width="3.5" />
        <path d="M86 84 m0 -6 a6 6 0 1 1 -6 6 a12 12 0 1 1 12 12 a18 18 0 1 1 -18 -18 a24 24 0 1 1 24 24" fill="none" stroke="#d97a1f" stroke-width="4" stroke-linecap="round" />
        <path d="M22 116 C16 96 22 72 38 66 C54 62 58 86 52 104" fill="#c6f39e" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M30 70 L26 46 M44 68 L50 44" :stroke="INK" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="28" cy="40" r="10" fill="#c6f39e" :stroke="INK" stroke-width="3" />
        <circle cx="50" cy="38" r="10" fill="#c6f39e" :stroke="INK" stroke-width="3" />
      </template>

      <!-- ================= PAJĄK ================= -->
      <template v-else-if="kind === 'pajak'">
        <path d="M70 0 L70 50" stroke="#c9c9d6" stroke-width="2" />
        <path d="M42 70 Q16 54 10 70 M40 82 Q12 80 8 96 M42 94 Q18 104 16 122 M48 104 Q34 124 36 136 M98 70 Q124 54 130 70 M100 82 Q128 80 132 96 M98 94 Q122 104 124 122 M92 104 Q106 124 104 136" fill="none" :stroke="INK" stroke-width="5" stroke-linecap="round" />
        <circle cx="70" cy="82" r="34" fill="#8c6cf0" :stroke="INK" stroke-width="3.5" />
        <circle cx="58" cy="74" r="12" fill="#fff" />
        <circle cx="82" cy="74" r="12" fill="#fff" />
        <circle cx="52" cy="58" r="4" fill="#b9a5ff" /><circle cx="88" cy="56" r="3" fill="#b9a5ff" /><circle cx="70" cy="54" r="3.5" fill="#b9a5ff" />
        <!-- muszka -->
        <path d="M70 112 L58 106 L58 118 Z M70 112 L82 106 L82 118 Z" fill="#ff6b8a" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="70" cy="112" r="3.5" fill="#ff6b8a" :stroke="INK" stroke-width="2.5" />
      </template>

      <!-- ================= MRÓWKA ================= -->
      <template v-else-if="kind === 'mrowka'">
        <path d="M70 104 L60 130 M82 106 L84 132 M92 104 L104 128" :stroke="INK" stroke-width="4.5" stroke-linecap="round" />
        <ellipse cx="108" cy="102" rx="24" ry="20" fill="#d4573f" :stroke="INK" stroke-width="3.5" />
        <path d="M96 90 Q108 98 120 90" fill="none" stroke="#a83d29" stroke-width="3" />
        <ellipse cx="80" cy="100" rx="13" ry="11" fill="#e0664d" :stroke="INK" stroke-width="3.5" />
        <path d="M40 54 Q30 26 18 24 M62 52 Q70 26 84 22" fill="none" :stroke="INK" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="18" cy="24" r="5" fill="#d4573f" :stroke="INK" stroke-width="2.5" />
        <circle cx="84" cy="22" r="5" fill="#d4573f" :stroke="INK" stroke-width="2.5" />
        <circle cx="52" cy="78" r="28" fill="#ea7458" :stroke="INK" stroke-width="3.5" />
        <!-- kask -->
        <path d="M28 66 Q52 38 76 66 Z" fill="#ffd23f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <rect x="24" y="63" width="56" height="6" rx="3" fill="#ffd23f" :stroke="INK" stroke-width="2.5" />
      </template>

      <!-- ================= ŻYRAFA ================= -->
      <template v-else-if="kind === 'zyrafa'">
        <ellipse cx="80" cy="124" rx="36" ry="13" fill="#f6c453" :stroke="INK" stroke-width="3.5" />
        <path d="M58 130 L58 70 Q58 62 66 62 L76 62 Q82 62 82 70 L82 128 Z" fill="#f6c453" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <circle cx="66" cy="84" r="5" fill="#c9832e" /><circle cx="76" cy="100" r="6" fill="#c9832e" /><circle cx="64" cy="114" r="5" fill="#c9832e" />
        <circle cx="96" cy="120" r="5" fill="#c9832e" /><circle cx="108" cy="126" r="4" fill="#c9832e" />
        <path d="M60 22 L58 8 M80 22 L82 8" :stroke="INK" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="58" cy="7" r="4.5" fill="#c9832e" :stroke="INK" stroke-width="2.5" />
        <circle cx="82" cy="7" r="4.5" fill="#c9832e" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="42" cy="32" rx="10" ry="5" fill="#f6c453" :stroke="INK" stroke-width="2.5" transform="rotate(-20 42 32)" />
        <ellipse cx="98" cy="32" rx="10" ry="5" fill="#f6c453" :stroke="INK" stroke-width="2.5" transform="rotate(20 98 32)" />
        <ellipse cx="70" cy="40" rx="26" ry="22" fill="#f8cf63" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="70" cy="54" rx="17" ry="10" fill="#ffe9b0" :stroke="INK" stroke-width="2.5" />
        <circle cx="64" cy="52" r="1.8" :fill="INK" /><circle cx="76" cy="52" r="1.8" :fill="INK" />
      </template>

      <!-- ================= BÓBR ================= -->
      <template v-else-if="kind === 'bobr'">
        <ellipse cx="104" cy="124" rx="28" ry="10" fill="#6b4426" :stroke="INK" stroke-width="3" transform="rotate(-12 104 124)" />
        <path d="M86 120 L122 116 M90 128 L124 124 M96 116 L100 132 M108 114 L112 130" stroke="#4e2f18" stroke-width="2" />
        <ellipse cx="70" cy="106" rx="38" ry="28" fill="#a86b3c" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="70" cy="110" rx="22" ry="18" fill="#e3b98a" />
        <ellipse cx="54" cy="126" rx="9" ry="6" fill="#7a4b22" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="86" cy="126" rx="9" ry="6" fill="#7a4b22" :stroke="INK" stroke-width="2.5" />
        <circle cx="44" cy="32" r="9" fill="#a86b3c" :stroke="INK" stroke-width="3" />
        <circle cx="96" cy="32" r="9" fill="#a86b3c" :stroke="INK" stroke-width="3" />
        <circle cx="70" cy="56" r="33" fill="#b97a45" :stroke="INK" stroke-width="3.5" />
        <ellipse cx="70" cy="76" rx="19" ry="13" fill="#e3b98a" />
        <ellipse cx="70" cy="68" rx="8" ry="5.5" :fill="INK" />
        <path d="M70 74 L70 78" :stroke="INK" stroke-width="2.5" stroke-linecap="round" />
        <path v-if="mood === 'sad'" d="M58 84 Q70 76 82 84" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
        <path v-else d="M58 78 Q70 86 82 78" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
        <rect x="63" y="82" width="7" height="11" rx="2" fill="#fff" :stroke="INK" stroke-width="2.2" />
        <rect x="70" y="82" width="7" height="11" rx="2" fill="#fff" :stroke="INK" stroke-width="2.2" />
        <!-- kask budowniczego -->
        <path d="M42 34 Q70 6 98 34 Z" fill="#ffb627" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <rect x="38" y="31" width="64" height="7" rx="3" fill="#ffb627" :stroke="INK" stroke-width="3" />
      </template>

      <!-- ================= KAMELEON ================= -->
      <template v-else-if="kind === 'kameleon'">
        <path d="M100 104 C126 104 132 76 114 70 C100 66 96 82 106 86 C112 88 114 80 110 78" fill="none" :stroke="INK" stroke-width="13" stroke-linecap="round" />
        <path d="M100 104 C126 104 132 76 114 70 C100 66 96 82 106 86 C112 88 114 80 110 78" fill="none" stroke="#5cc97a" stroke-width="7" stroke-linecap="round" />
        <ellipse cx="72" cy="104" rx="40" ry="24" fill="#6fd38a" :stroke="INK" stroke-width="3.5" />
        <path d="M44 92 Q72 76 104 94" fill="none" stroke="#ff6b8a" stroke-width="5" stroke-linecap="round" />
        <path d="M46 99 Q72 85 106 101" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round" />
        <path d="M48 106 Q72 94 106 108" fill="none" stroke="#5aa8ff" stroke-width="5" stroke-linecap="round" />
        <path d="M50 124 L46 134 M66 126 L64 135 M86 125 L88 134 M98 120 L104 130" :stroke="INK" stroke-width="5" stroke-linecap="round" />
        <path d="M30 70 C24 40 52 22 76 32 C92 38 96 60 86 76 C76 92 40 94 30 70Z" fill="#7fe09a" :stroke="INK" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M44 30 L52 18 L58 30 L66 20 L70 32" fill="#ff8fb8" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="46" cy="60" r="11" fill="#c9f5d4" :stroke="INK" stroke-width="2.5" />
        <circle cx="72" cy="58" r="11" fill="#c9f5d4" :stroke="INK" stroke-width="2.5" />
      </template>

      <!-- ================= SOWA ================= -->
      <template v-else>
        <path d="M30 34 L42 46 M110 34 L98 46" :stroke="INK" stroke-width="3" />
        <path d="M70 18 C108 18 120 50 118 84 C116 116 96 130 70 130 C44 130 24 116 22 84 C20 50 32 18 70 18Z" fill="#9b7be8" :stroke="INK" stroke-width="3.5" />
        <path d="M28 30 L44 44 L36 50 Z M112 30 L96 44 L104 50 Z" fill="#9b7be8" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M70 80 C94 80 102 98 100 112 C98 124 86 128 70 128 C54 128 42 124 40 112 C38 98 46 80 70 80Z" fill="#e8ddff" />
        <path d="M58 96 l4 4 l4 -4 M74 96 l4 4 l4 -4 M66 108 l4 4 l4 -4" fill="none" stroke="#b9a3f0" stroke-width="2.5" />
        <circle cx="52" cy="62" r="17" fill="#fff" :stroke="INK" stroke-width="3" />
        <circle cx="88" cy="62" r="17" fill="#fff" :stroke="INK" stroke-width="3" />
        <path d="M64 74 L76 74 L70 84 Z" fill="#ffb627" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <!-- okulary -->
        <path d="M69 60 L71 60" :stroke="INK" stroke-width="3" />
        <!-- biret -->
        <path d="M40 20 L70 8 L100 20 L70 32 Z" fill="var(--ink)" />
        <path d="M100 20 L104 36" stroke="#ffb627" stroke-width="3" stroke-linecap="round" />
        <circle cx="104" cy="38" r="3.5" fill="#ffb627" />
      </template>

      <!-- ====== twarz (wspólna) ====== -->
      <g class="animal__eyes">
        <template v-for="(e, i) in face.eyes" :key="i">
          <path
            v-if="mood === 'joy'"
            :d="`M${e[0]! - 7} ${e[1]! + 2} Q${e[0]} ${e[1]! - 8} ${e[0]! + 7} ${e[1]! + 2}`"
            fill="none" :stroke="INK" stroke-width="4" stroke-linecap="round"
          />
          <path
            v-else-if="mood === 'sad'"
            :d="`M${e[0]! - 7} ${e[1]! - 2} Q${e[0]} ${e[1]! + 6} ${e[0]! + 7} ${e[1]! - 2}`"
            fill="none" :stroke="INK" stroke-width="4" stroke-linecap="round"
          />
          <template v-else>
            <ellipse :cx="e[0]" :cy="mood === 'think' ? e[1]! - 2 : e[1]" :rx="face.r * (mood === 'wow' ? 1.25 : 1)" :ry="face.r * (mood === 'wow' ? 1.45 : 1.2)" :fill="INK" />
            <circle :cx="e[0]! + 2" :cy="(mood === 'think' ? e[1]! - 2 : e[1]!) - 3" :r="face.r * 0.38" fill="#fff" />
            <circle :cx="e[0]! - 2" :cy="(mood === 'think' ? e[1]! - 2 : e[1]!) + 3" :r="face.r * 0.18" fill="#fff" />
          </template>
        </template>
      </g>
      <ellipse v-for="(c, i) in face.cheeks" :key="`c${i}`" :cx="c[0]" :cy="c[1]" rx="7" ry="4.5" fill="#ff8fa3" opacity=".7" />
      <template v-if="kind === 'kaczka' || kind === 'bobr' || kind === 'papuga'" />
      <path v-else-if="mood === 'happy' || mood === 'joy'" :d="`M${face.mouth[0] - 9} ${face.mouth[1]} Q${face.mouth[0]} ${face.mouth[1] + 12} ${face.mouth[0] + 9} ${face.mouth[1]} Z`" fill="#c2364b" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
      <ellipse v-else-if="mood === 'wow'" :cx="face.mouth[0]" :cy="face.mouth[1] + 4" rx="6" ry="7" fill="#c2364b" :stroke="INK" stroke-width="3" />
      <path v-else-if="mood === 'think'" :d="`M${face.mouth[0] - 7} ${face.mouth[1] + 4} Q${face.mouth[0] + 2} ${face.mouth[1]} ${face.mouth[0] + 8} ${face.mouth[1] + 5}`" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
      <path v-else :d="`M${face.mouth[0] - 8} ${face.mouth[1] + 8} Q${face.mouth[0]} ${face.mouth[1]} ${face.mouth[0] + 8} ${face.mouth[1] + 8}`" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
    </g>
  </svg>
</template>

<style scoped>
.animal { overflow: visible; }
.animal__body { transform-origin: 70px 132px; animation: idle 2.8s ease-in-out infinite; }
.animal--jump .animal__body { animation: jump .7s cubic-bezier(.3, 1.6, .5, 1); }
.animal--shake .animal__body { animation: no .5s ease-in-out; }
.animal--walk .animal__body { animation: walk .45s ease-in-out infinite; }
.animal--gray { filter: grayscale(1) brightness(1.15); opacity: .55; }
.animal__eyes { transform-box: fill-box; transform-origin: center; animation: blink 5s infinite; }
@keyframes idle { 0%, 100% { transform: translateY(0) scale(1, 1); } 50% { transform: translateY(-3px) scale(1.02, .98); } }
@keyframes jump {
  0% { transform: translateY(0) scale(1, 1); }
  20% { transform: translateY(0) scale(1.15, .82); }
  50% { transform: translateY(-34px) scale(.92, 1.1) rotate(-6deg); }
  80% { transform: translateY(0) scale(1.1, .9); }
  100% { transform: translateY(0) scale(1, 1); }
}
@keyframes no { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-8deg); } 75% { transform: rotate(8deg); } }
@keyframes walk { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-6px) rotate(4deg); } }
@keyframes blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(.1); } }
</style>
