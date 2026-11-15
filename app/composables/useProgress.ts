/**
 * Postęp: gwiazdki za poziomy, punkty XP i seria dni.
 * Wszystko tylko w cookie na urządzeniu — bez kont.
 */
const OPT = { maxAge: 60 * 60 * 24 * 365 * 2, sameSite: 'lax' as const }

const today = () => new Date().toISOString().slice(0, 10)
const yesterday = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10)

export function useProgress() {
  const stars = useCookie<Record<string, number>>('el_progress', { ...OPT, default: () => ({}) })
  const xp = useCookie<number>('el_xp', { ...OPT, default: () => 0 })
  const days = useCookie<{ last: string; n: number }>('el_days', { ...OPT, default: () => ({ last: '', n: 0 }) })

  function save(key: string, n: number) {
    const prev = stars.value?.[key] ?? 0
    if (n > prev) stars.value = { ...stars.value, [key]: n }
  }

  function addXp(n: number) {
    xp.value = (Number(xp.value) || 0) + n
  }

  /** wywołujemy po każdym skończonym poziomie */
  function touchDay() {
    const d = days.value ?? { last: '', n: 0 }
    if (d.last === today()) return
    days.value = { last: today(), n: d.last === yesterday() ? d.n + 1 : 1 }
  }

  /** seria jest „żywa”, jeśli ostatnio grano dziś albo wczoraj */
  const streak = computed(() => {
    const d = days.value
    return d && (d.last === today() || d.last === yesterday()) ? d.n : 0
  })

  return { stars, xp, streak, save, addXp, touchDay }
}
