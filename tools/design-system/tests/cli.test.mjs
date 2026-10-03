import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { guidance } from '../contracts.mjs'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const cli = path.join(root, 'tools/design-system/cli.mjs')

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    encoding: 'utf8',
  })
  assert.ifError(result.error)
  return result
}

test('a new theme can be specified and contextualized without an external repository', async (t) => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'shoreline-native-cli-'))
  t.after(() => rm(fixture, { recursive: true, force: true }))
  for (const file of guidance) {
    await mkdir(path.dirname(path.join(fixture, file)), { recursive: true })
    await writeFile(path.join(fixture, file), '# Fixture guidance')
  }
  const existingTheme = path.join(
    fixture,
    'packages/shoreline/src/themes/sunrise'
  )
  await mkdir(existingTheme, { recursive: true })
  await writeFile(
    path.join(existingTheme, 'tokens.css'),
    ':root { --sl-base: white; }'
  )
  const file = 'design-system/contracts/themes/dusk.json'
  const initialized = run(['init', 'theme', 'dusk', '--root', fixture])
  assert.equal(initialized.status, 0, initialized.stderr)
  const contract = JSON.parse(await readFile(path.join(fixture, file)))
  assert.equal(contract.kind, 'theme')
  assert.equal(contract.source, undefined)

  const validation = run([
    'contract',
    file,
    '--root',
    fixture,
    '--source',
    fixture,
  ])
  assert.equal(validation.status, 0, validation.stderr)
  assert.equal(JSON.parse(validation.stdout).sourceVerified, false)
  assert.equal(
    JSON.parse(validation.stdout).sourceVerification,
    'not-applicable'
  )

  const context = run(['context', file, '--root', fixture])
  assert.equal(context.status, 0, context.stderr)
  const packet = JSON.parse(context.stdout)
  assert.deepEqual(packet.sourceFiles, [])
  assert.equal(packet.sourceVerified, false)
  assert.ok(
    packet.themeInputs.some((theme) => theme.name === 'dusk' && theme.missing)
  )
  const inventory = run(['inventory', '--root', fixture])
  assert.equal(inventory.status, 0, inventory.stderr)
  assert.equal(JSON.parse(inventory.stdout).source, null)

  const ready = run(['contract', file, '--root', fixture, '--ready'])
  assert.equal(ready.status, 1)
  assert.ok(JSON.parse(ready.stdout).errors.length)
  const again = run(['init', 'theme', 'dusk', '--root', fixture])
  assert.equal(again.status, 2)
  assert.deepEqual(
    JSON.parse(await readFile(path.join(fixture, file))),
    contract
  )
})

test('CLI never reports source verified after a readiness validation short-circuit', async (t) => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'shoreline-cli-'))
  t.after(() => rm(fixture, { recursive: true, force: true }))
  const contract = await readFile(
    path.join(root, 'design-system/contracts/components/button.json')
  )
  await writeFile(path.join(fixture, 'draft.json'), contract)
  const result = spawnSync(
    process.execPath,
    [
      cli,
      'contract',
      'draft.json',
      '--root',
      fixture,
      '--source',
      fixture,
      '--ready',
    ],
    { encoding: 'utf8' }
  )
  assert.ifError(result.error)
  assert.equal(result.status, 1)
  const output = JSON.parse(result.stdout)
  assert.equal(output.sourceVerificationRequested, true)
  assert.equal(output.sourceVerified, false)
  assert.ok(output.errors.length > 0)
})
