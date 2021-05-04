import { PluginParams, Plugin } from './types'

export function createPlugin<Theme extends Record<string, any>>(
  params: PluginParams<Theme>
): Plugin<Theme> {
  function defaultValues() {
    return {}
  }

  return {
    name: params.name,
    steps: {
      alias: params?.onCreateAlias ?? defaultValues,
      rule: params?.onCreateRule ?? defaultValues,
      transform: params?.onTransform ?? defaultValues,
      split: params?.onSplit ?? defaultValues,
    },
  }
}
