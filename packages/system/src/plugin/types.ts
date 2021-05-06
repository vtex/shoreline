export interface Plugin<Theme extends Record<string, any>> {
  name: string
  namespaces: string[]
  steps: PluginSteps<Theme>
}

export interface PluginSteps<Theme extends Record<string, any>> {
  theme: (theme: Partial<Theme>) => Record<string, any>
  alias: (theme: Partial<Theme>) => Record<string, string>
  rule: (theme: Partial<Theme>) => Record<string, string>
  transform: (
    theme: Partial<Theme>
  ) => Record<string, (rule: Record<string, string>, value: any) => any>
  split: (theme: Partial<Theme>) => Record<string, string[]>
}

export interface PluginParams<Theme extends Record<string, any>> {
  name: string
  namespaces: string[]
  onCreateTheme?: (theme: Partial<Theme>) => Record<string, any>
  onCreateAlias?: (theme: Partial<Theme>) => Record<string, string>
  onCreateRule?: (theme: Partial<Theme>) => Record<string, string>
  onTransform?: (
    theme: Partial<Theme>
  ) => Record<string, (rule: Record<string, string>, value: any) => any>
  onSplit?: (theme: Partial<Theme>) => Record<string, string[]>
}

export interface StepsInstance {
  theme: {
    value: Record<string, any>
  }
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
