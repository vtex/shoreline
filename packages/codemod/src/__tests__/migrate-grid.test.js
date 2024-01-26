/* eslint-disable no-template-curly-in-string */
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../migrate-grid')

transform.parser = 'tsx'

describe('Preserve supported Grid usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Grid gap="$space-3" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap="$space-3" />',
    'basic'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid gap={gapVar} />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap={gapVar} />',
    'with variables'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid gap="2rem" style={{}} {...props} />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap="2rem" style={{}} {...props} />',
    'with other attributes'
  )
})

describe('Replace imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Grid } from "@vtex/admin-ui";\n<Grid />',
    'import { Grid } from "@vtex/shoreline";\n<Grid />',
    'replace'
  )

  defineInlineTest(
    transform,
    {},
    'import { Grid } from "@vtex/admin-ui";\nimport { A } from "@vtex/shoreline";\n<Grid />',
    'import { A, Grid } from "@vtex/shoreline";\n<Grid />',
    'add to existing import'
  )
})

describe('Keep admin-ui Grid for unsupported usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Grid gap={{mobile: "1rem", desktop: "2rem"}} />',
    'import { Grid as GridLegacy } from "@vtex/admin-ui";\n<GridLegacy gap={{mobile: "1rem", desktop: "2rem"}} />',
    'adds named import and renames to GridLegacy'
  )

  defineInlineTest(
    transform,
    {},
    'import { A } from "@vtex/admin-ui";<Grid gap={{mobile: "1rem", desktop: "2rem"}} />',
    'import { A, Grid as GridLegacy } from "@vtex/admin-ui";<GridLegacy gap={{mobile: "1rem", desktop: "2rem"}} />',
    'doesnt duplicate import'
  )

  defineInlineTest(
    transform,
    {},
    '<><Grid gap={{mobile: "1rem", desktop: "2rem"}} /><Grid></Grid></>',
    'import { Grid as GridLegacy } from "@vtex/admin-ui";\nimport { Grid } from "@vtex/shoreline";\n<><GridLegacy gap={{mobile: "1rem", desktop: "2rem"}} /><Grid></Grid></>',
    'legacy mixed with migrated'
  )
})

describe('Rename props that changed name', () => {
  defineInlineTest(
    transform,
    {},
    '<Grid templateAreas="a b c" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid areas="a b c" />',
    'rename template areas'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid templateColumns="a b c" templateRows="d e f" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid columns="a b c" rows="d e f" />',
    'rename template columns and rows'
  )
})

describe('Remove rowGap and columnGap name', () => {
  defineInlineTest(
    transform,
    {},
    '<Grid rowGap="row" columnGap="column" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap="row column" />',
    'change rowGap and columnGap for equivalent gap'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid gap="general" rowGap="row" columnGap="column" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap="general" />',
    'prefer user gap variable if there is one'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid rowGap="row" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap="row 0rem" />',
    'handle just rowGap'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid columnGap="column" />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap="0rem column" />',
    'handle just columnGap'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid rowGap={x} />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap={`${x} 0rem`} />',
    'handle variables for gaps'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid rowGap={x} columnGap={y ? "a" : "b"} />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap={`${x} ${y ? "a" : "b"}`} />',
    'handle conditional expressions for gaps'
  )

  defineInlineTest(
    transform,
    {},
    '<Grid rowGap={y ? "4rem" : 2} columnGap={y ? varname : "b"} />',
    'import { Grid } from "@vtex/shoreline";\n<Grid gap={`${y ? "4rem" : "2"} ${y ? varname : "b"}`} />',
    'handle complex conditional expressions'
  )
})
