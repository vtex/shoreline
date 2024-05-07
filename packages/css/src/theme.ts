import browserslist from 'browserslist'
import { transform, browserslistToTargets } from 'lightningcss'
import path from 'node:path'
import fs from 'fs-extra'

const targets = browserslistToTargets(browserslist('>= 0.25%'))

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
