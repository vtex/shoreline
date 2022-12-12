const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const borderRadiusTokenTransform = require('../radius-tokens-review')

describe('Other token interactions', () => {
  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "<div csx={{color: '$blue'}} />",
    "<div csx={{color: '$blue'}} />",
    'preserves non-border tokens'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "<div csx={{color: '#000002', borderRadius: '10px'}} />",
    "<div csx={{color: '#000002', borderRadius: '10px'}} />",
    'preserves raw values'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "const styles = {...other, borderRadius: '$default'}; <div csx={styles} />",
    "const styles = {...other, borderRadius: '$base'}; <div csx={styles} />",
    'handles spread operator'
  )
})

describe('Responsive tokens', () => {
  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "export const baseline = style({ borderRadius: {mobile: '$flat', tablet: '$circle'} })",
    "export const baseline = style({ borderRadius: {mobile: '$none', tablet: '$pill'} })",
    'handles responsive token'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "export const baseline = style({ borderRadius: {mobile: condition ? 'default' : 'pill', tablet: 'default'} })",
    "export const baseline = style({ borderRadius: {mobile: condition ? '$base' : '100px', tablet: '$base'} })",
    'handles responsive conditional tokens'
  )
})

describe('Token transform', () => {
  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "<Button csx={{ borderRadius: '$default' }} />",
    "<Button csx={{ borderRadius: '$base' }} />",
    'transforms with single prop'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "<div csx={{ borderRadius: 'pill', borderBottomLeftRadius: 'flat' }} />",
    "<div csx={{ borderRadius: '100px', borderBottomLeftRadius: '$none' }} />",
    'handles tokens without $'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "<div csx={{ color: '$blue', width: '2rem', margin: '5rem 6rem', borderBottomLeftRadius: 'flat' }} />",
    "<div csx={{ color: '$blue', width: '2rem', margin: '5rem 6rem', borderBottomLeftRadius: '$none' }} />",
    'handles mixed css'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "const styles = {borderRadius: '$default'}; <div csx={styles} />",
    "const styles = {borderRadius: '$base'}; <div csx={styles} />",
    'handles csx as variable'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "export const baseline = style({width: '100%', position: 'fixed', '> *': { borderRadius: '$flat', }})",
    "export const baseline = style({width: '100%', position: 'fixed', '> *': { borderRadius: '$none', }})",
    'handles selectors'
  )

  defineInlineTest(
    borderRadiusTokenTransform,
    {},
    "export const baseline = style({ borderRadius: true ? 'default' : 'pill' })",
    "export const baseline = style({ borderRadius: true ? '$base' : '100px' })",
    'handles conditional expression'
  )
})
