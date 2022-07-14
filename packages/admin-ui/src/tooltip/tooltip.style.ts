import { style } from '@vtex/admin-ui-core'

export const tooltipGutter = 0

export const tooltipPopover = style({
  bg: '$inverted',
  color: '$inverted',
  text: '$detail',
  padding: '$s',
  borderRadius: '$default',
  maxWidth: '16rem',
  zIndex: 'over',
})

export const tooltipTriggerWrapper = style({
  size: '1.5rem',
  bg: 'transparent',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const tooltipTrigger = style({
  size: '1rem',
  bg: '$gray20',
  color: '$primary',
  borderRadius: '100%',
  margin: 0,
  padding: 0,
  display: 'flex',
})

export const tooltipTriggerContainer = style({
  size: '1rem',
})

export const tooltipArrow = {
  width: 12,
  height: 12,
}
