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

  let passedCount = 0
  let overallStatus = 'ACCEPTED'

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    const result = response.results[i]
    if (!result) break

    const passed = result.verdict === 'PASS'
    if (passed) passedCount++

    await prisma.testCaseResult.create({
      data: {
        submissionId,
        testCaseIndex: tc.index,
        passed,
        verdict: result.verdict,
      },
    })

    if (!passed && overallStatus === 'ACCEPTED') {
      if (result.verdict === 'TIMEOUT') overallStatus = 'TIME_LIMIT'
      else overallStatus = 'WRONG_ANSWER'
    }
  }

  const score = Math.floor((passedCount / testCases.length) * 100)

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: overallStatus, score },
  })
}