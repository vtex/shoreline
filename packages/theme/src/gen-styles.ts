import type { ShorelineConfig } from '@vtex/shoreline-utils'
import { parseTokens } from '@vtex/shoreline-utils'
import presetEnv from 'postcss-preset-env'
import postcss from 'postcss'
import { format } from 'prettier'
import fse from 'fs-extra'
import path from 'path'

import { tokensToCssVariables } from './tokens-to-css-variables'

/**
 * Generate tokens CSS code from configuration
 * @param config Shoreline configuration
 * @returns A Buffer with the CSS code.
 */
export async function genStyles(config: ShorelineConfig): Promise<Buffer> {
  const { tokens = {}, prefix } = config

  const parsedTokens = parseTokens({
    tokens,
    prefix,
  })

  const cssVariablesCode = tokensToCssVariables(parsedTokens)

  const preflightCode = fse
    .readFileSync(path.resolve(__dirname, 'preflight.css'))
    .toString()

  const { css: unformatedCss } = await postcss([
    presetEnv({
      stage: 4,
      features: {
        'custom-media-queries': true,
        'system-ui-font-family': true,
        'nesting-rules': true,
      },
    }),
  ]).process(cssVariablesCode + preflightCode)

  const css = await format(unformatedCss, {
    parser: 'css',
    semi: false,
    singleQuote: true,
  })

  return Buffer.from(css)
}
