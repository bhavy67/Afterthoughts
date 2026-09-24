import StarRating from './StarRating'
import MoodTag from './MoodTag'

interface ItemCardProps {
  title: string
  creator: string
  year: number
  type: string
  rating: number
  note: string
  moods: string[]
  stayedWithMe?: boolean
}

export default function ItemCard({
  title,
  creator,
  year,
  type,
  rating,
  note,
  moods,
  stayedWithMe,
}: ItemCardProps) {
  const isFilm = type === 'film' || type === 'documentary' || type === 'tv'
  const artHeight = isFilm ? 134 : 150

  return (
    <div
      className="hover:bg-[#F5F4F1] transition-colors duration-200 flex gap-6 md:gap-8 p-6 md:p-11"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Artwork placeholder */}
      <div
        className="shrink-0 flex items-end"
        style={{
          width: '80px',
          height: `${Math.round(artHeight * 0.8)}px`,
          backgroundColor: '#EEECEA',
          border: '1px solid rgba(26,26,26,0.07)',
          padding: '6px',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            color: '#C8C2BA',
            lineHeight: 1.4,
          }}
        >
          {title.split(' ').slice(0, 2).join('\n')}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '11px' }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#C0503A',
            }}
          >
            {type}
          </span>
          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              backgroundColor: '#C8C2BA',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: '#C8C2BA',
            }}
          >
            {year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 400,
            fontSize: 'clamp(20px, 3vw, 28px)',
            lineHeight: 1.1,
            color: '#1A1A1A',
            letterSpacing: '-0.01em',
            marginBottom: '6px',
          }}
        >
          {title}
        </h3>

        {/* Creator */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#9E9990',
            marginBottom: '18px',
          }}
        >
          {creator}
        </p>

        {/* Note */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: '#6E6860',
            marginBottom: '22px',
          }}
        >
          {note}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <StarRating rating={rating} />
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {moods.map((mood) => (
              <MoodTag key={mood} label={mood} />
            ))}
          </div>
        </div>

        {/* Stayed with me */}
        {stayedWithMe && (
          <div style={{ marginTop: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#C0503A',
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3.5" stroke="#C0503A" />
                <circle cx="4" cy="4" r="1.5" fill="#C0503A" />
              </svg>
              stayed with me
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
