interface MoodTagProps {
  label: string
}

export default function MoodTag({ label }: MoodTagProps) {
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.06em',
        color: '#9E9990',
        border: '1px solid rgba(26,26,26,0.12)',
        padding: '4px 10px',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  )
}
