import { prisma } from '@/lib/db'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { CategoriesManager } from '@/components/admin/CategoriesManager'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } },
  })

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight">
          Категории
        </h1>
        <p className="text-secondary text-sm mt-1">Всего: {categories.length}</p>
      </div>

      {/* Create new */}
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h2 className="font-display text-lg font-semibold text-primary mb-4">Новая категория</h2>
        <CategoryForm />
      </div>

      {/* List */}
      <CategoriesManager categories={categories} />
    </div>
  )
}
