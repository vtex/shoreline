import { pick, omit, get, merge } from '@vtex/admin-ui-util'

const constants = {
  /**
   * When converting tokens with those namespaces to CSS Variables, the algorithm will look
   * to the color values and replace all usage of arbitrary values with their corresponding color variable.
   */
  colorNamespaces: ['bg', 'border', 'fg', 'shadows'],
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
    }[data-theme='${mode}'] { ${Object.keys(cssVariables[mode]).reduce(
      (variables, variable) => {
        return `${variables} ${variable}: ${cssVariables[mode][variable]};`
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

/**
 * Return the custom theme which will override the initial theme.
 * The custom theme will be loaded from the admin-ui.config.js file found in the project.
 */
export function getCustomTheme(
  configPath = 'admin-ui.config.js'
): Record<string, any> {
  let customTheme = {}

  try {
    // eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { theme } = require(`${process.cwd()}/${configPath}`)

    customTheme = theme
  } catch (err) {
    console.log('There is no theme config file')
  }

  return customTheme
}

/**
 * Merge deeply two theme objects, overriding the initial theme props by the other one props.
 * @example
 * mergeThemes(
 * {
 *  colors: {
 *    background: 'blue',
 *    fg: 'black',
 *    text: 'black',
 *  },
 * },
 * {
 *  colors: {
 *    background: 'red',
 *    fg: 'red'
 *  }
 * })
 *
 * // returns:
 * {
 *  colors: {
 *    background: 'red',
 *    fg: 'red',
 *    text: 'black',
 *  }
 * }
 */
export function mergeThemes(
  initialTheme: Record<string, any>,
  customTheme: Record<string, any>
): Record<string, any> {
  const mergedTheme = merge(initialTheme, customTheme)

  // When global styles are disabled: '{ global: {} }'
  if (customTheme.global && Object.keys(customTheme.global).length === 0) {
    mergedTheme.global = customTheme.global
  }

  return mergedTheme
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

/**
 * Returns the value as a CSS Variable if it matches a value from the colors theme, otherwise it will return the arbitrary value.
 * @example
 * const theme = {
 *   colors: {
 *     black: '#000'
 *   },
 *   fg: {
 *     primary: '#000',
 *     secondary: '#dedede',
 *   }
 * }
 *
 * resolveValue('#000', 'fg', theme)
 * // returns: var(--admin-ui-colors-black)
 *
 * resolveValue('#dedede', 'fg', theme)
 * // returns: #dedede
 */
function resolveValue(value: any, ruleId: string, theme: Record<string, any>) {
  if (!constants.colorNamespaces.includes(ruleId)) return value

  const colors = get(theme, 'colors', {})

  const colorsKeys = Object.keys(colors)

  let result = value

  colorsKeys.forEach((key) => {
    const colorValue = get(colors, key)

    if (result.includes(colorValue)) {
      result = result.replaceAll(colorValue, toVarValue(`colors-${key}`))
    }
  })

  return result
}

/**
 * Parses a theme recursively to css variables, joining the paths
 * @example
 * generateVars({
 *  colors: {
 *    blue: 'blue',
 *    yellow: 'yellow'
 *  },
 *  bg: {
 *    primary: colors.blue40,
 *    secondary: colors.yellow40
 *  }
 * })
 *
 * // returns:
 * {
 *   '--admin-ui-colors-blue': 'blue',
 *   '--admin-ui-colors-yellow': 'yellow',
 *   '--admin-ui-bg-primary': 'var(--admin-ui-colors-blue)',
 *   '--admin-ui-bg-secondary': 'var(--admin-ui-colors-yellow)',
 * }
 */
export function generateVars<T>(node: T, theme = {}, ruleId = '', accKey = '') {
  const vars: Record<string, object> = {}

  const isRoot = !accKey
  const initialTheme = isRoot ? node : theme

  for (const key in node) {
    const rule = isRoot ? key : ruleId
    const name = join(accKey, key)
    const value = node[key]

    if (value && typeof value === 'object') {
      Object.assign(vars, generateVars(value, initialTheme, rule, name))
    } else {
      Object.assign(vars, {
        [toVarName(name)]: resolveValue(value, rule, initialTheme),
      })
    }
  }

  return vars
}
