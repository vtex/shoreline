import type { ShorelineConfig } from '@vtex/shoreline-utils'
import { toVar, parseTokens } from '@vtex/shoreline-utils'

export function tokensToDictionary(config: ShorelineConfig) {
  const { tokens = {}, prefix } = config

  const res: Record<string, string> = {}
  const unprefixedTokens = parseTokens({
    tokens,
    prefix,
    unprefixed: true,
  })

  for (const prop in unprefixedTokens) {
    const key = toPascalCase(prop)

    res[key] = `var(${toVar(prop)})`
  }

  return res
}

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

function clearAndUpper(text: string) {
  return text.replace(/-/, '').toUpperCase()
}
