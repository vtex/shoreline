import type { CompilerOptions, TypeAcquisition } from 'typescript'
import type { Extendable, RequiredBy, UnwrapExtend } from './utility-types'

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

type PresetCore = {}

type ExtendableOptions = {
  [K in keyof PresetCore]?: Extendable<PresetCore[K]>
}

type FileSystemOptions = {
  /**
   * Whether to clean the output directory before generating the css.
   * @default false
   */
  clean?: boolean
  /**
   * The output directory.
   * @default 'styled-system'
   */
  outdir?: string
  /**
   * List of files glob to watch for changes.
   * @default []
   */
  include?: string[]
  /**
   * List of files glob to ignore.
   * @default []
   */
  exclude?: string[]
  /**
   * Whether to watch for changes and regenerate the css.
   * @default false
   */
  watch?: boolean
  /**
   * Whether to use polling instead of filesystem events when watching.
   * @default false
   */
  poll?: boolean
  /**
   * The current working directory.
   * @default 'process.cwd()'
   */
  cwd?: string
  /**
   * File extension for generated javascript files.
   */
  outExtension?: 'mjs' | 'js'
  /**
   * The log level for the built-in logger.
   * @default 'info'
   */
  logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'silent'
}

type CssgenOptions = {
  /**
   * Whether to include css reset styles in the generated css.
   * @default true
   */
  preflight?: boolean | { scope: string }
  /**
   * The namespace prefix for the generated css classes and css variables.
   * @default ''
   */
  prefix?: string | { cssVar: string; className: string }
  /**
   * The value separator used in the generated class names.
   * @default '_'
   */
  separator?: '_' | '=' | '-'
  /**
   * Whether to optimize the generated css.
   * @default true
   */
  optimize?: boolean
  /**
   * Whether to minify the generated css.
   * @default false
   */
  minify?: boolean
  /**
   * The root selector for the css variables.
   * @default ':where(:host, :root)'
   */
  cssVarRoot?: string
}

type CodegenOptions = {
  /**
   * Whether to emit the artifacts to `node_modules` as a package.
   * @default false
   */
  emitPackage?: boolean
  /**
   * Whether to only emit the `tokens` directory
   * @default false
   */
  emitTokensOnly?: boolean
  /**
   * Whether to hash the generated class names.
   * This is useful if want to shorten the class names.
   * @default false
   */
  hash?: boolean | { cssVar: boolean; className: boolean }
  /**
   * Options for the generated typescript definitions.
   */
  strictTokens?: boolean
  /**
   * Whether to update the .gitignore file.
   * @default 'true'
   */
  gitignore?: boolean
  /**
   * Whether to generate disabled shorthand properties
   * @default 'true'
   */
  shorthands?: boolean
}

export type Config = ExtendableOptions &
  CssgenOptions &
  CodegenOptions &
  FileSystemOptions

export type UserConfig = UnwrapExtend<
  RequiredBy<Config, 'outdir' | 'cwd' | 'include'>
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
