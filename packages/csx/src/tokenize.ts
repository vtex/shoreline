import { cleanTokenString } from './clean-token-string'
import { SPACE } from './constants'
import { cssVar } from './css-var'
import { isToken } from './is-token'
import type { Foundation } from './types'

export function tokenize(prop: Foundation, plainString: string): string {
  const tokenizedValues = plainString
    .trim()
    .split(SPACE)
    .map((value: string) => {
      const trimmedValue = value.trim()

      if (isToken(trimmedValue)) {
        const token = cleanTokenString(trimmedValue)

        return cssVar(prop, token)
      }

      return trimmedValue
    })

  return tokenizedValues.join(SPACE)
}
