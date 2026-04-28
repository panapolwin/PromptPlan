import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function UserScorePage({ params }: { params: { username: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true, username: true },
  })
  if (!user) notFound()

  const visibleTasks = await prisma.task.findMany({
    where: { visible: true },
    select: { id: true, name: true, folderName: true },
  })

  const rows = await Promise.all(
    visibleTasks.map(async (task) => {
      const best = await prisma.submission.findFirst({
        where: { userId: user.id, taskId: task.id, score: { not: null } },
        orderBy: { score: 'desc' },
        select: { score: true, submittedAt: true },
      })
      return {
        id: task.id,
        name: task.name,
        folderName: task.folderName,
        bestScore: best?.score ?? null,
        submittedAt: best?.submittedAt?.toISOString() ?? null,
      }
    }),
  )

  const sorted = rows
    .filter((r) => r.bestScore !== null)
    .sort((a, b) => (b.bestScore ?? 0) - (a.bestScore ?? 0))

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {user.username}&apos;s Scores
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {sorted.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">No submissions yet.</p>
        )}
        {sorted.map((task) => (
          <Link key={task.id} href={`/task/${task.folderName}`}>
            <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition cursor-pointer">
              <span className="flex-1 font-medium text-gray-800">{task.name}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${task.bestScore}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 w-16 text-right">
                {task.bestScore}/100
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
