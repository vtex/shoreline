import { constants } from '@vtex/shoreline-utils'
import { genTokens } from './gen-tokens'

function getTemplateLiterals(config: Record<string, any>) {
  let returnString = ''
  const unPrefixedTokens = genTokens(config, true)

  for (const key in unPrefixedTokens) {
    returnString += `'${constants.tokenPrefix}${key}' |`
  }

  return returnString.slice(0, -1).trim()
}

export function genTypescriptCode(config: Record<string, any>) {
  const templateLiterals = getTemplateLiterals(config)

  return `export type Token = ${templateLiterals};`
}
