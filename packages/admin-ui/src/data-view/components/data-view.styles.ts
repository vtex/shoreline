import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  overflow: 'visible',
  width: '100%',
})

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  order: -1,
})

export const status = style({
  size: '100%',
  textAlign: 'center',
  flexWrap: 'wrap',
  overflow: 'auto',
  minHeight: '75vh',
  order: -1,
  bg: '$secondary',
  borderRadius: '$default',
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
