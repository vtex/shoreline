import { get, callOrReturn } from '@vtex/admin-ui-util'

import type { Plugin, Rule } from '../plugin'
import { getTransforms } from '../plugin'

/**
 * Builds transforms of all plugins
 * @param theme
 * @param plugins
 */
export function buildTransforms<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Array<Plugin<Theme>>
) {
  return function hydrateTransform(prop: string) {
    const transformations = plugins
      .map((plugin) => getTransforms(plugin))
      .reduce(
        (acc, callbackRule) => ({
          ...acc,
          ...callOrReturn(callbackRule, theme),
        }),
        {}
      ) as Record<string, any>

    const transformOrGet = get(transformations, prop, get)

    function transform(rule: Rule, token: any) {
      return typeof transformOrGet === 'function'
        ? transformOrGet(rule, token, token)
        : transformOrGet
    }

    return {
      value: transformations,
      exec: transform,
    }
  }
}
