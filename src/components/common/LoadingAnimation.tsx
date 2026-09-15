'use client'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 600)
    }, reduce ? 0 : 2500)

    return () => clearTimeout(timer)
  }, [onComplete, reduce])

  if (!isVisible && !reduce) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={reduce ? { opacity: 1 } : { opacity: 1 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <motion.div
          className="liquid-glass rounded-3xl px-16 py-8"
          initial={reduce ? false : { scale: 0.8, opacity: 0 }}
          animate={reduce ? false : { scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
        >
          <motion.h1
            className="font-display text-5xl md:text-6xl font-semibold text-primary tracking-tight"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5
            }}
          >
            Фуршет-банкет
          </motion.h1>
        </motion.div>

        {!reduce && (
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-3xl blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ zIndex: -1 }}
          />
        )}
      </div>
    </motion.div>
  )
}
