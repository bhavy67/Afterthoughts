'use client'

import { useState, useMemo } from 'react'
import ItemCard from './ItemCard'
import MoodFilter from './MoodFilter'

interface CategoryGridItem {
  slug: string
  title: string
  creator: string
  year: number
  type: string
  rating: number
  personalNote?: string
  note?: string
  moods: string[]
  stayedWithMe?: boolean
  href: string
}

interface CategoryGridProps {
  items: CategoryGridItem[]
}

export default function CategoryGrid({ items }: CategoryGridProps) {
  const [selectedMood, setSelectedMood] = useState('all')
  const [stayedOnly, setStayedOnly] = useState(false)

  const allMoods = useMemo(() => {
    const set = new Set<string>()
    items.forEach((item) => item.moods.forEach((m) => set.add(m)))
    return Array.from(set).sort()
  }, [items])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (selectedMood !== 'all' && !item.moods.includes(selectedMood)) return false
      if (stayedOnly && !item.stayedWithMe) return false
      return true
    })
  }, [items, selectedMood, stayedOnly])

  return (
    <div>
      {/* Filter bar */}
      <div
        className="px-6 md:px-20"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.16em',
              color: '#B8B2AA',
              textTransform: 'uppercase',
            }}
          >
            filter
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: '#B8B2AA',
              letterSpacing: '0.06em',
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
        <MoodFilter
          moods={allMoods}
          selected={selectedMood}
          stayedOnly={stayedOnly}
          onMoodChange={setSelectedMood}
          onStayedToggle={() => setStayedOnly((prev) => !prev)}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="px-6 md:px-20"
          style={{ paddingTop: '60px', paddingBottom: '60px' }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '13px',
              fontWeight: 300,
              color: '#B8B2AA',
            }}
          >
            nothing here yet.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}
        >
          {filtered.map((item, i) => (
            <div
              key={item.slug}
              style={{
                borderBottom:
                  i < filtered.length - (filtered.length % 2 === 0 ? 2 : 1)
                    ? '1px solid rgba(26,26,26,0.08)'
                    : undefined,
                borderRight: i % 2 === 0 ? '1px solid rgba(26,26,26,0.08)' : undefined,
              }}
            >
              <ItemCard {...item} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
