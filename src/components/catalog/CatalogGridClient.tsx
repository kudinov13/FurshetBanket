'use client'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { ContactModal } from '../contact/ContactModal'

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string | null
  category: { name: string }
}

export function CatalogGridClient({ products }: { products: Product[] }) {
  const reduce = useReducedMotion()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>()

  const handleOrder = (name: string) => {
    setSelectedProduct(name)
    setModalOpen(true)
  }

  return (
    <section id="catalog" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4 tracking-tight"
          initial={reduce ? undefined : { opacity: 1, y: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: E }}
        >
          Наши фуршеты
        </motion.h2>
        <motion.p
          className="text-lg text-secondary mb-12 max-w-[50ch]"
          initial={reduce ? undefined : { opacity: 1, y: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: E, delay: 0.1 }}
        >
          Позвоните нам для уточнения состава, количества гостей и финальной цены
        </motion.p>

        {products.length === 0 ? (
          <p className="text-secondary">Каталог скоро будет обновлён.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="group liquid-glass rounded-3xl overflow-hidden flex flex-col"
                initial={reduce ? undefined : { opacity: 1, y: 0 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: E,
                  delay: i * 0.08,
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-secondary text-sm">
                      Нет фото
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                      {product.category.name}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">
                    {product.name}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-secondary mb-0.5">Цена от</p>
                      <p className="font-display text-2xl font-semibold text-accent">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <button
                      onClick={() => handleOrder(product.name)}
                      className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={selectedProduct}
      />
    </section>
  )
}
