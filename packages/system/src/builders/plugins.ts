import invariant from 'tiny-invariant'
import { flatMap, hasDuplicates } from '@vtex/onda-util'

import { getNamespaces, StepsInstance, Plugin } from '../plugin'
import { buildAliases } from './aliases'
import { buildEntries } from './entries'
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
  plugins: Plugin<Theme>[]
): StepsInstance {
  const themeBuilderInstance = buildEntries(theme, plugins)
  const themeAfterBuild = themeBuilderInstance.exec(theme)

  invariant(areNamespacesUnique(plugins), 'Plugins cannot share namespaces.')

  return {
    entries: themeBuilderInstance,
    aliases: buildAliases(themeAfterBuild, plugins),
    rules: buildRules(themeAfterBuild, plugins),
    splits: buildSplits(themeAfterBuild, plugins),
    transforms: buildTransforms(themeAfterBuild, plugins),
  }
}

/**
 * Checks if namespaces are unique among plugins
 * @param plugins
 */
function areNamespacesUnique(plugins: Plugin<any>[]) {
  const namespaces = flatMap(plugins, (plugin) => getNamespaces(plugin))

  return !hasDuplicates(namespaces)
}
