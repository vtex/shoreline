const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const spaceTokenTransform = require('../space-tokens-review')

describe('Other token interactions', () => {
  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{color: '$blue'}} />",
    "<div csx={{color: '$blue'}} />",
    'preserves non-spacing tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{color: '#000002', margin: '2rem 4rem', paddingBottom: '2rem', height: 1}} />",
    "<div csx={{color: '#000002', margin: '2rem 4rem', paddingBottom: '2rem', height: 1}} />",
    'preserves raw values'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{margin: '2rem 4rem', paddingBottom: '$xs', paddingRight: '$space-1'}} />",
    "<div csx={{margin: '2rem 4rem', paddingBottom: '$space-0', paddingRight: '$space-1'}} />",
    'changes only deprecated space tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    'export const baseline = style({ padding: true ? 1 : 2 })',
    'export const baseline = style({ padding: true ? 1 : 2 })',
    'handles conditional expression with integer tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "const styles = {...other, padding: '$xs'}; <div csx={styles} />",
    "const styles = {...other, padding: '$space-1 $space-2'}; <div csx={styles} />",
    'handles spread operator'
  )
})

describe('Responsive tokens', () => {
  defineInlineTest(
    spaceTokenTransform,
    {},
    "export const baseline = style({ padding: {mobile: '$xs', tablet: '$l'} })",
    "export const baseline = style({ padding: {mobile: '$space-1 $space-2', tablet: '$space-4 $space-5'} })",
    'transforms responsive token based on css key'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "export const baseline = style({ paddingY: {mobile: negative('$s'), tablet: '$l'} })",
    "export const baseline = style({ paddingY: {mobile: negative('$space-05'), tablet: '$space-2'} })",
    'handles negative tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "export const baseline = style({ paddingY: {mobile: condition ? '$s' : '$xs', tablet: '$l'} })",
    "export const baseline = style({ paddingY: {mobile: condition ? '$space-05' : '$space-0', tablet: '$space-2'} })",
    'handles negative tokens'
  )
})

describe('Token transform', () => {
  defineInlineTest(
    spaceTokenTransform,
    {},
    "<Button csx={{ paddingTop: '$l' }} />",
    "<Button csx={{ paddingTop: '$space-2' }} />",
    'transforms with single prop'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{ paddingRight: '$l', paddingLeft: '$m' }} />",
    "<div csx={{ paddingRight: '$space-3', paddingLeft: '$space-2' }} />",
    'handles horizontal context tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{ paddingTop: '$l', paddingBottom: '$m' }} />",
    "<div csx={{ paddingTop: '$space-2', paddingBottom: '$space-1' }} />",
    'handles vertical context tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{ padding: '$l', margin: '$m' }} />",
    "<div csx={{ padding: '$space-4 $space-5', margin: '$space-3 $space-4' }} />",
    'handles composite tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{ padding: 'l', margin: 'm' }} />",
    "<div csx={{ padding: '$space-4 $space-5', margin: '$space-3 $space-4' }} />",
    'handles tokens without $'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{ color: '$blue', width: '2rem', padding: 'l', margin: '5rem 6rem', marginBottom: '$xs' }} />",
    "<div csx={{ color: '$blue', width: '2rem', padding: '$space-4 $space-5', margin: '5rem 6rem', marginBottom: '$space-0' }} />",
    'handles mixed css'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "const styles = {padding: '$xs'}; <div csx={styles} />",
    "const styles = {padding: '$space-1 $space-2'}; <div csx={styles} />",
    'handles csx as variable'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "export const baseline = style({width: '100%', position: 'fixed', bottom: '$2xl', left: 0, '> *': { padding: '$xs', }})",
    "export const baseline = style({width: '100%', position: 'fixed', bottom: '$space-6', left: 0, '> *': { padding: '$space-1 $space-2', }})",
    'handles selectors'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "export const baseline = style({ padding: true ? '$xs' : '$l' })",
    "export const baseline = style({ padding: true ? '$space-1 $space-2' : '$space-4 $space-5' })",
    'handles conditional expressions'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "export const baseline = style({ paddingX: negative('xs') })",
    "export const baseline = style({ paddingX: negative('$space-05') })",
    'handles negative tokens'
  )
})

describe('Tokens as jsx attributes', () => {
  defineInlineTest(
    spaceTokenTransform,
    {},
    '<Bleed top="$xl" left="$xs"/>',
    '<Bleed top="$space-4" left="$space-05"/>',
    'transforms bleed props'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    '<Stack space="$l"/>',
    '<Stack space="$space-2"/>',
    'transforms stack props'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    '<Inline vSpace="$xl" hSpace="$xl"/>',
    '<Inline vSpace="$space-4" hSpace="$space-5"/>',
    'transforms inline props'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    '<Columns space="$m"/>',
    '<Columns space="$space-2"/>',
    'transforms columns props'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    '<Stack direction="row" space="$l"/>',
    '<Stack direction="row" space="$space-3"/>',
    'uses stacks direction for context'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<Columns space={{mobile: negative('$s'), tablet: '$l'}}/>",
    "<Columns space={{mobile: negative(\"$space-1\"), tablet: \"$space-3\"}}/>",
    'handles responsive values'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<Columns space={negative('$s')} />",
    "<Columns space={negative(\"$space-1\")} />",
    'handles negative values'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<Columns space={condition ? '$xs' : '$s'} />",
    "<Columns space={condition ? \"$space-05\" : \"$space-1\"} />",
    'handles conditional values'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    '<Bleed bottom={"$xs"} />',
    '<Bleed bottom={"$space-0"} />',
    'handles string inside expression'
  )
})
