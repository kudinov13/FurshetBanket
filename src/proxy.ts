import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'admin-session'
const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET)

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })
    return true
  } catch {
    return false
  }
}

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtected = path.startsWith('/admin')
  const isLoginPage = path === '/login'

  const token = req.cookies.get(SESSION_COOKIE)?.value
  const authed = await isValidSession(token)

  // Block unauthenticated access to /admin
  if (isProtected && !authed) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Send authenticated users away from /login
  if (isLoginPage && authed) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes except static assets, API uploads and Next internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|uploads|api/upload).*)'],
}
