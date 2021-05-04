import { Plugin } from './createPlugin'
import { get } from './util'

export function createTransform(plugins: Plugin[]) {
  return function hydrateTransform(prop: string) {
    const transformations = plugins
      .map((p) => p.onTransform)
      .reduce(
        (acc, callbackRule) => ({
          ...acc,
          ...callbackRule(),
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
