import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

const BASE_URL = 'https://furshetoria.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Dynamic product pages (if individual product pages exist in future)
  const products = await prisma.product.findMany({
    select: { id: true, updatedAt: true, image: true },
    orderBy: { updatedAt: 'desc' },
  })

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/#product-${p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: p.image ? [`${BASE_URL}${p.image}`] : undefined,
  }))

  // Category entries (anchor-based, since catalog is on home page)
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, updatedAt: true, image: true },
    orderBy: { updatedAt: 'desc' },
  })

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/#category-${c.id}`,
    lastModified: c.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
    images: c.image ? [`${BASE_URL}${c.image}`] : undefined,
  }))

  return [...staticPages, ...categoryEntries, ...productEntries]
}
