const toVarName = (key: string) => `--onda-${key}`
const toVarValue = (key: string) => `var(${toVarName(key)})`
const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-')

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

  const { global = {}, materials = {}, ...strictTheme } = config

  if (options?.disableCSSVariables)
    return [{ global, ...strictTheme, ...materials } as BaseTheme<Theme>, {}]

  const theme = toCustomProperties(strictTheme)
  const cssVariables = objectToVars(strictTheme)

  return [{ global, ...theme, ...materials } as BaseTheme<Theme>, cssVariables]
}

export function toCustomProperties(
  obj: Record<string, any> | undefined,
  parent?: string
) {
  const next: Record<string, any> = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
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

export function objectToVars(obj: Record<string, any>, parent: string = '') {
  let vars: Record<string, object> = {}

  for (let key in obj) {
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

export function applyCSSVariables(props: Record<string, any>) {
  const root = document.documentElement

  Object.keys(props).map((prop) => {
    root.style.setProperty(prop, props[prop])
  })
}
