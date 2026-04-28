import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; tcId: string } },
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { input, expectedOutput } = await request.json()

  const tc = await prisma.testCase.update({
    where: { id: params.tcId },
    data: { input, expectedOutput },
  })

  return NextResponse.json(tc)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string; tcId: string } },
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.testCase.delete({ where: { id: params.tcId } })
  return NextResponse.json({ ok: true })
}