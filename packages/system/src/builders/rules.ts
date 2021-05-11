import { Plugin } from '../plugin/types'
import { get } from '@vtex/onda-util'
import { callOrReturn } from './util'

export function buildRules<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const rules = plugins
    .map((p) => p.steps.rules)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callOrReturn(callbackRule, theme),
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
