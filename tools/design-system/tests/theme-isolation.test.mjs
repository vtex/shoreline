import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { test } from 'node:test'

const require = createRequire(import.meta.url)
const {
  getThemeStylesheet,
} = require('../../../.storybook/theme-selection.cjs')

test('Storybook selects a single known theme stylesheet', () => {
  assert.match(getThemeStylesheet('sunrise'), /themes\/sunrise\/styles.css$/)
  assert.match(getThemeStylesheet('horizon'), /themes\/horizon\/styles.css$/)
  assert.throws(() => getThemeStylesheet('unknown'), /Unknown/)
  assert.throws(() => getThemeStylesheet('../sunrise'), /Unknown/)
})
