import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Rule: start at `src/index.ts` and follow every relative `from '...'`
 * (through barrels such as `components/x/index.ts`) to the source files.
 * Those files and `src/types/**` may not mention `@assistant-ui` in an
 * exported declaration or a re-export. Imports used only inside function
 * bodies and non-exported code are internal and are not flagged.
 */

const srcDir = join(__dirname, '..')

/**
 * Files that still use the engine `Attachment` type in public signatures.
 * This list must become empty: the public API cannot expose engine types.
 * It shrinks once Shoreline has its own attachment type.
 */
const ALLOWLIST = ['components/composer/types.ts', 'hooks/use-ai-composer.ts']

const BANNED_TERMS = /AssistantRuntime|ThreadMessageLike|remoteId/

function read(path: string) {
  return readFileSync(path, 'utf8')
}

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)

    return statSync(path).isDirectory() ? listFiles(path) : [path]
  })
}

function resolveModule(fromFile: string, spec: string): string | null {
  const base = join(dirname(fromFile), spec)
  const candidates = [
    `${base}.ts`,
    `${base}.tsx`,
    join(base, 'index.ts'),
    join(base, 'index.tsx'),
  ]

  return candidates.find((file) => existsSync(file)) ?? null
}

/** Source files reached from the `from '...'` paths of `src/index.ts`. */
function publicFiles(): string[] {
  const seen = new Set<string>()
  const queue = [join(srcDir, 'index.ts')]

  while (queue.length > 0) {
    const file = queue.pop() as string

    if (seen.has(file)) continue
    seen.add(file)

    const isEntry = file === join(srcDir, 'index.ts')
    const isBarrel = /index\.tsx?$/.test(file)

    if (!isEntry && !isBarrel) continue

    for (const match of read(file).matchAll(/from\s+'(\.[^']*)'/g)) {
      const target = resolveModule(file, match[1])

      if (target) queue.push(target)
    }
  }

  return [...seen]
}

/** Index of the line where the parameter list of a function ends. */
function paramsEnd(lines: string[], start: number): number {
  let depth = 0
  let opened = false

  for (let i = start; i < lines.length; i++) {
    for (const char of lines[i]) {
      if (char === '(') {
        depth++
        opened = true
      }
      if (char === ')') depth--
    }

    if (opened && depth === 0) return i
  }

  return start
}

/**
 * Text of exported declarations, without function bodies. A `const` is
 * checked on its first line only, because its body is code, not a signature.
 */
function exportedDeclarations(source: string): string {
  const parts: string[] = []
  const lines = source.split('\n')

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith('export ')) continue

    let end = i

    if (/^export (async )?function/.test(lines[i])) {
      end = paramsEnd(lines, i)

      // A multi-line return type such as `): {` runs until the line `}`.
      if (/:\s*\{\s*$/.test(lines[end])) {
        while (end < lines.length - 1 && !lines[end + 1].startsWith('}')) end++
        end++
      }
    } else if (!/^export (const|let) /.test(lines[i])) {
      while (end < lines.length - 1 && lines[end + 1].trim() !== '') end++
    }

    parts.push(lines.slice(i, end + 1).join('\n'))
    i = end
  }

  return parts.join('\n')
}

function engineNames(source: string): string[] {
  const names: string[] = []

  for (const match of source.matchAll(
    /import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+'@assistant-ui\/[^']*'/g
  )) {
    for (const item of match[1].split(',')) {
      const name = item
        .replace(/^\s*type\s+/, '')
        .trim()
        .split(/\s+as\s+/)
        .pop()

      if (name) names.push(name)
    }
  }

  return names
}

function leaksEngine(file: string): boolean {
  const source = read(file)

  if (/export\s[^;]*from\s+'@assistant-ui\//.test(source)) return true

  const declarations = exportedDeclarations(source)

  return engineNames(source).some((name) =>
    new RegExp(`\\b${name}\\b`).test(declarations)
  )
}

describe('public api isolation', () => {
  it('keeps engine imports out of public files', () => {
    const typeFiles = listFiles(join(srcDir, 'types')).filter((file) =>
      /\.tsx?$/.test(file)
    )
    const files = [...new Set([...publicFiles(), ...typeFiles])]
    const name = (file: string) => relative(srcDir, file)

    const typeLeaks = typeFiles
      .filter((file) => read(file).includes('@assistant-ui'))
      .map(name)

    const signatureLeaks = files
      .filter((file) => !ALLOWLIST.includes(name(file)))
      .filter(leaksEngine)
      .map(name)

    const bannedLeaks = [join(srcDir, 'index.ts'), ...typeFiles]
      .filter((file) => BANNED_TERMS.test(read(file)))
      .map(name)

    expect(typeLeaks).toEqual([])
    expect(signatureLeaks).toEqual([])
    expect(bannedLeaks).toEqual([])
  })
})
