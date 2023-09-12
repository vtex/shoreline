import { focusVisible, style, csx, theme } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

// State styles
const active = style({ bg: '$form.controlActive' })

const hoverInactive = style({ bg: '$form.controlInactiveHover' })
const hoverActive = style({
  bg: '$form.controlActiveHover',
})

export const thumb = style({
  bg: get(theme, 'fg.form.neutralChecked'),
  content: '""',
  display: 'block',
  position: 'absolute',
  borderRadius: '1.25rem',
  transition: 'transform .25s ease',
  width: '0.75rem',
  height: '0.75rem',
  margin: 'auto 0.25rem',
  bottom: '$space-0',
  top: '$space-0',
})

const disabled = style({
  bg: '$disabled',
  border: '$disabled',
  color: '$disabled',
  cursor: 'not-allowed',

  '+ div label': {
    color: '$disabled',
    cursor: 'not-allowed',
  },

  ':after': {
    bg: get(theme, 'fg.disabled'),
  },
})

export const checked = style({
  ...active,

  ':hover': hoverActive,

  ...focusVisible('positive', {
    focus: { ...hoverActive, '&:hover': hoverActive },
    polyfill: { ...active, '&:hover': hoverActive },
  }),

  '&:after': {
    transform: 'translateX(1rem)',
  },
})

export const switchTheme = csx({
  bg: '$form.neutralInactive',
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  margin: 'unset',
  borderRadius: '6.25rem',
  height: '1.25rem',
  width: '2.25rem',

  ...focusVisible('neutral', {
    focus: { ...hoverInactive, '&:hover': hoverInactive },
    polyfill: { bg: '$form.neutralInactive', '&:hover': hoverInactive },
  }),

  ':after': thumb,
  '&:checked': checked,

  ':hover': hoverInactive,
  ':active': active,
  ':disabled': disabled,
})

export const labelTheme = csx({
  cursor: 'pointer',
})
