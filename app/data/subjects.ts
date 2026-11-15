/**
 * Przedmioty platformy. Każdy przedmiot ma własny kolor, adres i listę klas.
 * Nowy język (np. niemiecki) = nowy wpis tutaj + folder app/data/<id>.
 */
export type SubjectId = 'polski' | 'angielski'

export interface Subject {
  id: SubjectId
  path: string
  color: string
  soft: string
  available: boolean
  grades: number[]
}

export const subjects: Subject[] = [
  { id: 'polski', path: '/polski', color: 'var(--pl)', soft: 'var(--pl-soft)', available: true, grades: [4, 5, 6, 7, 8] },
  { id: 'angielski', path: '/angielski', color: 'var(--en)', soft: 'var(--en-soft)', available: false, grades: [1, 2, 3, 4, 5, 6, 7, 8] }
]
