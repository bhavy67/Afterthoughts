import { getAllEntries } from '@/lib/content'
import SearchGrid from '@/components/SearchGrid'
import FadeIn from '@/components/FadeIn'
import type { Entry } from '@/lib/types'

function entryHref(e: Entry): string {
  if (e.type === 'novel') return `/shelf/${e.slug}`
  if (e.type === 'album' || e.type === 'song') return `/sound/${e.slug}`
  return `/screen/${e.slug}`
}

export const metadata = {
  title: 'Search — Afterthoughts',
  description: 'Search across books, films, and music.',
}

export default function SearchPage() {
  const entries = getAllEntries().map((e) => ({ ...e, href: entryHref(e) }))

  return (
    <FadeIn>
    <div className="max-w-[1400px] mx-auto">

      <div className="px-6 md:px-20 pt-16 pb-10">
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
          search
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
          Find something
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
          Search by title, creator, or feeling.
        </p>
      </div>

      <SearchGrid entries={entries} />

    </div>
    </FadeIn>
  )
}
