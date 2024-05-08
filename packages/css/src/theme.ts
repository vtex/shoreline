import browserslist from 'browserslist'
import {
  transform,
  browserslistToTargets,
  type TokenOrValue,
} from 'lightningcss'
import path from 'node:path'
import fs from 'fs-extra'
import { kebabCase } from '@vtex/shoreline-utils'
import { format } from 'prettier'
import { formatHex } from 'culori'

const targets = browserslistToTargets(browserslist('>= 0.25%'))

interface Props {
  filepath: string
  out: string
}

const declared: Record<string, string> = {}

export async function theme(props: Props) {
  const { filepath, out } = props

  const { code } = transform({
    filename: 'shoreline.css',
    minify: false,
    targets,
    code: fs.readFileSync(`${path.dirname('')}/${filepath}`),
    visitor: {
      DeclarationExit: {
        custom({ name, value }) {
          // declared[(toJsProp(name), value)
          declared[toJsProp(name)] = value.map(stringifyValue).join('')
        },
      },
      Selector(selectors) {
        const [themeSelector] = selectors

        if (
          themeSelector.type === 'attribute' &&
          themeSelector.name === 'data-sl-theme' &&
          themeSelector.operation?.operator === 'equal'
        ) {
          return [
            {
              type: 'pseudo-class',
              kind: 'root',
            },
          ]
        }

        throw new Error('A new theme must be declared under [data-sl-theme]')
      },
    },
  })

  const unformatedTs = `export const theme = ${JSON.stringify(declared)};`

  const formattedTs = await format(unformatedTs, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  fs.outputFile(`${path.dirname('')}/${out}`, prefixCode(code), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('✅ Styles')
    }
  })

  fs.outputFile(
    `${path.dirname('')}/${out.replace('.css', '.ts')}`,
    formattedTs,
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('✅ Ts')
      }
    }
  )
}

function toJsProp(str: string) {
  return kebabCase(String(str).replace(/--/gi, ''))
}

function stringifyValue(tkov: TokenOrValue) {
  switch (tkov.type) {
    case 'length':
      return `${tkov.value.value}${tkov.value.unit}`
    case 'token':
      if (
        tkov.value.type === 'ident' ||
        tkov.value.type === 'number' ||
        tkov.value.type === 'string' ||
        tkov.value.type === 'delim' ||
        tkov.value.type === 'white-space'
      ) {
        // identifiers are passed through
        return tkov.value.value
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
      // @ts-ignore
      const { type, ...rest } = tkov.value
      console.log({
        type,
        ...rest,
      })
      // all colors come as rgba
      const raw = `rgba(${rest.r}, ${rest.g}, ${rest.b}, ${rest.alpha})`

      return formatHex(raw)
    }
    case 'var': {
      return `var(${tkov.value.name.ident.replace(/--/gi, '--sl-')})`
    }
    case 'function': {
      return `${tkov.value.name}(${tkov.value.arguments
        .map((argument) => {
          if (argument.type === 'token') {
            if (argument.value.type === 'ident') {
              // identifiers are passed through
              return argument.value.value
            }
            if (argument.value.type === 'percentage') {
              // css percentages
              return `${Math.floor(Number(argument.value.value) * 100)}%`
            }
            if (argument.value.type === 'white-space') {
              return ' '
            }
            if (argument.value.type === 'comma') {
              return ','
            }

            return ''
          }

          if (argument.type === 'var') {
            return `var(${argument.value.name?.ident?.replace(
              /--/gi,
              '--sl-'
            )})`
          }

          return ''
        })
        .join('')})`
    }
    default:
      return ''
  }
}

function prefixCode(code: Uint8Array, prefix = 'sl') {
  const str = String(code.toString())
  const replaced = str.replace(/--/gi, `--${prefix}-`)
  return Buffer.from(replaced)
}
