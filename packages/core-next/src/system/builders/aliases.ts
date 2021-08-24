import { callOrReturn } from '@vtex/onda-util'

import type { Plugin } from '../plugin'
import { getAliases } from '../plugin'

/**
 * Builds aliases of all plugins
 * @param theme
 * @param plugins
 */
export function buildAliases<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Array<Plugin<Theme>>
) {
  const collection = plugins
    .map((plugin) => getAliases(plugin))
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callOrReturn(callbackRule, theme),
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
