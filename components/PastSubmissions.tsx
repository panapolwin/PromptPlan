'use client'

import { useState } from 'react'

interface TestResult {
  id: string
  testCaseIndex: number
  passed: boolean
  verdict: string
  timeTaken: number | null
  memoryUsed: number | null
}

interface Submission {
  id: string
  status: string
  score: number | null
  submittedAt: string
  testResults: TestResult[]
}

const STATUS_BADGE: Record<string, string> = {
  ACCEPTED: 'bg-green-100 text-green-700',
  WRONG_ANSWER: 'bg-red-100 text-red-700',
  TIME_LIMIT: 'bg-orange-100 text-orange-700',
  MEMORY_LIMIT: 'bg-purple-100 text-purple-700',
  COMPILE_ERROR: 'bg-gray-100 text-gray-600',
  ERROR: 'bg-gray-100 text-gray-600',
}

const VERDICT_COLOR: Record<string, string> = {
  PASS: 'text-green-600',
  WRONG_OUTPUT: 'text-red-600',
  TIMEOUT: 'text-orange-500',
  MEMORY_EXCEEDED: 'text-purple-600',
}

export default function PastSubmissions({ submissions }: { submissions: Submission[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="divide-y divide-gray-100">
      {submissions.map((sub) => (
        <div key={sub.id}>
          <button
            onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
            className="w-full flex items-center gap-3 py-2.5 px-1 text-left hover:bg-gray-50 rounded-lg transition"
          >
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_BADGE[sub.status] ?? 'bg-gray-100 text-gray-500'}`}
            >
              {sub.status.replace(/_/g, ' ')}
            </span>
            {sub.score !== null && (
              <span className="text-sm text-gray-600">{sub.score}/100</span>
            )}
            <span className="ml-auto text-xs text-gray-400">
              {new Date(sub.submittedAt).toLocaleString()}
            </span>
            <span className="text-gray-300 text-xs">{expanded === sub.id ? '▲' : '▼'}</span>
          </button>

          {expanded === sub.id && sub.testResults.length > 0 && (
            <table className="w-full text-sm mb-2 ml-1">
              <thead>
                <tr className="text-left text-xs text-gray-400">
                  <th className="pb-1 font-medium">#</th>
                  <th className="pb-1 font-medium">Verdict</th>
                  <th className="pb-1 font-medium">Time</th>
                  <th className="pb-1 font-medium">Memory</th>
                </tr>
              </thead>
              <tbody>
                {sub.testResults.map((tc) => (
                  <tr key={tc.id} className="border-t border-gray-50">
                    <td className="py-1 text-gray-400">{tc.testCaseIndex}</td>
                    <td className={`py-1 font-medium ${VERDICT_COLOR[tc.verdict] ?? 'text-gray-500'}`}>
                      {tc.passed ? '✓' : '✗'} {tc.verdict.replace(/_/g, ' ')}
                    </td>
                    <td className="py-1 text-gray-400">
                      {tc.timeTaken !== null ? `${tc.timeTaken} ms` : '—'}
                    </td>
                    <td className="py-1 text-gray-400">
                      {tc.memoryUsed !== null ? `${tc.memoryUsed} KB` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  )
}