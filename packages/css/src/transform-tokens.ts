import { outputFileSync } from 'fs-extra'
import browserslist from 'browserslist'
import { transform, browserslistToTargets } from 'lightningcss'
import ora from 'ora'

import type { TokenConfig } from './types'
import { getCssString } from './get-css-string'

/**
 * Transform shoreline tokens
 */
export function transformTokens(args: TokensArgs): string {
  const {
    tokens,
    outdir,
    browserslistQuery = 'last 1 versions',
    useCascadeLayers = true,
    emitFile = false,
  } = args

  const spinner = ora('Transforming tokens').start()

  const css = transform({
    filename: 'styles.css',
    code: Buffer.from(getCssString(tokens)),
    targets: browserslistToTargets(browserslist(browserslistQuery)),
    minify: false,
  })

  const code = css.code.toString()

  if (emitFile) {
    const outputFile = `${outdir}/tokens${
      useCascadeLayers ? '' : '-unlayered'
    }.css`

    try {
      outputFileSync(outputFile, code)
      spinner.succeed(`Generated ${outputFile}`)
    } catch (e) {
      spinner.fail('Transformation failed')
    }
  }

  spinner.succeed('Finished')

  return code
}

export interface TokensArgs {
  /**
   * token configuration
   */
  tokens: TokenConfig
  /**
   * output directory
   */
  outdir: string
  /**
   * wether the tokens.css is emited
   */
  emitFile?: boolean
  /**
   * css support query
   * @default 'last 1 versions'
   */
  browserslistQuery?: string | string[]
  /**
   * wether it removes the sl-tokens layer
   * @default true
   */
  useCascadeLayers?: boolean
}
