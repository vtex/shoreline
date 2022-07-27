const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../tag-to-box')

describe('modify imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { tag } from "@vtex/admin-ui"',
    'import { Box } from "@vtex/admin-ui"',
    'package single import'
  )

  defineInlineTest(
    transform,
    {},
    'import { tag, Button, Table } from "@vtex/admin-ui"',
    'import { Box, Button, Table } from "@vtex/admin-ui"',
    'package multiple imports'
  )

  defineInlineTest(
    transform,
    {},
    'import { Tag, Button, Table } from "@vtex/admin-ui"',
    'import { Tag, Button, Table } from "@vtex/admin-ui"',
    'case sensitive'
  )

  defineInlineTest(
    transform,
    {},
    'import { tag } from "../"',
    'import { Box } from "../"',
    'relative single import'
  )

  defineInlineTest(
    transform,
    {},
    'import { tag, Button, Table } from "../"',
    'import { Box, Button, Table } from "../"',
    'relative multiple imports'
  )
})

describe('tag.[el] to box', () => {
  defineInlineTest(transform, {}, '<Tag />', '<Tag />', 'case sensitive')

  defineInlineTest(
    transform,
    {},
    '<tag.div />',
    '<Box />',
    'div selft-closing element'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.img />',
    '<Box as="img" />',
    'selft-closing element'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.div></tag.div>',
    '<Box></Box>',
    'div closing element'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.section></tag.section>',
    '<Box as="section"></Box>',
    'closing element'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.div as={Composite} />',
    '<Box as={Composite} />',
    'div preserve as'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.div id="id" />',
    '<Box id="id" />',
    'div preserve attrs'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.a as={Link} />',
    '<Box as={Link} />',
    'element preserve as'
  )

  defineInlineTest(
    transform,
    {},
    '<tag.img id="id" />',
    '<Box as="img" id="id" />',
    'element preserve attrs'
  )
})
