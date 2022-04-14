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

export const disabled = style({
  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',
    '+ div': {
      label: {
        cursor: 'not-allowed',
      },
    },
  },
})

export const baseline = style({
  ...focusVisible('neutral'),
  size: '1.25rem',
  padding: '6px',
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

  ':hover:not(:disabled)': {
    bg: '$form.neutralHover',
    border: '$form.neutralHover',
  },
  ...disabled,
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

  ':hover:not(:disabled)': {
    bg: '$form.mainCheckedHover',
    border: '$form.mainCheckedHover',
  },

  '&[disabled]:after': {
    ...checkmark,
    bg: (theme) => get(theme, 'fg.disabled', ''),
  },

  ...disabled,
})

export const radioButtonStyle = style({
  ...baseline,
  ':after': checkmark,
  ':checked': checked,
})

export const label = style({
  cursor: 'pointer',
})
