import Link from 'next/link'

interface Props {
  folderName: string
  name: string
  bestScore: number | null
}

function cardStyle(score: number | null) {
  if (score === null) return 'bg-gray-100 border-gray-300 text-gray-600'
  if (score === 100) return 'bg-green-100 border-green-300 text-green-800'
  if (score === 0) return 'bg-red-100 border-red-300 text-red-800'
  return 'bg-yellow-100 border-yellow-300 text-yellow-800'
}

export default function TaskCard({ folderName, name, bestScore }: Props) {
  return (
    <Link href={`/task/${folderName}`}>
      <div
        className={`border rounded-xl p-4 hover:shadow-md transition cursor-pointer ${cardStyle(bestScore)}`}
      >
        <p className="font-semibold text-base">{name}</p>
        <p className="text-sm mt-1 opacity-70">
          {bestScore !== null ? `${bestScore}/100` : '—/100'}
        </p>
      </div>
    </Link>
  )
}