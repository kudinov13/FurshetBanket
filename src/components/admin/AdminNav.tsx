'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './LogoutButton'

const navItems = [
  { href: '/admin', label: 'Обзор', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/products', label: 'Товары', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { href: '/admin/categories', label: 'Категории', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
]

export function AdminNav({ username }: { username: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-primary text-white flex items-center justify-between px-4 h-14">
        <Link href="/admin" className="font-display text-lg font-semibold tracking-tight">
          Фуршет-банкет
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Меню"
          className="p-2 cursor-pointer"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-primary text-white border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-2 pt-2">
            <p className="px-3 text-xs text-white/40 mb-1 truncate">{username}</p>
            <LogoutButton />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-primary text-white flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/admin" className="font-display text-lg font-semibold tracking-tight">
            Фуршет-банкет
          </Link>
          <p className="text-white/50 text-xs mt-1">Панель администратора</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <p className="px-3 text-xs text-white/40 mb-2 truncate">{username}</p>
          <LogoutButton />
        </div>
      </aside>
    </>
  )
}
