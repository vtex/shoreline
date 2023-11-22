const { ruleName, messages } = require('.')

// eslint-disable-next-line no-undef
testRule({
  fix: true,
  ruleName,
  plugins: [__dirname],
  config: {},
  accept: [
    {
      code: 'margin: 1rem',
      description: 'Defining a margin',
    },
    {
      code: 'padding: 1rem 0.5rem',
      description: 'Defining a padding',
    },
    {
      code: 'padding-left: 1rem',
      description: 'Defining a padding-left',
    },
  ],
  reject: [
    {
      code: 'margin: 16px',
      fixed: 'margin: 1rem',
      description: 'Defining a margin',
      message: messages.expected('margin', '16px', '1rem'),
    },
    {
      code: 'padding: 16px 8px',
      description: 'Defining a padding',
      fixed: 'padding: 1rem 0.5rem',
      message: messages.expected('padding', '16px 8px', '1rem 0.5rem'),
    },
    {
      code: 'padding-left: 22px',
      description: 'Defining a padding-left',
      fixed: 'padding-left: 1.375rem',
      message: messages.expected('padding-left', '22px', '1.375rem'),
    },
  ],
})
