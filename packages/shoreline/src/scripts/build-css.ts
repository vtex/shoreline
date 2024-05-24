import browserslist from 'browserslist'
import { bundle, browserslistToTargets } from 'lightningcss'
import { outputFileSync } from 'fs-extra'

// last version of each browser
const targets = browserslistToTargets(browserslist('last 1 versions'))

interface StyleArgs {
  inputFile: string
  outputFile: string
  banner?: string
}

function styles(args: StyleArgs) {
  const { inputFile, outputFile, banner } = args

  const { code: bundledCode } = bundle({
    filename: inputFile,
    targets,
    minify: false,
  })

  try {
    outputFileSync(
      outputFile,
      Buffer.from(
        banner
          ? `${banner}\n\n${bundledCode.toString()}`
          : bundledCode.toString()
      )
    )

    console.log('✅ Styles compiled')
  } catch (e) {
    console.log('🚨 Failed to compile styles')
  }
}

styles({
  inputFile: 'src/themes/sunrise/styles.css',
  outputFile: 'dist/themes/sunrise/styles.css',
  banner: '@layer sl-reset, sl-base, sl-tokens, sl-components;',
})

styles({
  inputFile: 'src/themes/sunrise/styles-unlayered.css',
  outputFile: 'dist/themes/sunrise/styles-unlayered.css',
})
