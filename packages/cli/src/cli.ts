import { Command } from 'commander'

const program = new Command()

program.name('shoreline-cli').description('Shoreline CLI').version('1.0.0')

program
  .command('theme')
  .description('Generate CSS Variables from tokens')
  .action(async () => {
    console.log('✨ The cli works')
  })

program.parse()
