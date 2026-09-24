'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import AtLogo from './AtLogo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/shelf', label: 'shelf' },
  { href: '/screen', label: 'screen' },
  { href: '/sound', label: 'sound' },
  { href: '/explore', label: 'explore' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Top bar ── */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg)',
          zIndex: 50,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-20 py-[18px] mx-auto max-w-[1400px]">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <AtLogo size={26} color="var(--accent)" />
            <span
              style={{
                fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                fontWeight: 400,
                fontSize: '21px',
                color: 'var(--text)',
                letterSpacing: '-0.015em',
              }}
            >
              Afterthoughts
            </span>
          </Link>

          {/* Desktop links + controls */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center" style={{ gap: '36px' }}>
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    color: active ? 'var(--text)' : 'var(--text-subtle)',
                    transition: 'color 0.15s',
                    borderBottom: active ? '1px solid var(--text)' : '1px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {label}
                </Link>
              )
            })}

            {/* Search */}
            <Link
              href="/search"
              aria-label="Search"
              style={{
                color: pathname === '/search' ? 'var(--text)' : 'var(--text-subtle)',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.15s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.25" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Theme toggle */}
            <ThemeToggle />
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
          >
            <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: 'var(--text)' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: 'var(--text)' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: 'var(--text)' }} />
          </button>

        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        className="md:hidden fixed inset-0"
        onClick={() => setOpen(false)}
        style={{
          backgroundColor: 'var(--overlay)',
          zIndex: 90,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Right-side panel ── */}
      <div
        className="md:hidden fixed top-0 right-0 h-full flex flex-col"
        style={{
          width: '260px',
          backgroundColor: 'var(--bg)',
          zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          borderLeft: '1px solid var(--border)',
        }}
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: 'var(--text-faint)',
            }}
          >
            menu
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '16px',
              color: 'var(--text-subtle)',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '8px 0' }}>
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                  fontWeight: 300,
                  fontSize: '28px',
                  letterSpacing: '-0.01em',
                  color: active ? 'var(--text)' : 'var(--text-ghost)',
                  textDecoration: 'none',
                  padding: '16px 24px',
                  borderBottom: '1px solid var(--border-faint)',
                  transition: 'color 0.15s',
                }}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              fontFamily: "'Fraunces Variable', 'Fraunces', serif",
              fontWeight: 300,
              fontSize: '28px',
              letterSpacing: '-0.01em',
              color: pathname === '/search' ? 'var(--text)' : 'var(--text-ghost)',
              textDecoration: 'none',
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-faint)',
              transition: 'color 0.15s',
            }}
          >
            search
          </Link>
        </nav>

        {/* Panel footer — theme toggle + tagline */}
        <div
          style={{
            marginTop: 'auto',
            padding: '20px 24px',
            borderTop: '1px solid var(--border-faint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--text-ghost)',
            }}
          >
            things that stayed with me.
          </span>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
