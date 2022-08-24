import pluginTester from 'babel-plugin-tester'
import { adminUiPlugin } from '../plugin'

pluginTester({
  pluginName: '@vtex/babel-plugin-admin-ui-react',
  plugin: adminUiPlugin,
  snapshot: true,
  tests: {
    normal: `
      import { jsx } from '@vtex/admin-ui-react'

      const Box = jsx('div')({})
    `,
    'multiple calls': `
      import { jsx } from '@vtex/admin-ui-react'

      const Box = jsx('div')({})
      const Flex = jsx(Box)({ display: 'flex' })
      const Center = jsx(Flex)({ justifyContent: 'center' })
    `,
    'export const': `
      import { jsx } from '@vtex/admin-ui-react'

      export const Box = jsx('div')({})
    `,

    'has inner scope': `
      import { jsx } from '@vtex/admin-ui-react'

      const render = () => {
        const Box = jsx('div')({})
      }
    `,

    'shadowing imported jsx': `
      import { jsx } from '@vtex/admin-ui-react'

      const render = () => {
        const jsx = () => () => {}

        const Box = jsx('div')({})
      }
    `,

    'jsx of another module': `
      import { jsx } from 'another-module'

      const Box = jsx('div')({})
    `,
  },
})
