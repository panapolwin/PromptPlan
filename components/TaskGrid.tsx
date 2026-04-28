'use client'

import { useState } from 'react'
import TaskCard from '@/components/TaskCard'

interface Task {
  id: string
  name: string
  folderName: string
  bestScore: number | null
}

export default function TaskGrid({ tasks }: { tasks: Task[] }) {
  const [query, setQuery] = useState('')

  const filtered = tasks.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      />
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 text-sm mt-12">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              folderName={task.folderName}
              name={task.name}
              bestScore={task.bestScore}
            />
          ))}
        </div>
      )}
    </div>
  )
}