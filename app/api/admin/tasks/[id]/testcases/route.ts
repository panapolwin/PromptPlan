import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { input, expectedOutput } = await request.json()

  const last = await prisma.testCase.findFirst({
    where: { taskId: params.id },
    orderBy: { index: 'desc' },
  })

  const testCase = await prisma.testCase.create({
    data: {
      taskId: params.id,
      index: (last?.index ?? 0) + 1,
      input: input ?? '',
      expectedOutput: expectedOutput ?? '',
    },
  })

  return NextResponse.json(testCase, { status: 201 })
}