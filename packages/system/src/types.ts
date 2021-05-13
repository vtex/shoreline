import { Plugin } from './plugin'
import { Runtime } from './runtime'

export interface Ocean<
  Theme extends Record<string, any>,
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
> {
  plugins: Plugin<Theme>[]
  runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>
}
