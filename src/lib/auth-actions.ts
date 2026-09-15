'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { prisma } from './db'
import { createSession, deleteSession } from './session'

export type LoginState = {
  error?: string
} | undefined

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const username = (formData.get('username') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!username || !password) {
    return { error: 'Введите логин и пароль' }
  }

  const admin = await prisma.admin.findUnique({ where: { username } })

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return { error: 'Неверный логин или пароль' }
  }

  await createSession(admin.id, admin.username)
  redirect('/admin')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/')
}
