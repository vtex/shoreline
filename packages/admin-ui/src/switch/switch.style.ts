import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

const css = (csx: StyleProp) => csx

const thumb = css({
  '&:after': {
    width: '0.75rem',
    height: '0.75rem',
    margin: '0.20rem',
  },

  '&:checked': {
    '&:after': {
      transform: 'translateX(1rem)',
    },
  },
})

export const checkmark = css({
  bg: (theme) => get(theme, 'fg.form.neutralChecked'),
  content: '""',
  display: 'block',
  position: 'absolute',
  borderRadius: '1.25rem',
  transition: 'transform .25s ease',
})

export const track = css({
  ...focusVisible('neutral'),
  bg: '$form.neutralInactive',
  border: '$form.neutral',
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  margin: 0,
  borderRadius: '6.25rem',
  borderStyle: 'solid',
  height: 20,
  width: 36,

  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
    cursor: 'not-allowed',
  },

  ':hover': {
    bg: '$form.neutralInactiveHover',
    border: '$form.neutralHover',
  },

  ':active': {
    bg: '$form.neutralInactivePressed',
    border: '$form.neutralPressed',
  },

  ...thumb,
})

export const checked = css({
  bg: '$form.neutralActive',
  color: '$form.neutralChecked',
  border: '$form.neutralChecked',

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
    bg: '$form.neutralActiveHover',
    border: '$form.neutralCheckedHover',
  },

  ':active': {
    bg: '$form.neutralActivePressed',
    border: '$form.neutralCheckedPressed',
  },

  ...thumb,
})
