import { PluginParams, Plugin } from './types'

export function createPlugin<Theme extends Record<string, any>>(
  params: PluginParams<Theme>
): Plugin<Theme> {
  function returnsEmptyObject() {
    return {}
  }

  return {
    name: params.name,
    namespaces: params.namespaces,
    steps: {
      theme: params?.onCreateTheme ?? returnsEmptyObject,
      alias: params?.onCreateAlias ?? returnsEmptyObject,
      rule: params?.onCreateRule ?? returnsEmptyObject,
      transform: params?.onTransform ?? returnsEmptyObject,
      split: params?.onSplit ?? returnsEmptyObject,
    },
  }
}
