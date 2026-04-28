'use client'

import { useState } from 'react'

interface AdminTask {
  folderName: string
  id: string | null
  name: string
  visible: boolean
  inDb: boolean
}

export default function AdminTaskList({ tasks: initial }: { tasks: AdminTask[] }) {
  const [tasks, setTasks] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)

  async function addTask(folderName: string) {
    setLoading(folderName)
    const res = await fetch('/api/admin/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderName }),
    })
    if (res.ok) {
      const data = await res.json()
      setTasks((prev) =>
        prev.map((t) => (t.folderName === folderName ? { ...t, ...data } : t)),
      )
    }
    setLoading(null)
  }

  async function toggleVisible(task: AdminTask) {
    if (!task.id) return
    setLoading(task.folderName)
    const res = await fetch(`/api/admin/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !task.visible }),
    })
    if (res.ok) {
      setTasks((prev) =>
        prev.map((t) =>
          t.folderName === task.folderName ? { ...t, visible: !t.visible } : t,
        ),
      )
    }
    setLoading(null)
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm py-12">
        No folders found in task_list/
      </p>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {tasks.map((task) => (
        <div
          key={task.folderName}
          className="flex items-center px-5 py-3.5 border-b border-gray-100 last:border-0"
        >
          <div className="flex-1">
            <p className="font-medium text-gray-800">{task.name}</p>
            <p className="text-xs text-gray-400">{task.folderName}</p>
          </div>

          <div className="flex items-center gap-3">
            {!task.inDb ? (
              <button
                onClick={() => addTask(task.folderName)}
                disabled={loading === task.folderName}
                className="text-sm px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 transition"
              >
                Add
              </button>
            ) : (
              <>
                <span className="text-xs text-gray-400">
                  {task.visible ? 'Visible' : 'Hidden'}
                </span>
                <button
                  onClick={() => toggleVisible(task)}
                  disabled={loading === task.folderName}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
                    task.visible ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      task.visible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}