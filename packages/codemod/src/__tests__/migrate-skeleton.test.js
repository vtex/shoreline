/* eslint-disable no-template-curly-in-string */
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../migrate-skeleton')

transform.parser = 'tsx'

describe('Replace imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Skeleton } from "@vtex/admin-ui";\n<Skeleton />',
    'import { Skeleton } from "@vtex/shoreline";\n<Skeleton />',
    'replace'
  )

  defineInlineTest(
    transform,
    {},
    'import { Skeleton } from "@vtex/admin-ui";\nimport { A } from "@vtex/shoreline";\n<Skeleton />',
    'import { A, Skeleton } from "@vtex/shoreline";\n<Skeleton />',
    'add to existing import'
  )
})
