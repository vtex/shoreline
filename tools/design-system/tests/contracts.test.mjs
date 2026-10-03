import assert from 'node:assert/strict'
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  symlink,
} from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { test } from 'node:test'
import {
  checkContractFiles,
  contextPacket,
  evidenceByKind,
  evidenceKinds,
  themeEvidenceKinds,
  guidance,
  targetFingerprint,
  validateContract,
} from '../contracts.mjs'
import { changedFiles, hash, readInside } from '../io.mjs'
import themeRegistry from '../theme-registry.cjs'

function draft(kind = 'component') {
  const contract = {
    schemaVersion: 3,
    kind,
    id: 'sample',
    status: 'draft',
    intent: 'Define and validate a reusable design-system change.',
    target: {
      package: '@vtex/shoreline',
      files: ['target.tsx'],
      themes: ['horizon'],
    },
    tokens:
      kind === 'tokens'
        ? [{ name: '--sl-test', reason: 'Fixture semantic value.' }]
        : [],
    impact: {
      summary: 'Change an explicit visual value.',
      consumerAction: 'Use the documented token.',
    },
    openQuestions: [],
    evidence: [],
  }
  if (kind === 'component') {
    contract.states = [
      {
        id: 'default',
        trigger: 'Render',
        expected: 'Accessible name and appearance',
        story: { file: 'show.stories.tsx', export: 'Show' },
      },
    ]
  }
  return contract
}

const source = () => ({
  repository: 'reference',
  revision: 'a'.repeat(40),
  files: ['source.tsx'],
})
const visualReceipt = (themes) => ({
  schemaVersion: 1,
  mode: 'check',
  result: 'technical-checks-passed',
  exitCode: 0,
  selection: 'all',
  inputHash: 'a'.repeat(64),
  themes,
  expectedTests: themes.length * 2,
  environment: {
    platform: 'linux',
    channel: 'bundled-chromium',
    canonicalEnvironment: true,
  },
  coverage: {
    fullMatrix: true,
    allPassed: true,
    skipped: 0,
    expected: themes.length * 2,
    executed: themes.length * 2,
  },
})
const execute = (root, ...args) =>
  execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim()
const commit = (root) =>
  execute(
    root,
    '-c',
    'commit.gpgsign=false',
    '-c',
    'user.name=Fixture',
    '-c',
    'user.email=fixture@example.test',
    'commit',
    '-qm',
    'fixture'
  )
async function write(root, file, content) {
  await mkdir(path.dirname(path.join(root, file)), { recursive: true })
  await writeFile(path.join(root, file), content)
}

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-contract-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await write(root, 'target.tsx', 'export const Target = 1')
  await write(
    root,
    'show.stories.tsx',
    'export function Show() { return <div /> }'
  )
  await write(
    root,
    'packages/shoreline/src/themes/sunrise/tokens.css',
    ':root { --sl-test: 1rem; }'
  )
  await write(
    root,
    'packages/shoreline/src/themes/horizon/tokens.css',
    '@import "../sunrise/tokens.css"; :root { --sl-extra: 2rem; }'
  )
  await write(
    root,
    'packages/shoreline/src/themes/independent/tokens.css',
    ':root { --sl-independent: 1rem; }'
  )
  await write(root, 'result.json', '{"fixtureResult":"pass"}')
  await write(
    root,
    'visual-run.json',
    JSON.stringify(visualReceipt(themeRegistry.discoverThemes(root)))
  )
  for (const file of guidance) await write(root, file, '# Fixture guidance\n')
  return root
}

async function recordEvidence(
  contract,
  root,
  { artifact = 'result.json' } = {}
) {
  const inputSha256 = await targetFingerprint(contract, root)
  const sha256 = hash(await readFile(path.join(root, artifact)))
  const visualSha256 = hash(await readFile(path.join(root, 'visual-run.json')))
  contract.evidence = evidenceByKind[contract.kind].map((kind) => ({
    kind,
    result: 'pass',
    description:
      'Fixture receipt for integrity validation, not product certification.',
    artifact: kind === 'visual' ? 'visual-run.json' : artifact,
    sha256: kind === 'visual' ? visualSha256 : sha256,
    inputSha256,
    ...(themeEvidenceKinds.includes(kind)
      ? { themes: themeRegistry.discoverThemes(root) }
      : {}),
  }))
}

