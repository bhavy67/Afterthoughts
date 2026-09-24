import { ImageResponse } from 'next/og'
import { getFilm, getAllFilms } from '@/lib/content'
import { OGImage, loadFonts } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllFilms().map((f) => ({ slug: f.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const film = getFilm(slug)
  if (!film) return new Response('Not found', { status: 404 })
  return new ImageResponse(
    <OGImage
      title={film.title}
      creator={film.creator}
      type={film.type}
      year={film.year}
      rating={film.rating}
    />,
    { ...size, fonts: await loadFonts() }
  )
}
