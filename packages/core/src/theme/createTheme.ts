const toVarName = (key: string) => `--onda-${key}`
const toVarValue = (key: string) => `var(${toVarName(key)})`
const join = (...args: Array<string | undefined>) =>
  args.filter(Boolean).join('-')

export interface ThemeOptions {
  disableCSSVariables?: boolean
}

export type BaseTheme<T> = T & {
  global: any
}

export function createTheme<Theme extends Record<string, any>>(
  config: Theme,
  options?: ThemeOptions
): [BaseTheme<Theme>, Record<string, any>] {
  if (!config)
    return [
      {
        global: {},
      } as BaseTheme<Theme>,
      {},
    ]

  const { global = {}, ...strictTheme } = config

  if (options?.disableCSSVariables)
    return [{ global, ...strictTheme } as BaseTheme<Theme>, {}]

  const theme = toCustomProperties(strictTheme)
  const cssVariables = objectToVars(strictTheme)

  return [{ global, ...theme } as BaseTheme<Theme>, cssVariables]
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
