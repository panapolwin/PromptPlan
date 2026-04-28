import Link from 'next/link'
import { auth, signOut } from '@/auth'

export default async function Header() {
  const session = await auth()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
          >
            Tasks
          </Link>
          <Link
            href="/ranking"
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
          >
            Ranking
          </Link>
          {session?.user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`/user/${session?.user?.name}`}
            className="text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            {session?.user?.name}
          </Link>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/login' })
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-400 hover:text-red-500 transition"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}