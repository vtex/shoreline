import { theme } from '../../shoreline/theme'

export function getFoundationTokens(foundation: Foundation) {
  const tokens = Object.keys(theme)

  const foundationTokens = tokens.filter((token) => {
    if (foundation === 'border') {
      return token.includes(foundation) && !token.includes('radius')
    }

    const resolvedFoundation = resolveFoundation(token, foundation)

    return token.includes(resolvedFoundation)
  })

  if (foundation === 'typography') {
    return sanitizeTypographyTokens(foundationTokens)
  }

  return foundationTokens
}

function sanitizeTypographyTokens(tokens: string[]) {
  return tokens.reduce((acc: string[], token) => {
    if (!token.startsWith('$text')) return [...acc, token]

    const [sanitizedToken] = token.endsWith('letter-spacing')
      ? token.split('-letter-spacing')
      : token.split('-font')

    if (acc.includes(sanitizedToken)) return acc

    return [...acc, sanitizedToken]
  }, [])
}

export function getTokenValues(token: string, foundation: Foundation) {
  const resolvedFoundation = resolveFoundation(token, foundation)

  const variable = token.replace('$', '--sl-')
  const value =
    resolvedFoundation === 'text' ? `var(${variable})` : theme[token]

  return {
    name: token,
    variable,
    value,
    foundation: resolvedFoundation,
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
