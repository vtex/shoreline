import { focusVisible, style } from '@vtex/admin-ui-core'

export const input = style({
  border: '$form.neutral',
  borderRadius: 'default',
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
})

export const form = style({
  position: 'relative',
  marginX: '1px',
  height: '2.25rem',
})

export const innerContainer = (position: string) => {
  const positionStyle =
    position === 'end' ? { right: '0.5rem' } : { left: '0.75rem' }

  return style({
    position: 'absolute',
    top: 0,
    height: '100%',
    ...positionStyle,
  })
}

export const icon = style({
  color: '$secondary',
})

export const clearButton = style({
  padding: 0,
  paddingY: '$s',
  paddingX: '$s',
  height: 'fit-content',
})
