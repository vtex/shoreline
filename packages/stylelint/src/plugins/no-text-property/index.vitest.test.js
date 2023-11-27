import { test, expect } from 'vitest'

const plugin = require('.')

const { ruleName, messages } = plugin

const stylelint = require('stylelint')

test('it allows the use of valid typography properties and values', async () => {
  const code = `
    font: var(--sl-text-body-font);
  `

  const result = await stylelint.lint({
    code,
    config: { plugins: [plugin], rules: { [ruleName]: true } },
  })

  expect(result.results[0].warnings).toHaveLength(0)
})

test('it disallows the use of invalid typography properties', async () => {
  const code = `
    text: var(--sl-text-body);
  `

  const result = await stylelint.lint({
    code,
    config: { plugins: [plugin], rules: { [ruleName]: true } },
  })

  expect(result.results[0].warnings).toHaveLength(1)

  const warning = result.results[0].warnings[0]

  expect(warning.rule).toBe(ruleName)
  expect(warning.severity).toBe('error')
  expect(warning.text).toBe(messages.expected)
})

test('it fix the error of invalid typography property usage to a valid one', async () => {
  const code = `
    text: var(--sl-text-body);
  `

  const result = await stylelint.lint({
    code,
    config: {
      fix: true,
      plugins: [plugin],
      rules: { [ruleName]: true },
    },
  })

  expect(result.results[0].warnings).toHaveLength(0)

  expect(result.results[0].warnings).toHaveLength(0)

  expect(result.output).toBe(`
    font: var(--sl-text-body-font);
    letter-spacing: var(--sl-text-body-letter-spacing);
  `)
})
