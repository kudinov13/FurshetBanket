'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './db'
import { verifySession } from './dal'
import { saveUploadedImage, deleteUploadedFile } from './upload'

export type ProductFormState = {
  error?: string
} | undefined

function getImageFiles(formData: FormData): File[] {
  return (formData.getAll('images') as File[]).filter((f) => f && f.size > 0)
}

function parseDeleteIds(formData: FormData): number[] {
  try {
    const raw = formData.get('deleteImages') as string | null
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.map(Number).filter((n) => !Number.isNaN(n)) : []
  } catch {
    return []
  }
}

async function uploadAll(files: File[]): Promise<{ urls?: string[]; error?: string }> {
  const urls: string[] = []
  try {
    for (const f of files) {
      const url = await saveUploadedImage(f)
      if (url) urls.push(url)
    }
    return { urls }
  } catch (e) {
    for (const u of urls) await deleteUploadedFile(u)
    return { error: (e as Error).message }
  }
}

async function syncPrimaryImage(productId: number): Promise<void> {
  const rows = await prisma.productImage.findMany({
    where: { productId },
    orderBy: { order: 'asc' },
  })
  await prisma.product.update({
    where: { id: productId },
    data: { image: rows[0]?.url ?? null },
  })
}

export async function createProduct(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await verifySession()

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const priceStr = (formData.get('price') as string | null)?.trim() ?? ''
  const categoryIdStr = (formData.get('categoryId') as string | null)?.trim() ?? ''

  if (!name) return { error: 'Укажите название товара' }
  const price = Number(priceStr)
  if (!priceStr || Number.isNaN(price) || price < 0) return { error: 'Укажите корректную цену' }
  const categoryId = Number(categoryIdStr)
  if (!categoryIdStr || Number.isNaN(categoryId)) return { error: 'Выберите категорию' }

  const { urls, error } = await uploadAll(getImageFiles(formData))
  if (error) return { error }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
      image: urls?.[0] ?? null,
      images: { create: (urls ?? []).map((url, i) => ({ url, order: i })) },
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function updateProduct(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await verifySession()

  const id = Number(formData.get('id'))
  if (Number.isNaN(id)) return { error: 'Неверный ID товара' }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const priceStr = (formData.get('price') as string | null)?.trim() ?? ''
  const categoryIdStr = (formData.get('categoryId') as string | null)?.trim() ?? ''
  const firstImage = (formData.get('firstImage') as string | null) ?? ''

  if (!name) return { error: 'Укажите название товара' }
  const price = Number(priceStr)
  if (!priceStr || Number.isNaN(price) || price < 0) return { error: 'Укажите корректную цену' }
  const categoryId = Number(categoryIdStr)
  if (!categoryIdStr || Number.isNaN(categoryId)) return { error: 'Выберите категорию' }

  const product = await prisma.product.findUnique({ where: { id }, include: { images: true } })
  if (!product) return { error: 'Товар не найден' }

  // Products created before the gallery existed only have `image` —
  // promote it to a gallery row so it behaves like the rest.
  if (product.image && !product.images.some((i) => i.url === product.image)) {
    const minOrder = product.images.reduce((m, i) => Math.min(m, i.order), 0)
    await prisma.productImage.create({
      data: { url: product.image, order: minOrder - 1, productId: id },
    })
  }

  // Delete images the admin marked for removal
  const deleteIds = parseDeleteIds(formData)
  if (deleteIds.length) {
    const doomed = await prisma.productImage.findMany({
      where: { productId: id, id: { in: deleteIds } },
    })
    await prisma.productImage.deleteMany({ where: { productId: id, id: { in: deleteIds } } })
    for (const row of doomed) await deleteUploadedFile(row.url)
  }

  // Upload new photos, appended after existing ones
  const { urls: newUrls, error } = await uploadAll(getImageFiles(formData))
  if (error) return { error }
  if (newUrls?.length) {
    const max = await prisma.productImage.aggregate({ where: { productId: id }, _max: { order: true } })
    const start = (max._max.order ?? -1) + 1
    await prisma.productImage.createMany({
      data: newUrls.map((url, i) => ({ url, order: start + i, productId: id })),
    })
  }

  // Mark chosen image as primary by moving it to the front
  if (firstImage) {
    let target = null
    if (firstImage.startsWith('new:')) {
      const url = newUrls?.[Number(firstImage.slice(4))]
      if (url) {
        target = await prisma.productImage.findFirst({ where: { productId: id, url } })
      }
    } else {
      target = await prisma.productImage.findFirst({
        where: { productId: id, id: Number(firstImage) },
      })
    }
    if (target) {
      const min = await prisma.productImage.aggregate({ where: { productId: id }, _min: { order: true } })
      await prisma.productImage.update({
        where: { id: target.id },
        data: { order: (min._min.order ?? 0) - 1 },
      })
    }
  }

  await prisma.product.update({
    where: { id },
    data: { name, description, price, categoryId },
  })
  await syncPrimaryImage(id)

  revalidatePath('/')
  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await verifySession()

  const id = Number(formData.get('id'))
  if (Number.isNaN(id)) return

  const product = await prisma.product.findUnique({ where: { id }, include: { images: true } })
  if (!product) return

  await prisma.product.delete({ where: { id } })
  await deleteUploadedFile(product.image)
  for (const img of product.images) await deleteUploadedFile(img.url)

  revalidatePath('/')
  revalidatePath('/admin/products')
}
