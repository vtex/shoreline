const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../remove-csx')

describe('Remove box imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Box } from "@vtex/admin-ui"',
    '',
    'single imports'
  )

  defineInlineTest(
    transform,
    {},
    'import { Box, Button, DataGrid } from "@vtex/admin-ui"',
    'import { Button, DataGrid } from "@vtex/admin-ui";',
    'multiple imports'
  )

  defineInlineTest(
    transform,
    {},
    'import { Box, Button, DataGrid } from "../"',
    'import { Button, DataGrid } from "../";',
    'local imports'
  )
})

describe('Change box to div', () => {
  defineInlineTest(transform, {}, '<Box />', '<div />', 'basic')

  defineInlineTest(
    transform,
    {},
    '<Box><span /></Box>',
    '<div><span /></div>',
    'children'
  )

  defineInlineTest(
    transform,
    {},
    '<Box as="p"><span /></Box>',
    '<p><span /></p>',
    'with as native'
  )

  defineInlineTest(
    transform,
    {},
    '<Box as="a" href="https://reakit.io/docs/role/" target="blank">\nLink\n</Box>',
    '<a href="https://reakit.io/docs/role/" target="blank">\nLink\n</a>',
    'fail'
  )

  defineInlineTest(
    transform,
    {},
    '<Box as={Component}><span /></Box>',
    '<Component><span /></Component>',
    'with as Component'
  )

  defineInlineTest(
    transform,
    {},
    '<Box as={Component} {...props}><span /></Box>',
    '<Component {...props}><span /></Component>',
    'handles nameless props'
  )

  defineInlineTest(
    transform,
    {},
    '<Box csx={{width: 2}} />',
    'import { csx } from "@vtex/admin-ui";\n<div className={csx({width: 2})} />',
    'with csx'
  )
})

describe('Convert csx to className', () => {
  defineInlineTest(
    transform,
    {},
    '<Stack csx={{}} />',
    'import { csx } from "@vtex/admin-ui";\n<Stack className={csx({})} />',
    'with object value'
  )

  defineInlineTest(
    transform,
    {},
    '<Stack csx={style.some} />',
    'import { csx } from "@vtex/admin-ui";\n<Stack className={csx(style.some)} />',
    'with variable value'
  )

  defineInlineTest(
    transform,
    {},
    '<Boo csx={true ? a : b} />',
    'import { csx } from "@vtex/admin-ui";\n<Boo className={csx(true ? a : b)} />',
    'with conditionals'
  )

  defineInlineTest(
    transform,
    {},
    "<Boo csx={{'> *': {'color': '$blue'}, 'font': 'bold'}} />",
    "import { csx } from \"@vtex/admin-ui\";\n<Boo className={csx({'> *': {'color': '$blue'}, 'font': 'bold'})} />",
    'with complex objects'
  )
})

describe('Add csx imports', () => {
  defineInlineTest(
    transform,
    {},
    "import { Columns, Column, IconArrowUpRight } from '@vtex/admin-ui'\n<Stack csx={{}} />",
    "import { Columns, Column, IconArrowUpRight, csx } from '@vtex/admin-ui';\n<Stack className={csx({})} />",
    'adds csx to existing import'
  )

  defineInlineTest(
    transform,
    {},
    "import { Columns, Column, csx, IconArrowUpRight } from '@vtex/admin-ui'\n<Stack csx={{}} />",
    "import { Columns, Column, csx, IconArrowUpRight } from '@vtex/admin-ui'\n<Stack className={csx({})} />",
    'doesnt duplicate csx on import'
  )

  defineInlineTest(
    transform,
    {},
    "import { Columns, Column, IconArrowUpRight } from 'some-lib'\n<Stack csx={{}} />",
    'import { csx } from "@vtex/admin-ui";\nimport { Columns, Column, IconArrowUpRight } from \'some-lib\'\n<Stack className={csx({})} />',
    'adds new import when needed'
  )

  defineInlineTest(
    transform,
    {},
    "import { Columns, Column, IconArrowUpRight } from '@vtex/admin-ui'\n<Stack bla={{}} />",
    "import { Columns, Column, IconArrowUpRight } from '@vtex/admin-ui'\n<Stack bla={{}} />",
    'doesnt add import if csx not used'
  )
})
