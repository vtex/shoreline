import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const srcDir = join(__dirname, '..')

function read(path: string) {
  return readFileSync(path, 'utf8')
}

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)

    return entry.isDirectory() ? listFiles(path) : [path]
  })
}

describe('public api isolation', () => {
  it('keeps engine imports out of public files', () => {
    const typeFiles = listFiles(join(srcDir, 'types')).filter((file) =>
      /\.tsx?$/.test(file)
    )
    const index = read(join(srcDir, 'index.ts'))

    const leaking = typeFiles.filter((file) =>
      read(file).includes('@assistant-ui')
    )

    expect(leaking).toEqual([])
    expect(index).not.toContain('AssistantRuntime')
  })
})
