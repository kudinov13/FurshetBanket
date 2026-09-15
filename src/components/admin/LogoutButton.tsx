'use client'

import { useTransition } from 'react'
import { logout } from '@/lib/auth-actions'

export function LogoutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await logout() })}
      className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-60"
    >
      {pending ? 'Выход...' : 'Выйти'}
    </button>
  )
}
