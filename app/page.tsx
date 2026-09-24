import ItemCard from '@/components/ItemCard'
import CurrentlyStrip from '@/components/CurrentlyStrip'
import CategoryRow from '@/components/CategoryRow'
import { getRecentEntries, getCurrently, getAllBooks, getAllFilms, getAllAlbums } from '@/lib/content'

export default function HomePage() {
  const recent = getRecentEntries(4)
  const currently = getCurrently()
  const bookCount = getAllBooks().length
  const filmCount = getAllFilms().length
  const albumCount = getAllAlbums().length

  return (
    <div className="max-w-[1400px] mx-auto">

      {/* ── Hero ── */}
      <section className="px-6 md:px-20 pt-16 md:pt-24 pb-14 md:pb-20">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#C0503A',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          things that stayed with me
        </p>
        <h1
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(42px, 6.5vw, 88px)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: '#1A1A1A',
            marginBottom: '32px',
            maxWidth: '860px',
          }}
        >
          Books, films,<br />
          and music I&apos;ve{' '}
          <em style={{ fontStyle: 'italic', color: '#C0503A' }}>carried.</em>
        </h1>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.95,
            color: '#7A746C',
            maxWidth: '480px',
          }}
        >
          Not a review platform. Not a catalogue.<br />
          A personal archive of things that stayed —<br />
          and a few words about why.
        </p>
      </section>

      {/* ── Currently ── */}
      <CurrentlyStrip
        reading={currently.reading}
        watching={currently.watching}
        listening={currently.listening}
      />

      {/* ── Recently added ── */}
      <div>
        {/* Section header */}
        <div
          className="flex items-center gap-4 px-6 md:px-20"
          style={{
            paddingTop: '48px',
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(26,26,26,0.08)',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.22em',
              color: '#B8B2AA',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            recently added
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(26,26,26,0.08)' }} />
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}
        >
          {recent.map((item, i) => {
            const category =
              item.type === 'novel'
                ? 'shelf'
                : item.type === 'album' || item.type === 'song'
                  ? 'sound'
                  : 'screen'
            return (
              <div
                key={item.slug}
                style={{
                  borderBottom:
                    i < recent.length - 2
                      ? '1px solid rgba(26,26,26,0.08)'
                      : undefined,
                  borderRight:
                    i % 2 === 0 ? '1px solid rgba(26,26,26,0.08)' : undefined,
                }}
              >
                <ItemCard
                  {...item}
                  href={`/${category}/${item.slug}`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Category discovery ── */}
      <CategoryRow
        bookCount={bookCount}
        filmCount={filmCount}
        albumCount={albumCount}
      />

    </div>
  )
}
