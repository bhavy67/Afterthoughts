import { ImageResponse } from 'next/og'
import { getAlbum, getAllAlbums } from '@/lib/content'
import { OGImage, loadFonts } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllAlbums().map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const album = getAlbum(slug)
  if (!album) return new Response('Not found', { status: 404 })
  return new ImageResponse(
    <OGImage
      title={album.title}
      creator={album.creator}
      type={album.type}
      year={album.year}
      rating={album.rating}
    />,
    { ...size, fonts: await loadFonts() }
  )
}
