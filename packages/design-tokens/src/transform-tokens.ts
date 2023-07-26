import { constants, cssVar, flattenObject } from '@vtex/shoreline-utils'

const toVar = (value: string) => `--${constants.dsPrefix}-${value}`

export function transformTokens(theme: Record<string, any>) {
  theme = flattenObject(theme)

  const res: Record<string, any> = {}

  for (const key in theme) {
    const token = theme[key as keyof typeof theme]

    res[toVar(key)] = cssVar({ token, deepSearch: true })
  }

  return res
}
