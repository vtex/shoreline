export type Primitive = string | number | boolean | null | undefined

export type LiteralUnion<T, K extends Primitive = string> =
  | T
  | (K & Record<never, never>)

export type Recursive<T> = { [key: string]: T | Recursive<T> }

export type AnyObject = Record<keyof any, any>

export type Dict<T = any> = Record<string, T>

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
