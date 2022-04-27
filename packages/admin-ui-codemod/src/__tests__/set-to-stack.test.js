const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../set-to-stack')

describe('Modify imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Set } from "@vtex/admin-ui"',
    'import { Stack } from "@vtex/admin-ui"',
    'single imports'
  )

  defineInlineTest(
    transform,
    {},
    'import { Set, Button, DataGrid } from "@vtex/admin-ui"',
    'import { Stack, Button, DataGrid } from "@vtex/admin-ui"',
    'multiple imports'
  )

  defineInlineTest(
    transform,
    {},
    'import { Set, Button, DataGrid } from "../"',
    'import { Stack, Button, DataGrid } from "../"',
    'local imports'
  )
})

describe('Switch for Stack', () => {
  defineInlineTest(
    transform,
    {},
    '<Set />',
    '<Stack direction="row" />',
    'choose stack w/ row'
  )

  defineInlineTest(
    transform,
    {},
    '<Set></Set>',
    '<Stack direction="row"></Stack>',
    'choose stack w/ row w/ closing'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="horizontal" />',
    '<Stack direction="row" />',
    'choose stack w/ row'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="vertical" />',
    '<Stack />',
    'choose stack w/column'
  )
})

describe('Spacing to space', () => {
  defineInlineTest(
    transform,
    {},
    '<Set spacing="1" />',
    '<Stack space="1" direction="row" />',
    'inline w/ space'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="horizontal" spacing="1" />',
    '<Stack direction="row" space="1" />',
    'stack w/ row & space'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="vertical" spacing="1" />',
    '<Stack space="1" />',
    'stack w/ column & space'
  )
})
