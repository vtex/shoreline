import { PluginSteps } from './plugin'

export interface Runtime<
  Theme extends Record<string, any>,
  HumanReadableCSS = {},
  MetaCSS = {}
> {
  parse: {
    exec: (
      h: HumanReadableCSS
    ) => (theme: Theme, steps: PluginSteps<Theme>) => MetaCSS
  }
  combile: {
    exec: (meta: MetaCSS) => string
  }
}
