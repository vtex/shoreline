import { dirname, join } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

/**
 * `expectTypeOf` does nothing at runtime, and the package `typecheck` skips
 * test files, so these cases compile a snippet against the real component
 * types and fail `vitest run` when the type changes.
 */

const packageDir = join(__dirname, '..', '..', '..', '..')
const virtualFile = join(__dirname, '__types-snippet.ts')

function diagnose(snippet: string): string[] {
  const configFile = ts.readConfigFile(
    join(packageDir, 'tsconfig.json'),
    ts.sys.readFile
  )
  const options = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    packageDir
  ).options
  const host = ts.createCompilerHost(options)
  const readFile = host.readFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  const getSourceFile = host.getSourceFile.bind(host)

  host.fileExists = (file) => file === virtualFile || fileExists(file)
  host.readFile = (file) => (file === virtualFile ? snippet : readFile(file))
  host.getSourceFile = (file, languageVersion, onError, shouldCreate) =>
    file === virtualFile
      ? ts.createSourceFile(file, snippet, languageVersion)
      : getSourceFile(file, languageVersion, onError, shouldCreate)

  const program = ts.createProgram([virtualFile], options, host)

  return ts
    .getPreEmitDiagnostics(program, program.getSourceFile(virtualFile))
    .filter((diagnostic) => diagnostic.file?.fileName === virtualFile)
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
    )
}

const PRELUDE = `
import type { ComponentProps, ReactNode } from 'react'
import { expectTypeOf } from 'vitest'

import type { AIAttachment } from '${join(packageDir, 'src/types/public')}'
import type { AIComposerAttachments } from '${join(dirname(__dirname), 'index')}'

type Children = ComponentProps<typeof AIComposerAttachments>['children']
`

describe('AIComposerAttachments children type', () => {
  it('is a render function receiving the attachment and returning ReactNode', () => {
    const errors = diagnose(`${PRELUDE}
expectTypeOf<Children>().toEqualTypeOf<
  ((props: { attachment: AIAttachment }) => ReactNode) | undefined
>()
expectTypeOf<(props: { attachment: AIAttachment }) => string>().toMatchTypeOf<
  NonNullable<Children>
>()
`)

    expect(errors).toEqual([])
  })

  it.each([
    [
      'a parameter of another type',
      '(props: { attachment: string }) => ReactNode',
    ],
    ['a bare attachment parameter', '(attachment: AIAttachment) => ReactNode'],
    ['a non-function node', 'ReactNode'],
    [
      'a function that returns a non-node',
      '(props: { attachment: AIAttachment }) => () => void',
    ],
  ])('rejects %s', (_label, signature) => {
    const errors = diagnose(`${PRELUDE}
expectTypeOf<${signature}>().toMatchTypeOf<NonNullable<Children>>()
`)

    expect(errors.length).toBeGreaterThan(0)
  })
})
