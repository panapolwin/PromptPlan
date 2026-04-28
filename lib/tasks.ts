import path from 'path'
import fs from 'fs/promises'

const TASK_LIST_DIR = path.join(process.cwd(), 'task_list')

export interface TaskConfig {
  timeLimit: number
  memoryLimit: number
}

export interface TestCase {
  index: number
  input: string
  expected: string
}

export async function getTaskFolders(): Promise<string[]> {
  try {
    const entries = await fs.readdir(TASK_LIST_DIR, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
  } catch {
    return []
  }
}

export async function getTaskConfig(folderName: string): Promise<TaskConfig> {
  const configPath = path.join(TASK_LIST_DIR, folderName, 'config.json')
  try {
    const raw = await fs.readFile(configPath, 'utf-8')
    const parsed = JSON.parse(raw)
    return {
      timeLimit: parsed.timeLimit ?? 2000,
      memoryLimit: parsed.memoryLimit ?? 65536,
    }
  } catch {
    return { timeLimit: 2000, memoryLimit: 65536 }
  }
}

export async function getTestCases(folderName: string): Promise<TestCase[]> {
  const testDir = path.join(TASK_LIST_DIR, folderName, 'testcases')
  try {
    const files = await fs.readdir(testDir)
    const inFiles = files.filter((f) => f.endsWith('.in'))

    const cases = await Promise.all(
      inFiles.map(async (inFile) => {
        const index = parseInt(inFile.replace('.in', ''), 10)
        const input = await fs.readFile(path.join(testDir, inFile), 'utf-8')
        const expected = await fs.readFile(
          path.join(testDir, inFile.replace('.in', '.out')),
          'utf-8',
        )
        return { index, input, expected }
      }),
    )

    return cases.sort((a, b) => a.index - b.index)
  } catch {
    return []
  }
}

export async function getTaskDescription(folderName: string): Promise<string> {
  const descPath = path.join(TASK_LIST_DIR, folderName, 'problem.md')
  try {
    return await fs.readFile(descPath, 'utf-8')
  } catch {
    return 'No description available.'
  }
}