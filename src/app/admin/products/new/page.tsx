import { prisma } from '@/lib/db'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <a href="/admin/products" className="text-secondary text-sm hover:text-primary transition-colors">
          ← Товары
        </a>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight mt-2">
          Новый товар
        </h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  )
}
