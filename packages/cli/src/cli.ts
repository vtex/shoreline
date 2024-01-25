import { Command } from 'commander'
import { css } from '@vtex/shoreline-css'

const program = new Command()

program.name('shoreline-cli').description('Shoreline CLI').version('1.0.0')

program
  .command('css')
  .description('Generate CSS Variables from tokens')
  .action(css)

program.parse()
