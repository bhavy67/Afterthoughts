import { getAllFilms } from '@/lib/content'
import CategoryGrid from '@/components/CategoryGrid'

export default function ScreenPage() {
  const films = getAllFilms()
  const items = films.map((f) => ({ ...f, href: `/screen/${f.slug}` }))

  return (
    <div className="max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="px-6 md:px-20 pt-16 pb-10">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.18em', color: '#B8B2AA', marginBottom: '16px', textTransform: 'uppercase' }}>
          the screen
        </p>
        <h1 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em', color: '#1A1A1A', marginBottom: '14px' }}>
          Films &amp; TV
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', fontWeight: 300, color: '#7A746C', lineHeight: 1.8, maxWidth: '460px' }}>
          Films, documentaries, and a few TV shows. The ones worth the two hours.
        </p>
      </div>

      {/* Filter + Grid */}
      <CategoryGrid items={items} />

    </div>
  )
}
