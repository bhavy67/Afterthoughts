import { getAllAlbums } from '@/lib/content'
import CategoryGrid from '@/components/CategoryGrid'
import FadeIn from '@/components/FadeIn'

export default function SoundPage() {
  const albums = getAllAlbums()
  const items = albums.map((a) => ({ ...a, href: `/sound/${a.slug}` }))

  return (
    <FadeIn>
    <div className="max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="px-6 md:px-20 pt-16 pb-10">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.18em', color: 'var(--text-faint)', marginBottom: '16px', textTransform: 'uppercase' }}>
          sound
        </p>
        <h1 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em', color: 'var(--text)', marginBottom: '14px' }}>
          Music
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '460px' }}>
          Albums and songs I return to. Music that means something.
        </p>
      </div>

      {/* Filter + Grid */}
      <CategoryGrid items={items} />

    </div>
    </FadeIn>
  )
}
