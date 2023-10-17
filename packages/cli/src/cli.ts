import { Command } from 'commander'
import { theme } from '@vtex/shoreline-theme'

const program = new Command()

program.name('shoreline-cli').description('Shoreline CLI').version('1.0.0')

program
  .command('theme')
  .description('Generate CSS Variables from tokens')
  .action(theme)

program.parse()
