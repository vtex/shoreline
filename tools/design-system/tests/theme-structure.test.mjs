import assert from 'node:assert/strict'
import {
  appendFile,
  cp,
  mkdtemp,
  mkdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import registry from '../theme-registry.cjs'
import { checkThemes } from '../theme-structure.mjs'

const repository = fileURLToPath(new URL('../../../', import.meta.url))

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'shoreline-theme-structure-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const directory of ['themes', 'foundations'])
    await cp(
      join(repository, 'packages/shoreline/src', directory),
      join(root, 'packages/shoreline/src', directory),
      { recursive: true }
    )
  await cp(
    join(repository, 'packages/shoreline/package.json'),
    join(root, 'packages/shoreline/package.json')
  )
  return root
}

test('every discovered theme has complete exports and shared foundations', async () => {
  const result = await checkThemes({ root: repository })
  assert.deepEqual(result.themes, registry.discoverThemes(repository))
  assert.deepEqual(result.diagnostics, [])
})

test('new directories join the registry and fail until their public contract is complete', async (t) => {
  const root = await fixture(t)
  await mkdir(join(root, registry.themesPath, 'dusk'))
  assert.ok(registry.discoverThemes(root).includes('dusk'))
  const result = await checkThemes({ root })
  assert.ok(
    result.diagnostics.some(
      (d) => d.rule === 'theme-input' && d.path.includes('/dusk/')
    )
  )
  assert.equal(
    result.diagnostics.filter((d) => d.rule === 'theme-export').length,
    10
  )
})

test('rejects missing exports and orphan exports', async (t) => {
  const root = await fixture(t)
  const file = join(root, 'packages/shoreline/package.json')
  const manifest = JSON.parse(await readFile(file, 'utf8'))
  manifest.exports['./themes/horizon/reset'] = undefined
  manifest.exports['./themes/ghost'] = './dist/themes/ghost/styles.css'
  await writeFile(file, JSON.stringify(manifest))
  const result = await checkThemes({ root })
  assert.equal(
    result.diagnostics.filter((d) => d.rule === 'theme-export').length,
    2
  )
})

test('rejects duplicated complete imports and incorrect layer ownership', async (t) => {
  const root = await fixture(t)
  await appendFile(
    join(root, registry.themesPath, 'horizon/styles.css'),
    '\n@import "base.css" layer(sl-tokens);\n'
  )
  await appendFile(
    join(root, registry.themesPath, 'horizon/styles-unlayered.css'),
    '\n@layer sl-base { body { margin: 0; } }\n'
  )
  const result = await checkThemes({ root })
  assert.equal(
    result.diagnostics.filter((d) => d.rule === 'theme-layers').length,
    2
  )
})

test('rejects hidden layers in transitive split inputs', async (t) => {
  const root = await fixture(t)
  await appendFile(
    join(root, 'packages/shoreline/src/foundations/base.css'),
    '\n@layer sl-base { body { margin: 0; } }\n'
  )
  const result = await checkThemes({ root })
  assert.equal(
    result.diagnostics.filter((d) => d.rule === 'theme-layers').length,
    2
  )
})

test('rejects copied reset sources and cycles instead of silently losing shared changes', async (t) => {
  const root = await fixture(t)
  await writeFile(
    join(root, registry.themesPath, 'horizon/reset.css'),
    '* { box-sizing: border-box; }'
  )
  await appendFile(
    join(root, registry.themesPath, 'horizon/tokens-foundations.css'),
    '\n@import "tokens.css";\n'
  )
  const result = await checkThemes({ root })
  assert.ok(result.diagnostics.some((d) => d.rule === 'theme-foundation'))
  assert.ok(
    result.diagnostics.some((d) => d.message.includes('CSS import cycle'))
  )
})

test('nested imports cannot satisfy the shared foundation requirement', async (t) => {
  const root = await fixture(t)
  const file = `${registry.themesPath}/horizon/reset.css`
  await writeFile(
    join(root, file),
    '@media screen { @import "../../foundations/reset.css"; }'
  )
  const result = await checkThemes({ root })
  assert.ok(
    result.diagnostics.some(
      (diagnostic) =>
        diagnostic.rule === 'theme-input' &&
        diagnostic.path === file &&
        diagnostic.message.includes('top-level')
    )
  )
  assert.ok(
    result.diagnostics.some(
      (diagnostic) =>
        diagnostic.rule === 'theme-foundation' && diagnostic.path === file
    )
  )
})
