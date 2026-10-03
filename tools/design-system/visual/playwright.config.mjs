import { defineConfig } from '@playwright/test'
import { join } from 'node:path'
import { projectsFor, runOptions } from './model.mjs'
import {
  environmentDetails,
  readManifest,
  root,
  serverPort,
} from './runtime.mjs'

const mode = process.env.SHORELINE_VISUAL_MODE ?? 'check'
const options = runOptions([
  mode,
  ...(mode === 'update' ? ['--update-snapshots'] : []),
])
if (
  process.argv.some(
    (arg) => arg === '-u' || arg.startsWith('--update-snapshots')
  )
) {
  throw new Error(
    'Use the explicit visual runner update mode to generate baseline candidates'
  )
}
if (
  mode !== 'capture' &&
  process.argv.some((arg) =>
    /^(--grep(?:-invert)?|--project|--shard|--last-failed|--test-list)(?:=|$)/.test(
      arg
    )
  )
) {
  throw new Error(
    'Visual validation requires the full matrix; use capture for filtered diagnostics'
  )
}
const manifest = readManifest()
const port = serverPort()
const output = join(root, 'artifacts/design-system/visual', mode)

export default defineConfig({
  testDir: '.',
  testMatch: 'stories.spec.mjs',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 60000,
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 0,
      threshold: 0.2,
    },
  },
  updateSnapshots: options.updateSnapshots,
  snapshotPathTemplate: join(
    root,
    `design-system/visual-baselines/{platform}/${options.channel ?? 'chromium'}/{projectName}/{arg}{ext}`
  ),
  outputDir: join(output, 'results'),
  reporter: [
    ['list'],
    ['json', { outputFile: join(output, 'report.json') }],
    ['html', { outputFolder: join(output, 'html'), open: 'never' }],
  ],
  metadata: {
    mode,
    inputHash: manifest.inputHash,
    expectedTests: manifest.expectedTests,
    environment: environmentDetails(),
    baselineApproval: 'requires-human-review',
  },
  use: {
    browserName: 'chromium',
    ...(options.channel ? { channel: options.channel } : {}),
    headless: true,
    locale: 'en-US',
    timezoneId: 'UTC',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
  },
  projects: projectsFor(manifest, port),
  webServer: {
    command: 'node tools/design-system/visual/server.mjs',
    cwd: root,
    url: `http://127.0.0.1:${port}/__shoreline_visual_ready`,
    reuseExistingServer: false,
    timeout: 30000,
  },
})
