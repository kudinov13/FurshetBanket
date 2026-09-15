'use client'
import { motion, useReducedMotion } from 'motion/react'
import { Phone } from '@phosphor-icons/react'

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: E, delay },
})

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background"
    >
      {/* Background glow */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column - content */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="inline-flex items-center gap-2 self-start"
              {...(reduce ? {} : fadeUp(0.3))}
            >
              <span className="h-1 w-8 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent tracking-widest uppercase">
                Стаж более 3 лет
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-primary leading-[1.05] tracking-tight"
              {...(reduce ? {} : fadeUp(0.45))}
            >
              Праздничные<br />
              <span className="text-accent italic">фуршеты</span> и<br />
              банкеты
            </motion.h1>

            <motion.p
              className="text-lg text-secondary leading-relaxed max-w-[44ch]"
              {...(reduce ? {} : fadeUp(0.6))}
            >
              Вкусная еда с доставкой прямо на ваш праздник. Работаем без выходных — бесплатная доставка от 3000 рублей.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              {...(reduce ? {} : fadeUp(0.75))}
            >
              <a
                href="tel:+79619777115"
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full text-base font-medium hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-lg shadow-primary/20"
              >
                <Phone size={20} weight="fill" />
                8 (961) 977-71-15
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 text-primary border border-border px-8 py-4 rounded-full text-base font-medium hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                Смотреть меню
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-6 pt-2"
              {...(reduce ? {} : fadeUp(0.9))}
            >
              {[
                { value: '3+', label: 'лет опыта' },
                { value: '0₽', label: 'доставка от 3000' },
                { value: '7/7', label: 'дней в неделю' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-3xl font-semibold text-primary">{stat.value}</span>
                  <span className="text-sm text-secondary">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - image */}
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 1, scale: 1, x: 0 }}
            animate={reduce ? false : { opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden liquid-glass">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/video/Hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 liquid-glass rounded-2xl px-5 py-4"
              initial={reduce ? false : { opacity: 1, y: 0 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            >
              <p className="text-xs text-secondary">Выполнение заказа</p>
              <p className="font-display text-xl font-semibold text-primary">2-3 дня</p>
            </motion.div>

            {/* Gold accent ring */}
            {!reduce && (
              <div className="absolute -inset-3 rounded-3xl border border-accent/20 pointer-events-none" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
