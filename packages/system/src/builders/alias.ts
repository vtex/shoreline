import { Plugin } from '../plugin/types'

export function buildAlias<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((p) => p.steps.alias)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(theme),
      }),
      {}
    ) as Record<string, string>

  function alias(prop: string) {
    return collection?.[prop] ?? prop
  }

  return {
    value: collection,
    exec: alias,
  }
}
