import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import SubmitSection from '@/components/SubmitSection'
import PastSubmissions from '@/components/PastSubmissions'

export default async function TaskPage({ params }: { params: { name: string } }) {
  const session = await auth()
  const userId = session!.user.id

  const task = await prisma.task.findUnique({
    where: { folderName: params.name, visible: true },
  })
  if (!task) notFound()

  const description = task.description

  const pastSubmissions = await prisma.submission.findMany({
    where: { taskId: task.id, userId },
    orderBy: { submittedAt: 'desc' },
    take: 10,
    include: { testResults: { orderBy: { testCaseIndex: 'asc' } } },
  })

  const serialized = pastSubmissions.map((s) => ({
    ...s,
    submittedAt: s.submittedAt.toISOString(),
  }))

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{task.name}</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-mono">
          {description}
        </pre>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Submit Solution</h2>
        <SubmitSection taskId={task.id} />
      </div>

      {serialized.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">Past Submissions</h2>
          <PastSubmissions submissions={serialized} />
        </div>
      )}
    </main>
  )
}
