import Link from 'next/link'
import AtLogo from './AtLogo'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        marginTop: '80px',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <AtLogo size={24} color="var(--accent)" />
        <span
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 400,
            fontSize: '18px',
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}
        >
          Afterthoughts
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--text-faint)',
            letterSpacing: '0.06em',
          }}
        >
          things that stayed with me.
        </span>
      </div>
    </footer>
  )
}
