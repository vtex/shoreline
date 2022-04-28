import { colors, focusVisible } from '@vtex/admin-ui-core'
import type { StyleProp } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

const css = (csx: StyleProp) => csx

const green40 = get(colors, 'green40')
const green50 = get(colors, 'green50')
const gray40 = get(colors, 'gray40')

// State styles
const active = css({ bg: green40 })
const inactive = css({
  height: '1.25rem',
  width: '2.25rem',
  top: '0.06rem',
  left: '0.06rem',
  marginRight: '0.125rem',
})
const hoverInactive = css({ bg: gray40 })
const hoverActive = css({
  bg: green50,
})
const trackDefault = css({
  bg: '$form.neutralInactive',
})

const thumbDimensions = css({
  '&:after': {
    width: '0.75rem',
    height: '0.75rem',
    margin: '0.25rem',
  },

  '&:checked': {
    '&:after': {
      transform: 'translateX(1rem)',
    },
  },

  '&:disabled': {
    '&:after': {
      bg: (theme) => get(theme, 'fg.disabled', ''),
      margin: '0.2rem',
    },
  },
})

export const thumb = css({
  bg: (theme) => get(theme, 'fg.form.neutralChecked'),
  content: '""',
  display: 'block',
  position: 'absolute',
  borderRadius: '1.25rem',
  transition: 'transform .25s ease',
})

export const track = css({
  ...trackDefault,
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  margin: 'unset',
  borderRadius: '6.25rem',
  border: '0.06rem solid white',
  height: '1.375rem',
  width: '2.375rem',

  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',
    ...inactive,
  },

  ':hover': hoverInactive,

  ':active': active,

  ...focusVisible('neutral', {
    focus: { ...hoverInactive, '&:hover': hoverInactive },
    polyfill: { ...trackDefault, '&:hover': hoverInactive },
  }),

  ...thumbDimensions,
})

export const checked = css({
  ...active,

  ':disabled': {
    cursor: 'not-allowed',
    bg: '$disabled',
    border: '$disabled',
  },

  ':hover': hoverActive,

  ...focusVisible('positive', {
    focus: { ...hoverActive, '&:hover': hoverActive },
    polyfill: { ...active, '&:hover': hoverActive },
  }),

  ...thumbDimensions,
})

export const label = css({
  marginTop: '0.06rem',
})
