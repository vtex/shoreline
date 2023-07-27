import { constants, cssVar, flattenObject } from '@vtex/shoreline-utils'

const toVar = (value: string) => `--${constants.dsPrefix}-${value}`

type CSSVariablesDict = Record<string, string>

/**
 * Transform tokens into a CSSVariablesDict
 */
export function transformTokens(tokens: Record<string, any>): CSSVariablesDict {
  const flatTokens = flattenObject(tokens)
  const result: CSSVariablesDict = {}

  for (const key in flatTokens) {
    const token = flatTokens[key as keyof typeof flatTokens]

    result[toVar(key)] = cssVar({ token, deepSearch: true })
  }

  return result
}
