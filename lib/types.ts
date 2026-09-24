export type MediaType = 'novel' | 'film' | 'album' | 'song' | 'documentary' | 'tv'

export type Mood =
  | 'thought-provoking'
  | 'feel-good'
  | 'emotional'
  | 'nostalgic'
  | 'dark'
  | 'comforting'
  | 'beautiful'
  | 'slow-burn'
  | 'funny'
  | 'inspiring'
  | 'unsettling'
  | 'quietly-brilliant'

export interface BaseEntry {
  slug: string
  title: string
  creator: string
  year: number
  type: MediaType
  rating: number
  summary: string
  personalNote: string
  moods: string[]
  wouldRecommend: boolean
  stayedWithMe: boolean
  dateAdded: string
  coverUrl?: string
}

export interface BookEntry extends BaseEntry {
  type: 'novel'
  favoriteQuote?: string
  wouldReread?: boolean
}

export interface FilmEntry extends BaseEntry {
  type: 'film' | 'documentary' | 'tv'
  wouldRewatch?: boolean
}

export interface MusicEntry extends BaseEntry {
  type: 'album' | 'song'
  favoriteTracks?: string[]
  whenDiscovered?: string
  whyIReturn?: string
}

export type Entry = BookEntry | FilmEntry | MusicEntry
