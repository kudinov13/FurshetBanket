import { prisma } from '@/lib/db'
import { CatalogGridClient } from './CatalogGridClient'

export async function CatalogGrid() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, images: { orderBy: { order: 'asc' } } },
  })

  return <CatalogGridClient products={products} />
}
