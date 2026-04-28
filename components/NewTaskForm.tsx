'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function NewTaskForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [timeLimit, setTimeLimit] = useState(2000)
  const [memoryLimit, setMemoryLimit] = useState(65536)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        folderName: slug,
        description,
        timeLimit,
        memoryLimit,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error ?? 'Failed to create task')
      return
    }

    router.push(`/admin/tasks/${data.id}`)
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
        <label className="text-sm font-medium text-gray-700">Display Name</label>
        <input
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setSlug(toSlug(e.target.value))
          }}
          placeholder="A + B Problem"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Slug</label>
        <input
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="aplusb"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
        />
        <p className="text-xs text-gray-400">Used in URLs. Auto-filled from display name.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="# Task title&#10;&#10;Problem statement here..."
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono resize-y"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-gray-700">Time Limit (ms)</label>
          <input
            type="number"
            min={100}
            max={30000}
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-gray-700">Memory Limit (KB)</label>
          <input
            type="number"
            min={1024}
            max={524288}
            value={memoryLimit}
            onChange={(e) => setMemoryLimit(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push('/admin')}
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