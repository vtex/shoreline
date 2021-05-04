import { Plugin } from '../plugin'
import { get } from '../util'

export function buildRule<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const rules = plugins
    .map((p) => p.onCreateRule)
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
