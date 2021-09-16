import { RuleTester } from 'eslint'
import { preferGrid } from '../prefer-grid'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run('prefer-grid', preferGrid, {
  valid: [
    {
      code: `
        const styles = {
          display: 'block',
        }

        const Component = () => {
          return (
            <Box csx={styles} />
          )
        }
      `,
    },

    {
      code: `
        const styles = {
          display: 'grid',
        }

        const Component = () => {
          const styles = {
            display: 'block',
          }

          return (
            <Box csx={styles} />
          )
        }
      `,
    },

    {
      code: `
        const Component = () => {
          return (
            <Grid csx={{ display: 'grid' }} />
          )
        }
      `,
    },

    // when doesn't imports Box variable
    {
      code: `
        const Component = () => {
          return (
            <Box csx={{ display: 'grid' }} />
          )
        }
      `,
    },

    // when import Box, but display grid is applied to another component
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const Component = () => {
          return (
            <div csx={{ display: 'grid' }} />
          )
        }
      `,
    },

    // when is shadowing the Box variable
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const createComponent = () => {
          const Box = () => {}

          const Component = () => {
            return (
              <Box csx={{ display: 'grid' }} />
            )
          }

          return Component
        }
      `,
    },
  ],

  invalid: [
    // when csx is a literal object expression
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const Component = () => {
          return (
            <Box csx={{ display: 'grid' }} />
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Grid component instead.',
        },
      ],
    },

    // when csx is a literal object expression and has close tag
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const Component = () => {
          return (
            <Box csx={{ display: 'grid' }}>
              Content
            </Box>
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Grid component instead.',
        },
      ],
    },

    // when csx is a variable reference
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const styles = {
          display: 'grid',
        }

        const Component = () => {
          return (
            <Box csx={styles} />
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Grid component instead.',
        },
      ],
    },

    // when inner scopes is shadowing the variable reference
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const styles = {
          display: 'block',
        }

        const Component = () => {
          const styles = {
            display: 'grid',
          }

          return (
            <Box csx={styles} />
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Grid component instead.',
        },
      ],
    },
  ],
})
