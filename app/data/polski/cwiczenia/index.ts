import type { L } from '~/types/content'
import type { Exercise, GroupId } from './types'
import { chExercise, ouExercise, rzExercise } from './litery'
import { ccExercise, eaExercise } from './litery2'
import { mixExercise } from './dyktando'
import { liczebnikiExercise } from './liczebniki'
import { przymiotnikiExercise } from './przymiotniki'
import { czasownikiExercise } from './czasowniki'
import { przyimkiExercise } from './przyimki'
import { zaimkiExercise } from './zaimki'
import { przyslowkiExercise } from './przyslowki'
import { spojnikiExercise } from './spojniki'
import { zdanieExercise } from './zdanie'
import { wielkaExercise } from './wielka'
import { rzeczownikExercise } from './rzeczownik'
import { partykulyExercise } from './partykuly'
import { czesciExercise } from './czesci'
import { frazeologiaExercise, slowotworstwoExercise } from './slowa'
import { przypadkiExercise } from './przypadki'
import { explain, lands, marks } from './world'

export type { Exercise, Game, Item, Level, Opt, Tip } from './types'
export { lands, soonLands } from './world'
export type { AnimalKind, Land } from './world'

/** Wszystkie ćwiczenia (bez podziału na klasy). Kolejność = kolejność na stronie. */
export const exercises: Exercise[] = [
  ouExercise, rzExercise, chExercise, ccExercise, eaExercise, wielkaExercise, mixExercise,
  rzeczownikExercise, przypadkiExercise, przymiotnikiExercise, czasownikiExercise, liczebnikiExercise,
  zaimkiExercise, przyslowkiExercise, przyimkiExercise, spojnikiExercise, partykulyExercise,
  czesciExercise, zdanieExercise, slowotworstwoExercise, frazeologiaExercise
].map(ex => ({
  ...ex,
  land: lands[ex.slug],
  marks: marks[ex.slug],
  levels: ex.levels.map(lv => ({ ...lv, explain: explain[`${ex.slug}:${lv.id}`] }))
}))

export const exercise = (slug: string) => exercises.find(e => e.slug === slug)

/** klucz postępu poziomu w cookie */
export const levelKey = (slug: string, id: string) => `lv:${slug}:${id}`

/** stan poziomów: gwiazdki, czy otwarty, który jest „teraz” */
export function levelStates(ex: Exercise, stars: Record<string, number> | null | undefined) {
  const s = stars ?? {}
  let current = -1
  const list = ex.levels.map((lv, i) => {
    const got = s[levelKey(ex.slug, lv.id)] ?? 0
    const open = i === 0 || (s[levelKey(ex.slug, ex.levels[i - 1]!.id)] ?? 0) > 0
    if (open && !got && current < 0) current = i
    return { lv, i, stars: got, open, done: got > 0 }
  })
  const done = list.filter(x => x.done).length
  return { list, current, done, total: list.length, stars: list.reduce((n, x) => n + x.stars, 0), complete: done === list.length }
}

/** Grupy na stronie /polski/cwiczenia; puste = „wkrótce”. */
export const groups: { id: GroupId; icon: string; title: L; text: L }[] = [
  {
    id: 'litery', icon: 'ó',
    title: { pl: 'Litery i pisownia', uk: 'Літери і правопис', ru: 'Буквы и правописание' },
    text: {
      pl: 'Ó czy u, rz czy ż, ch czy h — reguły, sztuczki i gra „wstaw literę”.',
      uk: 'Ó чи u, rz чи ż, ch чи h — правила, хитрощі та гра «встав літеру».',
      ru: 'Ó или u, rz или ż, ch или h — правила, хитрости и игра «вставь букву».'
    }
  },
  {
    id: 'przypadki', icon: '7',
    title: { pl: 'Przypadki', uk: 'Відмінки', ru: 'Падежи' },
    text: {
      pl: 'Siedem przypadków z pytaniami, tabelą i dwiema grami.',
      uk: 'Сім відмінків з питаннями, таблицею і двома іграми.',
      ru: 'Семь падежей с вопросами, таблицей и двумя играми.'
    }
  },
  {
    id: 'liczebnik', icon: '12',
    title: { pl: 'Liczebniki', uk: 'Числівники', ru: 'Числительные' },
    text: {
      pl: 'Dwa, dwie, dwóch, dwoje — i daty.',
      uk: 'Dwa, dwie, dwóch, dwoje — і дати.',
      ru: 'Dwa, dwie, dwóch, dwoje — и даты.'
    }
  },
  {
    id: 'przymiotnik', icon: '★',
    title: { pl: 'Przymiotniki', uk: 'Прикметники', ru: 'Прилагательные' },
    text: {
      pl: 'Rodzaj, odmiana i stopniowanie: duży, większy, największy.',
      uk: 'Рід, відмінювання і ступені: duży, większy, największy.',
      ru: 'Род, склонение и степени: duży, większy, największy.'
    }
  },
  {
    id: 'czasownik', icon: '→',
    title: { pl: 'Czasowniki', uk: 'Дієслова', ru: 'Глаголы' },
    text: {
      pl: 'Osoby, czasy, aspekt: robić czy zrobić?',
      uk: 'Особи, часи, вид: robić чи zrobić?',
      ru: 'Лица, времена, вид: robić или zrobić?'
    }
  }
]
