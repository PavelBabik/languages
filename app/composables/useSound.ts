/**
 * Krótkie dźwięki nagrody (Web Audio, bez plików). Można wyłączyć — zapisujemy w cookie.
 * Celowo ciche i miękkie: radość, nie hałas.
 */
let ctx: AudioContext | null = null

type Kind = 'ok' | 'bad' | 'pop' | 'combo' | 'win' | 'star' | 'jump' | 'coin' | 'splash' | 'fever'

const NOTES: Record<Kind, { f: number[]; d: number; type: OscillatorType; v: number }> = {
  ok: { f: [660, 880], d: 0.09, type: 'triangle', v: 0.16 },
  bad: { f: [260, 220], d: 0.12, type: 'sine', v: 0.12 },
  pop: { f: [990], d: 0.06, type: 'sine', v: 0.12 },
  combo: { f: [660, 830, 990, 1320], d: 0.07, type: 'triangle', v: 0.14 },
  win: { f: [523, 659, 784, 1046, 1318], d: 0.11, type: 'triangle', v: 0.16 },
  star: { f: [1046, 1568], d: 0.08, type: 'sine', v: 0.13 },
  jump: { f: [392, 523, 659], d: 0.05, type: 'square', v: 0.06 },
  coin: { f: [1318, 1760], d: 0.06, type: 'square', v: 0.07 },
  splash: { f: [180, 140, 110], d: 0.09, type: 'sawtooth', v: 0.05 },
  fever: { f: [523, 659, 784, 1046, 784, 1046, 1318], d: 0.07, type: 'square', v: 0.07 }
}

export function useSound() {
  const on = useCookie<boolean>('el_sound', { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', default: () => true })

  function play(kind: Kind) {
    if (!on.value || typeof window === 'undefined') return
    try {
      ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      if (ctx.state === 'suspended') void ctx.resume()
      const n = NOTES[kind]
      const t0 = ctx.currentTime
      n.f.forEach((f, i) => {
        const o = ctx!.createOscillator()
        const g = ctx!.createGain()
        o.type = n.type
        o.frequency.value = f
        const s = t0 + i * n.d * 0.85
        g.gain.setValueAtTime(0, s)
        g.gain.linearRampToValueAtTime(n.v, s + 0.01)
        g.gain.exponentialRampToValueAtTime(0.0001, s + n.d * 1.8)
        o.connect(g).connect(ctx!.destination)
        o.start(s)
        o.stop(s + n.d * 2)
      })
    } catch {
      /* brak dźwięku — nic się nie stało */
    }
  }

  return { on, play }
}
