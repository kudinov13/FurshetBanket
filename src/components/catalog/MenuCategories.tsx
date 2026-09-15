import { prisma } from '@/lib/db'
import { MenuCategoriesClient } from './MenuCategoriesClient'

export async function MenuCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  return <MenuCategoriesClient categories={categories} />
}
