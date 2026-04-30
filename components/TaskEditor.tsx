'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface TestCase {
  id: string
  index: number
  input: string
  expectedOutput: string
}

interface Task {
  id: string
  name: string
  description: string
  visible: boolean
  testCases: TestCase[]
}

export default function TaskEditor({ task }: { task: Task }) {
  const router = useRouter()

  const [name, setName] = useState(task.name)
  const [description, setDescription] = useState(task.description)
  const [visible, setVisible] = useState(task.visible)
  const [savingTask, setSavingTask] = useState(false)
  const [taskSavedAt, setTaskSavedAt] = useState<Date | null>(null)

  const [testCases, setTestCases] = useState<TestCase[]>(task.testCases)
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set())
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set())
  const [addingCase, setAddingCase] = useState(false)

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function saveTask() {
    setSavingTask(true)
    await fetch(`/api/admin/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, visible }),
    })
    setSavingTask(false)
    setTaskSavedAt(new Date())
  }

  async function deleteTask() {
    setDeleting(true)
    await fetch(`/api/admin/tasks/${task.id}`, { method: 'DELETE' })
    router.push('/admin')
    router.refresh()
  }

  async function addTestCase() {
    setAddingCase(true)
    const res = await fetch(`/api/admin/tasks/${task.id}/testcases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: '', expectedOutput: '' }),
    })
    if (res.ok) {
      const tc: TestCase = await res.json()
      setTestCases((prev) => [...prev, tc])
    }
    setAddingCase(false)
  }

  function markDirty(id: string, field: 'input' | 'expectedOutput', value: string) {
    setTestCases((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)),
    )
    setDirtyIds((prev) => new Set(prev).add(id))
    setTaskSavedAt(null)
  }

  async function saveTestCase(id: string) {
    const tc = testCases.find((t) => t.id === id)
    if (!tc) return
    setSavingIds((prev) => new Set(prev).add(id))
    await fetch(`/api/admin/tasks/${task.id}/testcases/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: tc.input, expectedOutput: tc.expectedOutput }),
    })
    setSavingIds((prev) => { const s = new Set(prev); s.delete(id); return s })
    setDirtyIds((prev) => { const s = new Set(prev); s.delete(id); return s })
  }

  async function deleteTestCase(id: string) {
    await fetch(`/api/admin/tasks/${task.id}/testcases/${id}`, { method: 'DELETE' })
    setTestCases((prev) =>
      prev.filter((tc) => tc.id !== id).map((tc, i) => ({ ...tc, index: i + 1 }))
    )
    setDirtyIds((prev) => { const s = new Set(prev); s.delete(id); return s })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition">
          ← Admin
        </Link>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-sm text-red-500 hover:text-red-700 transition"
          >
            Delete Task
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Delete everything?</span>
            <button
              onClick={deleteTask}
              disabled={deleting}
              className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition"
            >
              {deleting ? 'Deleting…' : 'Yes, delete all'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">Task Details</h2>
          {taskSavedAt && (
            <span className="text-xs text-green-600">
              Saved at {taskSavedAt.toLocaleTimeString()} ✓
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Display Name</label>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); setTaskSavedAt(null) }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={8}
            value={description}
            onChange={(e) => { setDescription(e.target.value); setTaskSavedAt(null) }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono resize-y"
          />
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Visible to users</span>
            <button
              type="button"
              onClick={() => { setVisible((v) => !v); setTaskSavedAt(null) }}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                visible ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  visible ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button
            onClick={saveTask}
            disabled={savingTask}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {savingTask ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">
            Test Cases ({testCases.length})
          </h2>
          <button
            onClick={addTestCase}
            disabled={addingCase}
            className="text-sm px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 transition"
          >
            {addingCase ? 'Adding…' : '+ Add Case'}
          </button>
        </div>

        {testCases.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No test cases yet. Click &ldquo;+ Add Case&rdquo; to add one.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {testCases.map((tc) => (
            <div key={tc.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Case #{tc.index}</span>
                <div className="flex items-center gap-2">
                  {dirtyIds.has(tc.id) && (
                    <button
                      onClick={() => saveTestCase(tc.id)}
                      disabled={savingIds.has(tc.id)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                      {savingIds.has(tc.id) ? 'Saving…' : 'Save'}
                    </button>
                  )}
                  <button
                    onClick={() => deleteTestCase(tc.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Input</p>
                  <textarea
                    rows={4}
                    value={tc.input}
                    onChange={(e) => markDirty(tc.id, 'input', e.target.value)}
                    placeholder="1 2"
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-y"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Expected Output</p>
                  <textarea
                    rows={4}
                    value={tc.expectedOutput}
                    onChange={(e) => markDirty(tc.id, 'expectedOutput', e.target.value)}
                    placeholder="3"
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}