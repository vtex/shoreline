import { Plugin } from '../types'
import { get } from '../../util'

export function buildTransform<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  return function hydrateTransform(prop: string) {
    const transformations = plugins
      .map((p) => p.steps.transform)
      .reduce(
        (acc, callbackRule) => ({
          ...acc,
          ...callbackRule(theme),
        }),
        {}
      ) as Record<string, string>

    const transformOrGet = get(transformations, prop, get)

    function transform(rule: Record<string, string>, token: any) {
      return typeof transformOrGet === 'function'
        ? transformOrGet(rule, token, token)
        : transformOrGet
    }

    return {
      value: transformations,
      exec: transform,
    }
  }
}
