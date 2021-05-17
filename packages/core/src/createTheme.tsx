const toVarName = (key: string) => `--onda-${key}`
const toVarValue = (key: string) => `var(${toVarName(key)})`
const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-')

const numericProperties = {
  fontWeights: true,
  lineHeights: true,
}

export function asPixel(key: string, value: string | number) {
  if (typeof value !== 'number') return value
  if (numericProperties[key as keyof typeof numericProperties]) return value
  return `${value}px`
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

export function createTheme(draftTheme: Record<string, any>) {
  if (!draftTheme) return [{}, {}]

  const theme = toCustomProperties(draftTheme)
  const cssVariables = objectToVars(draftTheme)

  return [theme, cssVariables]
}
