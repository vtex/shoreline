import { focusVisible, style, csx, dataAttr } from '@vtex/admin-ui-core'
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

  ':focus-visible': {
    outline: 'none',
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

export const checkboxTheme = csx({
  ...focusVisible('neutral'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  size: '1.25rem',
  bg: '$form.control',
  border: '$form.control',
  appearance: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  margin: '$space-0',
  boxSizing: 'border-box',

  ':hover:not(:disabled)': {
    border: '$form.controlHover',
  },

  ':focus-visible': {
    outline: 'none',
    border: '$form.controlFocus',
  },

  ...disabled,

  ':checked': checked,
  ':indeterminate': indeterminate,

  [dataAttr('error', 'true')]: {
    ...focusVisible('critical'),
    border: '$form.critical',

    ':hover:not(:disabled)': {
      border: '$form.criticalHover',
    },

    ':focus-visible': {
      outline: 'none',
      border: '$form.criticalFocus',
    },

    ...disabled,
  },
})

export const labelTheme = csx({
  cursor: 'pointer',
})