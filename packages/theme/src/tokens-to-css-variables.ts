import cssesc from 'cssesc'

const breakpointValues = {
  small: '48rem',
  medium: '64rem',
  large: '90rem',
}

export function tokensToCssVariables(object: Record<string, any>) {
  let cssString = ''
  const responsiveStyles = {
    small: '',
    medium: '',
    large: '',
  }

  for (const key in object) {
    const value = object[key]

    if (key.match(/-@media-/g)) {
      const baseVariable = key.replace(/-@media-[^-]*/g, '')

      if (key.match(/-@media-small/g)) {
        const variable = `${cssesc(baseVariable)}: ${cssesc(value)};\n`

        responsiveStyles.small += variable
      }

      if (key.match(/-@media-medium/g)) {
        const variable = `${cssesc(baseVariable)}: ${cssesc(value)};\n`

        responsiveStyles.medium += variable
      }

      if (key.match(/-@media-large/g)) {
        const variable = `${cssesc(baseVariable)}: ${cssesc(value)};\n`

        responsiveStyles.large += variable
      }
    } else {
      const variable = `${cssesc(key)}: ${cssesc(value)};\n`

      cssString += variable
    }
  }

  return `
  @layer sl-tokens {
    :root {
      ${cssString}
    }

    ${Object.keys(responsiveStyles)
      .map((breakpoint) =>
        responsiveStyles[breakpoint as keyof typeof responsiveStyles]
          ? `
        @media (min-width: ${
          breakpointValues[breakpoint as keyof typeof breakpointValues]
        }) {
          :root {
            ${responsiveStyles[breakpoint as keyof typeof responsiveStyles]}
          }
        }
      `
          : ''
      )
      .join('')}

  }
  `
}
