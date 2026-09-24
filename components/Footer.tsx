import AtLogo from './AtLogo'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(26,26,26,0.08)',
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
        <AtLogo size={24} color="#C0503A" />
        <span
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 400,
            fontSize: '18px',
            color: '#1A1A1A',
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
            color: '#B8B2AA',
            letterSpacing: '0.06em',
          }}
        >
          things that stayed with me.
        </span>
      </div>
    </footer>
  )
}
