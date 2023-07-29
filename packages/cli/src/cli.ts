import { Command } from 'commander'
import { loadConfigFile } from './node/load-config'
import { transform } from 'lightningcss'
import {
  genCssVariables,
  genTokens,
  genTypescriptCode,
} from '@vtex/shoreline-css-engine'
import { outputFile } from './node/output-file'

const program = new Command()

program.name('shoreline-cli').description('Shoreline CLI').version('1.0.0')

program
  .command('codegen')
  .description('Generate CSS Variables from tokens')
  .action(() => {
    const config = loadConfigFile({
      cwd: process.cwd(),
    })

    config
      .then(({ config }) => {
        const { tokens = {}, outdir } = config

        console.log({
          tokens,
        })

        const cssCode = genCssVariables(genTokens(tokens))

        const { code } = transform({
          filename: 'tokens.css',
          code: Buffer.from(cssCode),
          minify: false,
        })

        outputFile({
          path: `${outdir}/tokens.css`,
          code,
          successMessage: '🎨 Tokens generated!',
        })

        outputFile({
          path: `${outdir}/types.d.ts`,
          code: genTypescriptCode(tokens),
          successMessage: '🏆 Types generated!',
        })
      })
      .catch((e) => {
        console.log(e)
      })
  })

program.parse()
