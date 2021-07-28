import { merge, pick, callOrReturn } from '@vtex/onda-util'

import type { Plugin } from '../plugin'
import { getEntries, getNamespaces } from '../plugin'

/**
 * Builds entries of all plugins
 * @param theme
 * @param plugins
 */
export function buildEntries<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Array<Plugin<Theme>>
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
    ) as Array<Record<string, any>>

  function exec(theme: Theme) {
    return merge(theme, collection)
  }

  return {
    value: collection,
    exec,
  }
}
