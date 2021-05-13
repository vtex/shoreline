import { Plugin } from '../plugin/types'
import { get } from '@vtex/onda-util'
import { callOrReturn } from './util'

export function buildTransforms<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
) {
  return function hydrateTransform(prop: string) {
    const transformations = plugins
      .map((p) => p.steps.transforms)
      .reduce(
        (acc, callbackRule) => ({
          ...acc,
          ...callOrReturn(callbackRule, theme),
        }),
        {}
      ) as Record<string, any>

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
