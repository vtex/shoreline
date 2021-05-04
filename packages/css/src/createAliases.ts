import { Plugin } from './createPlugin'

export function createAliases<Theme>(theme: Theme, plugins: Plugin[]) {
  const collection = plugins
    .map((p) => p.onCreateAlias)
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
