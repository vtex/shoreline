import { outputFileSync, readFileSync } from 'fs-extra'
import { type TransformTokensArgs, transformTokens } from './transform-tokens'

export interface ThemeArgs extends Omit<TransformTokensArgs, 'code'> {
  inputFile: string
  outputFile: string
}

const layerStatement = '@layer sl-reset, sl-base, sl-tokens, sl-components;'

/**
 * TODO, replace Bundle
 */
export function theme(args: ThemeArgs) {
  const {
    inputFile,
    outputFile,
    browserslistQuery,
    useCascadeLayers = true,
  } = args

  const code = readFileSync(inputFile)

  const tokens = transformTokens({
    code,
    useCascadeLayers,
    browserslistQuery,
  })

  try {
    outputFileSync(
      outputFile,
      Buffer.from(
        useCascadeLayers
          ? `${layerStatement}\n\n${tokens.code.toString()}`
          : tokens.code.toString()
      )
    )

    console.log(`✅ Generated ${outputFile}`)
  } catch (e) {
    console.log('🚨 Failed to compile styles')
  }
}
