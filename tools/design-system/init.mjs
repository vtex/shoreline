import { lstat, mkdir, realpath, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { evidenceByKind, validateContract } from './contracts.mjs'
import { relativePath } from './io.mjs'
import { themesRoot } from './themes.mjs'

const require = createRequire(import.meta.url)
const toolingRoot = fileURLToPath(new URL('../../', import.meta.url))

export function createDraft(kind, id, selectedThemes) {
  if (!['component', 'tokens', 'theme'].includes(kind))
    throw new Error('Select component, tokens or theme')
  if (typeof id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(id))
    throw new Error('Use a kebab-case identifier')
  const themes = selectedThemes ?? (kind === 'theme' ? [id] : [])
  if (!themes.length || themes.some((name) => !/^[a-z][a-z0-9-]*$/.test(name)))
    throw new Error('Select at least one valid --theme NAME')
  if (kind === 'theme' && (themes.length !== 1 || themes[0] !== id))
    throw new Error(
      'A theme contract must use its identifier as the theme name'
    )
  if (new Set(themes).size !== themes.length)
    throw new Error('Theme names must be unique')

  const themeFiles = (filename) =>
    themes.map((name) => `${themesRoot}/${name}/${filename}`)
  const files =
    kind === 'component'
      ? [
          `packages/shoreline/src/components/${id}/${id}.tsx`,
          `packages/shoreline/src/components/${id}/index.ts`,
          'packages/shoreline/src/components/index.ts',
          'packages/shoreline/src/index.ts',
          ...themeFiles(`components/${id}.css`),
        ]
      : kind === 'tokens'
        ? [...themeFiles(`tokens-${id}.css`), ...themeFiles('tokens.css')]
        : [
            'tokens.css',
            'reset.css',
            'base.css',
            'components/index.css',
            'styles.css',
            'styles-unlayered.css',
          ]
            .map((filename) => `${themesRoot}/${id}/${filename}`)
            .concat('packages/shoreline/package.json')

  const contract = {
    schemaVersion: 3,
    kind,
    id,
    status: 'draft',
    intent: `Define and implement ${id} in Shoreline.`,
    target: { package: '@vtex/shoreline', files, themes },
    impact: {
      summary: 'Public behavior and visual impact still need to be specified.',
      consumerAction:
        'Document the import, component usage or token adoption after defining the change.',
    },
    tokens:
      kind === 'tokens'
        ? [
            {
              name: `--sl-${id}`,
              reason:
                'Proposed semantic token; confirm the name, meaning, value and consumers before implementation.',
            },
          ]
        : [],
    states:
      kind === 'component'
        ? [
            {
              id: 'default',
              trigger: 'Render the component',
              expected:
                'Define the expected semantics, behavior and appearance.',
            },
          ]
        : [],
    openQuestions: [
      'What reusable need and acceptance criteria should this change satisfy?',
      kind === 'component'
        ? 'Which component states and supported themes need engineering and design review?'
        : 'Which token meanings, values and visual examples need engineering and design review?',
    ],
    evidence: evidenceByKind[kind].map((evidenceKind) => ({
      kind: evidenceKind,
      result: 'pending',
      description: `Produce ${evidenceKind} evidence for the specified change.`,
    })),
  }
  const errors = validateContract(contract)
  if (errors.length) throw new Error(errors.join('\n'))
  return contract
}

export async function writeDraft(root, file, contract) {
  if (!relativePath(file) || !file.endsWith('.json'))
    throw new Error('Contract output must be a repository-relative JSON path')
  const formatted = spawnSync(
    process.execPath,
    [
      require.resolve('@biomejs/biome/bin/biome'),
      'format',
      '--config-path',
      toolingRoot,
      '--stdin-file-path',
      file,
    ],
    { cwd: toolingRoot, input: JSON.stringify(contract), encoding: 'utf8' }
  )
  if (formatted.error) throw formatted.error
  if (formatted.status !== 0)
    throw new Error(`Cannot format contract: ${formatted.stderr}`)
  let directory = await realpath(root)
  for (const segment of file.split('/').slice(0, -1)) {
    directory = path.join(directory, segment)
    const info = await lstat(directory).catch((error) => {
      if (error.code === 'ENOENT') return null
      throw error
    })
    if (info && (!info.isDirectory() || info.isSymbolicLink()))
      throw new Error(
        'Contract output parents must be directories without symlinks'
      )
    if (!info) await mkdir(directory)
  }
  await writeFile(path.join(root, file), formatted.stdout, { flag: 'wx' })
}
