import { getAllEntries } from '@/lib/content'

const base =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://afterthoughts.vercel.app')

function entryHref(type: string, slug: string): string {
  if (type === 'novel') return `${base}/shelf/${slug}`
  if (type === 'album' || type === 'song') return `${base}/sound/${slug}`
  return `${base}/screen/${slug}`
}

function stars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half)
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const entries = getAllEntries()

  const items = entries
    .map((e) => {
      const url = entryHref(e.type, e.slug)
      const pubDate = new Date(e.dateAdded).toUTCString()
      const description = [
        `${e.type} · ${e.year} · ${stars(e.rating)} ${e.rating.toFixed(1)}`,
        '',
        escape(e.summary),
        e.personalNote && e.personalNote !== e.summary ? `\n\n${escape(e.personalNote)}` : '',
      ]
        .join('')
        .trim()

      return `
    <item>
      <title>${escape(e.title)} — ${escape(e.creator)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Afterthoughts</title>
    <link>${base}</link>
    <description>Books, films, and music I've carried. A personal archive of things that stayed.</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${entries.length > 0 ? new Date(entries[0].dateAdded).toUTCString() : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
