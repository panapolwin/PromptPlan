import { spawn } from 'child_process'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import os from 'os'

const execAsync = promisify(exec)

const TEMP_DIR = path.join(os.tmpdir(), 'judge-temp')
const COMPILE_TIMEOUT_MS = 15_000
const MAX_RUN_TIMEOUT_MS = 10_000
const MAX_OUTPUT_BYTES = 100_000

fs.mkdir(TEMP_DIR, { recursive: true }).catch(console.error)

export interface TestResult {
  verdict: string
  output: string
  error: string
}

export interface GradeResult {
  compiled: boolean
  compileError: string
  results: TestResult[]
}

function runBinary(
  binPath: string,
  input: string,
  timeoutMs: number,
): Promise<{ ok: boolean; output: string; error: string }> {
  return new Promise((resolve) => {
    let stdout = ''
    let settled = false

    const child = spawn(binPath, [], { stdio: ['pipe', 'pipe', 'ignore'] })

    child.stdin.write(input)
    child.stdin.end()

    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString()
      if (stdout.length > MAX_OUTPUT_BYTES && !settled) {
        settled = true
        child.kill('SIGKILL')
        resolve({ ok: false, output: '', error: 'Output limit exceeded' })
      }
    })

    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      child.kill('SIGKILL')
      resolve({ ok: false, output: '', error: 'TIMEOUT' })
    }, timeoutMs)

    child.on('close', (code: number | null) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (code === 0) {
        resolve({ ok: true, output: stdout, error: '' })
      } else {
        resolve({ ok: false, output: stdout, error: `Runtime error (exit ${code})` })
      }
    })

    child.on('error', (err: Error) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve({ ok: false, output: '', error: err.message })
    })
  })
}

async function cleanup(...files: string[]) {
  for (const f of files) {
    try { await fs.unlink(f) } catch {}
  }
}

export async function judgeCode(
  code: string,
  testCases: { input: string; expectedOutput: string }[],
  timeLimit: number,
): Promise<GradeResult> {
  const runTimeout = Math.min(timeLimit, MAX_RUN_TIMEOUT_MS)
  const id = crypto.randomUUID()
  const isWin = process.platform === 'win32'
  const srcPath = path.join(TEMP_DIR, `${id}.cpp`)
  const binPath = path.join(TEMP_DIR, id + (isWin ? '.exe' : ''))

  try {
    await fs.writeFile(srcPath, code, 'utf8')
  } catch {
    return { compiled: false, compileError: 'Failed to write source file', results: [] }
  }

  try {
    await execAsync(`g++ -O2 -o "${binPath}" "${srcPath}"`, { timeout: COMPILE_TIMEOUT_MS })
  } catch (err: unknown) {
    await cleanup(srcPath)
    const stderr = (err as { stderr?: string }).stderr ?? 'Compilation failed'
    return { compiled: false, compileError: stderr, results: [] }
  }

  await cleanup(srcPath)

  // warmup run — loads binary into OS page cache, reduces cold-start timing overhead
  await runBinary(binPath, '', Math.min(runTimeout, 2000))

  const results: TestResult[] = []
  for (const tc of testCases) {
    const run = await runBinary(binPath, tc.input ?? '', runTimeout)
    results.push({
      output: run.output,
      error: run.error,
      verdict: !run.ok
        ? (run.error === 'TIMEOUT' ? 'TIMEOUT' : 'WRONG_OUTPUT')
        : (run.output.trim() === (tc.expectedOutput ?? '').trim() ? 'PASS' : 'WRONG_OUTPUT'),
    })
  }

  await cleanup(binPath)
  return { compiled: true, compileError: '', results }
}