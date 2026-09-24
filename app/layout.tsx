import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import { SearchModalProvider } from '@/components/SearchModal'
import { Analytics } from '@vercel/analytics/react'
import { getAllEntries } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Afterthoughts',
  description: 'Books, films, and music I\'ve carried. A personal archive of things that stayed.',
  openGraph: {
    title: 'Afterthoughts',
    description: 'Books, films, and music I\'ve carried. A personal archive of things that stayed.',
    type: 'website',
    siteName: 'Afterthoughts',
  },
  twitter: {
    card: 'summary',
    title: 'Afterthoughts',
    description: 'Books, films, and music I\'ve carried.',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)',  color: '#141410' },
  ],
}

function entryHref(type: string, slug: string): string {
  if (type === 'novel') return `/shelf/${slug}`
  if (type === 'album' || type === 'song') return `/sound/${slug}`
  return `/screen/${slug}`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchEntries = getAllEntries().map((e) => ({
    slug: e.slug,
    title: e.title,
    creator: e.creator,
    year: e.year,
    type: e.type,
    rating: e.rating,
    moods: e.moods,
    href: entryHref(e.type, e.slug),
  }))

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme — runs synchronously before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SearchModalProvider entries={searchEntries}>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
            <Analytics />
          </SearchModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
