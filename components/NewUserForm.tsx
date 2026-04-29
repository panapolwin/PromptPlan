'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewUserForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error ?? 'Failed to create user')
      return
    }

    router.push('/admin/users')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5"
    >
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johndoe"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push('/admin/users')}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {loading ? 'Creating…' : 'Create →'}
        </button>
      </div>
    </form>
  )
}