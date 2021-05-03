import { Theme } from './types'

export function createPlugin(specs: PluginSpec): Plugin {
  return {
    name: specs.name,
    onCreateAlias: specs?.onCreateAlias ?? noop,
    onCreateRule: specs?.onCreateRule ?? noop,
    onTransform: specs?.onTransform ?? noop,
    onSplit: specs?.onSplit ?? noop,
  }
}

export type Plugin = Required<PluginSpec>

interface PluginSpec {
  name: string
  onCreateAlias?: (theme: Theme) => Record<string, string>
  onCreateRule?: () => Record<string, string>
  onTransform?: () => Record<
    string,
    (rule: Record<string, string>, value: any) => any
  >
  onSplit?: () => Record<string, string[]>
}

function noop() {
  return {}
}
