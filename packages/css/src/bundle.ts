import browserslist from 'browserslist'
import { bundle as __bundle, browserslistToTargets } from 'lightningcss'
import { outputFileSync } from 'fs-extra'

const layerStatement = '@layer sl-reset, sl-base, sl-tokens, sl-components;'

/**
 * Bundle css files
 */
export function bundle(args: BundleArgs) {
  const {
    inputFile,
    outdir,
    outputFile,
    includeLayersStatement = false,
    layer,
    browserslistQuery = 'last 1 versions',
  } = args

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const { code: bundledCode } = __bundle({
    filename: inputFile,
    targets,
    minify: false,
  })

  try {
    // Derive output filename from input file if not provided
    const inputBasename = outputFile
      ? outputFile.replace(/\.css$/, '')
      : inputFile
          .split('/')
          .pop()
          ?.replace(/\.css$/, '') || 'styles'

    const outputFileName = `${outdir}/${inputBasename}${
      layer || includeLayersStatement ? '' : '-unlayered'
    }.css`

    let output = bundledCode.toString()

    // Wrap in layer if layer is provided
    if (layer) {
      output = `@layer ${layer} {\n${output}\n}`
    }

    if (includeLayersStatement) {
      output = `${layerStatement}\n\n${output}`
    }

    outputFileSync(outputFileName, output)
    console.log(`✅ Generated ${outputFileName}`)
  } catch (e) {
    console.log('🚨 Failed to compile styles')
  }
}

export interface BundleArgs {
  /**
   * Input CSS file to bundle
   */
  inputFile: string
  /**
   * Output directory
   */
  outdir: string
  /**
   * Output filename (without extension). If not provided, derived from inputFile
   */
  outputFile?: string
  /**
   * Whether to include the layer declaration statement
   * @default false
   */
  includeLayersStatement?: boolean
  /**
   * Layer name to wrap the CSS in (e.g., 'sl-reset', 'sl-base', 'sl-components').
   * If provided, the stylesheet will be layered.
   */
  layer?: string
  /**
   * Browserslist query for CSS transformation
   * @default 'last 1 versions'
   */
  browserslistQuery?: string | string[]
}
