import { Plugin } from '../types'
import { get } from '@vtex/onda-util'

export function buildRule<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const rules = plugins
    .map((p) => p.steps.rule)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(theme),
      }),
      {}
    ) as Record<string, string>

  function findRule(prop: string) {
    const ruleId = prop in rules ? rules[prop] : undefined
    return ruleId ? theme?.[ruleId] : get(theme, prop, {})
  }

  return {
    value: rules,
    exec: findRule,
  }
}
