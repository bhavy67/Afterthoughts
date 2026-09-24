import { getAllMoods, getStayedEntries } from '@/lib/content'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import FadeIn from '@/components/FadeIn'
import type { Entry } from '@/lib/types'

function entryHref(e: Entry): string {
  if (e.type === 'novel') return `/shelf/${e.slug}`
  if (e.type === 'album' || e.type === 'song') return `/sound/${e.slug}`
  return `/screen/${e.slug}`
}

export default function ExplorePage() {
  const moods = getAllMoods()
  const stayed = getStayedEntries()

  return (
    <FadeIn>
    <div className="max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="px-6 md:px-20 pt-16 pb-12">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: 'var(--text-faint)',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}
        >
          discover
        </p>
        <h1
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 64px)',
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            marginBottom: '14px',
          }}
        >
          Explore
        </h1>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            maxWidth: '420px',
          }}
        >
          Find your way in. Browse by feeling, or start with the ones that stayed.
        </p>
      </div>

      {/* By feeling */}
      <section>
        <div
          className="flex items-center gap-4 px-6 md:px-20"
          style={{
            paddingTop: '8px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.22em',
              color: 'var(--text-faint)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            by feeling
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {moods.map((item, i) => (
            <Link
              key={item.mood}
              href={`/mood/${item.mood}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                padding: '28px 24px',
                borderRight:
                  (i + 1) % 4 !== 0 ? '1px solid var(--border)' : undefined,
                borderBottom:
                  i < moods.length - 4 ? '1px solid var(--border)' : undefined,
                backgroundColor: 'var(--bg)',
                transition: 'background-color 0.2s',
              }}
              className="hover:bg-[var(--bg-hover)]"
            >
              <p
                style={{
                  fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                  fontWeight: 300,
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}
              >
                {item.mood}
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-faint)',
                  letterSpacing: '0.06em',
                }}
              >
                {item.count} {item.count === 1 ? 'entry' : 'entries'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stayed with me */}
      <section>
        <div
          className="flex items-center gap-4 px-6 md:px-20"
          style={{
            paddingTop: '40px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.22em',
              color: 'var(--text-faint)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ color: 'var(--accent)' }}>
              <circle cx="4" cy="4" r="3.5" stroke="currentColor" />
              <circle cx="4" cy="4" r="1.5" fill="currentColor" />
            </svg>
            stayed with me
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {stayed.map((entry, i) => (
            <div
              key={entry.slug}
              style={{
                borderBottom:
                  i < stayed.length - (stayed.length % 2 === 0 ? 2 : 1)
                    ? '1px solid var(--border)'
                    : undefined,
                borderRight: i % 2 === 0 ? '1px solid var(--border)' : undefined,
              }}
            >
              <ItemCard {...entry} href={entryHref(entry)} compact />
            </div>
          ))}
        </div>
      </section>

    </div>
    </FadeIn>
  )
}
