import { lstat, readdir, realpath } from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'
import { hash, readInside, relativePath } from './io.mjs'
import registry from './theme-registry.cjs'

export const themesRoot = registry.themesPath

export function themeDirectory(name) {
  if (typeof name !== 'string' || !/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error('Invalid theme name')
  }
  return `${themesRoot}/${name}`
}

// Reject symlinks in every ancestor, including links that stay in the repo.
export async function themePathInfo(root, file) {
  if (!relativePath(file)) throw new Error(`Invalid theme path: ${file}`)
  let current = await realpath(root)
  let info
  for (const segment of file.split('/')) {
    current = path.join(current, segment)
    info = await lstat(current)
    if (info.isSymbolicLink()) {
      throw new Error(`Theme inputs cannot include symlinks: ${file}`)
    }
  }
  return info
}

export async function readThemeFile(root, file, encoding = 'utf8') {
  if (!(await themePathInfo(root, file)).isFile()) {
    throw new Error(`Expected a theme file: ${file}`)
  }
  return readInside(root, file, encoding)
}

// CSS imports must name a literal local .css file. The modifier is returned so
// callers can distinguish layer wrappers from conditional imports.
export function localCssImport(params, importer) {
  const cleaned = params.replace(/\/\*[\s\S]*?\*\//g, '').trim()
  const match = cleaned.match(
    /^(?:"([^"\\]+)"|'([^'\\]+)'|url\(\s*(?:"([^"\\]+)"|'([^'\\]+)'|([^\s)'"\\]+))\s*\))\s*(.*)$/i
  )
  if (!match)
    throw new Error('Unsupported CSS import; use a literal local .css path')
  const target = match.slice(1, 6).find((value) => value !== undefined)
  if (
    !target.endsWith('.css') ||
    /[:?#%\\]/.test(target) ||
    path.posix.isAbsolute(target)
  ) {
    throw new Error(`CSS import must be a local .css file: ${target}`)
  }
  const file = path.posix.normalize(
    path.posix.join(path.posix.dirname(importer), target)
  )
  if (!relativePath(file))
    throw new Error(`CSS import escapes repository: ${target}`)
  return { file, modifier: match[6].trim() }
}

export async function themeSnapshot(root, name, { allowMissing = false } = {}) {
  const directory = themeDirectory(name)
  try {
    if (!(await themePathInfo(root, directory)).isDirectory()) {
      throw new Error(`Expected a theme directory: ${directory}`)
    }
  } catch (error) {
    if (allowMissing && error.code === 'ENOENT') {
      return {
        name,
        missing: true,
        files: [],
        sha256: hash(JSON.stringify({ name, missing: true })),
      }
    }
    throw error
  }
  const files = new Map()
  const visitFile = async (file) => {
    if (files.has(file)) return
    const source = await readThemeFile(root, file, null)
    files.set(file, { path: file, sha256: hash(source) })
    if (!file.endsWith('.css')) return
    const imports = []
    postcss
      .parse(source.toString('utf8'), { from: file })
      .walkAtRules(/^import$/i, (node) => {
        imports.push(localCssImport(node.params, file).file)
      })
    for (const dependency of imports) await visitFile(dependency)
  }
  const visit = async (folder) => {
    for (const entry of await readdir(path.join(root, folder), {
      withFileTypes: true,
    })) {
      const file = `${folder}/${entry.name}`
      const info = await themePathInfo(root, file)
      if (info.isDirectory()) await visit(file)
      else if (info.isFile()) await visitFile(file)
      else throw new Error(`Unsupported theme input: ${file}`)
    }
  }
  await visit(directory)
  const inputs = [...files.values()].sort((a, b) =>
    a.path.localeCompare(b.path)
  )
  return { name, sha256: hash(JSON.stringify(inputs)), files: inputs }
}
