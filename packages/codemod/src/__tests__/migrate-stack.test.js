const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../migrate-stack')

transform.parser = 'tsx'

describe('Preserve supported Stack usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Stack fluid={true} />',
    'import { Stack } from "@vtex/shoreline";\n<Stack fluid={true} />',
    'basic'
  )

  defineInlineTest(
    transform,
    {},
    '<Stack space={spaceVar} />',
    'import { Stack } from "@vtex/shoreline";\n<Stack space={spaceVar} />',
    'with variables'
  )

  defineInlineTest(
    transform,
    {},
    '<Stack space="$space-4" ref={ref} {...props} />',
    'import { Stack } from "@vtex/shoreline";\n<Stack space="$space-4" ref={ref} {...props} />',
    'with other attributes'
  )
})

describe('Replace direction prop', () => {
  defineInlineTest(
    transform,
    {},
    '<Stack direction="column" />',
    'import { Stack } from "@vtex/shoreline";\n<Stack horizontal={false} />',
    'replace column with false'
  )

  defineInlineTest(
    transform,
    {},
    '<Stack direction="row" />',
    'import { Stack } from "@vtex/shoreline";\n<Stack horizontal={true} />',
    'replace row with horizontal true'
  )
})

describe('Replace imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Stack } from "@vtex/admin-ui";\n<Stack fluid={true} />',
    'import { Stack } from "@vtex/shoreline";\n<Stack fluid={true} />',
    'replace'
  )

  defineInlineTest(
    transform,
    {},
    'import { Stack } from "@vtex/admin-ui";\nimport { A } from "@vtex/shoreline";\n<Stack />',
    'import { A, Stack } from "@vtex/shoreline";\n<Stack />',
    'add to existing import'
  )
})

describe('Keep admin-ui Stack for unsupported usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Stack fluid={{mobile: true, desktop: false}} />',
    'import { Stack as StackLegacy } from "@vtex/admin-ui";\n<StackLegacy fluid={{mobile: true, desktop: false}} />',
    'adds named import and renames to StackLegacy'
  )

  defineInlineTest(
    transform,
    {},
    'import { A } from "@vtex/admin-ui";<Stack fluid={{mobile: true, desktop: false}} />',
    'import { A, Stack as StackLegacy } from "@vtex/admin-ui";<StackLegacy fluid={{mobile: true, desktop: false}} />',
    'doesnt duplicate import'
  )

  defineInlineTest(
    transform,
    {},
    '<><Stack space={{mobile: 0, desktop: 2}}></Stack><Stack space="$space-2"></Stack></>',
    'import { Stack as StackLegacy } from "@vtex/admin-ui";\nimport { Stack } from "@vtex/shoreline";\n<><StackLegacy space={{mobile: 0, desktop: 2}}></StackLegacy><Stack space="$space-2"></Stack></>',
    'adds named import and renames to StackLegacy'
  )
})
