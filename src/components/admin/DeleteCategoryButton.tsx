'use client'

import { useTransition } from 'react'
import { deleteCategory } from '@/lib/category-actions'

export function DeleteCategoryButton({ id, name, productCount }: { id: number; name: string; productCount: number }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (productCount > 0) {
          alert(`Нельзя удалить категорию «${name}»: в ней есть товары.`)
          return
        }
        if (confirm(`Удалить категорию «${name}»?`)) {
          startTransition(async () => {
            const fd = new FormData()
            fd.set('id', String(id))
            await deleteCategory(fd)
          })
        }
      }}
      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60 cursor-pointer"
    >
      {pending ? 'Удаление...' : 'Удалить'}
    </button>
  )
}
