import { styleVariants, style } from '@vtex/admin-ui-core'

export const radioContainerStyles = style({
  display: 'flex',
  alignItems: 'flex-start',
})

export const radioGroupStyles = style({
  display: 'flex',
  flexDirection: 'column',
  '> :not(:last-child)': {
    marginBottom: '$space-2',
  },
})

export const variants = styleVariants({
  orientation: {
    vertical: {
      flexDirection: 'column',
      '> :not(:last-child)': {
        marginBottom: '$space-2',
      },
    },
    horizontal: {
      flexDirection: 'row',
      '> :not(:last-child)': {
        marginRight: '$space-5',
      },
    },
  },
})
