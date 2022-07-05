const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const alertTransform = require('../alert-review')

describe('Removes deprecated Alert props', () => {
  defineInlineTest(
    alertTransform,
    {},
    '<Alert sticky>Hello world</Alert>',
    '<Alert>Hello world</Alert>',
    'removes sticky property'
  )

  defineInlineTest(
    alertTransform,
    {},
    '<Alert icon={<Icon />} >Hello world</Alert>',
    '<Alert>Hello world</Alert>',
    'removes icon property'
  )

  defineInlineTest(
    alertTransform,
    {},
    '<Alert fluid>Hello world</Alert>',
    '<Alert>Hello world</Alert>',
    'removes fluid property'
  )

  defineInlineTest(
    alertTransform,
    {},
    '<Alert visible>Hello world</Alert>',
    '<Alert>Hello world</Alert>',
    'removes visible property'
  )

  defineInlineTest(
    alertTransform,
    {},
    '<Alert fluid={true} sticky={false} visible icon={<Icon />}>Hello world</Alert>',
    '<Alert>Hello world</Alert>',
    'removes all deprecated properties'
  )
})

describe('Replace tone by variant', () => {
  defineInlineTest(
    alertTransform,
    {},
    '<Alert tone="positive">Hello world</Alert>',
    '<Alert variant="positive">Hello world</Alert>',
    'replace tone by variant'
  )
})
