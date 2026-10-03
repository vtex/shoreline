import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import registry from '../theme-registry.cjs'
import { buildsDirectory, createManifest, manifestPath } from './model.mjs'
import { binary, execute, inputFingerprint, root } from './runtime.mjs'

try {
  if (process.argv.length > 2)
    throw new Error('Visual build accepts no filters: every theme is required')
  const themes = registry.discoverThemes(root)
  if (themes.length === 0) throw new Error('No themes discovered')
  const inputHash = inputFingerprint()
  await mkdir(join(root, buildsDirectory), { recursive: true })
  await rm(join(root, manifestPath), { force: true })
  const indexes = {}
  for (const theme of themes) {
    const output = `${buildsDirectory}/${theme}`
    console.log(`Building isolated Storybook: ${theme}`)
    const code = await execute(
      binary('storybook', 'storybook'),
      ['build', '--output-dir', output],
      {
        SHORELINE_THEME: theme,
        STORYBOOK_DISABLE_TELEMETRY: '1',
      }
    )
    if (code !== 0)
      throw new Error(`Storybook build failed for ${theme} (exit ${code})`)
    indexes[theme] = JSON.parse(
      await readFile(join(root, output, 'index.json'), 'utf8')
    )
  }
  if (inputHash !== inputFingerprint()) {
    throw new Error('Inputs changed while building; rebuild the theme matrix')
  }
  const manifest = createManifest({ themes, indexes, inputHash })
  await writeFile(
    join(root, manifestPath),
    `${JSON.stringify(manifest, null, 2)}\n`
  )
  console.log(
    `Visual manifest: ${themes.length} themes × ${manifest.viewports.length} viewports × ${manifest.stories.length} Show stories = ${manifest.expectedTests} tests`
  )
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
