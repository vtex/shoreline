import { resolve } from 'path'

import { bundle } from './bundle'
import type { LoadConfigResult } from '../types'
import { escalade } from './escalade'

type ConfigFileOptions = {
  cwd: string
  file?: string
}

const configs = ['.js']
const shorelineConfigRegex = new RegExp(
  `shoreline.config(${configs.join('|')})$`
)

const isShorelineConfig = (file: string) => shorelineConfigRegex.test(file)

export function findConfigFile({ cwd, file }: { cwd: string; file?: string }) {
  if (file) return resolve(cwd, file)

  return escalade(cwd, (_dir, paths) => {
    return paths.find(isShorelineConfig)
  })
}

export async function loadConfigFile(options: ConfigFileOptions) {
  const result = await bundleConfigFile(options)

  return resolveConfigFile(result)
}

export async function resolveConfigFile(
  result: Awaited<ReturnType<typeof bundleConfigFile>>
) {
  // TODO - MERGE CONFIG HERE!
  const mergedConfig = result.config

  return { ...result, config: mergedConfig } as LoadConfigResult
}

export async function bundleConfigFile(options: ConfigFileOptions) {
  const { cwd, file } = options
  const filePath = findConfigFile({ cwd, file })

  if (!filePath) {
    throw new Error('Config not found')
  }

  const result = await bundle(filePath, cwd)

  // TODO: Validate config shape
  if (typeof result.config !== 'object') {
    throw new Error(`💥 Config must export or return an object.`)
  }

  return {
    ...result,
    config: result.config,
    path: filePath,
  }
}
