'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ItemCard from './ItemCard'

interface SearchEntry {
  slug: string
  title: string
  creator: string
  year: number
  type: string
  rating: number
  personalNote?: string
  moods: string[]
  stayedWithMe?: boolean
  href: string
  coverUrl?: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
}

export default function SearchGrid({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.creator.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q) ||
        e.moods.some((m) => m.toLowerCase().includes(q))
    )
  }, [entries, query])

  const trimmed = query.trim()
  const hasQuery = trimmed.length >= 2

  return (
    <div>
      {/* Search input */}
      <div
        className="px-6 md:px-20"
        style={{
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="title, creator, feeling…"
          autoFocus
          style={{
            width: '100%',
            fontFamily: "'DM Mono', monospace",
            fontSize: 'clamp(18px, 3vw, 28px)',
            fontWeight: 300,
            color: 'var(--text)',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--border-input)',
            outline: 'none',
            padding: '12px 0',
            letterSpacing: '0.02em',
          }}
        />
      </div>

      {/* Results */}
      {hasQuery ? (
        results.length > 0 ? (
          <div>
            <div
              className="px-6 md:px-20"
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-faint)',
                  letterSpacing: '0.06em',
                }}
              >
                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{trimmed}&rdquo;
              </span>
            </div>
            <motion.div
              key={trimmed}
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ borderBottom: '1px solid var(--border)' }}
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
              initial="hidden"
              animate="show"
            >
              {results.map((item, i) => (
                <motion.div
                  key={item.slug}
                  variants={cardVariants}
                  style={{
                    borderBottom:
                      i < results.length - (results.length % 2 === 0 ? 2 : 1)
                        ? '1px solid var(--border)'
                        : undefined,
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : undefined,
                  }}
                >
                  <ItemCard {...item} compact />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div
            className="px-6 md:px-20"
            style={{ paddingTop: '64px', paddingBottom: '64px' }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '13px',
                fontWeight: 300,
                color: 'var(--text-faint)',
              }}
            >
              nothing found for &ldquo;{trimmed}&rdquo;
            </p>
          </div>
        )
      ) : (
        <div
          className="px-6 md:px-20"
          style={{ paddingTop: '64px', paddingBottom: '64px' }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '13px',
              fontWeight: 300,
              color: 'var(--text-ghost)',
            }}
          >
            {entries.length} things in the archive.
          </p>
        </div>
      )}
    </div>
  )
}
