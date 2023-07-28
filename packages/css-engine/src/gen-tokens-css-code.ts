import { transform } from 'lightningcss'

import { genCssVariables } from './gen-css-variables'
import { genTokens } from './gen-tokens'

/**
 * Generate tokens CSS code from configuration
 * @param config Shoreline configuration
 * @returns A Buffer with the CSS code.
 */
export function genTokensCssCode(config: Record<string, any>): Buffer {
  const tokens = genTokens(config)
  const cssVariablesCode = genCssVariables(tokens)

  const { code } = transform({
    filename: '',
    code: Buffer.from(cssVariablesCode),
    minify: false,
  })

  return code
}
