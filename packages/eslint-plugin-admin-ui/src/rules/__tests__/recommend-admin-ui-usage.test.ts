import { RuleTester } from 'eslint'

import { recommendAdminUiUsage } from '../recommend-admin-ui-usage'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run('recommend-admin-ui-usage', recommendAdminUiUsage, {
  valid: [
    {
      code: `
          import { Button } from '@vtex/admin-ui'
      `,
    },
    {
      code: `
          import { Toggle } from '@vtex/styleguide'
      `,
    },
  ],

  invalid: [
    // when is function declaration
    {
      code: `
          import { Button } from '@vtex/styleguide'
      `,
      errors: [
        {
          type: 'ImportDeclaration',
          message: 'Try using the Button from @vtex/admin-ui instead.',
        },
      ],
    },

    {
      code: `
          import { Button as AdminButton } from '@vtex/styleguide'
      `,
      errors: [
        {
          type: 'ImportDeclaration',
          message: 'Try using the Button from @vtex/admin-ui instead.',
        },
      ],
    },

    {
      code: `
          import { Button } from 'vtex.styleguide'
      `,
      errors: [
        {
          type: 'ImportDeclaration',
          message: 'Try using the Button from @vtex/admin-ui instead.',
        },
      ],
    },

    {
      code: `
          import { Button } from '@vtex/styleguide/lib/Button'
      `,
      errors: [
        {
          type: 'ImportDeclaration',
          message: 'Try using the Button from @vtex/admin-ui instead.',
        },
      ],
    },
  ],
})
