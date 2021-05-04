import { buildAlias, buildRule, buildSplit, buildTransform } from './builders'
import { Plugin } from './plugin'

export function buildPhases<Theme extends Record<string, any>>(
  theme: Theme,
  plugins: Plugin<Theme>[]
): Phases {
  return {
    alias: buildAlias(theme, plugins),
    rule: buildRule(theme, plugins),
    split: buildSplit(theme, plugins),
    transform: buildTransform(theme, plugins),
  }
}

export interface Phases {
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
