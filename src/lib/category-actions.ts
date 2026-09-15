'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './db'
import { verifySession } from './dal'
import { saveUploadedImage, deleteUploadedFile } from './upload'

export type CategoryFormState = {
  error?: string
} | undefined

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0400-\u04FF]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createCategory(_state: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  await verifySession()

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const image = formData.get('image') as File | null

  if (!name) return { error: 'Укажите название категории' }

  const slug = slugify(name)

  let image_url: string | null = null
  try {
    image_url = await saveUploadedImage(image)
  } catch (e) {
    return { error: (e as Error).message }
  }

  try {
    await prisma.category.create({
      data: { name, slug, description, image: image_url },
    })
  } catch {
    return { error: 'Категория с таким названием уже существует' }
  }

  revalidatePath('/')
  revalidatePath('/admin/categories')
}

export async function updateCategory(_state: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  await verifySession()

  const id = Number(formData.get('id'))
  if (Number.isNaN(id)) return { error: 'Неверный ID категории' }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const image = formData.get('image') as File | null
  const existingImage = (formData.get('existingImage') as string | null) || null

  if (!name) return { error: 'Укажите название категории' }

  const slug = slugify(name)

  let image_url = existingImage
  try {
    const uploaded = await saveUploadedImage(image)
    if (uploaded) {
      image_url = uploaded
      await deleteUploadedFile(existingImage)
    }
  } catch (e) {
    return { error: (e as Error).message }
  }

  try {
    await prisma.category.update({
      where: { id },
      data: { name, slug, description, image: image_url },
    })
  } catch {
    return { error: 'Категория с таким названием уже существует' }
  }

  revalidatePath('/')
  revalidatePath('/admin/categories')
}

export async function deleteCategory(formData: FormData): Promise<void> {
  await verifySession()

  const id = Number(formData.get('id'))
  if (Number.isNaN(id)) return

  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  })
  if (!category) return

  if (category._count.products > 0) {
    return // cannot delete a category with products (onDelete: Restrict)
  }

  await prisma.category.delete({ where: { id } })
  await deleteUploadedFile(category.image)

  revalidatePath('/')
  revalidatePath('/admin/categories')
}
