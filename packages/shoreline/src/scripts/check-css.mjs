import { readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function checkCssExports(packageRoot = process.cwd()) {
  const manifest = JSON.parse(
    readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
  )
  const entries = Object.entries(manifest.exports ?? {}).filter(
    ([name]) =>
      name === './css' ||
      name.startsWith('./css/') ||
      name.startsWith('./themes/')
  )
  if (!entries.length) throw new Error('No CSS exports found in package.json')

  for (const [name, target] of entries) {
    if (
      typeof target !== 'string' ||
      !/^\.\/dist\/[^\\]+\.css$/.test(target) ||
      target.split('/').includes('..')
    ) {
      throw new Error(`Invalid CSS export target: ${name}`)
    }
    let file
    try {
      file = statSync(path.join(packageRoot, target))
    } catch {
      throw new Error(`Missing CSS export: ${name} -> ${target}`)
    }
    if (!file.isFile() || file.size === 0) {
      throw new Error(
        `CSS export must be a nonempty file: ${name} -> ${target}`
      )
    }
  }
  return entries.length
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    console.log(`Verified ${checkCssExports()} CSS exports`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
