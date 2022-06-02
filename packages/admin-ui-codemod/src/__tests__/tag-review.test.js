const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const tagTransform = require('../tag-review')

describe('Tag sizes', () => {
  defineInlineTest(
    tagTransform,
    {},
    '<Tag size="regular" label="Short text" />',
    '<Tag label="Short text" />',
    'remove size property and its value'
  )

  defineInlineTest(
    tagTransform,
    {},
    '<Tag size="small" label="Short text" />',
    '<Tag label="Short text" />',
    'remove size property and its value'
  )
})

describe('Preserve Tag', () => {
  defineInlineTest(
    tagTransform,
    {},
    '<Tag label="Short text" variant="gray" />',
    '<Tag label="Short text" variant="gray" />',
    'preserve props'
  )
})

describe('Replace palette by variant', () => {
  defineInlineTest(
    tagTransform,
    {},
    '<Tag label="Short text" palette="gray" />',
    '<Tag label="Short text" variant="gray" />',
    'replace palette by variant'
  )
})
