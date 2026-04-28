'use client'

import { useState } from 'react'

export default function AdminToggle({
  taskId,
  initialVisible,
}: {
  taskId: string
  initialVisible: boolean
}) {
  const [visible, setVisible] = useState(initialVisible)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    const res = await fetch(`/api/admin/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !visible }),
    })
    if (res.ok) setVisible((v) => !v)
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={visible ? 'Hide from users' : 'Show to users'}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
        visible ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          visible ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}