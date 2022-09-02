import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  overflow: 'auto',
  width: '100%',
})

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
})

export const status = style({
  size: '100%',
  textAlign: 'center',
  flexWrap: 'wrap',
  overflow: 'auto',
  minHeight: '21.875rem',
})

export const statusMessage = styleVariants({
  type: {
    message: {
      fg: '$disabled',
      text: '$pageTitle',
    },
    description: {
      fg: '$disabled',
      text: '$title2',
    },
  },
})

export const headerActions = style({
  display: 'flex',
  '> button:not(:last-of-type)': {
    marginRight: '$m',
  },
  '> button + div': {
    marginLeft: '$xl',
  },
})
