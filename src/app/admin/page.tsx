import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function AdminDashboard() {
  const [productCount, categoryCount, products] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight">
            Обзор
          </h1>
          <p className="text-secondary text-sm mt-1">Управление каталогом фуршетов</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          + Добавить
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="liquid-glass rounded-2xl p-6">
          <p className="text-secondary text-sm">Товаров в каталоге</p>
          <p className="font-display text-4xl font-semibold text-primary mt-1">{productCount}</p>
          <Link href="/admin/products" className="text-accent text-sm mt-3 inline-block hover:underline">
            Перейти к товарам →
          </Link>
        </div>
        <div className="liquid-glass rounded-2xl p-6">
          <p className="text-secondary text-sm">Категорий</p>
          <p className="font-display text-4xl font-semibold text-primary mt-1">{categoryCount}</p>
          <Link href="/admin/categories" className="text-accent text-sm mt-3 inline-block hover:underline">
            Перейти к категориям →
          </Link>
        </div>
      </div>

      {/* Recent products */}
      <div className="liquid-glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold text-primary mb-4">Последние товары</h2>
        {products.length === 0 ? (
          <p className="text-secondary text-sm">Пока нет товаров</p>
        ) : (
          <div className="flex flex-col divide-y divide-border/40">
            {products.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-primary font-medium truncate">{p.name}</p>
                  <p className="text-secondary text-xs">{p.category.name}</p>
                </div>
                <p className="text-primary font-medium shrink-0">{p.price.toLocaleString('ru-RU')} ₽</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
