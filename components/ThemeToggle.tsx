'use client'

import { useRef, useId } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="1.5" x2="10" y2="4"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="16"  x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="10" x2="4"   y2="10"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16"  y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon({ maskId }: { maskId: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <rect width="20" height="20" fill="white" />
          {/* the cutout circle that creates the crescent */}
          <circle cx="13" cy="8.5" r="5.5" fill="black" />
        </mask>
      </defs>
      <circle cx="9.5" cy="10" r="6" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

const spring = { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const ref = useRef<HTMLButtonElement>(null)
  const moonMaskId = `moon-mask-${useId()}`
  const isDark = theme === 'dark'

  const handleClick = () => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent)',
        position: 'relative',
        width: 28,
        height: 28,
        borderRadius: 4,
      }}
    >
      {/* Sun — visible in light mode */}
      <motion.span
        style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.4 : 1,
          rotate: isDark ? -90 : 0,
        }}
        transition={spring}
      >
        <SunIcon />
      </motion.span>

      {/* Moon — visible in dark mode */}
      <motion.span
        style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.4,
          rotate: isDark ? 0 : 90,
        }}
        transition={spring}
      >
        <MoonIcon maskId={moonMaskId} />
      </motion.span>
    </button>
  )
}
