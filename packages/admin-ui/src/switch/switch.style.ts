import { focusVisible, style } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

// State styles
const active = style({ bg: '$form.controlActive' })

const hoverInactive = style({ bg: '$form.controlInactiveHover' })
const hoverActive = style({
  bg: '$form.controlActiveHover',
})

// Element styles
const trackDefault = style({
  bg: '$form.neutralInactive',
})

const thumbDimensions = style({
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

export const thumb = style({
  bg: (theme) => get(theme, 'fg.form.neutralChecked'),
  content: '""',
  display: 'block',
  position: 'absolute',
  borderRadius: '1.25rem',
  transition: 'transform .25s ease',
})

const disabled = style({
  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',

    '+ div label': {
      color: '$disabled',
      cursor: 'not-allowed',
    },
  },
})

export const track = style({
  ...trackDefault,
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  margin: 'unset',
  borderRadius: '6.25rem',
  height: '1.25rem',
  width: '2.25rem',

  ':hover': hoverInactive,

  ':active': active,

  ...focusVisible('neutral', {
    focus: { ...hoverInactive, '&:hover': hoverInactive },
    polyfill: { ...trackDefault, '&:hover': hoverInactive },
  }),

  ...thumbDimensions,

  ...disabled,
})

export const checked = style({
  ...active,

  ':hover': hoverActive,

  ...focusVisible('positive', {
    focus: { ...hoverActive, '&:hover': hoverActive },
    polyfill: { ...active, '&:hover': hoverActive },
  }),

  ...thumbDimensions,

  ...disabled,
})

export const label = style({
  cursor: 'pointer',
})
