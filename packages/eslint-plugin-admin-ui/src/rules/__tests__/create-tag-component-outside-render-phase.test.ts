import { RuleTester } from 'eslint'

import { createTagComponentOutsideRenderPhase } from '../create-tag-component-outside-render-phase'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run(
  'create-tag-component-outside-render-phase',
  createTagComponentOutsideRenderPhase,
  {
    valid: [
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const Box = tag('div')

          function Component() {
            return <Box />
          }
      `,
      },

      // when is shadowing the tag variable
      {
        code: `
          import { tag, Box } from '@vtex/admin-ui'

          function Component() {
            const tag = (value) => console.log(value)

            tag('Hello world')

            return <Box />
          }
      `,
      },

      // when is declaring inside a function but outside of some render phase
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const createComponent = () => {
            const Box = tag('div')

            function Component() {
              return <Box />
            }

            return Component
          }
      `,
      },
    ],

    invalid: [
      // when is function declaration
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          function Component() {
            const Box = tag('div')

            return <Box />
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },

      // when is function expression
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const Component = function() {
            const Box = tag('div')

            return <Box />
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },

      // when is named function expression
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const Component = function Component() {
            const Box = tag('div')

            return <Box />
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },

      // when is arrow function
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const Component = () => {
            const Box = tag('div')

            return <Box />
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },

      // when has switch scope
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const Component = ({ type }) => {
            switch (type) {
            case 'box':
              const Box = tag('div')

              return <Box />
            default:
              return null
            }
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },

      // when has two levels of functions
      {
        code: `
          import { tag } from '@vtex/admin-ui'

          const createComponent = () => {
            function Component() {
              const Box = tag('div')

              return <Box />
            }

            return Component
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },

      // when is renaming the import `tag`
      {
        code: `
          import { tag as createComponent } from '@vtex/admin-ui'

          function Component() {
            const Box = createComponent('div')

            return <Box />
          }
      `,
        errors: [
          {
            type: 'CallExpression',
            message:
              'Do not create custom components inside render phase of some component',
          },
        ],
      },
    ],
  }
)
