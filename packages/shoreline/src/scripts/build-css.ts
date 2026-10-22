import { bundle } from '@vtex/shoreline-css'
import { themeEntries, themes } from '../themes/themes'

/**
 * Bundles every registered theme into `dist/themes/<name>/`.
 *
 * Each theme emits the same files: the split entries, layered and unlayered,
 * and the complete stylesheet, layered (with the layer statement) and unlayered.
 */
export function build() {
  for (const theme of themes) {
    const outdir = `dist/themes/${theme}`
    const themeDir = `src/themes/${theme}`

    for (const { input, output, layer } of themeEntries) {
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
