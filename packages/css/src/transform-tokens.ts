import browserslist from 'browserslist'
import { transform, browserslistToTargets } from 'lightningcss'

export interface TransformTokensArgs {
  /**
   * code to transform
   */
  code: Buffer
  /**
   * css support query
   * @default 'last 1 versions'
   *
   */
  browserslistQuery?: string | string[]
  /**
   * wether it removes the sl-tokens layer
   * @default true
   */
  useCascadeLayers?: boolean
}

export function transformTokens(args: TransformTokensArgs) {
  const {
    code,
    useCascadeLayers = true,
    browserslistQuery = 'last 1 versions',
  } = args

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const result = transform({
    filename: 'styles.css',
    code: code,
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
          theme(rule) {
            const prefixedRoot = JSON.parse(
              JSON.stringify(rule.body.value).replace(/--/gi, '--sl-')
            )

            if (!useCascadeLayers) {
              return prefixedRoot
            }

            return [
              {
                type: 'layer-block',
                value: {
                  name: ['sl-tokens'],
                  loc: rule.loc,
                  rules: prefixedRoot,
                },
              },
            ]
          },
        },
      },
    },
  })

  return result
}
