import type React from 'react'

interface MoodFilterProps {
  moods: string[]
  selected: string
  stayedOnly: boolean
  onMoodChange: (mood: string) => void
  onStayedToggle: () => void
}

export default function MoodFilter({
  moods,
  selected,
  stayedOnly,
  onMoodChange,
  onStayedToggle,
}: MoodFilterProps) {
  const pillBase: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.06em',
    padding: '6px 14px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    transition: 'color 0.15s, background-color 0.15s, border-color 0.15s',
    whiteSpace: 'nowrap',
    display: 'inline-block',
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {/* All pill */}
      <button
        onClick={() => onMoodChange('all')}
        style={{
          ...pillBase,
          backgroundColor: selected === 'all' ? 'var(--accent)' : 'transparent',
          color: selected === 'all' ? 'var(--bg)' : 'var(--text-subtle)',
          border: selected === 'all' ? 'none' : '1px solid var(--border-tag)',
        }}
      >
        all
      </button>

      {/* Mood pills */}
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onMoodChange(mood)}
          style={{
            ...pillBase,
            backgroundColor: selected === mood ? 'var(--accent)' : 'transparent',
            color: selected === mood ? 'var(--bg)' : 'var(--text-subtle)',
            border: selected === mood ? 'none' : '1px solid var(--border-tag)',
          }}
        >
          {mood}
        </button>
      ))}

      {/* Separator */}
      <span
        style={{
          color: 'var(--text-ghost)',
          padding: '0 4px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
        }}
      >
        ·
      </span>

      {/* Stayed with me toggle */}
      <button
        onClick={onStayedToggle}
        style={{
          ...pillBase,
          backgroundColor: 'transparent',
          color: stayedOnly ? 'var(--accent)' : 'var(--text-subtle)',
          border: stayedOnly ? '1px solid var(--accent)' : '1px solid var(--border-tag)',
        }}
      >
        stayed with me
      </button>
    </div>
  )
}
