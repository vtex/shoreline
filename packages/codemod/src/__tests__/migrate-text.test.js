const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../migrate-text')

transform.parser = 'tsx'

describe('Replace imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Text } from "@vtex/admin-ui";\n<Text variant="body" />',
    'import { Text } from "@vtex/shoreline";\n<Text variant="body" />',
    'replace'
  )

  defineInlineTest(
    transform,
    {},
    'import { Text } from "@vtex/admin-ui";\nimport { A } from "@vtex/shoreline";\n<Text variant="body" />',
    'import { A, Text } from "@vtex/shoreline";\n<Text variant="body" />',
    'add to existing import'
  )
})

describe('Replace variant', () => {
  defineInlineTest(
    transform,
    {},
    '<Text variant="pageTitle" />',
    'import { Text } from "@vtex/shoreline";\n<Text variant="display1" />',
    'replace variant'
  )

  defineInlineTest(
    transform,
    {},
    '<Text />',
    'import { Text } from "@vtex/shoreline";\n<Text variant="body" />',
    'insert body if there is no variant'
  )

  defineInlineTest(
    transform,
    {},
    '<Text variant={variantVar} />',
    'import { Text } from "@vtex/shoreline";\n<Text variant={variantVar} />',
    'leave variables unchanged'
  )
})

describe('Replace tone', () => {
  defineInlineTest(
    transform,
    {},
    '<Text tone="critical" />',
    'import { Text } from "@vtex/shoreline";\n<Text variant="body" style={{\n  color: "var(--sl-fg-critical)"\n}} />',
    'replace with style object'
  )

  defineInlineTest(
    transform,
    {},
    '<Text variant="pageTitle" style={{some: "style"}} tone="warning" />',
    'import { Text } from "@vtex/shoreline";\n<Text\n  variant="display1"\n  style={{\n    some: "style",\n    color: "var(--sl-fg-warning)"\n  }} />',
    'add to object if there is a style prop already'
  )
})
