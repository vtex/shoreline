import { csx, dataAttr } from '@vtex/admin-ui-core'
import {
  MAX_TEXT_AREA_HEIGHT,
  MIN_TEXT_AREA_HEIGHT,
} from './text-area-constants'

export const containerTheme = csx({
  width: '100%',
  alignItems: 'center',
  text: '$body',
  border: '$form.neutral',
  borderRadius: '$base',
  bg: '$form.neutral',
  cursor: 'text',
  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus-within': {
    border: '$form.neutralFocus',
    boxShadow: '$ring.neutral',
  },
  height: 'auto',
  display: 'block',
  minHeight: `${MIN_TEXT_AREA_HEIGHT}px`,
  maxHeight: `${MAX_TEXT_AREA_HEIGHT}px`,
  resize: 'none',
  transition: 'snap',
  [dataAttr('error', 'true')]: {
    border: '$form.critical',
    ':hover': {
      border: '$form.criticalHover',
    },
    ':focus-within': {
      border: '$form.criticalFocus',
      boxShadow: '$ring.critical',
    },
  },
  [dataAttr('disabled', 'true')]: {
    bg: '$disabled',
    color: '$disabled',
    border: '$disabled',
    ':hover': {
      border: '$disabled',
    },
  },
})

export const inputTheme = csx({
  padding: '$space-3 $space-4',
  width: '100%',
  borderRadius: '$base',
  bg: '$form.neutral',
  ':focus': {
    outline: 'none',
  },
  height: 'auto',
  display: 'block',
  text: '$body',
  resize: 'none',
  transition: 'snap',
})
