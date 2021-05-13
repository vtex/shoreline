import { Plugin, StepsInstance } from './types'
import {
  buildAliases,
  buildRules,
  buildSplits,
  buildEntries,
  buildTransforms,
} from '../builders'

export function buildSteps<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
): StepsInstance {
  const themeBuilderInstance = buildEntries(theme, plugins)
  const themeAfterBuild = themeBuilderInstance.exec(theme)
  return {
    entries: themeBuilderInstance,
    aliases: buildAliases(themeAfterBuild, plugins),
    rules: buildRules(themeAfterBuild, plugins),
    splits: buildSplits(themeAfterBuild, plugins),
    transforms: buildTransforms(themeAfterBuild, plugins),
  }
}
