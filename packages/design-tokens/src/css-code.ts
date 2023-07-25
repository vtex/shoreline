import cssesc from 'cssesc'
import { tokens } from './tokens'
import { cssVar } from './css-var'

const toVar = (value: string) => `--sl-${value}`

function flattenObj(object: Record<string, any>) {
  const result: Record<string, any> = {}

  for (const i in object) {
    if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
      const temp = flattenObj(object[i])

      for (const j in temp) {
        if (j === '*') {
          result[`${i}`] = temp[j]
        } else {
          result[`${i}-${j}`] = temp[j]
        }
      }
    } else {
      result[i] = object[i]
    }
  }

  return result
}

function transformTheme(theme: Record<string, any>) {
  theme = flattenObj(theme)

  const res: Record<string, any> = {}

  for (const key in theme) {
    const token = theme[key as keyof typeof theme]

    res[toVar(key)] = cssVar({ token, deepSearch: true })
  }

  return res
}

const theme = transformTheme(tokens)

function renderCSS(object: Record<string, any>) {
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

export const cssCode = renderCSS(theme)
