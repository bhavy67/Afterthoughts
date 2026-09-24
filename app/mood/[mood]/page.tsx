import { getAllMoods, getEntriesByMood } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import FadeIn from '@/components/FadeIn'
import type { Entry } from '@/lib/types'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ mood: string }>
}

function entryHref(e: Entry): string {
  if (e.type === 'novel') return `/shelf/${e.slug}`
  if (e.type === 'album' || e.type === 'song') return `/sound/${e.slug}`
  return `/screen/${e.slug}`
}


export async function generateStaticParams() {
  return getAllMoods().map(({ mood }) => ({ mood }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mood } = await params
  return {
    title: `${mood} — Afterthoughts`,
    description: `Everything tagged "${mood}" across books, films, and music.`,
  }
}

export default async function MoodPage({ params }: Props) {
  const { mood } = await params
  const entries = getEntriesByMood(mood)

  if (entries.length === 0) notFound()

  const shelfCount = entries.filter((e) => e.type === 'novel').length
  const screenCount = entries.filter((e) => ['film', 'documentary', 'tv'].includes(e.type)).length
  const soundCount = entries.filter((e) => ['album', 'song'].includes(e.type)).length

  return (
    <FadeIn>
    <div className="max-w-[1400px] mx-auto">

      {/* Back */}
      <div className="px-6 md:px-20" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Link
          href="/explore"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--text-faint)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← explore
        </Link>
      </div>

      {/* Header */}
      <div
        className="px-6 md:px-20"
        style={{
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border)',
        }}
      >
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
          feeling
        </p>
        <h1
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 64px)',
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            marginBottom: '20px',
          }}
        >
          {mood}
        </h1>

        {/* Category breakdown */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {shelfCount > 0 && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: 'var(--text-subtle)',
                border: '1px solid var(--border-tag)',
                padding: '4px 10px',
              }}
            >
              {shelfCount} {shelfCount === 1 ? 'book' : 'books'}
            </span>
          )}
          {screenCount > 0 && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: 'var(--text-subtle)',
                border: '1px solid var(--border-tag)',
                padding: '4px 10px',
              }}
            >
              {screenCount} {screenCount === 1 ? 'film' : 'films'}
            </span>
          )}
          {soundCount > 0 && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: 'var(--text-subtle)',
                border: '1px solid var(--border-tag)',
                padding: '4px 10px',
              }}
            >
              {soundCount} {soundCount === 1 ? 'album' : 'albums'}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {entries.map((entry, i) => (
          <div
            key={entry.slug}
            style={{
              borderBottom:
                i < entries.length - (entries.length % 2 === 0 ? 2 : 1)
                  ? '1px solid var(--border)'
                  : undefined,
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : undefined,
            }}
          >
            <ItemCard
              {...entry}
              href={entryHref(entry)}
              compact
            />
          </div>
        ))}
      </div>

    </div>
    </FadeIn>
  )
}
