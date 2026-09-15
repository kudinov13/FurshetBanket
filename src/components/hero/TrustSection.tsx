'use client'
import { motion, useReducedMotion } from 'motion/react'
import { Truck, Clock, Star } from '@phosphor-icons/react'

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

const features = [
  {
    icon: Star,
    title: 'Опыт более 3 лет',
    description: 'Сотни успешных мероприятий — свадьбы, корпоративы, семейные праздники',
    accent: true,
  },
  {
    icon: Truck,
    title: 'Бесплатная доставка',
    description: 'При заказе от 3000 рублей доставим в город, заречье, Малоугренево, Боровой, Первомайское',
    accent: false,
  },
  {
    icon: Clock,
    title: 'Без выходных',
    description: 'Работаем каждый день. Выполнение заказа за 2-3 дня с момента подтверждения',
    accent: false,
  },
]

export function TrustSection() {
  const reduce = useReducedMotion()

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-semibold text-primary text-center mb-16 tracking-tight"
          initial={reduce ? undefined : { opacity: 1, y: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: E }}
        >
          Почему выбирают нас
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                className={`liquid-glass rounded-3xl p-8 ${feat.accent ? 'bg-primary/5' : ''}`}
                initial={reduce ? undefined : { opacity: 1, y: 0 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  ease: E,
                  delay: i * 0.12,
                }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-accent/10 mb-6">
                  <Icon size={24} weight="duotone" className="text-accent" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                  {feat.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
