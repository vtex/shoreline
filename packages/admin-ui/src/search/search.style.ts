import { focusVisible, style } from '@vtex/admin-ui-core'

export const input = style({
  border: '$form.neutral',
  borderRadius: '$border-radius-base',
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

export const form = style({
  position: 'relative',
  marginX: '0.06 rem',
  height: '2.25rem',
})

export const innerContainer = (position: string) => {
  const positionStyle =
    position === 'end' ? { right: '0.5rem' } : { left: '0.75rem' }

  return style({
    position: 'absolute',
    top: '$space-0',
    height: '100%',
    ...positionStyle,
  })
}

export const icon = (disabled: boolean) =>
  style({
    color: disabled ? '$disabled' : '$secondary',
  })

export const clearButton = style({
  padding: '$space-0',
  paddingY: '$space-05',
  paddingX: '$space-1',
  height: 'fit-content',
})
