import Link from 'next/link'

interface CurrentlyItem {
  title: string
  creator: string
  href: string
}

interface CurrentlyStripProps {
  reading: CurrentlyItem
  watching: CurrentlyItem
  listening: CurrentlyItem
}

export default function CurrentlyStrip({ reading, watching, listening }: CurrentlyStripProps) {
  const items = [
    { label: 'reading', ...reading },
    { label: 'watching', ...watching },
    { label: 'listening', ...listening },
  ]

  return (
    <div
      style={{
        backgroundColor: '#F3F2EE',
        borderTop: '1px solid rgba(26,26,26,0.08)',
        borderBottom: '1px solid rgba(26,26,26,0.08)',
      }}
    >
      {/* Section eyebrow */}
      <div
        className="flex items-center gap-4 px-6 md:px-20"
        style={{ paddingTop: '28px', paddingBottom: '20px' }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: '#B8B2AA',
            textTransform: 'uppercase' as const,
            whiteSpace: 'nowrap' as const,
          }}
        >
          currently
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(26,26,26,0.08)' }} />
      </div>

      {/* Three columns */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 px-6 md:px-20"
        style={{ paddingBottom: '32px' }}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={[
              'py-4 md:py-0',
              i > 0
                ? 'border-t border-[rgba(26,26,26,0.06)] md:border-t-0 md:border-l md:border-[rgba(26,26,26,0.08)] md:pl-8'
                : '',
              i < 2 ? 'md:pr-8' : '',
            ].join(' ')}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: '#B8B2AA',
                textTransform: 'uppercase' as const,
                marginBottom: '10px',
              }}
            >
              {item.label}
            </p>
            <Link
              href={item.href}
              style={{ textDecoration: 'none' }}
            >
              <p
                style={{
                  fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                  fontWeight: 400,
                  fontSize: '22px',
                  lineHeight: 1.15,
                  color: '#1A1A1A',
                  letterSpacing: '-0.01em',
                  marginBottom: '6px',
                  transition: 'color 0.15s',
                }}
                className="hover:text-[#C0503A]"
              >
                {item.title}
              </p>
            </Link>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
                fontWeight: 300,
                color: '#9E9990',
              }}
            >
              {item.creator}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
