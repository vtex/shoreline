export interface Plugin<Theme extends Record<string, any>> {
  name: string
  namespaces: string[]
  steps: PluginSteps<Theme>
}

export interface PluginSteps<Theme extends Record<string, any>> {
  entries: PluginOption<Theme, Partial<Theme>>
  aliases: PluginOption<Theme, Record<string, string>>
  rules: PluginOption<Theme, Record<string, string>>
  transforms: PluginOption<
    Theme,
    Record<string, (rule: Record<string, string>, value: any) => any>
  >
  splits: PluginOption<Theme, Record<string, string[]>>
}

export type PluginOption<Theme, ReturnType> =
  | ReturnType
  | ((t: Partial<Theme>) => ReturnType)

export interface PluginParams<Theme extends Record<string, any>> {
  name: string
  namespaces: string[]
  entries?: PluginOption<Theme, Partial<Theme>>
  aliases?: PluginOption<Theme, Record<string, string>>
  rules?: PluginOption<Theme, Record<string, string>>
  transforms?: PluginOption<
    Theme,
    Record<string, (rule: Record<string, string>, value: any) => any>
  >
  splits?: PluginOption<Theme, Record<string, string[]>>
}

export interface StepsInstance {
  entries: {
    value: Record<string, any>
    exec: (theme: any) => any
  }
  aliases: {
    value: Record<string, string>
    exec: (prop: string) => string
  }
  rules: {
    value: Record<string, string>
    exec: (prop: string) => any
  }
  splits: {
    value: Record<string, string[]>
    exec: (prop: string, value: any) => Record<string, any>
  }
  transforms: (
    prop: string
  ) => {
    value: Record<string, string>
    exec: (rule: Record<string, string>, value: any) => any
  }
}
