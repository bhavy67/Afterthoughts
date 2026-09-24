'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchEntry {
  slug: string
  title: string
  creator: string
  year: number
  type: string
  rating: number
  moods: string[]
  href: string
}

interface SearchContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const SearchContext = createContext<SearchContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function useSearch() {
  return useContext(SearchContext)
}

function typeLabel(type: string) {
  if (type === 'novel') return 'book'
  if (type === 'documentary') return 'doc'
  return type
}

export function SearchModalProvider({
  entries,
  children,
}: {
  entries: SearchEntry[]
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setActiveIdx(0)
  }, [])

  // ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    } else {
      setQuery('')
      setActiveIdx(0)
    }
  }, [isOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return entries
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.creator.toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q) ||
          e.moods.some((m) => m.toLowerCase().includes(q))
      )
      .slice(0, 9)
  }, [entries, query])

  useEffect(() => setActiveIdx(0), [results])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { close(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && results[activeIdx]) {
      router.push(results[activeIdx].href)
      close()
    }
  }

  const hasQuery = query.trim().length > 0

  return (
    <SearchContext.Provider value={{ isOpen, open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sb"
              onClick={close}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                backgroundColor: 'var(--overlay)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />

            {/* Panel */}
            <motion.div
              key="sm"
              role="dialog"
              aria-modal="true"
              aria-label="Quick search"
              onKeyDown={onKeyDown}
              style={{
                position: 'fixed',
                top: 'max(16px, 10vh)',
                left: '50%',
                zIndex: 1001,
                width: 'min(640px, calc(100vw - 32px))',
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow:
                  '0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.14)',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, scale: 0.97, x: '-50%', y: -6 }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: 0 }}
              exit={{ opacity: 0, scale: 0.97, x: '-50%', y: -6 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Input row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderBottom: hasQuery
                    ? '1px solid var(--border)'
                    : '1px solid transparent',
                  transition: 'border-color 0.15s',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  style={{ color: 'var(--text-subtle)', flexShrink: 0 }}
                >
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.25" />
                  <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="title, creator, feeling…"
                  style={{
                    flex: 1,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '15px',
                    fontWeight: 300,
                    color: 'var(--text)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    letterSpacing: '0.01em',
                    minWidth: 0,
                  }}
                />

                <kbd
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    color: 'var(--text-ghost)',
                    border: '1px solid var(--border-tag)',
                    padding: '3px 7px',
                    flexShrink: 0,
                    lineHeight: 1.4,
                  }}
                >
                  esc
                </kbd>
              </div>

              {/* Results list */}
              {hasQuery && (
                <div style={{ maxHeight: '54vh', overflowY: 'auto' }}>
                  {results.length === 0 ? (
                    <div style={{ padding: '28px 18px' }}>
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '13px',
                          fontWeight: 300,
                          color: 'var(--text-faint)',
                        }}
                      >
                        nothing found for &ldquo;{query.trim()}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <>
                      {results.map((entry, i) => (
                        <Link
                          key={entry.slug}
                          href={entry.href}
                          onClick={close}
                          onMouseEnter={() => setActiveIdx(i)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '12px 18px',
                            textDecoration: 'none',
                            borderBottom:
                              i < results.length - 1
                                ? '1px solid var(--border-faint)'
                                : 'none',
                            borderLeft:
                              i === activeIdx
                                ? '2px solid var(--accent)'
                                : '2px solid transparent',
                            backgroundColor:
                              i === activeIdx ? 'var(--bg-hover)' : 'transparent',
                            transition: 'background-color 0.08s, border-color 0.08s',
                          }}
                        >
                          {/* Type badge */}
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: '9px',
                              letterSpacing: '0.12em',
                              color: 'var(--accent)',
                              textTransform: 'uppercase',
                              minWidth: '36px',
                              flexShrink: 0,
                            }}
                          >
                            {typeLabel(entry.type)}
                          </span>

                          {/* Title + creator */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                fontFamily: "'Fraunces Variable', 'Fraunces', serif",
                                fontWeight: 300,
                                fontSize: '16px',
                                color: 'var(--text)',
                                letterSpacing: '-0.01em',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.2,
                              }}
                            >
                              {entry.title}
                            </p>
                            <p
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: '11px',
                                fontWeight: 300,
                                color: 'var(--text-subtle)',
                                marginTop: '3px',
                                letterSpacing: '0.02em',
                              }}
                            >
                              {entry.creator} · {entry.year}
                            </p>
                          </div>

                          {/* Arrow */}
                          <motion.span
                            animate={{ x: i === activeIdx ? 2 : 0 }}
                            transition={{ duration: 0.12 }}
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: '14px',
                              color: i === activeIdx ? 'var(--accent)' : 'var(--border-tag)',
                              flexShrink: 0,
                            }}
                          >
                            →
                          </motion.span>
                        </Link>
                      ))}

                      {/* Footer: keyboard hint */}
                      <div
                        style={{
                          padding: '8px 18px',
                          borderTop: '1px solid var(--border)',
                          display: 'flex',
                          gap: '16px',
                        }}
                      >
                        {[
                          ['↑↓', 'navigate'],
                          ['↵', 'open'],
                          ['esc', 'close'],
                        ].map(([key, label]) => (
                          <span
                            key={key}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontFamily: "'DM Mono', monospace",
                              fontSize: '10px',
                              color: 'var(--text-ghost)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            <kbd
                              style={{
                                border: '1px solid var(--border-tag)',
                                padding: '1px 5px',
                                fontSize: '10px',
                                letterSpacing: 0,
                                color: 'var(--text-faint)',
                              }}
                            >
                              {key}
                            </kbd>
                            {label}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Empty state */}
              {!hasQuery && (
                <div
                  style={{
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 300,
                      color: 'var(--text-ghost)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {entries.length} things in the archive
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--text-ghost)',
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <kbd style={{ border: '1px solid var(--border-tag)', padding: '1px 5px', fontSize: '10px', color: 'var(--text-faint)' }}>⌘K</kbd>
                    to toggle
                  </span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </SearchContext.Provider>
  )
}
