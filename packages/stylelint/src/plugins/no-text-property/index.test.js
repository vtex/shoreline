const { ruleName, messages } = require('.')

// eslint-disable-next-line no-undef
testRule({
  fix: true,
  ruleName,
  plugins: [__dirname],
  config: {},
  accept: [
    {
      code: 'font: var(--sl-text-body-font)',
      description: 'Defining a font',
    },
    {
      code: 'letter-spacing: var(--sl-text-body-letter-spacing)',
      description: 'Defining a letter-spacing',
    },
  ],
  reject: [
    {
      code: `text: var(--sl-text-body)`,
      fixed: `font: var(--sl-text-body-font);letter-spacing: var(--sl-text-body-letter-spacing)`,
      description: 'Defining a text rule',
      message: messages.expected,
    },
    {
      code: `text: test`,
      fixed: `font: test;letter-spacing: test`,
      description: 'Defining a disallowed include name with a namespace',
      message: messages.expected,
    },
    {
      code: `text: var(--sl-my-custom-text-token)`,
      fixed: `font: var(--sl-my-custom-text-token);letter-spacing: var(--sl-my-custom-text-token)`,
      description: 'Defining a disallowed include name with a namespace',
      message: messages.expected,
    },
  ],
})
