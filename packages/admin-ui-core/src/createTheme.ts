import { omit, get, merge } from '@vtex/admin-ui-util'
import { styles } from './styles'

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
  reservedNamespaces: ['global', 'modes'],
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
 * Return the custom style config with the theme which will override the initial theme.
 * The custom style cofnig will be loaded from the admin-ui.config.js file found in the project.
 */
export function getCustomConfig(
  configPath = 'admin-ui.config.js'
): Record<string, any> {
  let customConfig = { disableGlobalStyles: false, theme: {} }

  try {
    // eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    customConfig = require(`${process.cwd()}/${configPath}`)
  } catch (err) {
    console.log('There is no theme config file')
  }

  return customConfig
}

/**
 * Return the initial theme without the initial global style based on the boolean param initialGlobalStylesDisabled.
 * @param initialTheme theme
 * @param isGlobalDisabled boolean to indicate the global style removal
 * @example
 * resolveGlobal(
 * {
 *  global: {
 *    body: {
 *      display: 'block',
 *    }
 *  },
 *  colors: {
 *    background: 'blue',
 *    fg: 'black',
 *    text: 'black',
 *  },
 * },
 * true)
 *
 * // returns:
 * {
 *  global: {},
 *  colors: {
 *    background: 'blue',
 *    fg: 'black',
 *    text: 'black',
 *  },
 * }
 */
export function resolveGlobal(
  initialTheme: Record<string, any>,
  isGlobalDisabled = false
): Record<string, any> {
  return isGlobalDisabled ? omit(initialTheme, ['global']) : initialTheme
}

function resolveThemeConfig(initialTheme: Record<string, any>) {
  const { theme: customTheme, disableGlobalStyles = false } = getCustomConfig()

  const updatedInitialTheme = resolveGlobal(initialTheme, disableGlobalStyles)

  return merge(updatedInitialTheme, customTheme)
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

  if (!options?.enableModes) {
    return {
      theme: initialTheme as BaseTheme<T>,
      cssVariables: {},
      rootStyleString: '',
      rootStyleObject: {},
    }
  }

  const theme = resolveThemeConfig(initialTheme)

  const dynamicTheme = omit(theme, constants.reservedNamespaces)

  const modes = get(dynamicTheme, 'modes', {})

  const cssVariables: CSSVariables = {
    [constants.mainModeLabel]: generateVars(dynamicTheme),
    ...Object.keys(modes).reduce((acc, mode) => {
      return {
        ...acc,
        [mode]: generateVars(modes[mode]),
      }
    }, {}),
  }

  const rootStyleString = createRootStylesAsString(cssVariables)
  const rootStyleObject = createRootStylesAsObject(cssVariables)

  return {
    theme: theme as BaseTheme<T>,
    cssVariables,
    rootStyleString,
    rootStyleObject,
  }
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

export function generateCssObject<T>(initialTheme: T) {
  const { theme, cssVariables } = createTheme<T>(initialTheme, {
    enableModes: true,
  })

  const global = generateVars(theme.global ? styles(theme.global, theme) : {})

  console.log(global)

  return { ...cssVariables, ...global }
}
