import { Plugin, StepsInstance } from './types'
import {
  buildAlias,
  buildRule,
  buildSplit,
  buildTheme,
  buildTransform,
} from '../builders'

export function buildSteps<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
): StepsInstance {
  const themeBuilderInstance = buildTheme(theme, plugins)
  const themeAfterBuild = themeBuilderInstance.exec(theme)
  return {
    theme: themeBuilderInstance,
    alias: buildAlias(themeAfterBuild, plugins),
    rule: buildRule(themeAfterBuild, plugins),
    split: buildSplit(themeAfterBuild, plugins),
    transform: buildTransform(themeAfterBuild, plugins),
  }
}
