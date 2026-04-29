import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    select: { id: true, username: true, role: true },
    orderBy: { username: 'asc' },
  })
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { username, password, role } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
  }
  if (!['USER', 'ADMIN'].includes(role)) {
    return NextResponse.json({ error: 'Role must be USER or ADMIN' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { username, passwordHash, role },
      select: { id: true, username: true, role: true },
    })
    return NextResponse.json(user, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
  }
}