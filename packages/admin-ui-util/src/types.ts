import type { ComponentType } from 'react'

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

/**
 * Any function.
 */
export type AnyFunction = (...args: any) => any

/**
 * Infer props of a component
 */
export type InferProps<T> = T extends ComponentType<infer Props>
  ? Props extends object
    ? Props
    : never
  : never
