import Link from 'next/link'

interface MoodTagProps {
  label: string
  href?: string
}

export default function MoodTag({ label, href }: MoodTagProps) {
  const style = {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.06em',
    color: '#9E9990',
    border: '1px solid rgba(26,26,26,0.12)',
    padding: '4px 10px',
    display: 'inline-block',
  }

  if (href) {
    return (
      <Link
        href={href}
        style={{
          ...style,
          textDecoration: 'none',
          transition: 'color 0.15s, border-color 0.15s',
        }}
      >
        {label}
      </Link>
    )
  }

  return <span style={style}>{label}</span>
}
