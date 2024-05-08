import { presetSunrise } from '@vtex/shoreline'

const tokenPrefix = '--sl-'

export function getFoundationTokens(foundation: Foundation) {
  const tokens = Object.keys(presetSunrise)

  const foundationTokens = tokens.filter((token) => {
    if (foundation === 'border') {
      return token.includes(foundation) && !token.includes('radius')
    }

    const resolvedFoundation = resolveFoundation(token, foundation)

    return token.includes(resolvedFoundation)
  })

  if (foundation === 'typography') {
    console.log(sanitizeTypographyTokens(foundationTokens))
    return sanitizeTypographyTokens(foundationTokens)
  }

  return foundationTokens
}

function sanitizeTypographyTokens(tokens: string[]) {
  return tokens.reduce((acc: string[], token) => {
    if (!token.startsWith(`${tokenPrefix}text`)) {
      const draft = acc
      draft.push(token)
      return draft
    }

    const [sanitizedToken] = token.endsWith('letter-spacing')
      ? token.split('-letter-spacing')
      : token.split('-font')

    if (acc.includes(sanitizedToken)) return acc

    const draft = acc
    draft.push(sanitizedToken)
    return draft
  }, [])
}

export function getTokenValues(
  token: string,
  foundation: Foundation,
  theme = presetSunrise
) {
  const resolvedFoundation = resolveFoundation(token, foundation)

  const name = token.replace(tokenPrefix, '$')

  const value =
    resolvedFoundation === 'text' ? getTextValue(token) : theme[token]

  return {
    name,
    variable: token,
    value,
    foundation: resolvedFoundation,
  }
}

function getTextValue(token: string, theme = presetSunrise) {
  console.log({
    token,
  })
  const { font, letterSpacing } = {
    font: theme[`${token}-font`],
    letterSpacing: theme[`${token}-letter-spacing`],
  }

  return `font: ${font};\n letter-spacing: ${letterSpacing};`
}

const derivedFoundations: Record<string, Foundation[]> = {
  typography: [
    'font-size',
    'font-weight',
    'letter-spacing',
    'line-height',
    'text',
  ],
  elevation: ['z', 'focus-ring', 'shadow'],
}

export function resolveFoundation(token: string, foundation: Foundation) {
  if (derivedFoundations[foundation]) {
    const derivedFoundation = derivedFoundations[foundation] ?? []

    const [resolvedFoundation] = derivedFoundation.filter((derivedToken) =>
      token.startsWith(`${tokenPrefix}${derivedToken}`)
    )

    return resolvedFoundation
  }

  return foundation
}

export type Foundation =
  | 'color'
  | 'bg'
  | 'fg'
  | 'space'
  | 'border'
  | 'radius'
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
  | 'line-height'
