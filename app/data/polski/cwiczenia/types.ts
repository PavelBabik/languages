import type { L } from '~/types/content'

/**
 * Ćwiczenia bez podziału na klasy — ścieżka poziomów.
 * Jeden poziom = JEDNA reguła → przykłady do odkrycia (tap) → krótka gra (5–6 zadań) → nagroda.
 * Następny poziom otwiera się po przejściu poprzedniego. Na końcu — „boss” (mix wszystkiego).
 * Dla dzieci i dorosłych z ADHD: mało tekstu naraz, dużo ruchu, szybka nagroda.
 */

/** Opcja odpowiedzi: zwykły tekst albo { pl, uk, ru } (np. nazwa przypadku z tłumaczeniem). */
export type Opt = string | L

/** Jedno zadanie w grze. Tekst = pre + [odpowiedź] + post. */
export interface Item {
  pre: string
  post: string
  opts: Opt[]
  /** indeks poprawnej opcji */
  answer: number
  /** słowo w tekście, o które pytamy (wtedy nie ma luki, tylko wyróżnienie) */
  mark?: string
  /** dlaczego tak — pokazujemy po odpowiedzi */
  hint: L
  /** dowód po polsku, np. „stół → stoły” */
  proof?: string
  /** tłumaczenie całego słowa / zdania */
  tr?: { uk: string; ru: string }
  /** pełny tekst do odsłuchania (domyślnie pre + odpowiedź + post) */
  say?: string
  /** do jakiej reguły / przypadku należy (do budowania poziomów) */
  tag: string
}

export interface Game {
  id: string
  /** polecenie nad zadaniem */
  prompt: L
  /** 'word' — wielkie słowo z luką; 'sentence' — zdanie */
  size: 'word' | 'sentence'
  items: Item[]
  /** ile zadań w jednej rundzie */
  round: number
  /** zadania „dla kontrastu” z innych reguł (żeby odpowiedź nie była zawsze ta sama) */
  review?: Item[]
  /** ile z nich wmieszać (domyślnie 2) */
  reviewN?: number
}

/** Wynik rundy (Game → strona poziomu). */
export interface GameResult { stars: number; xp: number; firstTry: number; total: number; best: number }

/** Karta-sztuczka (np. porównanie z ukraińskim / rosyjskim). */
export interface Tip {
  title: L
  text: L
  examples?: string[]
}

/**
 * Przykłady do odkrycia:
 *  'st[ó]ł → st[o]ły' — widać lewą stronę, tap odsłania prawą;
 *  '[u]cho' — fragment w [ ] ukryty, tap go odsłania.
 */
export interface Level {
  id: string
  /** krótki znak na mapie, np. „ó→o” */
  icon: string
  title: L
  /** reguła — 1–2 krótkie zdania */
  rule: L
  examples: string[]
  tip?: Tip
  /** dodatkowe dymki z wyjaśnieniem (z world.ts) */
  explain?: L[]
  game: Game
  /** poziom-boss: mix całego tematu */
  boss?: boolean
}

export interface Table {
  caption: L
  head: L[]
  rows: (string | L)[][]
}

export type GroupId = 'litery' | 'przypadki' | 'liczebnik' | 'przymiotnik' | 'czasownik' | 'przyimek' | 'zaimek' | 'przyslowek' | 'spojnik' | 'zdanie'

export interface Exercise {
  slug: string
  group: GroupId
  icon: string
  color: string
  soft: string
  title: L
  lead: L
  /** odznaka za przejście wszystkich poziomów */
  badge: L
  levels: Level[]
  table?: Table
  /** litery reguły — podświetlamy je wszędzie na czerwono */
  marks?: string[]
  /** kraina w świecie gry (z world.ts) */
  land?: import('./world').Land
}
