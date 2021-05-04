import { Plugin, StepsInstance } from './types'
import { buildAlias, buildRule, buildSplit, buildTransform } from './builders'

export function buildSteps<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
): StepsInstance {
  return {
    alias: buildAlias(theme, plugins),
    rule: buildRule(theme, plugins),
    split: buildSplit(theme, plugins),
    transform: buildTransform(theme, plugins),
  }
}
