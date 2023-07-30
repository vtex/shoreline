import { Command } from 'commander'
import { loadConfigFile } from './node/load-config'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import nested from 'postcss-nested'
import postcss from 'postcss'
import { genCssVariables, genTokens, genTypescriptCode } from './css-engine'
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

        const cssCode = genCssVariables(genTokens(tokens))

        postcss([autoprefixer, cssnano, nested])
          .process(cssCode)
          .then(({ css }) => {
            console.log({ css })

            outputFile({
              path: `${outdir}/tokens.css`,
              code: Buffer.from(css),
              successMessage: '🎨 Tokens generated!',
            })
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
