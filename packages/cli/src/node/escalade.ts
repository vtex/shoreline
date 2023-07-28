import { dirname, resolve } from 'path'
import { readdirSync, statSync } from 'fs'

export function escalade(start: string, callback: Callback) {
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

type Callback = (directory: string, files: string[]) => string | false | void
