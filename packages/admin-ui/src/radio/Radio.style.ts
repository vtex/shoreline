import { focusVisible, style } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

export const checkmark = style({
  content: '""',
  position: 'absolute',
  display: 'block',
  borderRadius: 'circle',
  top: '0.3rem',
  size: '0.5rem',
  bg: '$form.neutral',
})

export const baseline = style({
  ...focusVisible('neutral'),
  size: '1.25rem',
  padding: '0.3rem',
  bg: '$form.neutral',
  border: '$form.neutral',
  color: '$form.neutral',
  appearance: 'none',
  position: 'relative',
  borderRadius: 'circle',
  cursor: 'pointer',
  display: 'flex',
  margin: 0,
  alignItems: 'center',
  justifyContent: 'center',

  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',
  },

  ':hover': {
    bg: '$form.neutralHover',
    border: '$form.neutralHover',
  },
})

export const checked = style({
  ...focusVisible('main'),
  bg: '$form.mainChecked',
  color: '$form.mainChecked',
  border: '$form.mainChecked',
  position: 'relative',

  '&:after': {
    ...checkmark,
    bg: (theme) => get(theme, 'fg.form.mainChecked', ''),
  },

  '&[disabled]:after': {
    ...checkmark,
    bg: (theme) => get(theme, 'fg.disabled', ''),
  },

  ':disabled': {
    cursor: 'not-allowed',
    bg: '$disabled',
    border: '$disabled',
  },

  ':hover': {
    bg: '$form.mainCheckedHover',
    border: '$form.mainCheckedHover',
  },
})

export const radioButtonStyle = style({
  ...baseline,
  ':after': checkmark,
  ':checked': checked,
})

export const labelStyle = style({
  cursor: 'pointer',
  display: 'inline-flex',
  '> span': { marginLeft: '$m' },
  margin: 'auto',
  alignItems: 'center',
  text: '$body',
})
