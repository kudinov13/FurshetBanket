import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']

/**
 * Saves an uploaded image file to public/uploads/ and returns the public URL path.
 * Returns null if no file was provided or the file is empty.
 */
export async function saveUploadedImage(file: File | null | undefined): Promise<string | null> {
  if (!file || file.size === 0) return null

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Недопустимый тип файла. Разрешены: JPEG, PNG, WebP, AVIF, GIF.')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('Файл слишком большой. Максимум 10 МБ.')
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true })

  const ext = path.extname(file.name) || `.${file.type.split('/')[1] ?? 'jpg'}`
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`
  const fullPath = path.join(UPLOAD_DIR, name)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(fullPath, buffer)

  return `/uploads/${name}`
}

/**
 * Deletes a file from public/uploads/ by its URL path.
 * Silently ignores missing files.
 */
export async function deleteUploadedFile(url: string | null | undefined): Promise<void> {
  if (!url || !url.startsWith('/uploads/')) return
  const fullPath = path.join(UPLOAD_DIR, path.basename(url))
  await fs.rm(fullPath, { force: true })
}
