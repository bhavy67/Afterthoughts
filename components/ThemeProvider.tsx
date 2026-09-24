'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: (origin: { x: number; y: number }) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

interface Ripple {
  id: number
  x: number
  y: number
  bg: string
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [ripple, setRipple] = useState<Ripple | null>(null)
  const transitioning = useRef(false)
  const counter = useRef(0)

  useEffect(() => {
    const saved = document.documentElement.getAttribute('data-theme') as Theme | null
    setTheme(saved === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = useCallback((origin: { x: number; y: number }) => {
    if (transitioning.current) return
    transitioning.current = true

    const next: Theme = theme === 'light' ? 'dark' : 'light'
    const nextBg = next === 'dark' ? '#141410' : '#FAFAF8'

    // Update theme immediately — the expanding overlay (same color as new bg)
    // covers any content flash during the transition
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setTheme(next)

    counter.current += 1
    setRipple({ id: counter.current, x: origin.x, y: origin.y, bg: nextBg })
  }, [theme])

  const onRippleDone = useCallback(() => {
    setRipple(null)
    transitioning.current = false
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}

      {ripple && (
        <motion.div
          key={ripple.id}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            pointerEvents: 'none',
            backgroundColor: ripple.bg,
            // start as an invisible dot at the button
            clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`,
          }}
          animate={{
            clipPath: `circle(3000px at ${ripple.x}px ${ripple.y}px)`,
          }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.15, 1] }}
          onAnimationComplete={onRippleDone}
        />
      )}
    </ThemeContext.Provider>
  )
}
