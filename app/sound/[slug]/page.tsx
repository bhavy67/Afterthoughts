import { getAlbum, getAllAlbums } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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

  const fullStars = Math.floor(album.rating)
  const hasHalf = album.rating % 1 >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) return '★'
    if (i === fullStars && hasHalf) return '½'
    return '☆'
  }).join('')

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-20">

      {/* Back link */}
      <div className="pt-10 pb-8">
        <Link href="/sound" style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#B8B2AA', textDecoration: 'none' }}>
          ← sound
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 pb-16">

        {/* Artwork — square */}
        <div className="shrink-0" style={{ width: '160px' }}>
          <div style={{ width: '160px', height: '160px', backgroundColor: '#EEECEA', border: '1px solid rgba(26,26,26,0.07)', display: 'flex', alignItems: 'flex-end', padding: '10px' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#C8C2BA', lineHeight: 1.4 }}>{album.title}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Type + Year */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#C0503A' }}>{album.type}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#C8C2BA', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#C8C2BA' }}>{album.year}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#1A1A1A', marginBottom: '10px' }}>
            {album.title}
          </h1>

          {/* Creator */}
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em', color: '#9E9990', marginBottom: '24px' }}>
            {album.creator}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
            <span style={{ color: '#C0503A', fontSize: '16px', letterSpacing: '2px' }}>{stars}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#B8B2AA' }}>{album.rating.toFixed(1)}</span>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(26,26,26,0.08)', marginBottom: '28px' }} />

          {/* Personal note */}
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', fontWeight: 300, lineHeight: 2, color: '#4A4540', maxWidth: '600px', marginBottom: '32px' }}>
            {album.personalNote}
          </p>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(26,26,26,0.08)', marginBottom: '24px' }} />

          {/* Favourite tracks */}
          {album.favoriteTracks && album.favoriteTracks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.14em', color: '#B8B2AA', marginBottom: '10px' }}>
                favourite tracks
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {album.favoriteTracks.map((track) => (
                  <span key={track} style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#4A4540' }}>
                    {track}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* When discovered */}
          {album.whenDiscovered && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.14em', color: '#B8B2AA', marginRight: '10px' }}>
                discovered
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#4A4540' }}>
                {album.whenDiscovered}
              </span>
            </div>
          )}

          {/* Why I return */}
          {album.whyIReturn && (
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.14em', color: '#B8B2AA', marginRight: '10px' }}>
                why i return
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#4A4540' }}>
                {album.whyIReturn}
              </span>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(26,26,26,0.08)', marginBottom: '24px' }} />

          {/* Moods */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {album.moods.map((mood) => (
              <span key={mood} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.06em', color: '#9E9990', border: '1px solid rgba(26,26,26,0.12)', padding: '4px 10px' }}>
                {mood}
              </span>
            ))}
          </div>

          {/* Stayed with me */}
          {album.stayedWithMe && (
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
