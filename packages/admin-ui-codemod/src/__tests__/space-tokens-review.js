const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const spaceTokenTransform = require('../space-tokens-review')

describe('Other token interactions', () => {
  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{color: '$blue'}} />",
    "<div csx={{color: '$blue'}} />",
    'preserve non-spacing tokens'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{color: '#000002', margin: '2rem 4rem', paddingBottom: '2rem', height: 1}} />",
    "<div csx={{color: '#000002', margin: '2rem 4rem', paddingBottom: '2rem', height: 1}} />",
    'preserve raw values'
  )

  defineInlineTest(
    spaceTokenTransform,
    {},
    "<div csx={{margin: '2rem 4rem', paddingBottom: '$xs', paddingRight: '$space-1'}} />",
    "<div csx={{margin: '2rem 4rem', paddingBottom: '$space-0', paddingRight: '$space-1'}} />",
    'change only deprecated space tokens'
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
})
