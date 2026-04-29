import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')

  const users = await prisma.user.findMany({
    select: { id: true, username: true, role: true },
    orderBy: { username: 'asc' },
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Admin
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        </div>
        <Link
          href="/admin/users/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          + New User
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {users.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">No users yet.</p>
        )}
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center px-5 py-3.5 border-b border-gray-100 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800">{user.username}</p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                user.role === 'ADMIN'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}