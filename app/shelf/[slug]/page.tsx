import { getBook, getAllBooks } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StarRating from '@/components/StarRating'
import MoodTag from '@/components/MoodTag'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBooks().map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) return {}
  return { title: `${book.title} — Afterthoughts`, description: book.summary }
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) notFound()

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-20">

      {/* Back */}
      <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Link
          href="/shelf"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#B8B2AA',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← the shelf
        </Link>
      </div>

      {/* Header: artwork right, title block left */}
      <div
        className="flex flex-col md:flex-row-reverse"
        style={{
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
          alignItems: 'flex-start',
        }}
      >
        {/* Artwork */}
        <div className="shrink-0">
          <div
            style={{
              width: '180px',
              height: '252px',
              backgroundColor: '#EEECEA',
              border: '1px solid rgba(26,26,26,0.07)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '12px',
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '9px',
                color: '#C8C2BA',
                lineHeight: 1.5,
              }}
            >
              {book.title}
            </span>
          </div>
        </div>

        {/* Title block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.16em',
              color: '#C0503A',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            novel · {book.year}
          </p>

          <h1
            style={{
              fontFamily: "'Fraunces Variable', 'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 68px)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#1A1A1A',
              marginBottom: '14px',
            }}
          >
            {book.title}
          </h1>

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: '#9E9990',
              marginBottom: '28px',
            }}
          >
            {book.creator}
          </p>

          <StarRating rating={book.rating} />
        </div>
      </div>

      {/* Personal note */}
      <div style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 2.0,
            color: '#3C3830',
            maxWidth: '680px',
          }}
        >
          {book.personalNote}
        </p>
      </div>

      {/* Favourite quote */}
      {book.favoriteQuote && (
        <div
          style={{
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(26,26,26,0.08)',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.16em',
              color: '#B8B2AA',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            a passage
          </p>
          <blockquote
            style={{
              borderLeft: '2px solid rgba(192,80,58,0.35)',
              paddingLeft: '24px',
              margin: 0,
              maxWidth: '600px',
            }}
          >
            <p
              style={{
                fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.65,
                color: '#5C5650',
              }}
            >
              &ldquo;{book.favoriteQuote}&rdquo;
            </p>
          </blockquote>
        </div>
      )}

      {/* Footer: moods + stayed marker */}
      <div
        style={{
          paddingTop: '28px',
          paddingBottom: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {book.moods.map((mood) => (
            <MoodTag key={mood} label={mood} href={`/mood/${mood}`} />
          ))}
        </div>

        {book.stayedWithMe && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#C0503A',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="3.5" stroke="#C0503A" />
              <circle cx="4" cy="4" r="1.5" fill="#C0503A" />
            </svg>
            stayed with me
          </span>
        )}
      </div>

    </div>
  )
}
