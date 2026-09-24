import { getAllFilms } from '@/lib/content'
import ItemCard from '@/components/ItemCard'

export default function ScreenPage() {
  const films = getAllFilms()

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="px-6 md:px-20 pt-16 pb-10">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.18em', color: '#B8B2AA', marginBottom: '16px' }}>
          the screen
        </p>
        <h1 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em', color: '#1A1A1A', marginBottom: '12px' }}>
          Films &amp; TV
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', fontWeight: 300, color: '#B8B2AA', letterSpacing: '0.06em' }}>
          {films.length} {films.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid rgba(26,26,26,0.08)', borderBottom: '1px solid rgba(26,26,26,0.08)' }}>
        {films.map((film, i) => (
          <div
            key={film.slug}
            style={{
              borderBottom: i < films.length - (films.length % 2 === 0 ? 2 : 1) ? '1px solid rgba(26,26,26,0.08)' : undefined,
              borderRight: i % 2 === 0 ? '1px solid rgba(26,26,26,0.08)' : undefined,
            }}
          >
            <ItemCard {...film} href={`/screen/${film.slug}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