test('all three kinds support drafts without an external source and require their evidence profile', () => {
  assert.deepEqual(evidenceByKind.tokens, [
    'tokens',
    'build',
    'visual',
    'accessibility',
  ])
  assert.deepEqual(evidenceByKind.theme, [
    'tokens',
    'build',
    'visual',
    'accessibility',
    'theme-regression',
  ])
  assert.deepEqual(evidenceByKind.component, [
    'unit',
    'interaction',
    'visual',
    'accessibility',
    'types',
    'coverage',
    'theme-regression',
  ])
  assert.equal(new Set(evidenceKinds).size, evidenceKinds.length)
  for (const kind of ['component', 'tokens', 'theme']) {
    const contract = draft(kind)
    assert.deepEqual(validateContract(contract), [])
    assert.deepEqual(
      validateContract(contract, { ready: true }),
      evidenceByKind[kind].map((entry) => `Missing passed ${entry} evidence`)
    )
    contract.source = source()
    assert.deepEqual(validateContract(contract), [])
  }
})

test('contracts require impact, safe target themes and kind-specific content without compatibility constraints', () => {
  const contract = draft()
  contract.target.themes = ['sunrise', 'new-brand']
  contract.target.files = ['packages/shoreline/src/themes/sunrise/tokens.css']
  assert.deepEqual(validateContract(contract), [])
  contract.impact.consumerAction = undefined
  assert.ok(
    validateContract(contract).includes('impact.consumerAction is required')
  )
  for (const themes of [[], ['../horizon'], ['horizon', 'horizon'], [null]]) {
    contract.target.themes = themes
    assert.ok(
      validateContract(contract).some((message) =>
        message.startsWith('target.themes')
      )
    )
  }
  assert.ok(
    validateContract({ ...draft(), states: [] }).some((message) =>
      message.includes('component states')
    )
  )
  assert.ok(
    validateContract({ ...draft('tokens'), tokens: [] }).some((message) =>
      message.includes('at least one token')
    )
  )
  assert.deepEqual(validateContract(draft('theme')), [])
})

test('malformed fields, optional source metadata and duplicate semantic names fail clearly', () => {
  const contract = draft()
  contract.source = { ...source(), files: ['../outside.tsx'] }
  contract.states.push(contract.states[0])
  contract.evidence = [
    { kind: 'unit', result: 'pending', description: 'test' },
    { kind: 'unit', result: 'pending', description: 'test' },
  ]
  assert.equal(validateContract(contract).length, 3)
  assert.ok(validateContract(null).length)
  for (const changes of [
    { source: null },
    { kind: { toString: null } },
    { evidence: [null] },
    { states: [null] },
    { tokens: [null] },
    { source: { ...source(), revision: 'main' } },
  ])
    assert.ok(validateContract({ ...draft(), ...changes }).length)
  const token = { name: '--sl-test', reason: 'Fixture semantic value.' }
  assert.ok(
    validateContract({ ...draft('tokens'), tokens: [token, token] }).includes(
      'Token names must be unique'
    )
  )
  assert.ok(
    validateContract({
      ...draft('tokens'),
      tokens: [{ ...token, source: '' }],
    }).some((message) => message.includes('Token source'))
  )
})

test('context without a source checkout reports the verification state honestly', async (t) => {
  const root = await fixture(t)
  const contract = draft()
  const packet = await contextPacket(contract, { root })
  assert.equal(packet.schemaVersion, 3)
  assert.equal(packet.sourceVerified, false)
  assert.equal(packet.sourceVerification, 'not-applicable')
  assert.deepEqual(packet.sourceFiles, [])
  assert.deepEqual(
    packet.themeInputs.map((theme) => theme.name),
    ['horizon', 'independent', 'sunrise']
  )
  assert.deepEqual(packet.availableThemes, [
    'horizon',
    'independent',
    'sunrise',
  ])
  assert.ok(
    packet.validationInputs.some((input) => input.path === '.storybook/main.js')
  )
  contract.source = source()
  const unverified = await contextPacket(contract, { root })
  assert.equal(unverified.sourceVerification, 'not-requested')
  assert.equal(unverified.sourceVerified, false)
  assert.deepEqual(unverified.sourceFiles, [])
})

