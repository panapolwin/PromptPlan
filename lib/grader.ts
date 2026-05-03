import fs from 'fs/promises'
import { prisma } from '@/lib/prisma'
import { judgeCode } from '@/lib/judge'

export async function gradeSubmission(submissionId: string): Promise<void> {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { task: true },
  })
  if (!submission) return

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: 'RUNNING' },
  })

  let code: string
  try {
    code = await fs.readFile(submission.filePath, 'utf8')
  } catch {
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'COMPILE_ERROR', score: 0 },
    })
    return
  }

  const testCases = await prisma.testCase.findMany({
    where: { taskId: submission.taskId },
    orderBy: { index: 'asc' },
  })

  if (testCases.length === 0) {
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'ACCEPTED', score: 100 },
    })
    return
  }

  const response = await judgeCode(code, testCases, submission.task.timeLimit)

  if (!response.compiled) {
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'COMPILE_ERROR', score: 0 },
    })
    return
  }

  await prisma.testCaseResult.createMany({
    data: testCases.map((tc, i) => ({
      submissionId,
      testCaseIndex: tc.index,
      passed: response.results[i]?.verdict === 'PASS',
      verdict: response.results[i]?.verdict ?? 'WRONG_OUTPUT',
    })),
  })

  let passedCount = 0
  let overallStatus = 'ACCEPTED'
  for (const result of response.results) {
    if (result.verdict === 'PASS') passedCount++
    else if (overallStatus === 'ACCEPTED')
      overallStatus = result.verdict === 'TIMEOUT' ? 'TIME_LIMIT' : 'WRONG_ANSWER'
  }

  const score = Math.floor((passedCount / testCases.length) * 100)

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: overallStatus, score },
  })
}