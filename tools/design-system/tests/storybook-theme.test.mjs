import assert from 'node:assert/strict'
import {
  readdir,
  readFile,
  mkdtemp,
  mkdir,
  writeFile,
  rm,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const require = createRequire(import.meta.url)
const {
  getThemeStylesheet,
} = require('../../../.storybook/theme-selection.cjs')

test('Storybook discovers new authored themes and rejects unknown or escaping names', async (t) => {
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'shoreline-preview-'))
  const packageRoot = path.join(fixtureRoot, 'packages/shoreline')
  t.after(() => rm(fixtureRoot, { recursive: true, force: true }))
  await mkdir(path.join(packageRoot, 'src/themes/dusk'), { recursive: true })
  await writeFile(
    path.join(packageRoot, 'src/themes/dusk/styles.css'),
    ':root {}'
  )
  assert.equal(
    getThemeStylesheet('dusk', packageRoot),
    path.join(packageRoot, 'dist/themes/dusk/styles.css')
  )
  assert.throws(() => getThemeStylesheet('../dusk', packageRoot), /Unknown/)
  assert.throws(() => getThemeStylesheet('unknown', packageRoot), /Unknown/)
})

test('Storybook stories leave global theme selection to the decorator', async () => {
  const directory = path.join(root, 'packages/shoreline/src/components')
  const files = await readdir(directory, { recursive: true })
  const imports = []
  for (const file of files.filter((file) => file.endsWith('.stories.tsx'))) {
    const source = ts.createSourceFile(
      file,
      await readFile(path.join(directory, file), 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    )
    const visit = (node) => {
      if (ts.isStringLiteral(node)) {
        if (
          /^@vtex\/shoreline\/(css|themes)(\/|$)/.test(node.text) ||
          /\/themes\/.+\.css$/.test(node.text)
        ) {
          imports.push(`${file}: ${node.text}`)
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  assert.deepEqual(imports, [], 'A story must not load a second global theme')
})
