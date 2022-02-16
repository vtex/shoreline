/**
 * Any object.
 */
export type AnyObject = Record<keyof any, any>

/**
 * Arguments of a function
 */
export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never

/**
 * Boolean or boolean strings
 */
export type LooseBoolean = boolean | 'true' | 'false'
