'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import AtLogo from './AtLogo'

const links = [
  { href: '/shelf', label: 'shelf' },
  { href: '/screen', label: 'screen' },
  { href: '/sound', label: 'sound' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Top bar ── */}
      <header
        style={{
          borderBottom: '1px solid rgba(26,26,26,0.08)',
          position: 'sticky',
          top: 0,
          backgroundColor: '#FAFAF8',
          zIndex: 50,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-20 py-[18px] mx-auto max-w-[1400px]">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <AtLogo size={26} color="#C0503A" />
            <span
              style={{
                fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                fontWeight: 400,
                fontSize: '21px',
                color: '#1A1A1A',
                letterSpacing: '-0.015em',
              }}
            >
              Afterthoughts
            </span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main navigation" className="hidden md:flex" style={{ gap: '36px' }}>
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
                    color: active ? '#1A1A1A' : '#9E9990',
                    transition: 'color 0.15s',
                    borderBottom: active ? '1px solid #1A1A1A' : '1px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
          >
            <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: '#1A1A1A' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: '#1A1A1A' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: '#1A1A1A' }} />
          </button>

        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        className="md:hidden fixed inset-0"
        onClick={() => setOpen(false)}
        style={{
          backgroundColor: 'rgba(26,26,26,0.35)',
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
          backgroundColor: '#FAFAF8',
          zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          borderLeft: '1px solid rgba(26,26,26,0.08)',
        }}
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(26,26,26,0.08)',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#B8B2AA',
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
              color: '#9E9990',
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
                  color: active ? '#1A1A1A' : '#C8C2BA',
                  textDecoration: 'none',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(26,26,26,0.05)',
                  transition: 'color 0.15s',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Panel footer */}
        <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid rgba(26,26,26,0.06)' }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: '#C8C2BA',
            }}
          >
            things that stayed with me.
          </span>
        </div>
      </div>
    </>
  )
}
