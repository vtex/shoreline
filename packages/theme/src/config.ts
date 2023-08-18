import { constants } from '@vtex/shoreline-utils'
import { findFile } from './find-file'
import type { Presets } from './presets'
import { lazyRuntime } from './typescript-runtime'

export interface ShorelineConfig {
  /**
   * The preset.
   */
  preset?: Presets
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

type DefineConfigParams = Omit<ShorelineConfig, 'prefix'>

/**
 * Define a Shoreline configuration
 */
export function defineConfig(config: DefineConfigParams = {}): ShorelineConfig {
  return { prefix: constants.dsPrefix, ...config }
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

  return {
    ...config,
    path,
  }
}

export function isShorelineConfig(file: string) {
  const shorelineConfigRegex = /shoreline.config(.ts|.js)$/

  return shorelineConfigRegex.test(file)
}

/**
 * Load and transpiles the config file given its path
 * @param path path of the config file
 */
function _loadConfig(path: string): ShorelineConfig {
  const config = (function () {
    try {
      // eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports
      return path ? require(path) : {}
    } catch {
      return lazyRuntime()(path)
    }
  })()

  return config?.default ?? config
}

interface ConfigFileOptions {
  cwd: string
  file?: string
}

interface ConfigReturn extends ShorelineConfig {
  path: string
}
