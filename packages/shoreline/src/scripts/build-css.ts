import { bundle } from '@vtex/shoreline-css'
import { resolve } from 'node:path'
import {
  discoverThemes,
  entries,
} from '../../../../tools/design-system/theme-registry.cjs'

export function build() {
  // Each theme exposes the same entrypoints. Invalid themes fail when bundled.
  const themes = discoverThemes(resolve(process.cwd(), '../..'))

  for (const theme of themes) {
    const outdir = `dist/themes/${theme}`
    const themeDir = `src/themes/${theme}`

    for (const { input, output, layer } of entries) {
      bundle({
        inputFile: `${themeDir}/${input}`,
        outdir,
        outputFile: output,
        layer,
      })

      bundle({
        inputFile: `${themeDir}/${input}`,
        outdir,
        outputFile: output,
      })
    }

    bundle({
      inputFile: `${themeDir}/styles.css`,
      outdir,
      includeLayersStatement: true,
    })

    bundle({
      inputFile: `${themeDir}/styles-unlayered.css`,
      outdir,
    })
  }
}

build()
