import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const submission = await prisma.submission.findUnique({
    where: { id: params.id },
    include: {
      testResults: { orderBy: { testCaseIndex: 'asc' } },
    },
  })

  if (!submission) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (submission.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(submission)
}