import browserslist from 'browserslist'
import { bundle as __bundle, browserslistToTargets } from 'lightningcss'
import { outputFileSync } from 'fs-extra'
import ora from 'ora'
import { transformTokens } from './transform-tokens'
import type { TokensArgs } from './transform-tokens'
import type { TokenConfig } from './types'

const layerStatement = '@layer sl-reset, sl-base, sl-tokens, sl-components;'

/**
 * Bundle css files
 */
export function bundle(args: BundleArgs) {
  const {
    outdir,
    tokens,
    inputFile,
    useCascadeLayers = true,
    browserslistQuery = 'last 1 versions',
  } = args

  const spinner = ora('Bundling css').start()

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const tokensCode = transformTokens({
    tokens,
    emitFile: true,
    outdir,
    useCascadeLayers,
    browserslistQuery,
  })

  const { code: bundledCode } = __bundle({
    filename: inputFile,
    targets,
    minify: false,
  })

  try {
    const outputFile = `${outdir}/styles${
      useCascadeLayers ? '' : '-unlayered'
    }.css`

    outputFileSync(
      outputFile,
      Buffer.from(
        useCascadeLayers
          ? `${layerStatement}\n\n${tokensCode}\n\n${bundledCode.toString()}`
          : `${tokensCode}\n\n${bundledCode.toString()}`
      )
    )

    spinner.succeed(`Generated ${outputFile}`)
  } catch (e) {
    spinner.fail('Failed to bundle css')
  }
}

export interface BundleArgs extends Omit<TokensArgs, 'emitFile'> {
  /**
   * file contaning the tokens
   */
  tokens: TokenConfig
  /**
   * file to bundle
   */
  inputFile: string
}
