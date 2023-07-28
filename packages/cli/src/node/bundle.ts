import fs from 'fs'
import type { Config } from '../types'

export function requireFile(
  file: string,
  cwd: string = process.cwd()
): BundleResult {
  const absolutePath = require.resolve(file, { paths: [cwd] })
  const fileName = fs.realpathSync(absolutePath)

  delete require.cache[absolutePath] // don't cache the file
  // eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const mod = require(fileName)

  return {
    mod: mod.default ?? mod,
    dependencies: [fileName],
    code: fs.readFileSync(fileName, 'utf-8'),
  }
}

type BundleResult = {
  mod: any
  dependencies: string[]
  code: string
}

export async function bundle<T = Config>(filepath: string, cwd: string) {
  const { mod: config, dependencies } = requireFile(filepath, cwd)

  return { config: (config?.default ?? config) as T, dependencies }
}
