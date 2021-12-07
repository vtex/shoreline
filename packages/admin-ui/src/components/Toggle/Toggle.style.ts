import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

const css = (csx: StyleProp) => csx

export const checkmark = css({
  bg: (theme) => get(theme, 'bg.primary'),
  content: '""',
  display: 'block',
  position: 'absolute',
  borderRadius: '1.25rem',
  transition: 'transform .25s ease',
})

export const baseline = css({
  ...focusVisible('neutral'),
  bg: (theme) => get(theme, 'bg.form.neutralPressed'),
  border: 'form.neutral',
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  margin: 0,
  borderRadius: '6.25rem',
  borderStyle: 'solid',
  borderWidth: 1,

  ':disabled': {
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',
  },

  ':hover': {
    bg: '$form.neutralHover',
    border: '$form.neutralHover',
  },

  ':active': {
    bg: '$form.neutralPressed',
    border: '$form.neutralPressed',
  },
})

export const checked = css({
  bg: '$form.neutralChecked',
  color: '$form.neutralChecked',
  border: '$form.neutralChecked',

  '&:after': {
    ...checkmark,
    bg: (theme) => get(theme, 'fg.form.neutralChecked', ''),
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
    bg: '$form.neutralCheckedHover',
    border: '$form.neutralCheckedHover',
    // ':after': {
    //   border: '$form.neutralCheckedHover',
    // },
  },

  ':active': {
    bg: '$form.neutralCheckedPressed',
    border: '$form.neutralCheckedPressed',
    // ':after': {
    //   border: '$form.neutralCheckedPressed',
    // },
  },
})

export const regular = css({
  height: 20,
  width: 36,
  '&:after': {
    width: 18,
    height: 18,
  },
  '&:checked': {
    '&:after': {
      transform: 'translateX(1rem)',
    },
  },
})

export const small = css({
  height: 16,
  width: 28,
  '&:after': {
    width: 14,
    height: 14,
  },
  '&:checked': {
    '&:after': {
      transform: 'translateX(12px)',
    },
  },
})
