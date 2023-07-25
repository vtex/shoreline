import { constants } from './constants'
import { isToken, cleanTokenString, isStringEmpty } from './token'

/**
 * Returns a token as css variable
 */
export function cssVar(props: CssVarProps): string {
  const { token, deepSearch = false } = props

  if (!token || isStringEmpty(token)) {
    return constants.emptyString
  }

  if (deepSearch) {
    return _deepParse(token)
  }

  return tokenToVar(token)
}

function tokenToVar(token: string): string {
  if (!isToken(token)) {
    return token
  }

  return `var(--${constants.dsPrefix}-${cleanTokenString(token)})`
}

function _deepParse(token: string): string {
  const tokenizedValues = token
    .trim()
    .split(constants.whiteSpace)
    .map((value: string) => {
      return tokenToVar(value)
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
}
