import type { ReactElement, ReactNode, Ref } from 'react'

export interface ElementWithRef extends ReactElement {
  ref: Ref<any>
}

export type Primitive = string | number | boolean | null | undefined

export type AnyFunction = (...args: any) => any

export type RenderProps = (node: ReactNode) => ReactNode

export type LiteralUnion<T, K extends Primitive = string> =
  | T
  | (K & Record<never, never>)

export type Recursive<T> = { [key: string]: T | Recursive<T> }

export type AnyObject = Record<keyof any, any>

export type Dict<T = any> = Record<string, T>

export type TupleTypes<T> = { [P in keyof T]: T[P] } extends {
  [key: number]: infer V
}
  ? NullToObject<V>
  : never

export type NullToObject<T> = T extends null | undefined ? {} : T

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type StripEnums<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends boolean
    ? T[K]
    : T[K] extends string
    ? T[K]
    : T[K] extends object
    ? T[K]
    : T[K] extends any[]
    ? T[K]
    : T[K] extends undefined
    ? undefined
    : any
}

export type Preset = ShorelineConfig

export interface ShorelineConfig {
  /**
   * The preset
   */
  preset?: ShorelineConfig
  /**
   * The output directory.
   */
  outdir?: string
  /**
   * The current working directory.
   */
  cwd?: string
  /**
   * The namespace prefix for the generated CSS classes and css variables.
   */
  prefix?: string
  /**
   * Tokens
   */
  tokens?: Record<string, any>
}
