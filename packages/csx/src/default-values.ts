import { cssVar } from './css-var'
import type { FoundationDictionary, MixinDictionary } from './types'

/**
 * Default compound props of Beachfront
 */
export const defaultCompoundProps = {
  padding: true,
  margin: true,
}

/**
 * Default aliases of Beachfront
 */
export const defaultAliases = {
  bg: 'background',
  fg: 'color',
  radii: 'borderRadius',
  z: 'zIndex',
  '@tablet': '@media (min-width: var(--bf-bp--tablet))',
  '@desktop': '@media (min-width: var(--bf-bp--desktop))',
  '@widescreen': '@media (min-width: var(--bf-bp--widescreen))',
}

/**
 * Default foundations of Beachfront
 */
export const defaultFoundations: FoundationDictionary = {
  // border
  border: 'border',
  borderTop: 'border',
  borderRight: 'border',
  borderBottom: 'border',
  borderLeft: 'border',
  borderBlock: 'border',
  borderBlockEnd: 'border',
  borderBlockStart: 'border',
  borderInline: 'border',
  borderInlineEnd: 'border',
  borderInlineStart: 'border',

  // radii
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',

  // color
  color: 'fg',
  backgroundColor: 'bg',
  background: 'bg',
  fill: 'bg',
  stroke: 'fg',
  caretColor: 'fg',
  columnRuleColor: 'fg',
  outlineColor: 'fg',

  // elevation
  boxShadow: 'shadow',
  textShadow: 'shadow',
  zIndex: 'z',

  // space
  margin: 'space',
  padding: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  scrollPadding: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  gridGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  gridColumnGap: 'space',
  marginRight: 'space',
  marginLeft: 'space',
  marginX: 'space',
  paddingRight: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  scrollPaddingRight: 'space',
  scrollPaddingLeft: 'space',
  scrollPaddingX: 'space',
  right: 'space',
  left: 'space',
  gridRowGap: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  marginY: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  paddingY: 'space',
  scrollPaddingTop: 'space',
  scrollPaddingBottom: 'space',
  scrollPaddingY: 'space',
  top: 'space',
  bottom: 'space',

  // typography,
  fontFamily: 'ff',
  fontSize: 'fs',
  lineHeight: 'lh',
  letterSpacing: 'ls',
  fontVariationSettings: 'fw',
}

/**
 * Defaoult mixins of Beachfront
 */
export const defaultMixins: MixinDictionary = {
  /** Space */
  marginX: (value) => ({
    marginLeft: value,
    marginRight: value,
  }),
  marginY: (value) => ({
    marginTop: value,
    marginBottom: value,
  }),
  paddingX: (value) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  paddingY: (value) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  size: (value) => ({
    width: value,
    height: value,
  }),
  minSize: (value) => ({
    minWidth: value,
    minHeight: value,
  }),
  maxSize: (value) => ({
    maxWidth: value,
    maxHeight: value,
  }),
  absoluteSize: (value) => ({
    minWidth: value,
    minHeight: value,
    maxWidth: value,
    maxHeight: value,
  }),

  text: (value) => ({
    fontFamily: cssVar({ foundation: 'ff', token: String(value) }),
    fontWeight: cssVar({ foundation: 'fw', token: String(value) }),
    fontSize: cssVar({ foundation: 'fs', token: String(value) }),
    lineHeight: cssVar({ foundation: 'lh', token: String(value) }),
    letterSpacing: cssVar({ foundation: 'ls', token: String(value) }),
  }),
}