test('contract token names use the same lowercase kebab-case as CSS catalogs', () => {
  for (const name of [
    '--sl-Uppercase',
    '--sl-with_underscore',
    '--sl-double--dash',
    '--sl-trailing-',
  ]) {
    const contract = draft('tokens')
    contract.tokens[0].name = name
    assert.ok(
      validateContract(contract).some((message) =>
        message.includes('Token names must use --sl-* in kebab-case')
      ),
      name
    )
  }
  const contract = draft('tokens')
  contract.tokens[0].name = '--sl-radius-4'
  assert.deepEqual(validateContract(contract), [])
})

test('a new theme can be planned in draft context but cannot produce ready evidence before it exists', async (t) => {
  const root = await fixture(t)
  const contract = draft('theme')
  contract.target.themes = ['new-brand']
  contract.target.files = ['packages/shoreline/src/themes/new-brand/tokens.css']
  const packet = await contextPacket(contract, { root })
  assert.equal(
    packet.themeInputs.find((theme) => theme.name === 'new-brand').missing,
    true
  )
  assert.equal(packet.targetFiles[0].missing, true)
  await assert.rejects(targetFingerprint(contract, root), /new-brand/)
  contract.status = 'ready-for-review'
  contract.evidence = evidenceByKind.theme.map((kind) => ({
    kind,
    result: 'pass',
    description: 'Deliberately invalid fixture receipt.',
    artifact: 'result.json',
    sha256: hash('{"fixtureResult":"pass"}'),
    inputSha256: 'a'.repeat(64),
    ...(themeEvidenceKinds.includes(kind) ? { themes: ['new-brand'] } : {}),
  }))
  assert.ok(
    (await checkContractFiles(contract, { root })).some((message) =>
      message.includes('new-brand')
    )
  )
  await assert.rejects(contextPacket(contract, { root }), /new-brand/)
})

test('fingerprints include all available themes and transitive imports for the complete visual matrix', async (t) => {
  const root = await fixture(t)
  const contract = draft()
  const first = await targetFingerprint(contract, root)
  await write(
    root,
    'packages/shoreline/src/themes/independent/tokens.css',
    ':root { --sl-independent: 2rem; }'
  )
  const independent = await targetFingerprint(contract, root)
  assert.notEqual(independent, first)
  await write(
    root,
    'packages/shoreline/src/themes/sunrise/tokens.css',
    ':root { --sl-test: 2rem; }'
  )
  const second = await targetFingerprint(contract, root)
  assert.notEqual(second, independent)
  await write(
    root,
    'packages/shoreline/src/themes/horizon/tokens.css',
    '@import "../sunrise/tokens.css"; :root { --sl-extra: 3rem; }'
  )
  assert.notEqual(await targetFingerprint(contract, root), second)
})

test('ready tokens and theme contracts verify real artifact bytes without requiring component stories or unit evidence', async (t) => {
  const root = await fixture(t)
  for (const kind of ['tokens', 'theme']) {
    const contract = draft(kind)
    contract.status = 'ready-for-review'
    await recordEvidence(contract, root)
    assert.equal(contract.states, undefined)
    assert.ok(!contract.evidence.some((entry) => entry.kind === 'unit'))
    assert.deepEqual(await checkContractFiles(contract, { root }), [])
    await write(root, 'result.json', '{"fixtureResult":"fail"}')
    assert.ok(
      (await checkContractFiles(contract, { root })).some((message) =>
        message.includes('hash mismatch')
      )
    )
    await write(root, 'result.json', '{"fixtureResult":"pass"}')
  }
})

