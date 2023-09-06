import { theme } from '../../shoreline/theme'

export function getFoundationTokens(foundation: Foundation) {
  const tokens = Object.keys(theme)

  return tokens.filter((token) => {
    if (foundation === 'border') {
      return token.includes(foundation) && !token.includes('radius')
    }

    const resolvedFoundation = resolveFoundation(token, foundation)

    if (resolvedFoundation === 'text') {
      return !derivedFoundations.typography.some((derivedFoundation) => {
        if (derivedFoundation === 'text') return false

        return token.includes(derivedFoundation)
      })
    }

    return token.includes(resolvedFoundation)
  })
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
    const derivedFoundation = derivedFoundations[foundation] ?? []

    const [resolvedFoundation] = derivedFoundation.filter((derivedToken) =>
      token.startsWith(`$${derivedToken}`)
    )

    return resolvedFoundation
  }

  return foundation
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
  | 'breakpoint'
