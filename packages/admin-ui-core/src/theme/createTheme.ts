import { pick, omit, get } from '@vtex/admin-ui-util'

const toVarName = (key: string) => `--admin-ui-${key}`
const toVarValue = (key: string) => `var(${toVarName(key)})`
const join = (...args: Array<string | undefined>) =>
  args.filter(Boolean).join('-')

export interface ThemeOptions {
  tokens?: string[]
  disableCSSVariables?: boolean
}

export type BaseTheme<T> = T & {
  global: any
}

export type CSSVariables = Record<string, Record<string, any>>

export interface CreateThemeReturn<T> {
  theme: BaseTheme<T>
  cssVariables: CSSVariables
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
    }

  const { global = {}, ...strictTheme } = initialTheme

  if (options?.disableCSSVariables)
    return {
      theme: { global, ...strictTheme } as BaseTheme<T>,
      cssVariables: {},
    }

  const modes = get(strictTheme, '__modes', {})
  const themeToParse = options?.tokens ? pick(strictTheme, options?.tokens) : {}

  const themeToKeep = options?.tokens
    ? omit(strictTheme, options?.tokens)
    : strictTheme

  const theme = toCustomProperties(themeToParse)
  const cssVariables: CSSVariables = {
    default: objectToVars(themeToParse),
    ...Object.keys(modes).reduce((acc, mode) => {
      return {
        ...acc,
        [mode]: objectToVars(modes[mode]),
      }
    }, {}),
  }

  return {
    theme: { global, ...theme, ...themeToKeep } as BaseTheme<T>,
    cssVariables,
  }
}

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
