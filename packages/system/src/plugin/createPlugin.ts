import { PluginParams, Plugin } from './types'

export function createPlugin<Theme extends Record<string, any>>(
  params: PluginParams<Theme>
): Plugin<Theme> {
  const {
    name,
    namespaces,
    entries,
    aliases,
    rules,
    transforms,
    splits,
  } = params

  return {
    name: name,
    namespaces: namespaces,
    steps: {
      entries: entries ?? {},
      aliases: aliases ?? {},
      rules: rules ?? {},
      transforms: transforms ?? {},
      splits: splits ?? {},
    },
  }
}
