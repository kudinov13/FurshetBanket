'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './db'
import { verifySession } from './dal'
import { saveUploadedImage, deleteUploadedFile } from './upload'

export type ProductFormState = {
  error?: string
} | undefined

export async function createProduct(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await verifySession()

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const priceStr = (formData.get('price') as string | null)?.trim() ?? ''
  const categoryIdStr = (formData.get('categoryId') as string | null)?.trim() ?? ''
  const image = formData.get('image') as File | null

  if (!name) return { error: 'Укажите название товара' }
  const price = Number(priceStr)
  if (!priceStr || Number.isNaN(price) || price < 0) return { error: 'Укажите корректную цену' }
  const categoryId = Number(categoryIdStr)
  if (!categoryIdStr || Number.isNaN(categoryId)) return { error: 'Выберите категорию' }

  let image_url: string | null = null
  try {
    image_url = await saveUploadedImage(image)
  } catch (e) {
    return { error: (e as Error).message }
  }

  await prisma.product.create({
    data: { name, description, price, categoryId, image: image_url },
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
  const image = formData.get('image') as File | null
  const existingImage = (formData.get('existingImage') as string | null) || null

  if (!name) return { error: 'Укажите название товара' }
  const price = Number(priceStr)
  if (!priceStr || Number.isNaN(price) || price < 0) return { error: 'Укажите корректную цену' }
  const categoryId = Number(categoryIdStr)
  if (!categoryIdStr || Number.isNaN(categoryId)) return { error: 'Выберите категорию' }

  let image_url = existingImage
  try {
    const uploaded = await saveUploadedImage(image)
    if (uploaded) {
      image_url = uploaded
      // remove the old image if it was an upload
      await deleteUploadedFile(existingImage)
    }
  } catch (e) {
    return { error: (e as Error).message }
  }

  await prisma.product.update({
    where: { id },
    data: { name, description, price, categoryId, image: image_url },
  })

  revalidatePath('/')
  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await verifySession()

  const id = Number(formData.get('id'))
  if (Number.isNaN(id)) return

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) return

  await prisma.product.delete({ where: { id } })
  await deleteUploadedFile(product.image)

  revalidatePath('/')
  revalidatePath('/admin/products')
}
