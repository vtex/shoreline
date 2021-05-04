export interface Plugin<Theme extends Record<string, any>> {
  name: string
  steps: PluginSteps<Theme>
}

export interface PluginSteps<Theme extends Record<string, any>> {
  alias: (theme: Theme) => Record<string, string>
  rule: (theme: Theme) => Record<string, string>
  transform: (
    theme: Theme
  ) => Record<string, (rule: Record<string, string>, value: any) => any>
  split: (theme: Theme) => Record<string, string[]>
}

export interface PluginParams<Theme extends Record<string, any>> {
  name: string
  onCreateAlias?: (theme: Theme) => Record<string, string>
  onCreateRule?: (theme: Theme) => Record<string, string>
  onTransform?: (
    theme: Theme
  ) => Record<string, (rule: Record<string, string>, value: any) => any>
  onSplit?: (theme: Theme) => Record<string, string[]>
}

export interface StepsInstance {
  alias: {
    value: Record<string, string>
    exec: (prop: string) => string
  }
  rule: {
    value: Record<string, string>
    exec: (prop: string) => any
  }
  split: {
    value: Record<string, string[]>
    exec: (prop: string, value: any) => Record<string, any>
  }
  transform: (
    prop: string
  ) => {
    value: Record<string, string>
    exec: (rule: Record<string, string>, value: any) => any
  }
}
