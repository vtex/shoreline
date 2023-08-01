import { findFile } from './find-file'
import type { Presets } from './presets'
import { lazyRuntime } from './typescript-runtime'

export interface ShorelineConfig {
  /**
   * The preset
   */
  preset?: Presets
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
   * The namespace prefix for the generated css classes and css variables.
   * @default 'sl'
   */
  prefix?: string
  /**
   * Tokens
   * @default @vtex/shoreline-themes/admin
   */
  tokens?: Record<string, any>
}

/**
 * Define a Shoreline configuration
 */
export function defineConfig(config: ShorelineConfig) {
  return config
}

export function loadConfig(options: ConfigFileOptions): ConfigReturn {
  const { cwd, file } = options
  const path = findFile({
    cwd,
    constraint: isShorelineConfig,
    path: file,
  })

  if (!path) {
    throw new Error('Config not found')
  }

  const config = _loadConfig(path)

  const result = {
    ...config,
    config: config.config,
    path,
  }

  return result
}

export function isShorelineConfig(file: string) {
  const shorelineConfigRegex = /shoreline.config(.ts|.js)$/

  return shorelineConfigRegex.test(file)
}

/**
 * Load and transpiles the config file given its path
 * @param path path of the config file
 */
function _loadConfig(path: string): { config: ShorelineConfig } {
  const config = (function () {
    try {
      // eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports
      return path ? require(path) : {}
    } catch {
      return lazyRuntime()(path)
    }
  })()

  return { config: config.default ?? config }
}

interface ConfigFileOptions {
  cwd: string
  file?: string
}

interface ConfigReturn {
  config: ShorelineConfig
  path: string
}
