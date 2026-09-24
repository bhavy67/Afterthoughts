import type { MetadataRoute } from 'next'
import { getAllBooks, getAllFilms, getAllAlbums, getAllMoods } from '@/lib/content'

const base =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://afterthoughts.vercel.app')

export default function sitemap(): MetadataRoute.Sitemap {
  const books = getAllBooks().map((b) => ({
    url: `${base}/shelf/${b.slug}`,
    lastModified: new Date(b.dateAdded),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const films = getAllFilms().map((f) => ({
    url: `${base}/screen/${f.slug}`,
    lastModified: new Date(f.dateAdded),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const albums = getAllAlbums().map((a) => ({
    url: `${base}/sound/${a.slug}`,
    lastModified: new Date(a.dateAdded),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const moods = getAllMoods().map(({ mood }) => ({
    url: `${base}/mood/${mood}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    { url: base, priority: 1 },
    { url: `${base}/shelf`, priority: 0.9 },
    { url: `${base}/screen`, priority: 0.9 },
    { url: `${base}/sound`, priority: 0.9 },
    { url: `${base}/explore`, priority: 0.7 },
    ...books,
    ...films,
    ...albums,
    ...moods,
  ]
}
