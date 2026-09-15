'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { createCategory, updateCategory } from '@/lib/category-actions'

type Props = {
  category?: {
    id: number
    name: string
    description: string
    image: string | null
  }
  onDone?: () => void
}

export function CategoryForm({ category, onDone }: Props) {
  const isEdit = Boolean(category)
  const action = isEdit ? updateCategory : createCategory
  const [state, formAction, pending] = useActionState(action, undefined)
  const [preview, setPreview] = useState<string | null>(category?.image ?? null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <form
      action={async (fd) => {
        await formAction(fd)
        onDone?.()
      }}
      className="flex flex-col gap-4"
    >
      {isEdit && category && <input type="hidden" name="id" value={category.id} />}
      {isEdit && <input type="hidden" name="existingImage" value={category?.image ?? ''} />}

      {/* Image */}
      <div className="flex items-start gap-4">
        <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
          {preview ? (
            <Image src={preview} alt="Превью" fill className="object-cover" unoptimized />
          ) : (
            <div className="flex items-center justify-center h-full text-secondary text-xs">Нет фото</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            onChange={handleFileChange}
            className="text-sm text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-primary file:text-white file:cursor-pointer file:hover:bg-primary/90 cursor-pointer"
          />
          <p className="text-xs text-secondary">До 5 МБ</p>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Название</label>
        <input
          name="name"
          type="text"
          defaultValue={category?.name ?? ''}
          required
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Описание</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={category?.description ?? ''}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-y"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
        >
          {pending ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
        </button>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-secondary border border-border hover:bg-muted transition-colors cursor-pointer"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}
