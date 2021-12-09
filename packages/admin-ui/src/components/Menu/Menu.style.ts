import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'

function css(csx: StyleProp) {
  return csx
}

export const item = css({
  marginY: '2px',
  paddingX: 1,
  fontSize: 1,
  border: 'none',
  textTransform: 'initial',
  width: 'full',
  div: {
    justifyContent: 'flex-start',
  },
  height: 32,
  svg: {
    margin: 1,
    size: 20,
    minWidth: 20,
    minHeight: 20,
    marginLeft: 0,
    marginRight: 2,
  },
  fontFamily: 'sans',
  fontSettings: 'regular',
  borderRadius: 'default',
  cursor: 'pointer',
  position: 'relative',
})

export function itemVariant(tone: 'main' | 'critical') {
  return css({
    ...focusVisible(tone),
    bg: `$action.${tone}.tertiary`,
    color: `$action.${tone}.tertiary`,
    ':hover': {
      color: `$action.${tone}.tertiaryHover`,
      bg: `$action.${tone}.tertiaryHover`,
    },
    ':active': {
      color: `$action.${tone}.tertiaryPressed`,
      bg: `$action.${tone}.tertiaryPressed`,
    },
    ':disabled': {
      color: '$disabled',
      bg: '$disabled',
    },
  })
}

export const list = css({
  outline: 'none',
  zIndex: 999,
  display: 'flex',
  flexDirection: 'column',
  bg: '$primary',
  padding: 3,
  minWidth: 18,
  border: '$neutral',
  borderRadius: 3,
  boxShadow: '$overlay.center',
})

export const separator = css({
  marginY: 2,
  borderBottom: '$neutral',
  width: (theme) => `calc(100% -${theme.space?.[3]})`,
  marginX: (theme) => `-${theme.space?.[3]}`,
  outline: 'none',
})
