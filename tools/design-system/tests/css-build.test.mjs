import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { checkCssExports } from '../../../packages/shoreline/src/scripts/check-css.mjs'

const checker = fileURLToPath(
  new URL(
    '../../../packages/shoreline/src/scripts/check-css.mjs',
    import.meta.url
  )
)

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-css-build-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const css = 'dist/themes/sunrise/styles.css'
  await mkdir(path.dirname(path.join(root, css)), { recursive: true })
  await writeFile(path.join(root, css), ':root { --sl-test: 1; }')
  await writeFile(
    path.join(root, 'package.json'),
    JSON.stringify({
      exports: {
        '.': { import: './dist/index.mjs' },
        './css': `./${css}`,
        './themes/sunrise': `./${css}`,
      },
    })
  )
  return { root, css }
}

test('the post-build verifier fails when a previously generated CSS export disappears', async (t) => {
  const { root, css } = await fixture(t)
  assert.equal(checkCssExports(root), 2)
  const run = () =>
    spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' })
  const success = run()
  assert.ifError(success.error)
  assert.equal(success.status, 0, success.stderr)
  assert.match(success.stdout, /Verified 2 CSS exports/)

  await rm(path.join(root, css))
  const missing = run()
  assert.ifError(missing.error)
  assert.equal(missing.status, 1)
  assert.match(missing.stderr, /Missing CSS export: \.\/css/)
  assert.doesNotMatch(missing.stdout, /Verified/)
})

test('the post-build verifier rejects empty CSS and directory targets', async (t) => {
  const { root, css } = await fixture(t)
  await writeFile(path.join(root, css), '')
  assert.throws(() => checkCssExports(root), /nonempty file/)
  await rm(path.join(root, css))
  await mkdir(path.join(root, css))
  assert.throws(() => checkCssExports(root), /nonempty file/)
})
