import { execFileSync, spawn } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import registry from '../theme-registry.cjs'
import { createManifest, manifestPath, sha256 } from './model.mjs'

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
export const require = createRequire(join(root, 'package.json'))

export function binary(packageName, name) {
  const location = require.resolve(`${packageName}/package.json`)
  const pkg = JSON.parse(readFileSync(location, 'utf8'))
  return resolve(dirname(location), pkg.bin[name])
}

// Include source, configuration, lockfile and complete built theme stylesheets.
// Changed inputs invalidate stale static Storybooks before a run.
export function inputFingerprint(repositoryRoot = root) {
  const paths = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    { cwd: repositoryRoot, encoding: 'utf8' }
  )
    .split('\0')
    .filter(
      (file) =>
        file.startsWith('.storybook/') ||
        file.startsWith('packages/') ||
        file.startsWith('tools/design-system/visual/') ||
        [
          'package.json',
          'pnpm-lock.yaml',
          'pnpm-workspace.yaml',
          'turbo.json',
          'tsconfig.json',
          'vite.config.ts',
          'tools/design-system/theme-registry.cjs',
        ].includes(file)
    )
  const values = []
  for (const file of [...new Set(paths)].sort()) {
    const absolute = join(repositoryRoot, file)
    if (existsSync(absolute) && statSync(absolute).isFile()) {
      values.push([file, sha256(readFileSync(absolute))])
    }
  }
  for (const theme of registry.discoverThemes(repositoryRoot)) {
    const file = `packages/shoreline/dist/themes/${theme}/styles.css`
    if (!existsSync(join(repositoryRoot, file))) {
      throw new Error(`Missing ${file}; run pnpm build before the visual build`)
    }
    values.push([file, sha256(readFileSync(join(repositoryRoot, file)))])
  }
  return sha256(JSON.stringify(values))
}

export function readManifest(repositoryRoot = root) {
  const location = join(repositoryRoot, manifestPath)
  if (!existsSync(location)) {
    throw new Error('Missing visual manifest; build all theme Storybooks first')
  }
  const manifest = JSON.parse(readFileSync(location, 'utf8'))
  const themes = registry.discoverThemes(repositoryRoot)
  if (JSON.stringify(manifest.themes) !== JSON.stringify([...themes].sort())) {
    throw new Error('Theme registry changed; rebuild all theme Storybooks')
  }
  if (manifest.inputHash !== inputFingerprint(repositoryRoot)) {
    throw new Error(
      'Storybook inputs changed; run pnpm build and rebuild all theme Storybooks'
    )
  }
  const indexes = Object.fromEntries(
    themes.map((theme) => [
      theme,
      JSON.parse(
        readFileSync(
          join(
            repositoryRoot,
            'artifacts/design-system/storybooks',
            theme,
            'index.json'
          ),
          'utf8'
        )
      ),
    ])
  )
  const expected = createManifest({
    themes,
    indexes,
    inputHash: manifest.inputHash,
    generatedAt: manifest.generatedAt,
  })
  if (JSON.stringify(expected) !== JSON.stringify(manifest)) {
    throw new Error(
      'Visual manifest or story indexes changed; rebuild all themes'
    )
  }
  return manifest
}

export async function execute(file, args, env = {}) {
  const child = spawn(process.execPath, [file, ...args], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  })
  return new Promise((resolveExit, reject) => {
    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (signal) reject(new Error(`Process terminated by ${signal}`))
      else resolveExit(code ?? 1)
    })
  })
}

export function serverPort() {
  const port = Number(process.env.SHORELINE_VISUAL_PORT ?? 6106)
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error(
      'SHORELINE_VISUAL_PORT must be an integer from 1024 to 65535'
    )
  }
  return port
}

export function environmentDetails() {
  const channel = process.env.SHORELINE_VISUAL_CHANNEL ?? 'bundled-chromium'
  const declaredImage = process.env.SHORELINE_VISUAL_ENVIRONMENT ?? null
  return {
    platform: process.platform,
    architecture: process.arch,
    node: process.versions.node,
    playwright: require('@playwright/test/package.json').version,
    axe: require('axe-core/package.json').version,
    channel,
    declaredImage,
    canonicalEnvironment:
      process.platform === 'linux' &&
      channel === 'bundled-chromium' &&
      declaredImage === 'mcr.microsoft.com/playwright:v1.44.1-jammy',
  }
}
