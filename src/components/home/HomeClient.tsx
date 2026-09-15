'use client'
import { CustomCursor } from '@/components/common/CustomCursor'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'

export function HomeClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />

      <div>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
