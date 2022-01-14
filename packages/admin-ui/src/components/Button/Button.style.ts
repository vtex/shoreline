import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'

type ActionTone = 'main' | 'critical' | 'neutral'
type ActionVariant = 'primary' | 'secondary' | 'tertiary'
type IconVariant = 'none' | 'start' | 'end' | 'only'

function css(csx: StyleProp): StyleProp {
  return csx
}

export function action(options: { tone: ActionTone; variant: ActionVariant }) {
  const { tone, variant } = options

  return css({
    color: `action.${tone}.${variant}`,
    bg: `action.${tone}.${variant}`,
    ':hover': {
      color: `action.${tone}.${variant}Hover`,
      bg: `action.${tone}.${variant}Hover`,
    },
    ':active': {
      color: `action.${tone}.${variant}Pressed`,
      bg: `action.${tone}.${variant}Pressed`,
    },
    ...focusVisible(tone),
  })
}

export const baseline = css({
  text: '$action1',
  border: 'none',
  borderRadius: 'default',
  cursor: 'pointer',
  position: 'relative',
  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
  },
})

export const small = (options: { icon: IconVariant }) => {
  const { icon = 'none' } = options

  const space = {
    none: {
      paddingLeft: 3,
      paddingRight: 3,
    },
    start: {
      paddingLeft: 2,
      paddingRight: 3,
    },
    end: {
      paddingLeft: 3,
      paddingRight: 2,
    },
    only: {
      paddingLeft: '2px',
      paddingRight: '2px',
    },
  }[icon]

  return css({
    height: 32,
    width: icon !== 'only' ? 'auto' : 32,
    ...space,
  })
}

export const regular = (options: { icon: IconVariant }) => {
  const { icon = 'none' } = options

  const space = {
    none: {
      paddingLeft: 4,
      paddingRight: 4,
    },
    start: {
      paddingLeft: 2,
      paddingRight: 3,
    },
    end: {
      paddingLeft: 3,
      paddingRight: 2,
    },
    only: {
      paddingLeft: 1,
      paddingRight: 1,
    },
  }[icon]

  return css({
    height: 40,
    width: icon !== 'only' ? 'auto' : 40,
    ...space,
  })
}

export const outerContainer = css({
  display: 'flex',
  height: 'full',
  width: 'full',
  margin: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  text: '$action1',
})

export const svg = () =>
  css({
    margin: 1,
  })

export const innerContainer = (options: {
  loading: boolean
  iconEnd: boolean
}) => {
  const { loading, iconEnd } = options

  return css({
    text: '$action1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    visibility: loading ? 'hidden' : 'visible',
    flexDirection: iconEnd ? 'row-reverse' : 'row',
  })
}

export const spinnerContainer = css({
  text: '$action1',
  position: 'absolute',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
})
