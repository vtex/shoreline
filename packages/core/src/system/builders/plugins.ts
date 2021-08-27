import invariant from 'tiny-invariant'
import { flatMap, hasDuplicates } from '@vtex/admin-ui-util'

import type { StepsInstance, Plugin } from '../plugin'
import { getNamespaces } from '../plugin'
import { buildAliases } from './aliases'
import { buildRules } from './rules'
import { buildSplits } from './splits'
import { buildTransforms } from './transforms'

/**
 * Builds plugins calling the entries, aliases, rules, splits and transforms builders.
 * @param theme
 * @param plugins
 */
export function buildPlugins<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Array<Plugin<Theme>>
): StepsInstance {
  invariant(areNamespacesUnique(plugins), 'Plugins cannot share namespaces.')

  return {
    aliases: buildAliases(theme, plugins),
    rules: buildRules(theme, plugins),
    splits: buildSplits(theme, plugins),
    transforms: buildTransforms(theme, plugins),
  }
}

/**
 * Checks if namespaces are unique among plugins
 * @param plugins
 */
function areNamespacesUnique(plugins: Array<Plugin<any>>) {
  const namespaces = flatMap(plugins, (plugin) => getNamespaces(plugin))

  return !hasDuplicates(namespaces)
}
