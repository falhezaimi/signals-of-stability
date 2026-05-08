'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const initialOffset = 40

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: initialOffset }
      case 'down':
        return { opacity: 0, y: -initialOffset }
      case 'left':
        return { opacity: 0, x: initialOffset }
      case 'right':
        return { opacity: 0, x: -initialOffset }
    }
  }

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return isInView ? { opacity: 1, y: 0 } : getInitial()
      case 'left':
      case 'right':
        return isInView ? { opacity: 1, x: 0 } : getInitial()
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
