import { style } from '@vtex/admin-ui-core'

export const tooltipGutter = 4

export const tooltipPopover = style({
  bg: '$inverted',
  color: '$inverted',
  text: '$detail',
  padding: '$s',
  borderRadius: '$default',
  maxWidth: '16rem',
  zIndex: 'over',
})

export const tooltipTrigger = style({
  size: '1rem',
  bg: '$secondary',
  color: '$primary',
  borderRadius: '100%',
})

export const tooltipTriggerContainer = style({
  size: '100%',
})
