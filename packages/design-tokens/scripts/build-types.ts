import { outputFile } from './script-utils'
import { tokens } from '../src/tokens'
import { transformTokens } from '../src/transform-tokens'
import { constants } from '@vtex/shoreline-utils'

function asTemplateLiterals(tokens: any) {
  let returnString = ''
  const unPrefixedTokens = transformTokens(tokens, true)

  for (const key in unPrefixedTokens) {
    returnString += `'${constants.tokenPrefix}${key}' |`
  }

  return returnString.slice(0, -1).trim()
}

const literals = asTemplateLiterals(tokens)

outputFile({
  path: 'dist/vtex-shoreline-design-tokens.cjs.d.ts',
  code: Buffer.from(`export type Token = ${literals};`),
  successMessage: '🏆 Generated type definitions',
})
