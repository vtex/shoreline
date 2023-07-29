export interface ShorelineConfig {
  /**
   * The output directory.
   * @default 'shoreline'
   */
  outdir?: string
  /**
   * The current working directory.
   * @default 'process.cwd()'
   */
  cwd?: string
  /**
   * Whether to include css reset styles in the generated css.
   * @default true
   */
  preflight?: boolean
  /**
   * The namespace prefix for the generated css classes and css variables.
   * @default 'sl'
   */
  prefix?: string
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
  /**
   * Tokens
   * @default @vtex/shoreline-themes/admin
   */
  tokens?: Record<string, any>
}
