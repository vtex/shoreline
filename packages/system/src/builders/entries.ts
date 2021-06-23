import { Plugin, getEntries, getNamespaces } from '../plugin'
import { merge, pick, callOrReturn } from '@vtex/onda-util'

/**
 * Builds entries of all plugins
 * @param theme
 * @param plugins
 */
export function buildEntries<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((plugin) => ({
      callback: getEntries(plugin),
      namespaces: getNamespaces(plugin),
    }))
    .reduce(
      (acc, { callback, namespaces }) => ({
        ...acc,
        ...callOrReturn(callback, pick(theme, namespaces) as Partial<Theme>),
      }),
      []
    ) as Record<string, any>[]

  function exec(theme: Theme) {
    return merge(theme, collection)
  }

  return {
    value: collection,
    exec,
  }
}
