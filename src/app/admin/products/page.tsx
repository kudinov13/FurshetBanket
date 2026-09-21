import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, _count: { select: { images: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight">
            Товары
          </h1>
          <p className="text-secondary text-sm mt-1">Всего: {products.length}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          + Добавить
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="liquid-glass rounded-2xl p-12 text-center">
          <p className="text-secondary">Товаров пока нет.</p>
          <Link href="/admin/products/new" className="text-accent text-sm mt-3 inline-block hover:underline">
            Добавить первый товар →
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="liquid-glass rounded-2xl overflow-hidden hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs text-secondary uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Фото</th>
                  <th className="px-5 py-3 font-medium">Название</th>
                  <th className="px-5 py-3 font-medium">Категория</th>
                  <th className="px-5 py-3 font-medium">Цена</th>
                  <th className="px-5 py-3 font-medium text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-5 py-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                        {p.image ? (
                          <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="flex items-center justify-center h-full text-secondary text-xs">—</div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-primary font-medium">{p.name}</p>
                      <p className="text-secondary text-xs line-clamp-1 max-w-xs">{p.description}</p>
                      {p._count.images > 1 && (
                        <p className="text-secondary text-xs mt-0.5">{p._count.images} фото</p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-muted text-secondary px-2.5 py-1 rounded-full">
                        {p.category.name}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-primary font-medium whitespace-nowrap">
                      {p.price.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-sm text-accent hover:underline mr-4"
                      >
                        Редактировать
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {products.map((p) => (
              <div key={p.id} className="liquid-glass rounded-2xl p-4 flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full text-secondary text-xs">—</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-primary font-medium text-sm truncate">{p.name}</p>
                  <span className="text-xs bg-muted text-secondary px-2 py-0.5 rounded-full inline-block mt-1">
                    {p.category.name}
                  </span>
                  <p className="text-primary font-semibold mt-1">{p.price.toLocaleString('ru-RU')} ₽</p>
                  <div className="flex gap-3 mt-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-sm text-accent hover:underline"
                    >
                      Редактировать
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
