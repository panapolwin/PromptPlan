import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { gradeSubmission } from '@/lib/grader'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const taskId = formData.get('taskId') as string | null

  if (!file || !taskId) {
    return NextResponse.json({ error: 'Missing file or taskId' }, { status: 400 })
  }

  if (!file.name.endsWith('.cpp')) {
    return NextResponse.json({ error: 'Only .cpp files are accepted' }, { status: 400 })
  }

  const task = await prisma.task.findUnique({ where: { id: taskId, visible: true } })
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  const timestamp = Date.now()
  const tmpBase = process.platform === 'win32'
    ? path.join(process.cwd(), 'uploads')
    : '/tmp/uploads'
  const uploadDir = path.join(tmpBase, session.user.id, task.folderName)

  try {
    await fs.mkdir(uploadDir, { recursive: true })
  } catch {
    return NextResponse.json({ error: 'Failed to prepare upload directory' }, { status: 500 })
  }

  const filePath = path.join(uploadDir, `${timestamp}.cpp`)

  try {
    const bytes = await file.arrayBuffer()
    await fs.writeFile(filePath, Buffer.from(bytes))
  } catch {
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 })
  }

  const submission = await prisma.submission.create({
    data: { userId: session.user.id, taskId, filePath, status: 'PENDING' },
  })

  gradeSubmission(submission.id).catch(console.error)

  return NextResponse.json({ submissionId: submission.id })
}