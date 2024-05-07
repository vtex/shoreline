import { Command } from 'commander'
import { css, theme } from '@vtex/shoreline-css'

const program = new Command()

program.name('shoreline-cli').description('Shoreline CLI').version('1.0.0')

program
  .command('css')
  .description('Generate CSS Variables from tokens')
  .action(css)

program
  .command('theme')
  .option('-f, --file <type>', 'file path', 'src/theme.css')
  .option('-o, --out <type>', 'output file', 'src/theme-parsed.css')
  .action((options) => {
    // console.log(options)
    theme({
      filepath: options.file,
      out: options.out,
    })
  })

program.parse()
