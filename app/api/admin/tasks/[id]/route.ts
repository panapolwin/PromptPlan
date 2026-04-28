import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: { testCases: { orderBy: { index: 'asc' } } },
  })

  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(task)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const data = await request.json()

  const task = await prisma.task.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(task)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const submissions = await prisma.submission.findMany({
    where: { taskId: params.id },
    select: { id: true },
  })
  const ids = submissions.map((s) => s.id)

  await prisma.testCaseResult.deleteMany({ where: { submissionId: { in: ids } } })
  await prisma.submission.deleteMany({ where: { taskId: params.id } })
  await prisma.testCase.deleteMany({ where: { taskId: params.id } })
  await prisma.task.delete({ where: { id: params.id } })

  return NextResponse.json({ ok: true })
}