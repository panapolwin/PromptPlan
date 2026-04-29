import { spawn, exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import { prisma } from '@/lib/prisma'

const execAsync = promisify(exec)

type Verdict = 'PASS' | 'WRONG_OUTPUT' | 'TIMEOUT' | 'MEMORY_EXCEEDED'

interface RunResult {
  verdict: Verdict
  timeTaken: number
  memoryUsed: number | null
}

async function compile(srcPath: string): Promise<{ success: boolean; binaryPath: string }> {
  const ext = process.platform === 'win32' ? '.exe' : '.out'
  const binaryPath = srcPath.replace('.cpp', ext)
  try {
    await execAsync(`g++ -O2 -o "${binaryPath}" "${srcPath}"`, { timeout: 30000 })
    return { success: true, binaryPath }
  } catch {
    return { success: false, binaryPath: '' }
  }
}

async function getProcessMemoryKB(pid: number): Promise<number | null> {
  if (process.platform === 'linux') {
    try {
      const statm = await fs.readFile(`/proc/${pid}/statm`, 'utf8')
      const residentPages = parseInt(statm.trim().split(' ')[1], 10)
      return Math.floor((residentPages * 4096) / 1024)
    } catch {
      return null
    }
  }
  return new Promise((resolve) => {
    exec(
      `wmic process where ProcessId=${pid} get WorkingSetSize /value`,
      (err, stdout) => {
        if (err) return resolve(null)
        const match = stdout.match(/WorkingSetSize=(\d+)/)
        if (!match) return resolve(null)
        resolve(Math.floor(parseInt(match[1], 10) / 1024))
      },
    )
  })
}

function runTestCase(
  binaryPath: string,
  input: string,
  expectedOutput: string,
  timeLimitMs: number,
  memoryLimitKB: number,
): Promise<RunResult> {
  return new Promise((resolve) => {
    const startTime = Date.now()
    let peakMemory = 0
    let timedOut = false
    let memExceeded = false
    let stdout = ''
    let settled = false

    const child = spawn(binaryPath, [], { stdio: ['pipe', 'pipe', 'pipe'] })

    child.stdin.write(input)
    child.stdin.end()
    child.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString() })

    const memTimer = setInterval(async () => {
      if (settled || !child.pid) return clearInterval(memTimer)
      const mem = await getProcessMemoryKB(child.pid)
      if (mem !== null) {
        peakMemory = Math.max(peakMemory, mem)
        if (mem > memoryLimitKB) {
          memExceeded = true
          child.kill()
        }
      }
    }, 200)

    const timeoutHandle = setTimeout(() => {
      timedOut = true
      child.kill()
    }, timeLimitMs)

    child.on('close', () => {
      if (settled) return
      settled = true
      clearInterval(memTimer)
      clearTimeout(timeoutHandle)
      const timeTaken = Date.now() - startTime

      if (memExceeded) return resolve({ verdict: 'MEMORY_EXCEEDED', timeTaken, memoryUsed: peakMemory })
      if (timedOut) return resolve({ verdict: 'TIMEOUT', timeTaken: timeLimitMs, memoryUsed: peakMemory || null })

      const verdict: Verdict = stdout.trim() === expectedOutput.trim() ? 'PASS' : 'WRONG_OUTPUT'
      resolve({ verdict, timeTaken, memoryUsed: peakMemory || null })
    })
  })
}

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

  const { success, binaryPath } = await compile(submission.filePath)
  if (!success) {
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

  const { timeLimit, memoryLimit } = submission.task

  let passedCount = 0
  let overallStatus = 'ACCEPTED'

  for (const tc of testCases) {
    const result = await runTestCase(
      binaryPath,
      tc.input,
      tc.expectedOutput,
      timeLimit,
      memoryLimit,
    )

    const passed = result.verdict === 'PASS'
    if (passed) passedCount++

    await prisma.testCaseResult.create({
      data: {
        submissionId,
        testCaseIndex: tc.index,
        passed,
        verdict: result.verdict,
        timeTaken: result.timeTaken,
        memoryUsed: result.memoryUsed,
      },
    })

    if (!passed && overallStatus === 'ACCEPTED') {
      if (result.verdict === 'TIMEOUT') overallStatus = 'TIME_LIMIT'
      else if (result.verdict === 'MEMORY_EXCEEDED') overallStatus = 'MEMORY_LIMIT'
      else overallStatus = 'WRONG_ANSWER'
    }
  }

  const score = testCases.length > 0 ? Math.floor((passedCount / testCases.length) * 100) : 0

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: overallStatus, score },
  })

  try { await fs.unlink(binaryPath) } catch {}
}