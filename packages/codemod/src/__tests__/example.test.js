const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../example')

describe('modify imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { tag } from "@vtex/admin-ui"',
    'import { Box } from "@vtex/admin-ui"',
    'package single import'
  )
})
