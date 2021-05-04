export function createPlugin<Theme extends Record<string, any>>(
  specs: PluginSpec<Theme>
): Plugin<Theme> {
  return {
    name: specs.name,
    onCreateAlias: specs?.onCreateAlias ?? noop,
    onCreateRule: specs?.onCreateRule ?? noop,
    onTransform: specs?.onTransform ?? noop,
    onSplit: specs?.onSplit ?? noop,
  }
}

export type Plugin<Theme extends Record<string, any>> = Required<
  PluginSpec<Theme>
>

export interface PluginSpec<Theme extends Record<string, any>> {
  name: string
  onCreateAlias?: (theme: Theme) => Record<string, string>
  onCreateRule?: (theme: Theme) => Record<string, string>
  onTransform?: (
    theme: Theme
  ) => Record<string, (rule: Record<string, string>, value: any) => any>
  onSplit?: (theme: Theme) => Record<string, string[]>
}

function noop() {
  return {}
}