test('visual, accessibility and theme-regression receipts must identify every available theme', async (t) => {
  const root = await fixture(t)
  const contract = draft()
  const pending = {
    kind: 'visual',
    result: 'pending',
    description: 'Not run yet.',
  }
  contract.evidence = [pending]
  assert.deepEqual(validateContract(contract), [])
  contract.status = 'ready-for-review'
  for (const kind of themeEvidenceKinds) {
    await recordEvidence(contract, root)
    const entry = contract.evidence.find((item) => item.kind === kind)
    entry.themes = undefined
    assert.ok(
      validateContract(contract).some((message) =>
        message.includes(`Passed ${kind} evidence must declare tested themes`)
      )
    )
    for (const themes of [
      null,
      'horizon',
      {},
      [],
      ['horizon', 'horizon'],
      ['../horizon'],
    ]) {
      entry.themes = themes
      assert.ok(validateContract(contract).length > 0)
    }
    entry.themes = ['sunrise', 'independent']
    assert.ok(
      validateContract(contract).some((message) =>
        message.includes('does not cover target theme: horizon')
      )
    )
    entry.themes = ['horizon']
    assert.deepEqual(validateContract(contract), [])
    const missing = await checkContractFiles(contract, { root })
    assert.ok(
      missing.includes(
        `${kind} evidence does not cover available theme: sunrise`
      )
    )
    assert.ok(
      missing.includes(
        `${kind} evidence does not cover available theme: independent`
      )
    )
    entry.themes = ['horizon', 'sunrise', 'independent', 'imaginary']
    assert.ok(
      (await checkContractFiles(contract, { root })).includes(
        `${kind} evidence references an unavailable theme: imaginary`
      )
    )
  }
})

test('matching artifact hashes cannot promote captures, baseline updates or partial runs to visual evidence', async (t) => {
  const root = await fixture(t)
  const contract = draft('theme')
  contract.status = 'ready-for-review'
  const themes = themeRegistry.discoverThemes(root)
  const valid = visualReceipt(themes)
  for (const changes of [
    { mode: 'capture' },
    { mode: 'update' },
    { result: 'diagnostic-only' },
    { exitCode: 1 },
    { selection: 'components-button--show' },
    { themes: ['horizon'] },
    { themes: [...themes, themes[0]] },
    { expectedTests: valid.expectedTests + 1 },
    { coverage: { ...valid.coverage, fullMatrix: false } },
    { coverage: { ...valid.coverage, allPassed: false } },
    { coverage: { ...valid.coverage, skipped: 1 } },
    { coverage: { ...valid.coverage, executed: valid.coverage.expected - 1 } },
    {
      expectedTests: 0,
      coverage: { ...valid.coverage, expected: 0, executed: 0 },
    },
    { environment: { ...valid.environment, canonicalEnvironment: false } },
    { environment: { ...valid.environment, platform: 'darwin' } },
    { environment: { ...valid.environment, channel: 'chrome' } },
    { environment: undefined, canonicalEnvironment: true },
    { reportError: 'The report could not be parsed' },
  ]) {
    await write(
      root,
      'visual-run.json',
      JSON.stringify({ ...valid, ...changes })
    )
    await recordEvidence(contract, root)
    const errors = await checkContractFiles(contract, { root })
    assert.ok(
      errors.some((message) =>
        message.startsWith('Invalid visual check receipt:')
      ),
      JSON.stringify(changes)
    )
    assert.ok(!errors.some((message) => message.includes('hash mismatch')))
  }
  await write(root, 'visual-run.json', JSON.stringify(valid))
  await recordEvidence(contract, root)
  assert.deepEqual(await checkContractFiles(contract, { root }), [])
})

test('a screenshot or an arbitrary JSON pass marker is not a visual check receipt', async (t) => {
  const root = await fixture(t)
  const contract = draft('tokens')
  for (const bytes of [
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    '{"fixtureResult":"pass"}',
    'null',
  ]) {
    await write(root, 'visual-run.json', bytes)
    await recordEvidence(contract, root)
    const errors = await checkContractFiles(contract, { root })
    assert.ok(errors.some((message) => /visual check receipt/.test(message)))
  }
})

test('adding a theme invalidates old evidence and requires expanding the recorded matrix', async (t) => {
  const root = await fixture(t)
  const contract = draft('theme')
  contract.status = 'ready-for-review'
  await recordEvidence(contract, root)
  const first = contract.evidence[0].inputSha256
  await write(
    root,
    'packages/shoreline/src/themes/new-brand/tokens.css',
    '@import "../sunrise/tokens.css";'
  )
  assert.notEqual(await targetFingerprint(contract, root), first)
  const errors = await checkContractFiles(contract, { root })
  assert.ok(
    errors.some((message) =>
      message.includes('does not cover available theme: new-brand')
    )
  )
  assert.ok(errors.some((message) => message.startsWith('Stale')))
  for (const entry of contract.evidence)
    if (entry.themes) entry.themes.push('new-brand')
  assert.ok(
    (await checkContractFiles(contract, { root })).some((message) =>
      message.startsWith('Stale')
    )
  )
})

