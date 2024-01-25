import type { ShorelineConfig } from '@vtex/shoreline-utils'
import { format } from 'prettier'

import { tokensToDictionary } from './tokens-to-dictionary'

export async function genTokensObject(
  config: ShorelineConfig
): Promise<Buffer> {
  const tokens = tokensToDictionary(config)
  const tsDeclaration = `export const ShorelineTokens = ${JSON.stringify(
    tokens
  )};`

  const tsCode = await format(tsDeclaration, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  return Buffer.from(tsCode)
}
