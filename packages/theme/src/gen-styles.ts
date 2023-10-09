import type { ShorelineConfig } from '@vtex/shoreline-utils'
import { parseTokens } from '@vtex/shoreline-utils'
import browserslist from 'browserslist'
import { browserslistToTargets, transform } from 'lightningcss'

import { getPreflight } from './get-preflight'
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
  const baseCode = getPreflight(prefix) + cssVariablesCode

  const targets = browserslistToTargets(browserslist('>= 0.25%'))
  const { code: css } = transform({
    filename: 'styles.css',
    code: Buffer.from(baseCode),
    targets,
  })

  return Buffer.from(css)
}
