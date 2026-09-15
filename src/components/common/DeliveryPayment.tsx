'use client'
import { motion, useReducedMotion } from 'motion/react'
import { Truck, CreditCard, MapPin, Clock } from '@phosphor-icons/react'

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function DeliveryPayment() {
  const reduce = useReducedMotion()

  return (
    <section id="delivery" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-semibold text-primary mb-16 tracking-tight"
          initial={reduce ? undefined : { opacity: 1, y: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: E }}
        >
          Доставка и оплата
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery column */}
          <motion.div
            className="liquid-glass rounded-3xl p-8"
            initial={reduce ? undefined : { opacity: 1, x: 0 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: E }}
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 mb-6">
              <Truck size={24} weight="duotone" className="text-accent" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-6">
              Доставка
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                  <Truck size={14} weight="fill" className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-0.5">Бесплатная доставка</p>
                  <p className="text-secondary text-sm">При заказе от 3000 рублей</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                  <MapPin size={14} weight="fill" className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-1.5">Зоны доставки</p>
                  <div className="flex flex-wrap gap-2">
                    {['Город', 'Заречье', 'с. Малоугренево', 'п. Боровой', 'с. Первомайское'].map((zone) => (
                      <span
                        key={zone}
                        className="text-xs font-medium text-primary bg-muted px-3 py-1.5 rounded-full border border-border"
                      >
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                  <Clock size={14} weight="fill" className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-0.5">Срок выполнения</p>
                  <p className="text-secondary text-sm">2-3 дня с момента подтверждения заказа</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment column */}
          <motion.div
            className="liquid-glass rounded-3xl p-8"
            initial={reduce ? undefined : { opacity: 1, x: 0 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: E, delay: 0.1 }}
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 mb-6">
              <CreditCard size={24} weight="duotone" className="text-accent" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-6">
              Оплата
            </h3>

            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border/60 p-4 bg-white/60">
                <p className="text-xs text-secondary mb-1">Перевод на номер</p>
                <p className="font-display text-xl font-semibold text-primary">8 (960) 936-74-47</p>
                <p className="text-sm text-secondary mt-0.5">Галина Вас В</p>
              </div>

              <div className="flex gap-3">
                {[
                  { name: 'Сбербанк', color: 'bg-green-500' },
                  { name: 'Т-Банк', color: 'bg-yellow-400' },
                ].map((bank) => (
                  <div
                    key={bank.name}
                    className="flex items-center gap-2 flex-1 justify-center border border-border/60 rounded-xl px-4 py-3 bg-white/60"
                  >
                    <div className={`h-3 w-3 rounded-full ${bank.color}`} />
                    <span className="text-sm font-medium text-primary">{bank.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-4 pt-1">
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                  <CreditCard size={14} weight="fill" className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-0.5">Наличный расчет</p>
                  <p className="text-secondary text-sm">Оплата при получении заказа</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
