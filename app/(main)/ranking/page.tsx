import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function RankingPage() {
  const visibleTaskIds = (
    await prisma.task.findMany({ where: { visible: true }, select: { id: true } })
  ).map((t) => t.id)

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      submissions: {
        where: { taskId: { in: visibleTaskIds }, score: { not: null } },
        select: { taskId: true, score: true },
      },
    },
  })

  const rankings = users
    .map((user) => {
      const bestPerTask = new Map<string, number>()
      for (const sub of user.submissions) {
        const prev = bestPerTask.get(sub.taskId) ?? 0
        bestPerTask.set(sub.taskId, Math.max(prev, sub.score ?? 0))
      }
      const totalScore = Array.from(bestPerTask.values()).reduce((a, b) => a + b, 0)
      return { id: user.id, username: user.username, totalScore }
    })
    .sort((a, b) => b.totalScore - a.totalScore)

  const medalClass = (rank: number) => {
    if (rank === 1) return 'bg-yellow-50'
    if (rank === 2) return 'bg-gray-50'
    if (rank === 3) return 'bg-orange-50'
    return ''
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ranking</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {rankings.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">No submissions yet.</p>
        )}
        {rankings.map((user, idx) => {
          const rank = idx + 1
          return (
            <Link key={user.id} href={`/user/${user.username}`}>
              <div
                className={`flex items-center px-5 py-3.5 border-b border-gray-100 last:border-0 hover:brightness-95 transition cursor-pointer ${medalClass(rank)}`}
              >
                <span className="w-10 text-sm font-bold text-gray-400">#{rank}</span>
                <span className="flex-1 font-medium text-gray-800">{user.username}</span>
                <span className="text-sm font-semibold text-indigo-600">
                  {user.totalScore} pts
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
