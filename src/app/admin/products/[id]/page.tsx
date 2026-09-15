import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const productId = Number(id)
  if (Number.isNaN(productId)) notFound()

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])

  if (!product) notFound()

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <a href="/admin/products" className="text-secondary text-sm hover:text-primary transition-colors">
          ← Товары
        </a>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight mt-2">
          Редактировать товар
        </h1>
      </div>

      <ProductForm categories={categories} product={product} />
    </div>
  )
}
