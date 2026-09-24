interface StarRatingProps {
  rating: number
}

export default function StarRating({ rating }: StarRatingProps) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return '★'
    if (i === full && half) return '½'
    return '☆'
  })

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
      <span style={{ color: 'var(--accent)', fontSize: '15px', letterSpacing: '2px' }}>
        {stars.join('')}
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '12px',
          color: 'var(--text-faint)',
        }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  )
}
