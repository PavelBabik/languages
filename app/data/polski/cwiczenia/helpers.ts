import type { L } from '~/types/content'
import type { Item, Level } from './types'

/** Wspólne pomocniki do tematów gramatycznych (zdania z luką, wyróżnione słowo, poziom). */

export const l = (pl: string, uk: string, ru: string): L => ({ pl, uk, ru })

export const SENT = l('Które słowo pasuje?', 'Яке слово підходить?', 'Какое слово подходит?')
export const WHICH = l('Które zdanie jest poprawne?', 'Яке речення правильне?', 'Какое предложение правильное?')

/**
 * Zdanie z (odpowiedzią). Jeśli odpowiedź zaczyna się wielką literą — opcje też.
 * `keepCase` — nie zmieniaj wielkości liter w opcjach (np. ćwiczenia z wielką literą).
 */
export function gap(s: string, opts: string[], hint: L, tag: string, uk: string, ru: string, proof?: string, keepCase = false): Item {
  const a = s.indexOf('(')
  const b = s.indexOf(')', a)
  const mid = s.slice(a + 1, b)
  const cap = !keepCase && mid[0] !== mid[0]!.toLowerCase()
  const o = cap ? opts.map(x => x[0]!.toUpperCase() + x.slice(1)) : opts
  const answer = o.indexOf(mid)
  if (answer < 0) throw new Error(`No answer: ${s}`)
  return { pre: s.slice(0, a), post: s.slice(b + 1), opts: o, answer, hint, proof, tr: { uk, ru }, tag }
}

/** Zdanie z [wyróżnionym] słowem; odpowiedzi to etykiety (L). */
export function mark(s: string, opts: L[], answer: number, hint: L, tag: string, uk: string, ru: string): Item {
  const a = s.indexOf('[')
  const b = s.indexOf(']')
  return { pre: s.slice(0, a), mark: s.slice(a + 1, b), post: s.slice(b + 1), opts, answer, hint, tr: { uk, ru }, say: s.replace(/[[\]]/g, ''), tag }
}

/** Wybór jednego z dwóch (kilku) całych zdań; good — indeks poprawnego. */
export function pickSentence(opts: string[], good: number, hint: L, tag: string, uk: string, ru: string): Item {
  return { pre: '', post: '', opts, answer: good, hint, tr: { uk, ru }, say: opts[good], tag }
}

export const lv = (
  id: string, icon: string, title: L, rule: L, examples: string[], items: Item[],
  prompt: L, size: 'word' | 'sentence' = 'sentence', extra: Partial<Level> = {}, round = 6
): Level => ({ id, icon, title, rule, examples, game: { id, prompt, size, items, round }, ...extra })

export const bossLv = (items: Item[], title: L, rule: L, prompt: L = SENT, size: 'word' | 'sentence' = 'sentence'): Level =>
  ({ ...lv('boss', '👑', title, rule, [], items, prompt, size, {}, 10), boss: true })

export const tip = (title: L, text: L, examples?: string[]) => ({ tip: { title, text, examples } })
