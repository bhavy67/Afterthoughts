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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        borderBottom: '1px solid rgba(26,26,26,0.08)',
        position: 'sticky',
        top: 0,
        backgroundColor: '#FAFAF8',
        zIndex: 50,
      }}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-20 py-[18px] mx-auto max-w-[1400px]">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline"
          style={{ textDecoration: 'none' }}
        >
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

        {/* Desktop nav — hidden below md */}
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

        {/* Hamburger — hidden above md. No display in inline style or it overrides md:hidden */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              backgroundColor: '#1A1A1A',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              backgroundColor: '#1A1A1A',
              transition: 'opacity 0.2s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              backgroundColor: '#1A1A1A',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid rgba(26,26,26,0.06)',
            backgroundColor: '#FAFAF8',
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '17px',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                  color: active ? '#1A1A1A' : '#9E9990',
                  textDecoration: 'none',
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(26,26,26,0.06)',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
