import { Command } from 'commander'
import { loadConfigFile } from './node/load-config'
import { transform } from 'lightningcss'
import { transformTokens, renderCssVariables } from './css'
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
      .then((res) => {
        console.log(res)

        const tokens = (res.config as any).config.tokens

        console.log({
          tokens,
        })

        const cssCode = renderCssVariables(transformTokens(tokens))

        const { code } = transform({
          filename: 'tokens.css',
          code: Buffer.from(cssCode),
          minify: false,
        })

        outputFile({
          path: `${(res.config as any).config.outdir}/tokens.css`,
          code,
          successMessage: '🎨 Tokens generated!',
        })
      })
      .catch((e) => {
        console.log(e)
      })
  })

program.parse()
