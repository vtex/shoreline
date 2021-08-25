import { callOrReturn } from '@vtex/onda-util'

import type { Plugin } from '../plugin'
import { getSplits } from '../plugin'

/**
 * Builds slipts of all plugins
 * @param theme
 * @param plugins
 */
export function buildSplits<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Array<Plugin<Theme>>
) {
  const collection = plugins
    .map((plugin) => getSplits(plugin))
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callOrReturn(callbackRule, theme),
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
