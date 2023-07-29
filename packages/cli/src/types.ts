import type { CompilerOptions, TypeAcquisition } from 'typescript'
import type { RequiredBy, UnwrapExtend } from './utility-types'
import type { ShorelineConfig } from '@vtex/shoreline-css-engine'

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

export interface TSConfig {
  compilerOptions?: StripEnums<CompilerOptions>
  exclude?: string[]
  compileOnSave?: boolean
  extends?: string
  files?: string[]
  include?: string[]
  typeAcquisition?: TypeAcquisition
}

export type UserConfig = UnwrapExtend<
  RequiredBy<ShorelineConfig, 'outdir' | 'cwd'>
>

export type PathMapping = {
  pattern: RegExp
  paths: string[]
}

export type ConfigTsOptions = {
  baseUrl?: string | undefined
  pathMappings: PathMapping[]
}

export interface LoadConfigResult {
  path: string
  config: UserConfig
  tsconfig?: TSConfig
  tsOptions?: ConfigTsOptions
  tsconfigFile?: string
  dependencies: string[]
}
