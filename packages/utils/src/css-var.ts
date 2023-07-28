import { constants } from './constants'
import { isToken, cleanTokenString, isStringEmpty } from './token'

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

  return `var(--${prefix}-${cleanTokenString(token)})`
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