test('runtime provenance and variable contract decisions participate in evidence fingerprints', async (t) => {
  const root = await fixture(t)
  const contract = draft()
  const producer = 'packages/shoreline/src/components/example/example.tsx'
  const consumer =
    'packages/shoreline/src/themes/horizon/components/example.css'
  const variable = {
    name: '--sl-runtime',
    reason: 'The runtime component provides an index.',
    providers: [{ kind: 'jsx-style', file: producer, element: 'div' }],
    consumers: [consumer],
  }
  const saveContract = () =>
    write(
      root,
      'design-system/component-variables.json',
      JSON.stringify({ schemaVersion: 1, variables: [variable] })
    )
  await write(
    root,
    producer,
    'const Render = () => <div style={{ "--sl-runtime": 1 }} />'
  )
  await write(
    root,
    consumer,
    '[data-sl-example] { z-index: var(--sl-runtime); }'
  )
  await saveContract()
  const first = await targetFingerprint(contract, root)
  await write(
    root,
    producer,
    'const Render = () => <div style={{ "--sl-runtime": 2 }} />'
  )
  const second = await targetFingerprint(contract, root)
  assert.notEqual(second, first)
  variable.reason = 'A reviewed change to the meaning of this runtime index.'
  await saveContract()
  assert.notEqual(await targetFingerprint(contract, root), second)
  const packet = await contextPacket(contract, { root })
  assert.ok(
    packet.validationInputs.some(
      (input) => input.path === producer && input.sha256
    )
  )
  await write(root, producer, 'const Render = () => <div />')
  await assert.rejects(
    targetFingerprint(contract, root),
    /Producer no longer declares/
  )
})

test('runner configuration and visual baselines invalidate receipts while generated outputs do not', async (t) => {
  const root = await fixture(t)
  const contract = draft('tokens')
  const before = await targetFingerprint(contract, root)
  await write(root, '.storybook/main.js', 'export default { stories: [] }')
  const configured = await targetFingerprint(contract, root)
  assert.notEqual(configured, before)
  await write(
    root,
    'tools/design-system/visual/model.mjs',
    'export const viewports = [390, 1280]'
  )
  const runner = await targetFingerprint(contract, root)
  assert.notEqual(runner, configured)
  await write(
    root,
    'design-system/visual-baselines/linux/chromium/horizon/example.png',
    Buffer.from([137, 80, 78, 71])
  )
  const baseline = await targetFingerprint(contract, root)
  assert.notEqual(baseline, runner)
  await write(
    root,
    'artifacts/design-system/visual/report.json',
    '{"result":"pass"}'
  )
  assert.equal(await targetFingerprint(contract, root), baseline)
})

test('the full matrix fingerprint includes shared public source and stories, with new packages discovered automatically', async (t) => {
  const root = await fixture(t)
  const contract = draft('theme')
  await write(
    root,
    'packages/charts/package.json',
    '{"name":"@vtex/shoreline-charts"}'
  )
  await write(root, 'packages/charts/src/chart.tsx', 'export const Chart = 1')
  await write(
    root,
    'packages/charts/src/chart.show.stories.tsx',
    'export const Show = {}'
  )
  const first = await targetFingerprint(contract, root)
  await write(root, 'packages/charts/src/chart.tsx', 'export const Chart = 2')
  const implementation = await targetFingerprint(contract, root)
  assert.notEqual(implementation, first)
  await write(
    root,
    'packages/charts/src/chart.show.stories.tsx',
    'export const Show = { args: { expanded: true } }'
  )
  const story = await targetFingerprint(contract, root)
  assert.notEqual(story, implementation)
  await write(
    root,
    'packages/new-package/package.json',
    '{"name":"@vtex/new-package","private":false}'
  )
  await write(root, 'packages/new-package/src/index.ts', 'export const New = 1')
  const expanded = await targetFingerprint(contract, root)
  assert.notEqual(expanded, story)
  await write(
    root,
    'packages/docs/package.json',
    '{"name":"@shoreline/docs","private":true}'
  )
  await write(root, 'packages/docs/src/app.tsx', 'export const App = 1')
  await write(root, 'packages/charts/dist/index.js', 'generated output')
  assert.equal(await targetFingerprint(contract, root), expanded)
})

