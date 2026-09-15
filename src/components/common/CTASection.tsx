'use client'
import { motion, useReducedMotion } from 'motion/react'
import { Phone } from '@phosphor-icons/react'

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function CTASection() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl bg-primary px-8 py-20 md:py-28 text-center overflow-hidden">
          {/* Background decoration */}
          {!reduce && (
            <>
              <div className="pointer-events-none absolute top-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-accent/15 blur-2xl" />
            </>
          )}

          <div className="relative z-10">
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight"
              initial={reduce ? undefined : { opacity: 1, y: 0 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: E }}
            >
              Готовы сделать ваш<br />
              <span className="text-accent italic">праздник</span> незабываемым?
            </motion.h2>

            <motion.p
              className="text-white/70 text-lg mb-10 max-w-[42ch] mx-auto"
              initial={reduce ? undefined : { opacity: 1, y: 0 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: E, delay: 0.1 }}
            >
              Работаем без выходных. Позвоните нам и мы обсудим все детали вашего праздничного меню.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={reduce ? undefined : { opacity: 1, y: 0 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: E, delay: 0.2 }}
            >
              <a
                href="tel:+79619777115"
                className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-accent/90 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-lg shadow-accent/30"
              >
                <Phone size={22} weight="fill" />
                8 (961) 977-71-15
              </a>
              <a
                href="tel:+79059800611"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white/60 hover:bg-white/10 active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                <Phone size={22} weight="duotone" />
                8 (905) 980-06-11
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
