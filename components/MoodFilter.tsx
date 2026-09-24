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
          backgroundColor: selected === 'all' ? '#C0503A' : 'transparent',
          color: selected === 'all' ? '#FAFAF8' : '#9E9990',
          border: selected === 'all' ? 'none' : '1px solid rgba(26,26,26,0.12)',
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
            backgroundColor: selected === mood ? '#C0503A' : 'transparent',
            color: selected === mood ? '#FAFAF8' : '#9E9990',
            border: selected === mood ? 'none' : '1px solid rgba(26,26,26,0.12)',
          }}
        >
          {mood}
        </button>
      ))}

      {/* Separator */}
      <span
        style={{
          color: 'rgba(26,26,26,0.2)',
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
          color: stayedOnly ? '#C0503A' : '#9E9990',
          border: stayedOnly ? '1px solid #C0503A' : '1px solid rgba(26,26,26,0.12)',
        }}
      >
        stayed with me
      </button>
    </div>
  )
}
