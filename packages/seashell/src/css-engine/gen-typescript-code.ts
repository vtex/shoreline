import { constants } from '@vtex/shoreline-utils'
import { format } from 'prettier'

import { genTokens } from './gen-tokens'

function getTemplateLiterals(config: Record<string, any>) {
  let returnString = ''
  const unPrefixedTokens = genTokens(config, true)

  for (const key in unPrefixedTokens) {
    returnString += `'${constants.tokenPrefix}${key}' |`
  }

  return returnString.slice(0, -1).trim()
}

export async function genTypescriptCode(
  config: Record<string, any>
): Promise<Buffer> {
  const templateLiterals = getTemplateLiterals(config)
  const tsDeclaration = `export type Token = ${templateLiterals};`

  const tsCode = await format(tsDeclaration, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  return Buffer.from(tsCode)
}
