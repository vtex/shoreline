const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const tagTransform = require('../tag-review')

describe('Tag sizes', () => {
  defineInlineTest(
    tagTransform,
    {},
    '<Tag size="regular" label="Short text" />',
    '<Tag size="normal" label="Short text" />',
    'change from regular to normal'
  )

  defineInlineTest(
    tagTransform,
    {},
    '<Tag size="small" label="Short text" />',
    '<Tag size="normal" label="Short text" />',
    'change from small to normal'
  )
})

describe('Removes tag props', () => {
  defineInlineTest(
    tagTransform,
    {},
    '<Tag handleDelete={() => null} label="Short text" />',
    '<Tag label="Short text" />',
    'removes handleDelete property'
  )

  defineInlineTest(
    tagTransform,
    {},
    '<Tag icon={<Icon />} label="Short text" />',
    '<Tag label="Short text" />',
    'removes icon property'
  )

  defineInlineTest(
    tagTransform,
    {},
    '<Tag handleDelete={() => null} icon={<Icon />} label="Short text" />',
    '<Tag label="Short text" />',
    'removes handleDelete and icon property'
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
