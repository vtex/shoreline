import { dirname, resolve } from 'path'
import { readdirSync, statSync } from 'fs'

export function findFile(props: FindFileProps) {
  const { cwd, path, constraint } = props

  if (path) return resolve(cwd, path)

  return climbUp(cwd, (_dir, paths) => {
    return paths.find(constraint)
  })
}

export function climbUp(start: string, callback: Callback) {
  let dir = resolve('.', start)
  let tmp
  const stats = statSync(dir)

  if (!stats.isDirectory()) {
    dir = dirname(dir)
  }

  while (tmp !== dir) {
    tmp = callback(dir, readdirSync(dir))
    if (tmp) return resolve(dir, tmp)
    dir = dirname((tmp = dir))
  }

  return ''
}

interface FindFileProps {
  cwd: string
  constraint: (filePath: string) => boolean
  path?: string
}

type Callback = (directory: string, files: string[]) => string | false | void
