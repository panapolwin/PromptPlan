import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { name, folderName, description, timeLimit, memoryLimit } = await request.json()

  if (!name || !folderName) {
    return NextResponse.json({ error: 'Name and folderName are required' }, { status: 400 })
  }

  try {
    const task = await prisma.task.create({
      data: {
        name,
        folderName: folderName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: description ?? '',
        timeLimit: timeLimit ?? 2000,
        memoryLimit: memoryLimit ?? 65536,
        visible: false,
      },
    })
    return NextResponse.json(task, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'A task with that slug already exists' }, { status: 409 })
  }
}