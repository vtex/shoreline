const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const switchTransform = require('../toggle-to-switch')

describe('Modify imports', () => {
  defineInlineTest(
    switchTransform,
    {},
    'import { Toggle } from "@vtex/admin-ui"',
    'import { Switch } from "@vtex/admin-ui"',
    'single imports'
  )

  defineInlineTest(
    switchTransform,
    {},
    'import { Toggle, Button, DataGrid } from "@vtex/admin-ui"',
    'import { Switch, Button, DataGrid } from "@vtex/admin-ui"',
    'multiple imports'
  )

  defineInlineTest(
    switchTransform,
    {},
    'import { Toggle, Button, DataGrid } from "../"',
    'import { Switch, Button, DataGrid } from "../"',
    'local imports'
  )
})

describe('Toggle to Swtich', () => {
  defineInlineTest(
    switchTransform,
    {},
    '<Toggle />',
    '<Switch label="" />',
    'replaces toggle to switch'
  )
})

describe('Switch sizes', () => {
  defineInlineTest(
    switchTransform,
    {},
    '<Switch size="regular" />',
    '<Switch />',
    'remove size property and its value'
  )

  defineInlineTest(
    switchTransform,
    {},
    '<Switch size="small" />',
    '<Switch />',
    'remove size property and its value'
  )
})

describe('Preserve Switch', () => {
  defineInlineTest(
    switchTransform,
    {},
    '<Switch label="Label" state={state} />',
    '<Switch label="Label" state={state} />',
    'preserve props'
  )
})
