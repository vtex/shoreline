import { Plugin } from '../plugin/types'
import { merge, pick } from '@vtex/onda-util'
import { callOrReturn } from './util'

export function buildEntries<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((p) => ({ callback: p.steps.entries, namespaces: p.namespaces }))
    .reduce(
      (acc, { callback, namespaces }) => ({
        ...acc,
        ...callOrReturn(callback, pick(theme, namespaces) as Partial<Theme>),
      }),
      []
    )

  function exec(theme: Theme) {
    return merge(theme, collection)
  }

  return {
    value: collection,
    exec,
  }
}
