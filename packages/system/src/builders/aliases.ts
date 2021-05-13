import { Plugin } from '../plugin/types'
import { callOrReturn } from './util'

export function buildAliases<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((p) => p.steps.aliases)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callOrReturn(callbackRule, theme),
      }),
      {}
    ) as Record<string, string>

  function alias(prop: string) {
    return collection?.[prop] ?? prop
  }

  return {
    value: collection,
    exec: alias,
  }
}
