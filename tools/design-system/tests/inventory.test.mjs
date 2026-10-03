import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, rm, symlink } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import test from 'node:test'
import { inventory } from '../inventory.mjs'

const execute = promisify(execFile)

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-inventory-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const [name, contents] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, name)), { recursive: true })
    await writeFile(path.join(root, name), contents)
  }
  return root
}

test('inventory is stable and reports actual play functions separately from file names', async (t) => {
  const root = await fixture(t, {
    'package.json': '{"name":"fixture","scripts":{"z":"z","a":"a"}}',
    'packages/shoreline/src/components/button/button.tsx':
      'export const Button = () => <button />',
    'packages/shoreline/src/components/button/tests/button.test.tsx':
      'test("example", () => {})',
    'packages/shoreline/src/components/button/stories/play.stories.tsx':
      'export const Playground = { render: () => <button /> }',
    'packages/shoreline/src/components/button/stories/show.stories.tsx':
      'export const Show = {}',
    'packages/shoreline/src/components/button/stories/tests/click.stories.tsx':
      'const callback = async () => {}; export const Click = { play: callback }; Click.play = async () => {}',
    'packages/shoreline/src/components/utils/index.ts':
      'export const helper = () => {}',
  })
  const first = await inventory({ root })
  assert.deepEqual(first, await inventory({ root }))
  assert.equal(JSON.stringify(first).includes(root), false)
  assert.equal(first.target.counts.componentFamilies, 1)
  assert.equal(first.target.counts.actualPlayFunctions, 2)
  assert.equal(first.target.stories.byKind.play.length, 1)
  assert.equal(first.target.families[0].tests.length, 1)
  assert.equal(first.source, null)
  assert.deepEqual(Object.keys(first.target.packages[0].scripts), ['a', 'z'])
  assert.equal(first.target.git.available, false)
})

test('source imports, overrides and custom property references use parsed code', async (t) => {
  const root = await fixture(t, { 'package.json': '{"name":"target"}' })
  const sourceRoot = await fixture(t, {
    'src/Example.tsx': `import { Button as Action, type ButtonProps } from '@vtex/shoreline'
      import '@vtex/shoreline/css'
      // import { Fake } from '@vtex/shoreline'
      const message = "import { Ignored } from '@vtex/shoreline'"
      export const Example = () => <Action />
      const module = import('@vtex/shoreline')`,
    'src/styles.css': `:root { --brand: red; --alias: var(--brand); }
      [data-sl-button][data-variant="primary"] { color: var(--brand); border-color: var(--missing, var(--brand)); content: 'var(--fake)'; }
      /* [data-sl-fake] { color: var(--comment); } */`,
    'src/invalid.css': '[data-sl-button] {',
  })
  const report = (await inventory({ root, sourceRoot })).source
  assert.equal(report.shorelineImports.length, 3)
  assert.deepEqual(report.shorelineImports[0].names, ['Button', 'ButtonProps'])
  assert.equal(report.shorelineImports[2].kind, 'dynamic-import')
  assert.equal(report.overrides.length, 1)
  assert.deepEqual(report.overrides[0].attributes, ['data-sl-button'])
  assert.deepEqual(report.tokens.declaredNames, ['--alias', '--brand'])
  assert.deepEqual(report.tokens.unresolvedNames, ['--missing'])
  assert.deepEqual(report.candidateDirectories[0].exportedNames, ['Example'])
  assert.deepEqual(report.diagnostics, [
    { file: 'src/invalid.css', code: 'INVALID_CSS', line: 1 },
  ])
})

test('fingerprints include untracked source changes while excluding credentials, symlinks and artifacts', async (t) => {
  const root = await fixture(t, {
    'src/example.tsx': 'export const Example = () => <div />',
    '.env': 'TOP_SECRET=one',
    '.env.local': 'TOP_SECRET=two',
    'credentials.json': '{"secret":"three"}',
    '.aws/config.json': '{"secret":"four"}',
    'node_modules/pkg/index.ts': 'ignored',
    'dist/index.js': 'ignored',
    'storybook-static-horizon/assets/preview.js': 'ignored',
    'generated/output.tsx': 'ignored',
    'reports/inventory.json': 'ignored',
  })
  const outside = await fixture(t, { 'secret.ts': 'const secret = "five"' })
  await symlink(outside, path.join(root, 'linked-directory'))
  await symlink(
    path.join(outside, 'secret.ts'),
    path.join(root, 'linked-file.ts')
  )
  const first = await inventory({ root })
  assert.equal(first.target.fingerprint.fileCount, 1)
  await writeFile(path.join(root, '.env.local'), 'TOP_SECRET=changed')
  await writeFile(
    path.join(root, 'storybook-static-horizon/assets/preview.js'),
    'changed generated bundle'
  )
  assert.deepEqual(first, await inventory({ root }))
  await writeFile(path.join(root, 'src/new.ts'), 'export const newValue = true')
  const second = await inventory({ root })
  assert.notEqual(
    first.target.fingerprint.value,
    second.target.fingerprint.value
  )
  assert.equal(second.target.fingerprint.fileCount, 2)
})

test('git metadata identifies dirty working trees without leaking their file names', async (t) => {
  try {
    await execute('git', ['--version'])
  } catch {
    t.skip(
      'git unavailable; unavailable metadata is covered by the non-repository fixture'
    )
    return
  }
  const root = await fixture(t, { 'src/index.ts': 'export const value = 1' })
  await execute('git', ['init', '-q', root])
  const first = await inventory({ root })
  assert.deepEqual(first.target.git, {
    available: true,
    commit: null,
    dirty: true,
  })
  await execute('git', ['-C', root, 'add', 'src/index.ts'])
  await execute('git', [
    '-C',
    root,
    '-c',
    'user.name=Inventory Test',
    '-c',
    'user.email=inventory@example.test',
    '-c',
    'commit.gpgsign=false',
    'commit',
    '-qm',
    'fixture',
  ])
  const committed = await inventory({ root })
  assert.match(committed.target.git.commit, /^[a-f0-9]{40,64}$/)
  assert.equal(committed.target.git.dirty, false)
  await writeFile(path.join(root, 'src/index.ts'), 'export const value = 2')
  const changed = await inventory({ root })
  assert.equal(changed.target.git.dirty, true)
  assert.equal(changed.target.git.commit, committed.target.git.commit)
  assert.notEqual(
    changed.target.fingerprint.value,
    committed.target.fingerprint.value
  )
})

test('invalid roots fail explicitly and malformed package/source files appear as diagnostics', async (t) => {
  const root = await fixture(t, {
    'package.json': '{',
    'src/invalid.ts': 'export const = ;',
  })
  await assert.rejects(inventory({}), /target root must be a directory/)
  await assert.rejects(
    inventory({ root, sourceRoot: path.join(root, 'missing') }),
    /source root must be a directory/
  )
  const report = await inventory({ root })
  assert.equal(report.target.diagnostics[0].code, 'INVALID_PACKAGE_JSON')
  assert.ok(
    report.target.diagnostics.some((diagnostic) =>
      diagnostic.code.startsWith('TS')
    )
  )
})
