import cssesc from 'cssesc'

/**
 * Transform design tokens into css variables
 */
export function renderCssVariables(object: Record<string, any>) {
  let cssString = ''

  for (const key in object) {
    const value = object[key]
    const variable = `${cssesc(key)}: ${cssesc(value)};\n`

    cssString += variable
  }

  return `
  @layer sl-tokens {
    :root {
      ${cssString}
    }
  }
  `
}
