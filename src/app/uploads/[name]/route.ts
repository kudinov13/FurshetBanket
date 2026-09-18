import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

/**
 * Serves runtime-uploaded files from public/uploads/.
 * `next start` only serves public/ files that existed at build time,
 * so this handler covers files added later — needed by the image
 * optimizer, which fetches /uploads/* from the app itself.
 */
export async function GET(_req: NextRequest, ctx: RouteContext<'/uploads/[name]'>) {
  const { name } = await ctx.params
  const safeName = path.basename(name)
  const contentType = CONTENT_TYPES[path.extname(safeName).toLowerCase()]

  if (!contentType) {
    return new NextResponse(null, { status: 404 })
  }

  const filePath = path.join(UPLOAD_DIR, safeName)

  try {
    const fileStat = await stat(filePath)
    if (!fileStat.isFile()) throw new Error('not a file')
    const buffer = await readFile(filePath)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(fileStat.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
