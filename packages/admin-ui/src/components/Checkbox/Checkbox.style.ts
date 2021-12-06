import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'

function css(csx: StyleProp): StyleProp {
  return csx
}

export const baseline = css({
  ...focusVisible('neutral'),
  bg: '$form.neutral',
  border: '$form.neutral',
  color: '$form.neutral',
  appearance: 'none',
  borderRadius: '0.188rem',
  cursor: 'pointer',
  display: 'flex',
  margin: 0,
  alignItems: 'center',
  justifyContent: 'center',

  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
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

export const checkmark = css({
  content: '""',
  display: 'block',
  boxSizing: 'border-box',
  position: 'absolute',
  left: '3px',
  top: '-1px',
  width: '6px',
  height: '10px',
  borderWidth: '0 2px 2px 0',
  borderStyle: 'solid',
  transformOrigin: 'bottom left',
  transform: 'rotate(45deg)',
})

export const checked = css({
  bg: '$form.neutralChecked',
  color: '$form.neutralChecked',
  border: '$form.neutralChecked',
  position: 'relative',

  '&:after': checkmark,
  '&[disabled]:after': checkmark,

  ':hover': {
    bg: '$form.neutralCheckedHover',
    border: '$form.neutralCheckedHover',
  },

  ':active': {
    bg: '$form.neutralCheckedPressed',
    border: '$form.neutralCheckedPressed',
  },

  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
  },
})

export const indeterminate = css({
  '&:after': {
    content: '""',
    width: '0.5rem',
    height: 0,
    borderWidth: '0.063rem',
    borderStyle: 'solid',
    borderLeft: 0,
    borderRight: 0,
    borderRadius: '0.188rem',
    borderColor: 'currentColor',
  },
})

export const small = css({
  size: '1rem',
  minWidth: '1rem',
  minHeight: '1rem',
})

export const regular = css({
  size: '1.25rem',
  minWidth: '1.25rem',
  minHeight: '1.25rem',
})
