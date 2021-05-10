import { Plugin } from '../plugin/types'
import { merge, pick } from '@vtex/onda-util'

export function buildTheme<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  const collection = plugins
    .map((p) => ({ callback: p.steps.theme, namespaces: p.namespaces }))
    .reduce(
      (acc, { callback, namespaces }) => ({
        ...acc,
        ...callback(pick(theme, namespaces) as Partial<Theme>),
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
