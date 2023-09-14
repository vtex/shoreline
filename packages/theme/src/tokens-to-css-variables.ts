import cssesc from 'cssesc'

const breakpointValues = {
  small: '48rem',
  medium: '64rem',
  large: '90rem',
}

function escapeCss(variableName: string, value: string) {
  return `${cssesc(variableName)}: ${cssesc(value)};\n`
}

function buildCssString(breakpoint: string, cssStyles: string) {
  return cssStyles
    ? `
      @media (min-width: ${breakpoint}) {
        :root {
        ${cssStyles}
        }
      }
`
    : ''
}

export function tokensToCssVariables(object: Record<string, any>) {
  let cssString = ''
  const responsiveCssStrings = {
    small: '',
    medium: '',
    large: '',
  }

  for (const key in object) {
    const value = object[key]

    if (key.match(/-@media-/g)) {
      const baseVariable = key.replace(/-@media-[^-]*/g, '')
      const escapedVar = escapeCss(baseVariable, value)

      if (key.match(/-@media-small/g)) {
        responsiveCssStrings.small += escapedVar
      }

      if (key.match(/-@media-medium/g)) {
        responsiveCssStrings.medium += escapedVar
      }

      if (key.match(/-@media-large/g)) {
        responsiveCssStrings.large += escapedVar
      }
    } else {
      const variable = escapeCss(key, value)

      cssString += variable
    }
  }

  return `
  @layer sl-tokens {
    :root {
      ${cssString}
    }

    ${Object.keys(responsiveCssStrings)
      .map((breakpoint) =>
        buildCssString(
          breakpointValues[breakpoint as keyof typeof breakpointValues],
          responsiveCssStrings[breakpoint as keyof typeof responsiveCssStrings]
        )
      )
      .join('')}

  }
  `
}
