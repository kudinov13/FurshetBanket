'use client'

import { useTransition } from 'react'
import { deleteProduct } from '@/lib/product-actions'

export function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Удалить товар «${name}»?`)) {
          startTransition(async () => {
            const fd = new FormData()
            fd.set('id', String(id))
            await deleteProduct(fd)
          })
        }
      }}
      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60 cursor-pointer"
    >
      {pending ? 'Удаление...' : 'Удалить'}
    </button>
  )
}
