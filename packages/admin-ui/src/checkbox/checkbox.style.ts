import { focusVisible, style } from '@vtex/admin-ui-core'
import { checkmarkSvg, indeterminateSvg } from './utils'

export const disabled = style({
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

export const baseline = style({
  ...focusVisible('neutral'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  size: '1.25rem',
  bg: '$form.control',
  border: '$form.control',
  appearance: 'none',
  borderRadius: 'default',
  cursor: 'pointer',
  margin: 0,
  boxSizing: 'border-box',

  ':hover:not(:disabled)': {
    border: '$form.controlHover',
  },

  ':focus:not(:checked)': {
    border: '$form.controlFocus',
  },

  ...disabled,
})

export const error = style({
  ...focusVisible('critical'),
  border: '$form.critical',

  ':hover:not(:disabled)': {
    border: '$form.criticalHover',
  },

  ':focus:not(:checked)': {
    border: '$form.criticalFocus',
  },

  ...disabled,
})

export const icon = style({
  position: 'absolute',
  height: '1rem',
})

export const checkmark = style({
  '&:after': {
    content: `url('data:image/svg+xml; utf8, ${checkmarkSvg()}')`,
    ...icon,
  },

  '&[disabled]:after': {
    content: `url('data:image/svg+xml; utf8, ${checkmarkSvg('disabled')}')`,
  },
})

export const checked = style({
  ...focusVisible('main'),
  backgroundColor: '$form.controlChecked',
  border: '$form.controlChecked',
  position: 'relative',

  ':hover': {
    bg: '$form.controlCheckedHover',
    border: '$form.controlCheckedHover',
  },

  ':focus:checked': {
    bg: '$form.controlCheckedFocus',
    border: '$form.controlCheckedFocus',
  },

  ...checkmark,

  ...disabled,
})

export const indeterminate = style({
  '&:after': {
    content: `url('data:image/svg+xml; utf8, ${indeterminateSvg()}')`,
    ...icon,
  },

  '&[disabled]:after': {
    content: `url('data:image/svg+xml; utf8, ${indeterminateSvg('disabled')}')`,
  },
})

export const checkboxStyle = style({
  ...baseline,
  ':checked': checked,
  ':indeterminate': indeterminate,
})

export const label = style({
  cursor: 'pointer',
})
