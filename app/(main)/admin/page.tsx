import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AdminToggle from '@/components/AdminToggle'

export default async function AdminPage() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')

  const tasks = await prisma.task.findMany({
    include: { _count: { select: { testCases: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin — Tasks</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/users"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/tasks/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            + New Task
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">
            No tasks yet. Click &ldquo;+ New Task&rdquo; to create one.
          </p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center px-5 py-3.5 border-b border-gray-100 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{task.name}</p>
              <p className="text-xs text-gray-400">
                {task._count.testCases} test case{task._count.testCases !== 1 ? 's' : ''} ·{' '}
                {task.timeLimit} ms · {task.memoryLimit} KB
              </p>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <AdminToggle taskId={task.id} initialVisible={task.visible} />
              <Link
                href={`/admin/tasks/${task.id}`}
                className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}