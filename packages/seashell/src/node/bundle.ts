import _eval from 'eval'
import { build } from 'esbuild'
import type { ShorelineConfig } from '../types'

async function bundleConfigFile(file: string, cwd: string) {
  const result = await build({
    absWorkingDir: cwd,
    entryPoints: [file],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: 'cjs',
    sourcemap: false,
    metafile: true,
    mainFields: ['module', 'main'],
  })

  const { text } = result.outputFiles[0]

  return {
    code: text,
    dependencies: result.metafile ? Object.keys(result.metafile.inputs) : [],
  }
}

interface ConfigEvalReturn {
  default: ShorelineConfig
}

export async function bundle(filepath: string, cwd: string) {
  const { code } = await bundleConfigFile(filepath, cwd)

  try {
    const javascriptCode = _eval(code) as ConfigEvalReturn

    return javascriptCode?.default ? { config: javascriptCode.default } : {}
  } catch (e) {
    throw e
  }
}
