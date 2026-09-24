import { getFilm, getAllFilms } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StarRating from '@/components/StarRating'
import MoodTag from '@/components/MoodTag'
import FadeIn from '@/components/FadeIn'
import CoverImage from '@/components/CoverImage'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllFilms().map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const film = getFilm(slug)
  if (!film) return {}
  return { title: `${film.title} — Afterthoughts`, description: film.summary }
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params
  const film = getFilm(slug)
  if (!film) notFound()

  return (
    <FadeIn>
    <div className="max-w-[1400px] mx-auto px-6 md:px-20">

      {/* Back */}
      <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Link
          href="/screen"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--text-faint)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← the screen
        </Link>
      </div>

      {/* Header: artwork right, title block left */}
      <div
        className="flex flex-col md:flex-row-reverse"
        style={{
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--border)',
          alignItems: 'flex-start',
        }}
      >
        {/* Artwork — widescreen proportions */}
        <div className="shrink-0">
          <div
            style={{
              width: '280px',
              height: '157px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-muted)',
              border: '1px solid var(--border-faint)',
            }}
          >
            <CoverImage
              src={film.coverUrl}
              alt={film.title}
              sizes="280px"
              fallback={
                <span style={{ position: 'absolute', bottom: '10px', left: '10px', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'var(--text-ghost)', lineHeight: 1.5 }}>
                  {film.title}
                </span>
              }
            />
          </div>
        </div>

        {/* Title block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.16em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {film.type} · {film.year}
          </p>

          <h1
            style={{
              fontFamily: "'Fraunces Variable', 'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 68px)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
              marginBottom: '14px',
            }}
          >
            {film.title}
          </h1>

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: 'var(--text-subtle)',
              marginBottom: '28px',
            }}
          >
            {film.creator}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <StarRating rating={film.rating} />
            {film.wouldRewatch && (
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent-border)',
                  padding: '4px 10px',
                  textTransform: 'uppercase',
                }}
              >
                would watch again
              </span>
            )}
          </div>
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
            color: 'var(--text-body)',
            maxWidth: '680px',
          }}
        >
          {film.personalNote}
        </p>
      </div>

      {/* Footer: moods + stayed marker */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
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
          {film.moods.map((mood) => (
            <MoodTag key={mood} label={mood} href={`/mood/${mood}`} />
          ))}
        </div>

        {film.stayedWithMe && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="3.5" stroke="currentColor" />
              <circle cx="4" cy="4" r="1.5" fill="currentColor" />
            </svg>
            stayed with me
          </span>
        )}
      </div>

    </div>
    </FadeIn>
  )
}
