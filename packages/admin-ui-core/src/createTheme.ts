import { pick, omit, get } from '@vtex/admin-ui-util'

const constants = {
  /**
   * The theme parsing algorithm will ignore theese entries
   * As we make the tokens stable, we can remove some values here
   */
  reservedNamespaces: [
    'global',
    'modes',
    'shadows',
    'sizes',
    'space',
    'breakpoints',
    'transitions',
    'fonts',
    'fontSizes',
    'border',
    'zIndices',
    'fontSettings',
    'lineHeights',
    'borderRadius',
  ],
  /**
   * Design system prefix
   */
  prefix: 'admin-ui',
  /**
   * how the default mode should be called
   */
  mainModeLabel: 'main',
  /**
   * Element that will store the modes
   */
  rootElement: 'body',
}

/**
 * Creates the css variable definition
 * @example
 * toVarName('blue') // => '--admin-ui-blue'
 */
const toVarName = (key: string) => `--${constants.prefix}-${key}`

/**
 * Creates the css variable consumption
 * @example
 * toVarValue('blue') // => 'var(--admin-ui-blue)'
 * toVarValue('blue', '#3cf') // => 'var(--admin-ui-blue, #3cf)'
 *
 */
const toVarValue = (key: string, fallback?: any) =>
  `var(${toVarName(key)}${fallback ? `, ${fallback}` : ''})`

/**
 * Joins the arguments with dashes
 * @param args strings
 * @example
 * join('a', 'b' 'c') // => 'a-b-c'
 */
const join = (...args: Array<string | undefined>) =>
  args.filter(Boolean).join('-')

export interface ThemeOptions {
  enableModes?: boolean
}

export type BaseTheme<T> = T & {
  global: any
}

export type CSSVariables = Record<string, Record<string, any>>

export interface CreateThemeReturn<T> {
  theme: BaseTheme<T>
  cssVariables: CSSVariables
  rootStyleString: string
  rootStyleObject: Record<string, any>
}

function splitTheme(theme: Record<string, any>) {
  const dynamicTheme = omit(theme, constants.reservedNamespaces)
  const staticTheme = pick(theme, constants.reservedNamespaces)

  return {
    dynamicTheme,
    staticTheme,
  }
}

function createRootStylesAsString(cssVariables: CSSVariables) {
  return Object.keys(cssVariables).reduce((stylesheets, mode) => {
    return `${stylesheets} ${
      constants.rootElement
    }[data-theme='${mode}'] { ${Object.keys(cssVariables?.[mode] ?? []).reduce(
      (variables, variable) => {
        return `${variables} ${variable}: ${
          cssVariables?.[mode]?.[variable] ?? ''
        };`
      },
      ''
    )} };`
  }, '')
}

function createRootStylesAsObject(cssVariables: CSSVariables) {
  return Object.keys(cssVariables).reduce((acc, mode) => {
    return {
      ...acc,
      [`${constants.rootElement}[data-theme='${mode}']`]: cssVariables[mode],
    }
  }, {})
}

export function createTheme<T extends Record<string, any>>(
  initialTheme: T,
  options?: ThemeOptions
): CreateThemeReturn<T> {
  if (!initialTheme)
    return {
      theme: {
        global: {},
      } as BaseTheme<T>,
      cssVariables: {},
      rootStyleString: '',
      rootStyleObject: {},
    }

  const global = get(initialTheme, 'global', {})

  if (!options?.enableModes) {
    return {
      theme: { global, ...initialTheme } as BaseTheme<T>,
      cssVariables: {},
      rootStyleString: '',
      rootStyleObject: {},
    }
  }

  const { staticTheme, dynamicTheme } = splitTheme(initialTheme)
  const modes = get(staticTheme, 'modes', {})

  const theme = toCustomProperties(dynamicTheme)

  const cssVariables: CSSVariables = {
    [constants.mainModeLabel]: objectToVars(dynamicTheme),
    ...Object.keys(modes).reduce((acc, mode) => {
      return {
        ...acc,
        [mode]: objectToVars(modes[mode]),
      }
    }, {}),
  }

  const rootStyleString = createRootStylesAsString(cssVariables)
  const rootStyleObject = createRootStylesAsObject(cssVariables)

  return {
    theme: { global, ...theme, ...staticTheme } as BaseTheme<T>,
    cssVariables,
    rootStyleString,
    rootStyleObject,
  }
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
  obj: Record<string, any> | undefined,
  parent?: string
) {
  const next: Record<string, any> = Array.isArray(obj) ? [] : {}

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
export function objectToVars(obj: Record<string, any>, parent = '') {
  let vars: Record<string, object> = {}

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
