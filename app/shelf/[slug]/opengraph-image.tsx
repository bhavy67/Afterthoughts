import { ImageResponse } from 'next/og'
import { getBook, getAllBooks } from '@/lib/content'
import { OGImage, loadFonts } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllBooks().map((b) => ({ slug: b.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) return new Response('Not found', { status: 404 })
  return new ImageResponse(
    <OGImage
      title={book.title}
      creator={book.creator}
      type={book.type}
      year={book.year}
      rating={book.rating}
    />,
    { ...size, fonts: await loadFonts() }
  )
}
