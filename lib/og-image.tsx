import fs from 'fs'
import path from 'path'

export async function loadFonts() {
  const fraunces = fs.readFileSync(
    path.join(process.cwd(), 'node_modules/@fontsource/fraunces/files/fraunces-latin-300-normal.woff')
  )
  const dmMono = fs.readFileSync(
    path.join(process.cwd(), 'node_modules/@fontsource/dm-mono/files/dm-mono-latin-300-normal.woff')
  )
  return [
    { name: 'Fraunces', data: fraunces, weight: 300 as const, style: 'normal' as const },
    { name: 'DM Mono', data: dmMono, weight: 300 as const, style: 'normal' as const },
  ]
}

interface OGImageProps {
  title: string
  creator: string
  type: string
  year: number
  rating: number
}

export function OGImage({ title, creator, type, year, rating }: OGImageProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) return '★'
    if (i === fullStars && hasHalf) return '★'
    return '☆'
  }).join('')

  const titleSize = title.length < 24 ? 80 : title.length < 40 ? 64 : 50

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAF8',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        position: 'relative',
      }}
    >
      {/* Terracotta top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: '#C0503A',
          display: 'flex',
        }}
      />

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'DM Mono',
              fontSize: 18,
              color: '#C0503A',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {type}
          </span>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#C8C2BA',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontFamily: 'DM Mono',
              fontSize: 18,
              color: '#B8B2AA',
            }}
          >
            {year}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: 'Fraunces',
            fontWeight: 300,
            fontSize: titleSize,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#1A1A1A',
            maxWidth: 900,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Creator */}
        <div
          style={{
            fontFamily: 'DM Mono',
            fontSize: 24,
            color: '#9E9990',
            letterSpacing: '0.04em',
            display: 'flex',
          }}
        >
          {creator}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ color: '#C0503A', fontSize: 22, letterSpacing: 4 }}>{stars}</span>
          <span style={{ fontFamily: 'DM Mono', fontSize: 16, color: '#B8B2AA' }}>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Brand mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span
          style={{
            fontFamily: 'DM Mono',
            fontSize: 13,
            color: '#B8B2AA',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          afterthoughts
        </span>
      </div>
    </div>
  )
}
