import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { decrypt, getSessionToken } from './session'

export type AuthUser = {
  userId: number
  username: string
}

/**
 * Verifies the admin session from the cookie.
 * Redirects to /login if not authenticated.
 * Memoized per-request via React `cache`.
 */
export const verifySession = cache(async (): Promise<AuthUser> => {
  const token = await getSessionToken()
  const session = await decrypt(token)

  if (!session?.userId) {
    redirect('/login')
  }

  return { userId: session.userId, username: session.username }
})

/**
 * Returns the current user if authenticated, or null.
 * Does NOT redirect — safe to call on public pages.
 */
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const token = await getSessionToken()
  const session = await decrypt(token)
  if (!session?.userId) return null
  return { userId: session.userId, username: session.username }
})
