import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
