import { csx, dataAttr, focusVisible } from '@vtex/admin-ui-core'

export const inputTheme = csx({
  border: '$form.neutral',
  borderRadius: '$base',
  size: '100%',
  bg: '$primary',
  color: '$primary',
  paddingLeft: '2.25rem',
  paddingRight: '2.5rem',
  text: '$body',
  ':focus': {
    ...focusVisible('neutral'),
    border: '$form.neutralFocus',
  },
  ':focus::placeholder': {
    color: 'transparent',
  },
  '::placeholder': {
    text: '$body',
    color: '$secondary',
  },
  ':hover': {
    border: '$form.neutralHover',
  },
  ':disabled': {
    border: '$disabled',
    bg: '$disabled',
    color: '$disabled',
    '::placeholder': {
      color: '$disabled',
    },
  },
  '@desktop': {
    minWidth: '18rem',
  },
})

export const formTheme = csx({
  position: 'relative',
  marginX: '0.06 rem',
  height: '2.25rem',
})

export const innerContainerTheme = csx({
  position: 'absolute',
  top: '$space-0',
  height: '100%',
  [dataAttr('position', 'end')]: {
    right: '0.5rem',
  },
  [dataAttr('position', 'start')]: {
    left: '0.75rem',
  },
})

export const iconTheme = csx({
  [dataAttr('disabled', 'true')]: {
    fg: '$disabled',
  },
  [dataAttr('disabled', 'false')]: {
    fg: '$secondary',
  },
})

export const clearButtonTheme = csx({
  [dataAttr('clear', 'true')]: {
    padding: '$space-0',
    paddingY: '$space-05',
    paddingX: '$space-1',
    height: 'fit-content',
  },
})
