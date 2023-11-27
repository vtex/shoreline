import { test, expect } from 'vitest'

const plugin = require('.')

const { ruleName, messages } = plugin

const stylelint = require('stylelint')

test('it allows the use of valid space values on space properties', async () => {
  const code = `
    margin: 1rem;
    padding: 1rem 0.5rem;
    padding-left: 1rem;
    top: 16px;
  `

  const result = await stylelint.lint({
    code,
    config: { plugins: [plugin], rules: { [ruleName]: true } },
  })

  expect(result.results[0].warnings).toHaveLength(0)
})

test('it disallows the use of px values on space properties', async () => {
  const code = `
    margin: 16px;
  `

  const result = await stylelint.lint({
    code,
    config: {
      plugins: [plugin],
      rules: { [ruleName]: true },
    },
  })

  expect(result.results[0].warnings).toHaveLength(1)

  const warning = result.results[0].warnings[0]

  expect(warning.rule).toBe(ruleName)
  expect(warning.severity).toBe('error')
  expect(warning.text).toBe(messages.expected('margin', '16px', '1rem'))
})

test('it fix the error of invalid space property value to a valid one', async () => {
  const code = `
    padding: 22px 8px;
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

  expect(result.output).toBe(`
    padding: 1.375rem 0.5rem;
  `)
})
