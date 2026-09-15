'use client'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X, Phone, ChatCircle } from '@phosphor-icons/react'
import { useState } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  productName?: string
}

export function ContactModal({ isOpen, onClose, productName }: ContactModalProps) {
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70] bg-primary/40 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center px-4"
            initial={reduce ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="liquid-glass rounded-3xl w-full max-w-md p-8 relative bg-background/80">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors cursor-pointer"
                aria-label="Закрыть"
              >
                <X size={16} weight="bold" className="text-primary" />
              </button>

              {!submitted ? (
                <>
                  <h2 className="font-display text-3xl font-semibold text-primary mb-1">
                    Оформление заказа
                  </h2>
                  {productName && (
                    <p className="text-sm text-accent mb-4 font-medium">{productName}</p>
                  )}
                  <p className="text-secondary mb-8 leading-relaxed">
                    Позвоните нам или оставьте номер телефона - мы перезвоним и уточним все детали заказа
                  </p>

                  {/* Phone buttons */}
                  <div className="flex flex-col gap-3 mb-8">
                    <a
                      href="tel:+79619777115"
                      className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-2xl font-medium hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                    >
                      <Phone size={20} weight="fill" />
                      <div>
                        <div className="text-xs text-white/70 mb-0.5">Позвонить</div>
                        <div>8 (961) 977-71-15</div>
                      </div>
                    </a>
                    <a
                      href="tel:+79059800611"
                      className="flex items-center gap-3 border border-border px-6 py-4 rounded-2xl font-medium text-primary hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                    >
                      <Phone size={20} weight="duotone" className="text-accent" />
                      <div>
                        <div className="text-xs text-secondary mb-0.5">Запасной номер</div>
                        <div>8 (905) 980-06-11</div>
                      </div>
                    </a>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm text-secondary">или</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-primary">
                        Ваше имя
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Анна"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary text-base focus:outline-none focus:border-accent transition-colors placeholder:text-secondary/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-primary">
                        Номер телефона
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary text-base focus:outline-none focus:border-accent transition-colors placeholder:text-secondary/50"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-4 rounded-2xl font-medium hover:bg-accent/90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                    >
                      <ChatCircle size={20} weight="fill" />
                      Перезвоните мне
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6">
                    <Phone size={32} weight="fill" className="text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                    Мы перезвоним!
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Заявка принята. Анна свяжется с вами в ближайшее время для уточнения деталей заказа.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-sm text-accent font-medium hover:underline cursor-pointer"
                  >
                    Закрыть
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
