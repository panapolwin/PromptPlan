import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import TaskGrid from '@/components/TaskGrid'

export default async function TaskListPage() {
  const session = await auth()
  const userId = session!.user.id

  const tasks = await prisma.task.findMany({
    where: { visible: true },
    include: {
      submissions: {
        where: { userId, score: { not: null } },
        orderBy: { score: 'desc' },
        take: 1,
        select: { score: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  const tasksWithScore = tasks.map((t) => ({
    id: t.id,
    name: t.name,
    folderName: t.folderName,
    bestScore: t.submissions[0]?.score ?? null,
  }))

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tasks</h1>
      <TaskGrid tasks={tasksWithScore} />
    </main>
  )
}
