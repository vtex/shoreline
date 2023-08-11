#!/usr/bin/env node

import path, { dirname } from 'path'
import minimist from 'minimist'
import { Plop, run } from 'plop'
import { fileURLToPath } from 'url'

const args = process.argv.slice(2)
const argv = minimist(args)

function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url))

  Plop.prepare(
    {
      cwd: argv.cwd,
      configPath: path.join(__dirname, 'plopfile.js'),
      preload: argv.preload || [],
      completion: argv.completion,
    },
    (env) =>
      Plop.execute(env, (env) => {
        const options = {
          ...env,
          dest: process.cwd(),
        }

        return run(options, undefined, true)
      })
  )
}

main()
