'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CategoryForm } from './CategoryForm'
import { DeleteCategoryButton } from './DeleteCategoryButton'

type Category = {
  id: number
  name: string
  description: string
  image: string | null
  _count: { products: number }
}

export function CategoriesManager({ categories: initial }: { categories: Category[] }) {
  const [editingId, setEditingId] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6">
      {initial.map((cat) => (
        <div key={cat.id} className="liquid-glass rounded-2xl p-5">
          {editingId === cat.id ? (
            <CategoryForm category={cat} onDone={() => setEditingId(null)} />
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full text-secondary text-xs">—</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-primary font-medium">{cat.name}</p>
                <p className="text-secondary text-sm line-clamp-1">{cat.description || 'Без описания'}</p>
                <p className="text-secondary text-xs mt-1">{cat._count.products} товаров</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingId(cat.id)}
                  className="text-sm text-accent hover:underline cursor-pointer"
                >
                  Редактировать
                </button>
                <DeleteCategoryButton id={cat.id} name={cat.name} productCount={cat._count.products} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
