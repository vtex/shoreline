import { Plugin } from '../plugin'

export function buildSplit<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((p) => p.onSplit)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(theme),
      }),
      {}
    ) as Record<string, string[]>

  function split(prop: string, value: any) {
    const entries = collection[prop]

    return entries.reduce(
      (acc, entry) => ({
        ...acc,
        [entry]: value,
      }),
      {}
    )
  }

  return {
    value: collection,
    exec: split,
  }
}
