'use client'
import { motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const reduce = useReducedMotion()

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    setIsMounted(true)
    setIsTouch('ontouchstart' in window)

    if (reduce || 'ontouchstart' in window) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY, reduce])

  if (!isMounted || isTouch || reduce) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-8 w-8 rounded-full border-2 border-white" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>
    </>
  )
}
