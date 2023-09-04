import { theme } from '../../shoreline/theme'

export function getFoundationTokens(foundation: Foundation) {
  const tokens = Object.keys(theme)

  return tokens.filter((token) =>
    token.includes(resolveFoundation(token, foundation))
  )
}

export function getTokenValues(token: string, foundation: Foundation) {
  return {
    name: token,
    variable: token.replace('$', '--sl-'),
    value: theme[token],
    foundation: resolveFoundation(token, foundation),
  }
}

const derivedFoundations: Record<string, Foundation[]> = {
  typography: ['font-size', 'font-weight', 'letter-spacing', 'text'],
  elevation: ['z', 'focus-ring', 'shadow'],
}

export function resolveFoundation(token: string, foundation: Foundation) {
  if (derivedFoundations[foundation]) {
    const derivedTokenValue = derivedFoundations[foundation] ?? []

    const [resolvedFoundation] = derivedTokenValue.filter((derivedToken) =>
      token.startsWith(`$${derivedToken}`)
    )

    return resolvedFoundation
  }

  return foundation
}

export function getElevationTokens(token: string, foundation: Foundation) {
  return token.includes(foundation)
}

export type Foundation =
  | 'color'
  | 'space'
  | 'border'
  | 'border-radius'
  | 'typography'
  | 'elevation'
  | 'shadow'
  | 'focus'
  | 'z'
  | 'font-size'
  | 'font-weight'
  | 'letter-spacing'
  | 'focus-ring'
  | 'text'
