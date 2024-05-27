import browserslist from 'browserslist'
import { bundle as __bundle, browserslistToTargets } from 'lightningcss'
import { outputFileSync } from 'fs-extra'

export interface BundleArgs {
  inputFile: string
  outputFile: string
  banner?: string
  browserslistQuery?: string | string[]
}

export function bundle(args: BundleArgs) {
  const {
    inputFile,
    outputFile,
    banner,
    browserslistQuery = 'last 1 versions',
  } = args

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const { code: bundledCode } = __bundle({
    filename: inputFile,
    targets,
    minify: false,
    customAtRules: {
      theme: {
        prelude: '<custom-ident>',
        body: 'style-block',
      },
    },
    visitor: {
      Rule: {
        custom: {
          // the selectors are keept
          theme(rule) {
            // prefixes --{var} by --sl-
            return JSON.parse(
              JSON.stringify(rule.body.value).replace(/--/gi, '--sl-')
            )
          },
        },
      },
    },
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
