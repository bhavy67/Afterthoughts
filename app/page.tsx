import ItemCard from '@/components/ItemCard'

const featuredItems = [
  {
    title: 'Never Let Me Go',
    creator: 'Kazuo Ishiguro',
    year: 2005,
    type: 'novel',
    rating: 5.0,
    note: "Read it in one sitting and spent a week quieter than usual. What it says about memory, complicity, and the smallness of our rebellions has no clean resolution — and that's the point.",
    moods: ['emotional', 'slow-burn'],
    stayedWithMe: true,
  },
  {
    title: 'Moonlight',
    creator: 'Barry Jenkins',
    year: 2016,
    type: 'film',
    rating: 5.0,
    note: "Three chapters, three versions of a person. Jenkins uses light and silence like language. I've thought about the diner scene more than most things that actually happened to me.",
    moods: ['beautiful', 'quiet'],
    stayedWithMe: true,
  },
]

export default function HomePage() {
  return (
    <div className="max-w-[1400px] mx-auto">

      {/* Hero */}
      <section className="px-6 md:px-20 pt-16 md:pt-20 pb-12 md:pb-16">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.16em',
            color: '#C0503A',
            marginBottom: '22px',
          }}
        >
          currently on the shelf
        </p>

        <h1
          style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(40px, 6.5vw, 80px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#1A1A1A',
            marginBottom: '28px',
            maxWidth: '820px',
          }}
        >
          Things I&apos;ve read,<br />
          watched,{' '}
          <em style={{ fontStyle: 'italic', color: '#C0503A' }}>and carried.</em>
        </h1>

        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.9,
            color: '#7A746C',
            maxWidth: '500px',
          }}
        >
          Not a review platform. Not a catalogue. A personal archive of things
          that stayed — books, films, albums — and a few words about why.
        </p>
      </section>

      {/* Section label */}
      <div
        className="flex items-center gap-4 px-6 md:px-20 pt-10 pb-0"
        style={{ borderTop: '1px solid rgba(26,26,26,0.08)' }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#B8B2AA',
            whiteSpace: 'nowrap',
          }}
        >
          recently added
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(26,26,26,0.08)' }} />
      </div>

      {/* Cards grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          borderTop: '1px solid rgba(26,26,26,0.08)',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
          marginTop: '32px',
        }}
      >
        {featuredItems.map((item) => (
          <div
            key={item.title}
            style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}
            className="md:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r-[rgba(26,26,26,0.08)]"
          >
            <ItemCard {...item} />
          </div>
        ))}
      </div>

    </div>
  )
}
