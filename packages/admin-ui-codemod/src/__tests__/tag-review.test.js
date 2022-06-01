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
    '<Switch label="Short text" />',
    '<Switch label="Short text" />',
    'preserve props'
  )
})
