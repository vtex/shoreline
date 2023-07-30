import { resolve } from 'path'

import type { LoadConfigResult } from '../types'
import { escalade } from './escalade'
import { load } from './load'

type ConfigFileOptions = {
  cwd: string
  file?: string
}

const shorelineConfigRegex = /shoreline.config.ts/

const isShorelineConfig = (file: string) => shorelineConfigRegex.test(file)

export function findConfigFile({ cwd, file }: { cwd: string; file?: string }) {
  if (file) return resolve(cwd, file)

  return escalade(cwd, (_dir, paths) => {
    return paths.find(isShorelineConfig)
  })
}

export function loadConfigFile(options: ConfigFileOptions) {
  const result = bundleConfigFile(options)

  return resolveConfigFile(result)
}

export function resolveConfigFile(result: ReturnType<typeof bundleConfigFile>) {
  // TODO - MERGE CONFIG HERE!
  const mergedConfig = result.config

  return { ...result, config: mergedConfig } as LoadConfigResult
}

export function bundleConfigFile(options: ConfigFileOptions) {
  const { cwd, file } = options
  const filePath = findConfigFile({ cwd, file })

  if (!filePath) {
    throw new Error('Config not found')
  }

  const result = load(filePath)

  if (typeof result.config !== 'object') {
    throw new Error(`💥 Config must export or return an object.`)
  }

  return {
    ...result,
    config: result.config,
    path: filePath,
  }
}
