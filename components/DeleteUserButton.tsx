'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteUserButton({ userId }: { userId: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
    router.refresh()
  }

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        className="text-xs text-red-400 hover:text-red-600 transition"
      >
        Delete
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">Sure?</span>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-xs px-2.5 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition"
      >
        {deleting ? 'Deleting…' : 'Yes'}
      </button>
      <button
        onClick={() => setConfirm(false)}
        className="text-xs text-gray-500 hover:text-gray-700 transition"
      >
        Cancel
      </button>
    </div>
  )
}