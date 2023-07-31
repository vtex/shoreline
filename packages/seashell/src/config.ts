import type { ShorelineConfig } from './types'
import { findFile } from './find-file'
import { lazyJiti } from './typescript-runtime'

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
    constraint: _isConfig,
    path: file,
  })

  if (!path) {
    throw new Error('Config not found')
  }

  const config = _loadConfig(path)

  if (typeof config.config !== 'object') {
    throw new Error(`💥 Config must export or return an object.`)
  }

  const result = {
    ...config,
    config: config.config,
    path,
  }

  return result
}

function _isConfig(file: string) {
  // TODO: use js and ts
  const shorelineConfigRegex = /shoreline.config.ts/

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
      return lazyJiti()(path)
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
