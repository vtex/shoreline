import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import nested from 'postcss-nested'
import postcss from 'postcss'

import { genCssVariables } from './gen-css-variables'
import { genTokens } from './gen-tokens'

/**
 * Generate tokens CSS code from configuration
 * @param config Shoreline configuration
 * @returns A Buffer with the CSS code.
 */
export async function genTokensCssCode(
  config: Record<string, any>
): Promise<Buffer> {
  const tokens = genTokens(config)
  const cssVariablesCode = genCssVariables(tokens)

  const { css } = await postcss([autoprefixer, cssnano, nested]).process(
    cssVariablesCode
  )

  return Buffer.from(css)
}
