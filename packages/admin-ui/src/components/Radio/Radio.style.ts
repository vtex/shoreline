import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

const css = (csx: StyleProp) => csx

export const checkmark = css({
  content: '""',
  position: 'absolute',
  display: 'block',
  borderRadius: 'circle',
  top: '0.3rem',
  bg: '$form.neutral',
})

export const baseline = css({
  ...focusVisible('neutral'),
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

  ':active': {
    bg: '$form.neutralPressed',
    border: '$form.neutralPressed',
  },
})

export const checked = css({
  bg: '$form.neutralChecked',
  color: '$form.neutralChecked',
  border: '$form.neutralChecked',
  position: 'relative',

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
  },

  ':active': {
    bg: '$form.neutralCheckedPressed',
    border: '$form.neutralCheckedPressed',
  },
})

export const regular = css({
  size: '1.25rem',
  padding: '0.3rem',
  ':after': {
    size: '0.5rem',
  },
})

export const small = css({
  size: '1rem',
  padding: 1,
  ':after': {
    size: '0.375rem',
  },
})
