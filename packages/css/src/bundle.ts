import browserslist from 'browserslist'
import { bundle as __bundle, browserslistToTargets } from 'lightningcss'
import { outputFileSync } from 'fs-extra'
import { tokens, type TokensArgs } from './tokens'

const layerStatement = '@layer sl-reset, sl-base, sl-tokens, sl-components;'

/**
 * Bundle css files
 */
export function bundle(args: BundleArgs) {
  const {
    inputFile,
    outdir,
    tokensFile,
    useCascadeLayers = true,
    browserslistQuery = 'last 1 versions',
  } = args

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const { code: tokensCode } = tokens({
    inputFile: tokensFile,
    emitFile: true,
    outdir,
    useCascadeLayers,
    browserslistQuery,
  })

  const { code: bundledCode } = __bundle({
    filename: inputFile,
    targets,
    minify: false,
    customAtRules: {
      theme: {
        prelude: '<custom-ident>',
        body: 'style-block',
      },
    },
    visitor: {
      Rule: {
        custom: {
          theme() {
            // theme is not bundled with
            throw new Error('Do not import tokens into your bundle')
          },
        },
      },
    },
  })

  try {
    const outputFile = `${outdir}/styles${
      useCascadeLayers ? '' : '-unlayered'
    }.css`

    outputFileSync(
      outputFile,
      Buffer.from(
        useCascadeLayers
          ? `${layerStatement}\n\n${tokensCode.toString()}\n\n${bundledCode.toString()}`
          : `${tokensCode.toString()}\n\n${bundledCode.toString()}`
      )
    )
    console.log(`✅ Generated ${outputFile}`)
  } catch (e) {
    console.log('🚨 Failed to compile styles')
  }
}

export interface BundleArgs extends Omit<TokensArgs, 'emitFile'> {
  /**
   * file contaning the tokens
   */
  tokensFile: string
}
