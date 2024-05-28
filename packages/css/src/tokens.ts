import { outputFileSync, readFileSync } from 'fs-extra'
import { type TransformTokensArgs, transformTokens } from './transform-tokens'

export interface TokensArgs extends Omit<TransformTokensArgs, 'code'> {
  inputFile: string
  outdir: string
  emitFile: boolean
}

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
      outputFileSync(outputFile, tokens.code)
      console.log(`✅ Generated ${outputFile}`)
    } catch (e) {
      console.log('🚨 Failed to compile styles')
    }
  }

  return tokens
}
