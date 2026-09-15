'use client'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Category = {
  id: number
  name: string
  description: string
  image: string | null
}

// Alternating col-spans for visual rhythm on the bento grid
const SPANS = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-3',
]

export function MenuCategoriesClient({ categories }: { categories: Category[] }) {
  const reduce = useReducedMotion()

  return (
    <section id="menu" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4 tracking-tight"
          initial={reduce ? undefined : { opacity: 1, y: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: E }}
        >
          Категории меню
        </motion.h2>
        <motion.p
          className="text-lg text-secondary mb-12 max-w-[50ch]"
          initial={reduce ? undefined : { opacity: 1, y: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: E, delay: 0.1 }}
        >
          {categories.length} направлений для любого праздника
        </motion.p>

        {categories.length === 0 ? (
          <p className="text-secondary">Категории скоро появятся.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {categories.map((cat, i) => (
              <motion.a
                key={cat.id}
                href="#catalog"
                className={`group relative overflow-hidden rounded-3xl cursor-pointer h-72 md:h-80 ${SPANS[i % SPANS.length]}`}
                initial={reduce ? undefined : { opacity: 1, y: 0 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: E,
                  delay: i * 0.08,
                }}
                whileHover={reduce ? {} : { scale: 1.01 }}
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-sm">{cat.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
