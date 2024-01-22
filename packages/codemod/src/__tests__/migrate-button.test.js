const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../migrate-button')

transform.parser = 'tsx'

describe('Preserve supported Button usecases', () => {
  defineInlineTest(
    transform,
    {},
    '<Button size="normal">Click me</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button size="normal">Click me</Button>',
    'basic'
  )

  defineInlineTest(
    transform,
    {},
    '<Button size={some}>Click me</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button size={some}>Click me</Button>',
    'with variables'
  )

  defineInlineTest(
    transform,
    {},
    '<Button size="normal" ref={ref} {...props}>{children}</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button size="normal" ref={ref} {...props}>{children}</Button>',
    'with other spread props'
  )
})

describe('Replace variant prop', () => {
  defineInlineTest(
    transform,
    {},
    '<Button variant="criticalSecondary">label</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button variant="criticalTertiary">label</Button>',
    'replace unsuported variants'
  )

  defineInlineTest(
    transform,
    {},
    '<Button variant={variable}>label</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button variant={variable}>label</Button>',
    'handle non-string values'
  )
})

describe('Replace imports', () => {
  defineInlineTest(
    transform,
    {},
    'import { Button } from "@vtex/admin-ui";\n<Button size="normal">Click me</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button size="normal">Click me</Button>',
    'replace'
  )

  defineInlineTest(
    transform,
    {},
    'import { Button } from "@vtex/admin-ui";\nimport { A } from "@vtex/shoreline";\n<Button size="normal">Click me</Button>',
    'import { A, Button } from "@vtex/shoreline";\n<Button size="normal">Click me</Button>',
    'add to existing import'
  )
})

describe('Replace icon prop', () => {
  defineInlineTest(
    transform,
    {},
    '<Button icon={<IconX />}>start</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button><IconX />start</Button>',
    'attaches icon to start of children when theres no specification'
  )

  defineInlineTest(
    transform,
    {},
    '<Button icon={<IconX />} iconPosition="start">start</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button><IconX />start</Button>',
    'attaches icon to start when specified, removes iconPosition prop'
  )

  defineInlineTest(
    transform,
    {},
    '<Button icon={<IconX />} iconPosition="end">end</Button>',
    'import { Button } from "@vtex/shoreline";\n<Button>end<IconX /></Button>',
    'attaches icon to end when specified, removes iconPosition prop'
  )

  defineInlineTest(
    transform,
    {},
    '<Button icon={<IconX />} />',
    'import { IconButton } from "@vtex/shoreline";\n<IconButton children={<IconX />} label="" />',
    'transforms to iconButton when theres no children'
  )
})

describe('Replace bleed prop', () => {
  defineInlineTest(
    transform,
    {},
    '<Button bleedY icon={<IconX />}>start</Button>',
    'import { Button, Bleed } from "@vtex/shoreline";\n<Bleed top="$space-2" bottom="$space-2"><Button><IconX />start</Button></Bleed>',
    'bleed y'
  )

  defineInlineTest(
    transform,
    {},
    '<Button bleedX icon={<IconX />}>start</Button>',
    'import { Button, Bleed } from "@vtex/shoreline";\n<Bleed left="$space-2" right="$space-2"><Button><IconX />start</Button></Bleed>',
    'bleed x'
  )
  defineInlineTest(
    transform,
    {},
    '<Button bleedX bleedY icon={<IconX />}>start</Button>',
    'import { Button, Bleed } from "@vtex/shoreline";\n<Bleed top="$space-2" bottom="$space-2" left="$space-2" right="$space-2"><Button><IconX />start</Button></Bleed>',
    'bleed both directions'
  )

  defineInlineTest(
    transform,
    {},
    '<Button bleedX bleedY icon={<IconX />} size="normal">start</Button>',
    'import { Button, Bleed } from "@vtex/shoreline";\n<Bleed top="$space-2" bottom="$space-2" left="$space-2" right="$space-2"><Button size="normal"><IconX />start</Button></Bleed>',
    'bleed size normal'
  )

  defineInlineTest(
    transform,
    {},
    '<Button bleedX bleedY icon={<IconX />} size="large">start</Button>',
    'import { Button, Bleed } from "@vtex/shoreline";\n<Bleed top="$space-3" bottom="$space-3" left="$space-3" right="$space-3"><Button size="large"><IconX />start</Button></Bleed>',
    'bleed size large'
  )

  defineInlineTest(
    transform,
    {},
    '<Button bleedX bleedY icon={<IconX />} />',
    'import { IconButton, Bleed } from "@vtex/shoreline";\n<Bleed top="$space-2" bottom="$space-2" left="$space-2" right="$space-2"><IconButton children={<IconX />} label="" /></Bleed>',
    'bleed icon only'
  )
})
