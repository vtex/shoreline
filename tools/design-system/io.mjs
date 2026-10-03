import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFile, realpath, stat, readdir } from 'node:fs/promises'
import path from 'node:path'

export const hash = (value) => createHash('sha256').update(value).digest('hex')

export function relativePath(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    !path.isAbsolute(value) &&
    !value.includes('\\') &&
    !value.split('/').some((part) => !part || part === '..' || part === '.')
  )
}

export async function readInside(root, file, encoding = 'utf8') {
  if (!relativePath(file))
    throw new Error(`Expected a relative file path: ${file}`)
  const base = await realpath(root)
  const resolved = await realpath(path.resolve(base, file))
  if (!resolved.startsWith(`${base}${path.sep}`)) {
    throw new Error(`File escapes repository: ${file}`)
  }
  if (!(await stat(resolved)).isFile()) throw new Error(`Not a file: ${file}`)
  return readFile(resolved, encoding)
}

export function git(root, args) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim()
}

export async function contractsIn(root) {
  const files = []
  const visit = async (directory) => {
    const entries = await readdir(path.join(root, directory), {
      withFileTypes: true,
    }).catch((error) => {
      if (error.code === 'ENOENT') return []
      throw error
    })
    for (const entry of entries) {
      const file = `${directory}/${entry.name}`
      if (entry.isSymbolicLink())
        throw new Error(`Contract paths must not contain symlinks: ${file}`)
      if (entry.isDirectory()) await visit(file)
      else if (entry.isFile() && file.endsWith('.json')) files.push(file)
    }
  }
  await visit('design-system/contracts')
  return files.sort()
}

export function changedFiles(root, base, { includeDeleted = false } = {}) {
  // Resolve first, so an option cannot be interpreted as a revision.
  const revision = git(root, ['rev-parse', '--verify', `${base}^{commit}`])
  const ancestor = git(root, ['merge-base', revision, 'HEAD'])
  const tracked = git(root, [
    'diff',
    '--name-only',
    '-z',
    '--no-renames',
    includeDeleted ? '--diff-filter=ACMRDT' : '--diff-filter=ACMRT',
    ancestor,
    '--',
  ])
  const untracked = git(root, [
    'ls-files',
    '--others',
    '--exclude-standard',
    '-z',
  ])
  return [
    ...new Set(`${tracked}\0${untracked}`.split('\0').filter(Boolean)),
  ].sort()
}
