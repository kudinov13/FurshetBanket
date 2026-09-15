'use client'
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Phone } from '@phosphor-icons/react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={reduce ? false : { opacity: 1, y: 0 }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div
        className={`mx-4 mt-4 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'liquid-glass'
            : 'bg-white/60 backdrop-blur-sm border border-white/40'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <a href="#hero" className="font-display text-xl font-semibold text-primary tracking-tight">
            Фуршет-банкет
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Меню', href: '#menu' },
              { label: 'Каталог', href: '#catalog' },
              { label: 'Доставка', href: '#delivery' },
              { label: 'Контакты', href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-150 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+79619777115"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <Phone size={16} weight="fill" />
            Позвонить
          </a>

          <button
            className="md:hidden p-2 text-primary cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Открыть меню"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-primary transition-all duration-200 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-primary transition-all duration-200 ${isMobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-primary transition-all duration-200 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {isMobileOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t border-border/30 pt-4">
            {[
              { label: 'Меню', href: '#menu' },
              { label: 'Каталог', href: '#catalog' },
              { label: 'Доставка', href: '#delivery' },
              { label: 'Контакты', href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-base font-medium text-secondary hover:text-primary transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:+79619777115"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full text-sm font-medium"
            >
              <Phone size={16} weight="fill" />
              8 (961) 977-71-15
            </a>
          </div>
        )}
      </div>
    </motion.header>
  )
}
