import { Plugin } from '../plugin/types'
import { callOrReturn } from './util'

export function buildSplits<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((p) => p.steps.splits)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callOrReturn(callbackRule, theme),
      }),
      {}
    ) as Record<string, string[]>

  function split(prop: string, value: any) {
    const entries = collection[prop]

    return entries.reduce(
      (acc, entry) => ({
        ...acc,
        [entry]: value,
      }),
      {}
    )
  }

  return {
    value: collection,
    exec: split,
  }
}
