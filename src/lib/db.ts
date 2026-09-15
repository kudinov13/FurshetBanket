import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL ?? 'file:./dev.db'
  // better-sqlite3 expects a filesystem path, strip the "file:" prefix
  const url = rawUrl.startsWith('file:') ? rawUrl.slice('file:'.length) : rawUrl
  const adapter = new PrismaBetterSqlite3({ url })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
