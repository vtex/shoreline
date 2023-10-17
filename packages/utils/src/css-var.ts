import { constants } from './constants'
import { isToken, cleanTokenString } from './token'
import { isStringEmpty } from './is-types'

/**
 * Returns a token as css variable
 */
export function cssVar(props: CssVarProps): string {
  const { token, deepSearch = false, prefix = constants.dsPrefix } = props

  if (!token || isStringEmpty(token)) {
    return constants.emptyString
  }

  if (deepSearch) {
    return _deepParse(token, prefix)
  }

  return tokenToVar(token, prefix)
}

function tokenToVar(token: string, prefix: string): string {
  if (!isToken(token)) {
    return token
  }

  const cleanedToken = cleanTokenString(token)

  if (cleanedToken.endsWith(constants.comma)) {
    return `var(--${prefix}-${cleanedToken.slice(0, -1)}),`
  }

  return `var(--${prefix}-${cleanedToken})`
}

function _deepParse(token: string, prefix: string): string {
  const tokenizedValues = token
    .trim()
    .split(constants.whiteSpace)
    .map((value: string) => {
      return tokenToVar(value, prefix)
    })

  return tokenizedValues.join(constants.whiteSpace)
}

interface CssVarProps {
  /**
   * Value of the foundation
   */
  token: string
  /**
   * Search for the entire string
   * @default false
   */
  deepSearch?: boolean
  /**
   * Prefix of the variable
   * @default 'sl'
   */
  prefix?: string
}
