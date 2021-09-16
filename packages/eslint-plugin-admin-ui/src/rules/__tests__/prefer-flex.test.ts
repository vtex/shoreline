import { RuleTester } from 'eslint'
import { preferFlex } from '../prefer-flex'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run('prefer-flex', preferFlex, {
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
          display: 'flex',
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
            <Flex csx={{ display: 'flex' }} />
          )
        }
      `,
    },

    // when doesn't imports Box variable
    {
      code: `
        const Component = () => {
          return (
            <Box csx={{ display: 'flex' }} />
          )
        }
      `,
    },

    // when import Box, but display flex is applied to another component
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const Component = () => {
          return (
            <div csx={{ display: 'flex' }} />
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
              <Box csx={{ display: 'flex' }} />
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
            <Box csx={{ display: 'flex' }} />
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Flex component instead.',
        },
      ],
    },

    // when csx is a literal object expression and has close tag
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const Component = () => {
          return (
            <Box csx={{ display: 'flex' }}>
              Content
            </Box>
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Flex component instead.',
        },
      ],
    },

    // when csx is a variable reference
    {
      code: `
        import { Box } from '@vtex/admin-ui'

        const styles = {
          display: 'flex',
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
          message: 'Prefer use the Flex component instead.',
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
            display: 'flex',
          }

          return (
            <Box csx={styles} />
          )
        }
      `,
      errors: [
        {
          type: 'JSXOpeningElement',
          message: 'Prefer use the Flex component instead.',
        },
      ],
    },
  ],
})
