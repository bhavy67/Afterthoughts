'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
}

export default function FadeIn({ children, className }: FadeInProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
