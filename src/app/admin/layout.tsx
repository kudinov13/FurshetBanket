import type { Metadata } from 'next'
import { verifySession } from '@/lib/dal'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata: Metadata = {
  title: 'Админ-панель',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession()

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      <AdminNav username={user.username} />

      {/* Content */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 md:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
