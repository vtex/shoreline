import { Plugin } from './createPlugin'
import { get } from './util'

export function createRules<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin[]
) {
  const rules = plugins
    .map((p) => p.onCreateRule)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(),
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
