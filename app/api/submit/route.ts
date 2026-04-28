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
  const uploadDir = path.join(process.cwd(), 'uploads', session.user.id, task.folderName)
  await fs.mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, `${timestamp}.cpp`)

  const bytes = await file.arrayBuffer()
  await fs.writeFile(filePath, Buffer.from(bytes))

  const submission = await prisma.submission.create({
    data: { userId: session.user.id, taskId, filePath, status: 'PENDING' },
  })

  gradeSubmission(submission.id).catch(console.error)

  return NextResponse.json({ submissionId: submission.id })
}