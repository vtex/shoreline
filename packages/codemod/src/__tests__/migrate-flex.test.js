const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../migrate-flex')

transform.parser = 'tsx'

describe('Preserve supported Flex usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Flex align="center" />',
    'import { Flex } from "@vtex/shoreline";\n<Flex align="center" />',
    'basic'
  )

  defineInlineTest(
    transform,
    {},
    '<Flex align={alignVar} />',
    'import { Flex } from "@vtex/shoreline";\n<Flex align={alignVar} />',
    'with variables'
  )

  defineInlineTest(
    transform,
    {},
    '<Flex align="center" style={{}} />',
    'import { Flex } from "@vtex/shoreline";\n<Flex align="center" style={{}} />',
    'with other attributes'
  )
})

describe('Replace imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Flex } from "@vtex/admin-ui";\n<Flex align="center" />',
    'import { Flex } from "@vtex/shoreline";\n<Flex align="center" />',
    'replace'
  )

  defineInlineTest(
    transform,
    {},
    'import { Flex } from "@vtex/admin-ui";\nimport { A } from "@vtex/shoreline";\n<Flex align="center" />',
    'import { A, Flex } from "@vtex/shoreline";\n<Flex align="center" />',
    'add to existing import'
  )
})

describe('Keep admin-ui Flex for unsupported usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Flex align={{mobile: "left", desktop: "center"}} />',
    'import { Flex as FlexLegacy } from "@vtex/admin-ui";\n<FlexLegacy align={{mobile: "left", desktop: "center"}} />',
    'adds named import and renames to FlexLegacy'
  )

  defineInlineTest(
    transform,
    {},
    'import { A } from "@vtex/admin-ui";<Flex align={{mobile: "left", desktop: "center"}} />',
    'import { A, Flex as FlexLegacy } from "@vtex/admin-ui";<FlexLegacy align={{mobile: "left", desktop: "center"}} />',
    'doesnt duplicate import'
  )

  defineInlineTest(
    transform,
    {},
    '<><Flex align={{mobile: "left", desktop: "center"}}></Flex><Flex align="center"></Flex></>',
    'import { Flex as FlexLegacy } from "@vtex/admin-ui";\nimport { Flex } from "@vtex/shoreline";\n<><FlexLegacy align={{mobile: "left", desktop: "center"}}></FlexLegacy><Flex align="center"></Flex></>',
    'adds named import and renames to FlexLegacy'
  )
})
