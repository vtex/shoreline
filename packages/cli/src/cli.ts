import { Command } from 'commander'
import { theme, tsTheme } from '@vtex/shoreline-theme'

const program = new Command()

program.name('shoreline-cli').description('Shoreline CLI').version('1.0.0')

program
  .command('theme')
  .description('Generate CSS Variables from tokens')
  .action(theme)

program
  .command('typescript-theme')
  .description('Generate a Typescript theme from tokens')
  .action(tsTheme)

program.parse()
