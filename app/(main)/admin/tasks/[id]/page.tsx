import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import TaskEditor from '@/components/TaskEditor'

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')

  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: { testCases: { orderBy: { index: 'asc' } } },
  })
  if (!task) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <TaskEditor task={task} />
    </main>
  )
}