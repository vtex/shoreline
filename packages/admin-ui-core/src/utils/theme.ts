import type { AnyObject } from '@vtex/admin-ui-util'
import { constants } from './constants'
import { join } from './string'

export interface ThemeSection {
  raw: AnyObject
  css: AnyObject
  vars: AnyObject
}

export function createThemeSection(name: string, raw: AnyObject): ThemeSection {
  return {
    raw,
    css: toCustomProperties(raw, name),
    vars: objectToVars(raw, name),
  }
}

export function createTheme(
  themeSections: Record<string, ThemeSection>,
  options: AnyObject
): { theme: AnyObject; cssVars: AnyObject } {
  const { enableCSSVariables } = options
  const { global, breakpoints, ...base } = themeSections

  const theme: AnyObject = {}
  const cssVars: AnyObject = {}

  console.log({
    themeSections,
  })

  console.log({
    base,
  })

  Object.keys(base).forEach((sectionKey) => {
    const { raw, css, vars } = base[sectionKey]

    if (enableCSSVariables) {
      theme[sectionKey] = css
      Object.assign(cssVars, vars)
    } else {
      theme[sectionKey] = raw
    }
  })

  console.log({
    theme,
  })

  console.log({
    cssVars,
  })

  return {
    theme: { global, breakpoints, ...theme },
    cssVars,
  }
}

/**
 * Creates the css variable definition
 * @example
 * toVarName('blue') // => '--admin-ui-blue'
 */
export function toVarName(key: string): string {
  return `--${constants.designSystemPrefix}-${key}`
}

/**
 * Creates the css variable consumption
 * @example
 * toVarValue('blue') // => 'var(--admin-ui-blue)'
 * toVarValue('blue', '#3cf') // => 'var(--admin-ui-blue, #3cf)'
 *
 */
export function toVarValue(key: string, fallback?: any): string {
  return `var(${toVarName(key)}${fallback ? `, ${fallback}` : ''})`
}

/**
 * Parses an object recursivelly to css variables, joining the paths
 * @example
 * objectToVars({
 *  colors: {
 *    background: 'black',
 *    text: 'yellow'
 *  }
 * })
 *
 * // returns:
 * {
 *  colors: {
 *    background: 'var(--admin-ui-colors-background, black)',
 *    color: 'var(--admin-ui-colors-text, yellow)',
 *  }
 * }
 */
export function toCustomProperties(
  obj: AnyObject | undefined,
  parent?: string
): AnyObject {
  const next: AnyObject = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    const value = obj[key]
    const name = join(parent, key)

    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name)
      continue
    }

    next[key] = toVarValue(name)
  }

  return next
}

/**
 * Parses an object recursivelly to css variables, joining the paths
 * @example
 * objectToVars({
 *  colors: {
 *    background: 'black',
 *    text: 'yellow'
 *  }
 * })
 *
 * // returns:
 * {
 *   '--admin-ui-colors-background': 'black',
 *   '--admin-ui-colors-text': 'yellow'
 * }
 */
export function objectToVars(obj: AnyObject, parent = '') {
  let vars: AnyObject = {}

  for (const key in obj) {
    const name = join(parent, key)
    const value = obj[key]

    if (value && typeof value === 'object') {
      vars = {
        ...vars,
        ...objectToVars(value, name),
      }
    } else {
      vars[toVarName(name)] = value
    }
  }

  return vars
}
