import browserslist from 'browserslist'
import { transform, browserslistToTargets } from 'lightningcss'
import path from 'node:path'
import fs from 'fs-extra'

const targets = browserslistToTargets(browserslist('>= 0.25%'))

const themes = new Map()

interface Props {
  filepath: string
  out: string
}

export function theme(props: Props) {
  const { filepath, out } = props

  const { code } = transform({
    filename: 'shoreline.css',
    minify: false,
    targets,
    code: fs.readFileSync(`${path.dirname('')}/${filepath}`),
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
            themes.set(rule.prelude.value, rule.body.value)

            return {
              type: 'layer-block',
              value: {
                name: ['theme'],
                loc: rule.loc,
                rules: rule.body.value,
              },
            }
          },
        },
      },
      Selector() {
        return [
          {
            type: 'pseudo-class',
            kind: 'root',
          },
        ]
      },
    },
  })

  fs.outputFile(`${path.dirname('')}/${out}`, prefixCode(code), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('✅ Styles')
    }
  })
}

function prefixCode(code: Uint8Array, prefix = 'sl') {
  const str = String(code.toString())
  const replaced = str.replace(/--/gi, `--${prefix}-`)
  return Buffer.from(replaced)
}
