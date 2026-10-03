import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { reportCoverage, runOptions } from './model.mjs'
import {
  binary,
  environmentDetails,
  execute,
  readManifest,
  root,
} from './runtime.mjs'

try {
  const options = runOptions(process.argv.slice(2))
  const manifest = readManifest()
  const output = join(root, 'artifacts/design-system/visual', options.mode)
  await mkdir(output, { recursive: true })
  const receipt = {
    schemaVersion: 1,
    mode: options.mode,
    inputHash: manifest.inputHash,
    themes: manifest.themes,
    expectedTests: manifest.expectedTests,
    selection: options.grep ?? 'all',
    channel: options.channel ?? 'bundled-chromium',
    platform: process.platform,
    environment: environmentDetails(),
    approval: 'pending-human-review',
    startedAt: new Date().toISOString(),
  }
  const saveReceipt = () =>
    writeFile(join(output, 'run.json'), `${JSON.stringify(receipt, null, 2)}\n`)
  await saveReceipt()
  await rm(join(output, 'report.json'), { force: true })
  if (options.mode !== 'check') {
    console.log(
      options.mode === 'capture'
        ? 'Diagnostic captures only: no baseline comparison or design approval.'
        : 'Writing baseline candidates: review every image before committing. This is not design approval.'
    )
  }
  const args = [
    'test',
    '--config',
    'tools/design-system/visual/playwright.config.mjs',
  ]
  if (options.grep) args.push('--grep', options.grep)
  let code = await execute(binary('@playwright/test', 'playwright'), args, {
    SHORELINE_VISUAL_MODE: options.mode,
  })
  try {
    const report = JSON.parse(
      await readFile(join(output, 'report.json'), 'utf8')
    )
    receipt.coverage = reportCoverage(report, manifest)
    if (
      options.mode !== 'capture' &&
      (!receipt.coverage.fullMatrix || receipt.coverage.skipped > 0)
    ) {
      console.error(
        'Visual report does not cover the full theme/story/viewport matrix'
      )
      code = 1
    }
  } catch (error) {
    receipt.reportError = error.message
    code = 1
  }
  try {
    readManifest()
  } catch (error) {
    receipt.inputError = error.message
    console.error(`Visual inputs changed during execution: ${error.message}`)
    code = 1
  }
  receipt.finishedAt = new Date().toISOString()
  receipt.exitCode = code
  receipt.result =
    options.mode === 'check'
      ? code === 0
        ? 'technical-checks-passed'
        : 'failed'
      : 'diagnostic-only'
  await saveReceipt()
  process.exitCode = code
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
