const adminUiTokens = require('../design-tokens-usage')

const { RuleTester } = require('eslint')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run('admin-ui-tokens', adminUiTokens, {
  valid: [
    {
      code: `
        <Button csx={{ bg: '$critical' }} />
      `,
    },
  ],

  invalid: [
    // when is function declaration
    {
      code: `
          <Button csx={{ color: '$fg.critical' }} />
      `,
      errors: [
        {
          type: 'JSXAttribute',
          message:
            'You do not need to use the "$fg." prefix when using this design token',
        },
      ],
    },
    {
      code: `
          <Button csx={{ backgroundColor: '$bg.critical' }} />
      `,
      errors: [
        {
          type: 'JSXAttribute',
          message:
            'You do not need to use the "$bg." prefix when using this design token',
        },
      ],
    },
    {
      code: `
          <Button csx={{ bg: '$bg.critical' }} />
      `,
      errors: [
        {
          type: 'JSXAttribute',
          message:
            'You do not need to use the "$bg." prefix when using this design token',
        },
      ],
    },
    {
      code: `
          <Button csx={{ border: '$border.critical' }} />
      `,
      errors: [
        {
          type: 'JSXAttribute',
          message:
            'You do not need to use the "$border." prefix when using this design token',
        },
      ],
    },
    {
      code: `
          <Button csx={{ boxShadow: '$shadow.critical' }} />
      `,
      errors: [
        {
          type: 'JSXAttribute',
          message:
            'You do not need to use the "$shadow." prefix when using this design token',
        },
      ],
    },
  ],
})
