import { outputFileSync, readFileSync } from 'fs-extra'
import { type TransformTokensArgs, transformTokens } from './transform-tokens'

/**
 * Transform shoreline tokens
 */
export function tokens(args: TokensArgs) {
  const {
    inputFile,
    outdir,
    browserslistQuery,
    useCascadeLayers = true,
    emitFile = false,
  } = args

  const code = readFileSync(inputFile)

  const [css, js] = transformTokens({
    code,
    useCascadeLayers,
    browserslistQuery,
  })

  if (emitFile) {
    const outputCSSFile = `${outdir}/tokens${
      useCascadeLayers ? '' : '-unlayered'
    }.css`

    try {
      outputFileSync(outputCSSFile, css.code)
      console.log(`✅ Generated ${outputCSSFile}`)
    } catch (e) {
      console.log('🚨 Failed to compile styles')
    }

    const outputJsonFile = `${outdir}/tokens${
      useCascadeLayers ? '' : '-unlayered'
    }.json`

    try {
      outputFileSync(outputJsonFile, JSON.stringify(js))
      console.log(`✅ Generated ${outputJsonFile}`)
    } catch (e) {
      console.log('🚨 Failed to compile styles')
    }
  }

  return css
}

export interface TokensArgs extends Omit<TransformTokensArgs, 'code'> {
  /**
   * file to transform
   */
  inputFile: string
  /**
   * output directory
   */
  outdir: string
  /**
   * wether the tokens.css is emited
   */
  emitFile?: boolean
}
