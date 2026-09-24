import { getFilm, getAllFilms } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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

  const fullStars = Math.floor(film.rating)
  const hasHalf = film.rating % 1 >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) return '★'
    if (i === fullStars && hasHalf) return '½'
    return '☆'
  }).join('')

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-20">

      {/* Back link */}
      <div className="pt-10 pb-8">
        <Link href="/screen" style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#B8B2AA', textDecoration: 'none' }}>
          ← screen
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 pb-16">

        {/* Artwork — 16:9 feel */}
        <div className="shrink-0" style={{ width: '200px' }}>
          <div style={{ width: '200px', height: '130px', backgroundColor: '#EEECEA', border: '1px solid rgba(26,26,26,0.07)', display: 'flex', alignItems: 'flex-end', padding: '10px' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#C8C2BA', lineHeight: 1.4 }}>{film.title}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Type + Year */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#C0503A' }}>{film.type}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#C8C2BA', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#C8C2BA' }}>{film.year}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#1A1A1A', marginBottom: '10px' }}>
            {film.title}
          </h1>

          {/* Creator */}
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em', color: '#9E9990', marginBottom: '24px' }}>
            {film.creator}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
            <span style={{ color: '#C0503A', fontSize: '16px', letterSpacing: '2px' }}>{stars}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#B8B2AA' }}>{film.rating.toFixed(1)}</span>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(26,26,26,0.08)', marginBottom: '28px' }} />

          {/* Personal note */}
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', fontWeight: 300, lineHeight: 2, color: '#4A4540', maxWidth: '600px', marginBottom: '32px' }}>
            {film.personalNote}
          </p>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(26,26,26,0.08)', marginBottom: '24px' }} />

          {/* Moods */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {film.moods.map((mood) => (
              <span key={mood} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.06em', color: '#9E9990', border: '1px solid rgba(26,26,26,0.12)', padding: '4px 10px' }}>
                {mood}
              </span>
            ))}
          </div>

          {/* Would rewatch */}
          {film.wouldRewatch && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', color: '#C0503A' }}>
                would watch again
              </span>
            </div>
          )}

          {/* Stayed with me */}
          {film.stayedWithMe && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', color: '#C0503A' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3.5" stroke="#C0503A" />
                <circle cx="4" cy="4" r="1.5" fill="#C0503A" />
              </svg>
              stayed with me
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
