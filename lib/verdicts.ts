export const STATUS_BADGE: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-500',
  RUNNING: 'bg-blue-100 text-blue-600',
  ACCEPTED: 'bg-green-100 text-green-700',
  WRONG_ANSWER: 'bg-red-100 text-red-700',
  TIME_LIMIT: 'bg-orange-100 text-orange-700',
  COMPILE_ERROR: 'bg-gray-100 text-gray-600',
  JUDGE_ERROR: 'bg-yellow-100 text-yellow-700',
  ERROR: 'bg-gray-100 text-gray-600',
}

export const VERDICT_COLOR: Record<string, string> = {
  PASS: 'text-green-600',
  WRONG_OUTPUT: 'text-red-600',
  TIMEOUT: 'text-orange-500',
}