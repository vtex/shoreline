import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, symlink } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { test } from 'node:test'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { createDraft, writeDraft } from '../init.mjs'
import { validateContract } from '../contracts.mjs'

const require = createRequire(import.meta.url)

test('native drafts cover all three kinds without requiring a source application', () => {
  for (const [kind, id, themes] of [
    ['component', 'action-group', ['sunrise', 'horizon']],
    ['tokens', 'elevation', ['horizon']],
    ['theme', 'dusk', undefined],
  ]) {
    const draft = createDraft(kind, id, themes)
    assert.deepEqual(validateContract(draft), [])
    assert.ok(validateContract(draft, { ready: true }).length)
    assert.equal(draft.source, undefined)
    assert.ok(draft.evidence.every((entry) => entry.result === 'pending'))
    assert.deepEqual(draft.target.themes, themes ?? ['dusk'])
  }
  const tokens = createDraft('tokens', 'elevation', ['horizon'])
  assert.ok(!tokens.evidence.some((entry) => entry.kind === 'interaction'))
  assert.ok(
    tokens.target.files.includes(
      'packages/shoreline/src/themes/horizon/tokens.css'
    )
  )
})

test('draft initialization rejects unsafe names, ambiguous theme selection and unknown kinds', () => {
  assert.throws(() => createDraft('component', 'action'), /--theme/)
  assert.throws(() => createDraft('theme', '../outside'), /identifier/)
  assert.throws(() => createDraft('theme', 'dusk', ['sunrise']), /identifier/)
  assert.throws(
    () => createDraft('tokens', 'size', ['sunrise', 'sunrise']),
    /unique/
  )
  assert.throws(() => createDraft('application', 'shop', ['horizon']), /Select/)
})

test('writing a draft preserves existing work and refuses traversal and symlink parents', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-init-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const draft = createDraft('theme', 'dusk')
  const file = 'design-system/contracts/themes/dusk.json'
  await writeDraft(root, file, draft)
  assert.deepEqual(JSON.parse(await readFile(path.join(root, file))), draft)
  const lint = spawnSync(
    process.execPath,
    [
      require.resolve('@biomejs/biome/bin/biome'),
      'check',
      '--config-path',
      fileURLToPath(new URL('../../../', import.meta.url)),
      '--vcs-enabled=false',
      path.join(root, file),
    ],
    { encoding: 'utf8' }
  )
  assert.ifError(lint.error)
  assert.equal(lint.status, 0, lint.stderr)
  await assert.rejects(
    writeDraft(root, file, { ...draft, intent: 'overwrite' }),
    /EEXIST/
  )
  assert.deepEqual(JSON.parse(await readFile(path.join(root, file))), draft)
  await assert.rejects(writeDraft(root, '../outside.json', draft), /relative/)
  await mkdir(path.join(root, 'other'))
  await symlink(path.join(root, 'other'), path.join(root, 'linked'))
  await assert.rejects(writeDraft(root, 'linked/draft.json', draft), /symlinks/)
})
