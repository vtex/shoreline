import { focusVisible } from '@vtex/admin-ui-core'
import type { StyleProp } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

const css = (csx: StyleProp) => csx

// State styles
const active = css({ bg: '$form.controlActive' })

const hoverInactive = css({ bg: '$form.controlInactiveHover' })
const hoverActive = css({
  bg: '$form.controlActiveHover',
})

// Element styles
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
  height: '1.25rem',
  width: '2.25rem',

  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',
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
