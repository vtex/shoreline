const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const radioTransform = require('../radio-review')

describe('Preserve Radio', () => {
  defineInlineTest(
    radioTransform,
    {},
    '<Radio />',
    '<Radio />',
    'preserve Radio self closing'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<Radio disabled checked />',
    '<Radio disabled checked />',
    'preserve props'
  )
})

describe('Radio sizes', () => {
  defineInlineTest(
    radioTransform,
    {},
    '<Radio size="regular" />',
    '<Radio />',
    'remove size property and its value'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<Radio size="small" />',
    '<Radio />',
    'remove size property and its value'
  )
})

describe('Radio states', () => {
  defineInlineTest(
    radioTransform,
    {},
    '<Radio state={radioState} />',
    '<Radio />',
    'remove state property and its value'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<Radio state={state} />',
    '<Radio />',
    'remove state property and its value'
  )
})

describe('Preserve RadioGroup', () => {
  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup />',
    '<RadioGroup />',
    'preserve RadioGroup self closing'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup><Radio /></RadioGroup>',
    '<RadioGroup><Radio /></RadioGroup>',
    'preserve RadioGroups w/ children'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup label="Group Label" state={state} />',
    '<RadioGroup label="Group Label" state={state} />',
    'preserve props'
  )
})

describe('RadioGroup sizes', () => {
  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup size="regular" />',
    '<RadioGroup />',
    'remove size property and its value'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup size="small" />',
    '<RadioGroup />',
    'remove size property and its value'
  )
})

describe('RadioGroup direction', () => {
  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup orientation="vertical" />',
    '<RadioGroup direction="column" />',
    'replace orientation property by direction'
  )

  defineInlineTest(
    radioTransform,
    {},
    '<RadioGroup orientation="horizontal" />',
    '<RadioGroup direction="row" />',
    'replace orientation property by direction'
  )
})