test('component readiness verifies target hashes and named story exports', async (t) => {
  const root = await fixture(t)
  const contract = draft()
  contract.status = 'ready-for-review'
  await recordEvidence(contract, root)
  assert.deepEqual(await checkContractFiles(contract, { root }), [])
  await write(root, 'target.tsx', 'export const Target = 2')
  assert.equal(
    (await checkContractFiles(contract, { root })).filter((message) =>
      message.startsWith('Stale')
    ).length,
    evidenceByKind.component.length
  )
  contract.states[0].story.export = 'Missing'
  assert.ok(
    (await checkContractFiles(contract, { root })).some((message) =>
      message.includes('Story export')
    )
  )
})

test('optional source pins and clean state are checked when a source checkout is supplied', async (t) => {
  const root = await fixture(t)
  await write(root, 'source.tsx', 'export const Source = 1')
  execute(root, 'init', '-q')
  execute(root, 'add', '.')
  commit(root)
  const contract = {
    ...draft(),
    source: { ...source(), revision: execute(root, 'rev-parse', 'HEAD') },
  }
  assert.deepEqual(
    await checkContractFiles(contract, { root, sourceRoot: root }),
    []
  )
  const packet = await contextPacket(contract, { root, sourceRoot: root })
  assert.equal(packet.sourceVerification, 'verified')
  assert.equal(packet.sourceVerified, true)
  assert.deepEqual(packet.sourceFiles, [
    { path: 'source.tsx', sha256: hash('export const Source = 1') },
  ])
  contract.source.revision = 'a'.repeat(40)
  await write(root, 'source.tsx', 'export const Source = 2')
  const errors = await checkContractFiles(contract, { root, sourceRoot: root })
  assert.ok(errors.includes('Source HEAD differs from pinned revision'))
  assert.ok(errors.includes('Source contract files have uncommitted changes'))
  await assert.rejects(
    contextPacket(contract, { root, sourceRoot: root }),
    /Source HEAD differs/
  )
  assert.deepEqual(
    await checkContractFiles(draft(), { root, sourceRoot: root }),
    []
  )
})

test('binary artifact receipts become stale after contract decisions or imported theme values change', async (t) => {
  const root = await fixture(t)
  const contract = draft()
  const screenshot = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 255, 254])
  await write(root, 'screenshot.png', screenshot)
  contract.status = 'ready-for-review'
  await recordEvidence(contract, root, { artifact: 'screenshot.png' })
  assert.deepEqual(await checkContractFiles(contract, { root }), [])
  contract.impact.summary = 'A different consumer-visible decision'
  assert.ok(
    (await checkContractFiles(contract, { root })).some((message) =>
      message.startsWith('Stale')
    )
  )
  await recordEvidence(contract, root, { artifact: 'screenshot.png' })
  await write(
    root,
    'packages/shoreline/src/themes/sunrise/tokens.css',
    ':root { --sl-test: 5rem; }'
  )
  assert.ok(
    (await checkContractFiles(contract, { root })).some((message) =>
      message.startsWith('Stale')
    )
  )
})

test('file reads reject symlink escapes and absolute paths', async (t) => {
  const root = await fixture(t)
  await mkdir(path.join(root, 'inner'))
  await symlink(
    path.join(root, 'target.tsx'),
    path.join(root, 'inner/escaped.tsx')
  )
  await assert.rejects(
    readInside(path.join(root, 'inner'), 'escaped.tsx'),
    /escapes/
  )
  await assert.rejects(
    readInside(root, path.join(root, 'target.tsx')),
    /relative/
  )
})

test('changed files include committed, unstaged and untracked changes while deletions are optional', async (t) => {
  const root = await fixture(t)
  execute(root, 'init', '-q')
  execute(root, 'add', '.')
  commit(root)
  const base = execute(root, 'rev-parse', 'HEAD')
  await write(root, 'committed.tsx', 'export const B = 1')
  execute(root, 'add', '.')
  commit(root)
  await write(root, 'target.tsx', 'export const A = 2')
  await write(root, 'untracked.tsx', 'export const A = 3')
  await rm(path.join(root, 'show.stories.tsx'))
  assert.deepEqual(changedFiles(root, base), [
    'committed.tsx',
    'target.tsx',
    'untracked.tsx',
  ])
  assert.ok(
    changedFiles(root, base, { includeDeleted: true }).includes(
      'show.stories.tsx'
    )
  )
})
