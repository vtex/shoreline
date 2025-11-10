import browserslist from 'browserslist'
import { transform, browserslistToTargets } from 'lightningcss'

export function transformTokens(args: TransformTokensArgs) {
  const {
    code,
    useCascadeLayers = true,
    browserslistQuery = 'last 1 versions',
  } = args

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const result = transform({
    filename: 'styles.css',
    code: code as unknown as Uint8Array,
    targets,
    minify: false,
  })

  // Wrap in layer if useCascadeLayers is true
  if (useCascadeLayers) {
    const wrappedCode = Buffer.from(
      `@layer sl-tokens {\n${result.code.toString()}\n}`
    )
    return {
      ...result,
      code: wrappedCode,
    }
  }

  return result
}

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
