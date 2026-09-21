'use client'

import { useActionState, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createProduct, updateProduct } from '@/lib/product-actions'

type Category = { id: number; name: string }
type ExistingImage = { id: number; url: string }

type Props = {
  categories: Category[]
  product?: {
    id: number
    name: string
    description: string
    price: number
    categoryId: number
    image: string | null
    images: ExistingImage[]
  }
}

export function ProductForm({ categories, product }: Props) {
  const isEdit = Boolean(product)
  const action = isEdit ? updateProduct : createProduct
  const [state, formAction, pending] = useActionState(action, undefined)

  const existing = product?.images ?? []
  const [deleted, setDeleted] = useState<Set<number>>(new Set())
  const [firstImage, setFirstImage] = useState<string>('')
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setNewPreviews(files.map((f) => URL.createObjectURL(f)))
    if (firstImage.startsWith('new:')) setFirstImage('')
  }

  const toggleDelete = (id: number) => {
    setDeleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    if (firstImage === String(id)) setFirstImage('')
  }

  const toggleNew = (i: number) => {
    // Remove the file from the input's FileList too, not just the preview
    const input = fileInputRef.current
    if (input?.files) {
      const dt = new DataTransfer()
      Array.from(input.files).forEach((f, idx) => { if (idx !== i) dt.items.add(f) })
      input.files = dt.files
    }
    setNewPreviews((prev) => prev.filter((_, idx) => idx !== i))
    if (firstImage === `new:${i}`) setFirstImage('')
    else if (firstImage.startsWith('new:') && Number(firstImage.slice(4)) > i) {
      setFirstImage(`new:${Number(firstImage.slice(4)) - 1}`)
    }
  }

  // Effective main image: explicit choice, else first kept existing, else first new upload
  const firstKept = existing.find((img) => !deleted.has(img.id))
  const mainKey = firstImage || (firstKept ? String(firstKept.id) : newPreviews.length ? 'new:0' : '')
  const isMain = (key: string) => key === mainKey

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-2xl">
      {isEdit && product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="deleteImages" value={JSON.stringify([...deleted])} />
      <input type="hidden" name="firstImage" value={mainKey} />

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Фото товара — можно несколько
        </label>

        {(existing.length > 0 || newPreviews.length > 0) && (
          <div className="flex flex-wrap gap-3 mb-3">
            {existing.map((img) => {
              const isDeleted = deleted.has(img.id)
              const key = String(img.id)
              return (
                <div key={img.id} className="relative w-28 h-28 rounded-xl overflow-hidden bg-muted border border-border group/thumb">
                  <Image
                    src={img.url}
                    alt="Фото"
                    fill
                    className={`object-cover transition ${isDeleted ? 'opacity-30 grayscale' : ''}`}
                    unoptimized
                  />
                  {isMain(key) && !isDeleted && (
                    <span className="absolute top-1 left-1 bg-accent text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                      Главное
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 p-1 bg-black/50 opacity-100 md:opacity-0 md:group-hover/thumb:opacity-100 transition">
                    {!isDeleted && !isMain(key) && (
                      <button
                        type="button"
                        onClick={() => setFirstImage(key)}
                        className="text-[10px] text-white bg-white/20 rounded px-1.5 py-0.5 cursor-pointer"
                      >
                        Главное
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleDelete(img.id)}
                      className="text-[10px] text-white bg-white/20 rounded px-1.5 py-0.5 cursor-pointer"
                    >
                      {isDeleted ? 'Вернуть' : 'Удалить'}
                    </button>
                  </div>
                </div>
              )
            })}

            {newPreviews.map((src, i) => {
              const key = `new:${i}`
              return (
                <div key={key} className="relative w-28 h-28 rounded-xl overflow-hidden bg-muted border border-accent/50 group/thumb">
                  <Image src={src} alt="Новое фото" fill className="object-cover" unoptimized />
                  {isMain(key) && (
                    <span className="absolute top-1 left-1 bg-accent text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                      Главное
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 p-1 bg-black/50 opacity-100 md:opacity-0 md:group-hover/thumb:opacity-100 transition">
                    {!isMain(key) && (
                      <button
                        type="button"
                        onClick={() => setFirstImage(key)}
                        className="text-[10px] text-white bg-white/20 rounded px-1.5 py-0.5 cursor-pointer"
                      >
                        Главное
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleNew(i)}
                      className="text-[10px] text-white bg-white/20 rounded px-1.5 py-0.5 cursor-pointer"
                    >
                      Убрать
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          name="images"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          multiple
          onChange={handleFileChange}
          className="text-sm text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white file:cursor-pointer file:hover:bg-primary/90 cursor-pointer"
        />
        <p className="text-xs text-secondary mt-2">
          JPEG, PNG, WebP, AVIF, GIF. До 5 МБ каждое. Первое фото — главное (видно в каталоге), можно выбрать другое кнопкой «Главное».
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
          Название
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={product?.name ?? ''}
          required
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-primary mb-2">
          Категория
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId ?? ''}
          required
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
        >
          <option value="" disabled>Выберите категорию</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-primary mb-2">
          Цена (₽)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="1"
          defaultValue={product?.price ?? ''}
          required
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          enterKeyHint="enter"
          defaultValue={product?.description ?? ''}
          placeholder={'Каждая строка — с новой строки, например:\n- 5 тарталеток с икрой\n- 5 тарталеток с креветкой'}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-y"
        />
        <p className="text-xs text-secondary mt-1">Переносы строк сохранятся на сайте.</p>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
        >
          {pending ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать товар'}
        </button>
        <Link
          href="/admin/products"
          className="px-6 py-3 rounded-xl text-sm font-medium text-secondary border border-border hover:bg-muted transition-colors"
        >
          Отмена
        </Link>
      </div>
    </form>
  )
}
