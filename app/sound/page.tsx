import { getAllAlbums } from '@/lib/content'
import CategoryGrid from '@/components/CategoryGrid'

export default function SoundPage() {
  const albums = getAllAlbums()
  const items = albums.map((a) => ({ ...a, href: `/sound/${a.slug}` }))

  return (
    <div className="max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="px-6 md:px-20 pt-16 pb-10">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.18em', color: '#B8B2AA', marginBottom: '16px', textTransform: 'uppercase' }}>
          sound
        </p>
        <h1 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em', color: '#1A1A1A', marginBottom: '14px' }}>
          Music
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', fontWeight: 300, color: '#7A746C', lineHeight: 1.8, maxWidth: '460px' }}>
          Albums and songs I return to. Music that means something.
        </p>
      </div>

      {/* Filter + Grid */}
      <CategoryGrid items={items} />

    </div>
  )
}
