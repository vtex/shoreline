const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const buttonTransform = require('../button-review')

describe('Button sizes', () => {
  defineInlineTest(
    buttonTransform,
    {},
    '<Button />',
    '<Button />',
    'preserve button self closing'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button>Text</Button>',
    '<Button>Text</Button>',
    'preserve button w/ children'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button disabled />',
    '<Button disabled />',
    'preserve props'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button size="small" />',
    '<Button size="normal" />',
    'change from small to normal'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button size="regular" />',
    '<Button size="normal" />',
    'change from regular to normal'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button size="regular" />',
    '<Button size="normal" />',
    'change from regular to normal'
  )
})

describe('Button variant', () => {
  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="primary" />',
    '<Button variant="primary" />',
    'keep primary'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="secondary" />',
    '<Button variant="secondary" />',
    'keep secondary'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="tertiary" />',
    '<Button variant="tertiary" />',
    'keep tertiary'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="adaptative-dark" />',
    '<Button variant="neutralTertiary" />',
    'change from adaptative to neutral'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="danger" />',
    '<Button variant="critical" />',
    'change from danger to critical'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="danger-secondary" />',
    '<Button variant="criticalSecondary" />',
    'change from danger-secondary to criticalSecondary'
  )

  defineInlineTest(
    buttonTransform,
    {},
    '<Button variant="danger-tertiary" />',
    '<Button variant="criticalTertiary" />',
    'change from danger-tertiary to criticalTertiary'
  )
})
