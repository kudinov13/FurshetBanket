'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/lib/auth-actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl font-semibold text-primary tracking-tight">
            Фуршет-банкет
          </Link>
          <p className="text-secondary text-sm mt-2">Панель администратора</p>
        </div>

        <form action={action} className="liquid-glass rounded-3xl p-8 flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-primary mb-2">
              Логин
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              autoFocus
              required
              className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {pending ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="text-center mt-6">
          <Link href="/" className="text-secondary text-sm hover:text-primary transition-colors">
            ← На главную
          </Link>
        </p>
      </div>
    </main>
  )
}
