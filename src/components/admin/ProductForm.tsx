'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createProduct, updateProduct } from '@/lib/product-actions'

type Category = { id: number; name: string }

type Props = {
  categories: Category[]
  product?: {
    id: number
    name: string
    description: string
    price: number
    categoryId: number
    image: string | null
  }
}

export function ProductForm({ categories, product }: Props) {
  const isEdit = Boolean(product)
  const action = isEdit ? updateProduct : createProduct
  const [state, formAction, pending] = useActionState(action, undefined)
  const [preview, setPreview] = useState<string | null>(product?.image ?? null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-2xl">
      {isEdit && product && <input type="hidden" name="id" value={product.id} />}
      {isEdit && <input type="hidden" name="existingImage" value={product?.image ?? ''} />}

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">Фото товара</label>
        <div className="flex items-start gap-4">
          <div className="relative w-40 h-32 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
            {preview ? (
              <Image src={preview} alt="Превью" fill className="object-cover" unoptimized />
            ) : (
              <div className="flex items-center justify-center h-full text-secondary text-xs">Нет фото</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              onChange={handleFileChange}
              className="text-sm text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white file:cursor-pointer file:hover:bg-primary/90 cursor-pointer"
            />
            <p className="text-xs text-secondary">JPEG, PNG, WebP, AVIF, GIF. До 5 МБ.</p>
            {isEdit && product?.image && (
              <p className="text-xs text-secondary">Оставьте пустым, чтобы сохранить текущее фото.</p>
            )}
          </div>
        </div>
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
          rows={4}
          defaultValue={product?.description ?? ''}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-y"
        />
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
