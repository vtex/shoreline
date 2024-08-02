import { constants, camelCase } from '@vtex/shoreline-utils'
import browserslist from 'browserslist'
import { formatHex } from 'culori'
import {
  transform,
  browserslistToTargets,
  type TokenOrValue,
} from 'lightningcss'

export function transformTokens(args: TransformTokensArgs) {
  const {
    code,
    useCascadeLayers = true,
    browserslistQuery = 'last 1 versions',
  } = args

  const targets = browserslistToTargets(browserslist(browserslistQuery))

  const tokensJs: Record<string, string> = {}

  const lightningResult = transform({
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
      DeclarationExit: {
        custom({ name, value }) {
          tokensJs[toJsProp(name)] = value.map(stringifyValue).join('')
        },
      },
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

  return [lightningResult, tokensJs]
}

function toJsProp(str: string) {
  return camelCase(String(str).replace(/--sl-/gi, ''))
}

function stringifyValue(tkov: TokenOrValue): string {
  switch (tkov.type) {
    case 'length':
      return `${tkov.value.value}${tkov.value.unit}`
    case 'token':
      if (
        tkov.value.type === 'ident' ||
        tkov.value.type === 'number' ||
        tkov.value.type === 'string' ||
        tkov.value.type === 'delim'
      ) {
        // identifiers are passed through
        return String(tkov.value.value)
      }
      if (tkov.value.type === 'white-space') {
        return constants.whiteSpace
      }
      if (tkov.value.type === 'percentage') {
        // css percentages
        return `${Math.floor(Number(tkov.value.value) * 100)}%`
      }
      if (tkov.value.type === 'comma') {
        return ','
      }

      return ''
    case 'color': {
      const { type, ...rest } = tkov.value as unknown as ColorIdent

      if (type === 'rgb') {
        const raw = `rgba(${rest.r}, ${rest.g}, ${rest.b}, ${rest.alpha})`
        return formatHex(raw) ?? ''
      }

      return ''
    }
    case 'var': {
      return `var(${tkov.value.name.ident})`
    }
    case 'function': {
      return `${tkov.value.name}(${tkov.value.arguments
        .map((argument) => {
          return stringifyValue(argument)
        })
        .join('')})`
    }
    default:
      return ''
  }
}

interface ColorIdent {
  type: string
  r: number
  g: number
  b: number
  alpha: number
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
