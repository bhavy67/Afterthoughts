import fs from 'fs'
import path from 'path'
import type { BookEntry, FilmEntry, MusicEntry, Entry } from './types'

const contentRoot = path.join(process.cwd(), 'content')

function readDir<T>(category: string): T[] {
  const dir = path.join(contentRoot, category)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as T)
    .sort((a: any, b: any) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
}

function readOne<T>(category: string, slug: string): T | null {
  const filePath = path.join(contentRoot, category, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
}

export const getAllBooks = (): BookEntry[] => readDir<BookEntry>('shelf')
export const getBook = (slug: string): BookEntry | null => readOne<BookEntry>('shelf', slug)

export const getAllFilms = (): FilmEntry[] => readDir<FilmEntry>('screen')
export const getFilm = (slug: string): FilmEntry | null => readOne<FilmEntry>('screen', slug)

export const getAllAlbums = (): MusicEntry[] => readDir<MusicEntry>('sound')
export const getAlbum = (slug: string): MusicEntry | null => readOne<MusicEntry>('sound', slug)

export function getAllEntries(): Entry[] {
  return [...getAllBooks(), ...getAllFilms(), ...getAllAlbums()].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )
}

export function getRecentEntries(count = 4): Entry[] {
  return getAllEntries().slice(0, count)
}

interface CurrentlyItem {
  title: string
  creator: string
  slug: string
  href: string
}

interface Currently {
  reading: CurrentlyItem
  watching: CurrentlyItem
  listening: CurrentlyItem
}

export function getCurrently(): Currently {
  const filePath = path.join(contentRoot, 'currently.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Currently
}
