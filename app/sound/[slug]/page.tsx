import { getAlbum, getAllAlbums } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StarRating from '@/components/StarRating'
import MoodTag from '@/components/MoodTag'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllAlbums().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const album = getAlbum(slug)
  if (!album) return {}
  return { title: `${album.title} — Afterthoughts`, description: album.summary }
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params
  const album = getAlbum(slug)
  if (!album) notFound()

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-20">

      {/* Back */}
      <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Link
          href="/sound"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#B8B2AA',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← sound
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
        {/* Artwork — square */}
        <div className="shrink-0">
          <div
            style={{
              width: '200px',
              height: '200px',
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
              {album.title}
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
            {album.type} · {album.year}
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
            {album.title}
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
            {album.creator}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <StarRating rating={album.rating} />
            {album.whenDiscovered && (
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  color: '#B8B2AA',
                  letterSpacing: '0.04em',
                }}
              >
                discovered {album.whenDiscovered}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Personal note */}
      <div style={{ paddingTop: '48px', paddingBottom: album.whyIReturn ? '32px' : '48px' }}>
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
          {album.personalNote}
        </p>
      </div>

      {/* Why I return */}
      {album.whyIReturn && (
        <div
          style={{
            paddingBottom: '48px',
            paddingLeft: '24px',
            borderLeft: '2px solid rgba(192,80,58,0.25)',
            maxWidth: '560px',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.16em',
              color: '#B8B2AA',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            why I return
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: '#5C5650',
            }}
          >
            {album.whyIReturn}
          </p>
        </div>
      )}

      {/* Favourite tracks */}
      {album.favoriteTracks && album.favoriteTracks.length > 0 && (
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
              marginBottom: '16px',
            }}
          >
            favourite tracks
          </p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {album.favoriteTracks.map((track, i) => (
              <li
                key={track}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  paddingBottom: '10px',
                  borderBottom: i < album.favoriteTracks!.length - 1 ? '1px solid rgba(26,26,26,0.05)' : undefined,
                  marginBottom: i < album.favoriteTracks!.length - 1 ? '10px' : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px',
                    color: '#C8C2BA',
                    minWidth: '16px',
                    textAlign: 'right',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 300,
                    color: '#3C3830',
                  }}
                >
                  {track}
                </span>
              </li>
            ))}
          </ol>
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
          {album.moods.map((mood) => (
            <MoodTag key={mood} label={mood} />
          ))}
        </div>

        {album.stayedWithMe && (
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
