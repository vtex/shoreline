import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import ts from 'typescript'
import { beforeAll, describe, expect, it } from 'vitest'

/**
 * Consumers must not see the chat engine the package is built on. The
 * declarations of `src/index.ts` are emitted in memory, as consumers get
 * them, so an engine type that leaks through inference is caught too.
 */

const packageDir = join(__dirname, '..', '..')
const outDir = join(packageDir, '__public-api__')

/** Engine names that must not reach the types, their JSDoc or the docs. */
const ENGINE_NAMES = [
  'assistant[-_ ]?ui',
  'ActionBarPrimitive',
  'AssistantRuntime',
  'AttachmentPrimitive',
  'ComposerPrimitive',
  'MessagePrimitive',
  'ThreadPrimitive',
  'ThreadMessage',
  'ThreadMessageLike',
  'makeAssistantToolUI',
  'remoteId',
  'useAui',
  'useAuiState',
  'useLocalRuntime',
]
const ENGINE = new RegExp(`\\b(${ENGINE_NAMES.join('|')})\\b`, 'gi')

function engineNamesIn(text: string): string[] {
  return [...new Set(text.match(ENGINE) ?? [])]
}

/** Emits the declarations of the package entry, by output path. */
function emitDeclarations(): Map<string, string> {
  const config = ts.readConfigFile(
    join(packageDir, 'tsconfig.json'),
    ts.sys.readFile
  )
  const { options } = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    packageDir
  )
  const files = new Map<string, string>()
  const program = ts.createProgram([join(packageDir, 'src', 'index.ts')], {
    ...options,
    noEmit: false,
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: false,
    removeComments: false,
    outDir,
    declarationDir: undefined,
    rootDir: packageDir,
  })
  const result = program.emit(undefined, (fileName, text) => {
    files.set(resolve(fileName), text)
  })

  if (result.emitSkipped) throw new Error('The declarations were not emitted')

  return files
}

/** The emitted files a consumer reaches from the entry, by relative imports. */
function publicDeclarations(files: Map<string, string>): Map<string, string> {
  const reached = new Map<string, string>()
  const queue = [join(outDir, 'src', 'index.d.ts')]

  while (queue.length > 0) {
    const file = queue.pop() as string
    const text = files.get(file)

    if (text === undefined || reached.has(file)) continue

    reached.set(file, text)

    for (const { fileName } of ts.preProcessFile(text).importedFiles) {
      if (!fileName.startsWith('.')) continue

      const base = resolve(dirname(file), fileName)

      queue.push(`${base}.d.ts`, join(base, 'index.d.ts'))
    }
  }

  return reached
}

describe('public api isolation', () => {
  let declarations: Map<string, string>

  beforeAll(() => {
    declarations = publicDeclarations(emitDeclarations())
  }, 60_000)

  it('emits the declarations of the entry', () => {
    expect(declarations.size).toBeGreaterThan(1)
    expect(declarations.get(join(outDir, 'src', 'index.d.ts'))).toMatch(
      /AIProvider/
    )
  })

  it('keeps engine imports and names out of the types and their JSDoc', () => {
    const leaks = [...declarations].flatMap(([file, text]) =>
      engineNamesIn(text).map((name) => `${file.slice(outDir.length)}: ${name}`)
    )

    expect(leaks).toEqual([])
  })

  it('keeps engine names out of the docs', () => {
    const docs = [
      ...readdirSync(join(packageDir, 'docs'))
        .filter((name) => name.endsWith('.md'))
        .map((name) => join(packageDir, 'docs', name)),
      ...readdirSync(join(packageDir, '..', 'docs', 'pages', 'guides'))
        .filter((name) => /^shoreline-ai.*\.mdx$/.test(name))
        .map((name) => join(packageDir, '..', 'docs', 'pages', 'guides', name)),
    ]
    const leaks = docs.flatMap((file) =>
      engineNamesIn(readFileSync(file, 'utf8')).map(
        (name) => `${file.slice(packageDir.length)}: ${name}`
      )
    )

    expect(docs.length).toBeGreaterThan(3)
    expect(leaks).toEqual([])
  })

  it('finds engine names whatever their case', () => {
    expect(
      engineNamesIn(
        'Built on Assistant-UI, ASSISTANT UI and assistantui. Wraps a ' +
          'composerprimitive and an AssistantRuntime. loadThreadMessages is fine.'
      )
    ).toHaveLength(5)
  })
})
