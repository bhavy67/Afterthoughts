import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme — runs before any paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
