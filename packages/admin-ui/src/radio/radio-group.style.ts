import { styleVariants, style } from '@vtex/admin-ui-core'

export const radioContainerStyles = style({
  display: 'flex',
  alignItems: 'flex-start',
})

export const radioGroupStyles = style({
  display: 'flex',
  flexDirection: 'column',
  '> :not(:last-child)': {
    marginBottom: '$l',
  },
})

export const variants = styleVariants({
  orientation: {
    vertical: {
      flexDirection: 'column',
      '> :not(:last-child)': {
        marginBottom: '$l',
      },
    },
    horizontal: {
      flexDirection: 'row',
      '> :not(:last-child)': {
        marginRight: '$xl',
      },
    },
  },
})
