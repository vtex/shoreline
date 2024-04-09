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
