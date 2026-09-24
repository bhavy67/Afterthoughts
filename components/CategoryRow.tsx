import Link from 'next/link'

interface CategoryPanelProps {
  href: string
  eyebrow: string
  title: string
  count: number
}

function CategoryPanel({ href, eyebrow, title, count }: CategoryPanelProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        className="group-hover:bg-[#F5F4F1] transition-colors duration-200"
        style={{
          padding: '36px',
          borderTop: '1px solid rgba(26,26,26,0.08)',
          height: '100%',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: '#B8B2AA',
            textTransform: 'uppercase' as const,
            marginBottom: '16px',
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 300,
            fontSize: '36px',
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              fontWeight: 300,
              color: '#B8B2AA',
              letterSpacing: '0.06em',
            }}
          >
            {count} {count === 1 ? 'entry' : 'entries'}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '14px',
              color: '#C0503A',
              transition: 'transform 0.2s',
              display: 'inline-block',
            }}
            className="group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  )
}

interface CategoryRowProps {
  bookCount: number
  filmCount: number
  albumCount: number
}

export default function CategoryRow({ bookCount, filmCount, albumCount }: CategoryRowProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{
        borderBottom: '1px solid rgba(26,26,26,0.08)',
      }}
    >
      <div style={{ borderRight: '1px solid rgba(26,26,26,0.08)' }}>
        <CategoryPanel href="/shelf" eyebrow="the shelf" title="Books" count={bookCount} />
      </div>
      <div style={{ borderRight: '1px solid rgba(26,26,26,0.08)' }}>
        <CategoryPanel href="/screen" eyebrow="the screen" title="Films & TV" count={filmCount} />
      </div>
      <div>
        <CategoryPanel href="/sound" eyebrow="sound" title="Music" count={albumCount} />
      </div>
    </div>
  )
}
