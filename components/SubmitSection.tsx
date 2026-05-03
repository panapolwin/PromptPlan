'use client'

import { useState, useEffect } from 'react'
import { STATUS_BADGE, VERDICT_COLOR } from '@/lib/verdicts'

interface TestResult {
  id: string
  testCaseIndex: number
  passed: boolean
  verdict: string
}

interface SubmissionData {
  status: string
  score: number | null
  testResults: TestResult[]
}


export default function SubmitSection({ taskId }: { taskId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [result, setResult] = useState<SubmissionData | null>(null)

  useEffect(() => {
    if (!submissionId) return
    if (result && !['PENDING', 'RUNNING'].includes(result.status)) return

    const interval = setInterval(async () => {
      const res = await fetch(`/api/submission/${submissionId}`)
      if (!res.ok) return
      const data: SubmissionData = await res.json()
      setResult(data)
      if (!['PENDING', 'RUNNING'].includes(data.status)) clearInterval(interval)
    }, 2000)

    return () => clearInterval(interval)
  }, [submissionId, result?.status])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    setResult(null)
    setSubmissionId(null)

    const body = new FormData()
    body.append('file', file)
    body.append('taskId', taskId)

    const res = await fetch('/api/submit', { method: 'POST', body })
    const data = await res.json()

    if (data.submissionId) {
      setSubmissionId(data.submissionId)
      setResult({ status: 'PENDING', score: null, testResults: [] })
    }
    setUploading(false)
  }

  const isJudging = result && ['PENDING', 'RUNNING'].includes(result.status)

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          accept=".cpp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          type="submit"
          disabled={!file || uploading}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {uploading ? 'Uploading…' : 'Submit'}
        </button>
      </form>

      {result && (
        <div className="mt-5 border border-gray-200 rounded-xl p-5 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_BADGE[result.status] ?? 'bg-gray-100 text-gray-500'}`}
            >
              {result.status.replace(/_/g, ' ')}
            </span>
            {result.score !== null && (
              <span className="text-sm font-medium text-gray-700">
                {result.score}/100
              </span>
            )}
            {isJudging && (
              <span className="text-sm text-gray-400 animate-pulse">Judging…</span>
            )}
          </div>

          {result.testResults.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {result.testResults.map((tc) => (
                  <tr key={tc.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-1.5 text-gray-400">{tc.testCaseIndex}</td>
                    <td className={`py-1.5 font-medium ${VERDICT_COLOR[tc.verdict] ?? 'text-gray-500'}`}>
                      {tc.passed ? '✓' : '✗'} {tc.verdict.replace(/_/g, ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}