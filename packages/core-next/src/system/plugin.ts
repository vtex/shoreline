import invariant from 'tiny-invariant'

const PLUGIN_NAME = Symbol('plugin name')
const PLUGIN_NAMESPACES = Symbol('plugin namespaces')
const PLUGIN_ENTRIES = Symbol('plugin entries')
const PLUGIN_ALIASES = Symbol('plugin aliases')
const PLUGIN_RULES = Symbol('plugin rules')
const PLUGIN_TRANSFORMS = Symbol('plugin transforms')
const PLUGIN_SPLITS = Symbol('plugin splits')

/**
 * Creates a valid onda plugin
 * @example
 * createPlugin({
 *  name: 'onda-plugin-x',
 *  namespaces: [],
 *  entries: () => {},
 *  aliases: {},
 *  rules: {},
 *  transforms: {},
 *  splits: {}
 * })
 */
export function createPlugin<Theme extends Record<string, any>>(
  params: PluginParams<Theme>
): Plugin<Theme> {
  const { name, namespaces, entries, aliases, rules, transforms, splits } =
    params

  const invariants = getPluginInvariants(params)

  invariant(invariants.name.constraint, invariants.name.message)
  invariant(invariants.rules.constraint, invariants.rules.message)

  return {
    [PLUGIN_NAME]: name,
    [PLUGIN_NAMESPACES]: namespaces,
    [PLUGIN_ENTRIES]: entries ?? {},
    [PLUGIN_ALIASES]: aliases ?? {},
    [PLUGIN_RULES]: rules ?? {},
    [PLUGIN_TRANSFORMS]: transforms ?? {},
    [PLUGIN_SPLITS]: splits ?? {},
  }
}

/**
 * Get plugin invariants
 * @param params
 */
function getPluginInvariants(params: PluginParams<any>) {
  const errorWhere = `This happened while trying to create the plugin: ${params.name}`

  return {
    name: {
      constraint: params.name.startsWith('onda-plugin-'),
      message: `Plugin names should start with onda-runtime-. ${errorWhere}. Try onda-plugin-${params.name} instead`,
    },
    rules: {
      constraint:
        !params.rules ||
        Object.values(params.rules as Record<string, any>).every((rule) =>
          params.namespaces.includes(rule)
        ),
      message: `Rules can only access the namespaces you've declared. ${errorWhere}. Make sure that you're declaring all the namespaces the plugin will act in.`,
    },
  }
}

/**
 * Gets the plugin name
 * @param plugin
 */
export function getPluginName<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_NAME]
}

/**
 * Gets the plugin name
 * @param plugin
 */
export function getNamespaces<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_NAMESPACES]
}

/**
 * Gets the plugin entries
 * @param plugin
 */
export function getEntries<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_ENTRIES]
}

/**
 * Gets the plugin aliases
 * @param plugin
 */
export function getAliases<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_ALIASES]
}

/**
 * Gets the plugin rules
 * @param plugin
 */
export function getRules<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_RULES]
}

/**
 * Gets the plugin transforms
 * @param plugin
 */
export function getTransforms<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_TRANSFORMS]
}

/**
 * Gets the plugin splits
 * @param plugin
 */
export function getSplits<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return plugin[PLUGIN_SPLITS]
}

/**
 * Check if the passed plugin is valid
 * @param plugin
 */
export function isValidPlugin<Theme extends Record<string, any>>(
  plugin: Plugin<Theme>
) {
  return (
    !!getPluginName(plugin) &&
    !!getNamespaces(plugin) &&
    !!getEntries(plugin) &&
    !!getAliases(plugin) &&
    !!getRules(plugin) &&
    !!getTransforms(plugin) &&
    !!getSplits(plugin)
  )
}

export interface Plugin<Theme extends Record<string, any>> {
  [PLUGIN_NAME]: string
  [PLUGIN_NAMESPACES]: string[]
  [PLUGIN_ENTRIES]: PluginOption<Theme, Partial<Theme>>
  [PLUGIN_ALIASES]: PluginOption<Theme, Record<string, string>>
  [PLUGIN_RULES]: PluginOption<Theme, Record<string, string>>
  [PLUGIN_TRANSFORMS]: PluginOption<
    Theme,
    Record<string, (rule: Rule, value: any) => any>
  >
  [PLUGIN_SPLITS]: PluginOption<Theme, Record<string, string[]>>
}

export type Rule = number[] | string[] | Record<string, any>

export interface PluginParams<Theme extends Record<string, any>> {
  name: string
  namespaces: string[]
  entries?: PluginOption<Theme, Partial<Theme>>
  aliases?: PluginOption<Theme, Record<string, string>>
  rules?: PluginOption<Theme, Record<string, string>>
  transforms?: PluginOption<
    Theme,
    Record<string, (rule: Rule, value: any) => any>
  >
  splits?: PluginOption<Theme, Record<string, string[]>>
}

export type PluginOption<Theme, ReturnType> =
  | ReturnType
  | ((t: Partial<Theme>) => ReturnType)

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
  transforms: (prop: string) => {
    value: Record<string, string>
    exec: (rule: Rule, value: any) => any
  }
}
