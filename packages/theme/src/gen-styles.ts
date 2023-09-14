import type { ShorelineConfig } from '@vtex/shoreline-utils'
import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import postcss from 'postcss'
import { format } from 'prettier'

import { getPreflight } from './get-preflight'
import { tokensToCssVariables } from './tokens-to-css-variables'
import { parseTokens } from './parse-tokens'

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
  const baseCode = getPreflight(prefix) + cssVariablesCode

  const { css: unformatedCss } = await postcss([autoprefixer, nested]).process(
    baseCode
  )

  const css = await format(unformatedCss, {
    parser: 'css',
    semi: false,
    singleQuote: true,
  })

  return Buffer.from(css)
}
