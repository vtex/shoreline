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

  const tokens = transformTokens({
    code,
    useCascadeLayers,
    browserslistQuery,
  })

  if (emitFile) {
    const outputFile = `${outdir}/tokens${
      useCascadeLayers ? '' : '-unlayered'
    }.css`

    try {
      outputFileSync(outputFile, tokens.code.toString())
      console.log(`✅ Generated ${outputFile}`)
    } catch (e) {
      console.log('🚨 Failed to compile styles')
    }
  }

  return tokens
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
