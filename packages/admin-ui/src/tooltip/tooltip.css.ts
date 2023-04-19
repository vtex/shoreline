import { csx, dataAttr, negative } from '@vtex/admin-ui-core'

export const tooltipGutter = 0

export const tooltipPopoverTheme = csx({
  bg: '$inverted',
  color: '$inverted',
  text: '$detail',
  padding: '$space-2 $space-3',
  borderRadius: '$base',
  maxWidth: '16rem',
  zIndex: '$z-10',
})

export const tooltipTriggerWrapperTheme = csx({
  size: '1.5rem',
  bg: 'transparent',
  padding: '$space-0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '$space-0',
  [dataAttr('bleed-x', true)]: {
    marginX: negative('$space-1'),
  },
  [dataAttr('bleed-y', true)]: {
    marginY: negative('$space-1'),
  },
})

export const tooltipTriggerTheme = csx({
  size: '1rem',
  bg: '$gray20',
  color: '$primary',
  borderRadius: '100%',
  margin: '$space-0',
  padding: '$space-0',
  display: 'flex',
})

export const tooltipTriggerContainerTheme = csx({
  size: '1rem',
})

export const tooltipArrowStyle = {
  width: 12,
  height: 12,
}
