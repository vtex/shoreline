import { csx, dataAttr } from '@vtex/admin-ui-core'

export const dataViewTheme = csx({
  overflow: 'visible',
  width: '100%',
})

export const headerTheme = csx({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  order: -1,
})

export const statusTheme = csx({
  size: '100%',
  textAlign: 'center',
  flexWrap: 'wrap',
  overflow: 'auto',
  minHeight: '75vh',
  order: -1,
  bg: '$secondary',
  borderRadius: '$base',
})

export const statusMessageTheme = csx({
  [dataAttr('type', 'message')]: {
    fg: '$disabled',
    text: '$pageTitle',
  },
  [dataAttr('type', 'description')]: {
    fg: '$disabled',
    text: '$title2',
  },
})

export const headerActionsTheme = csx({
  display: 'flex',
  '> button:not(:last-of-type)': {
    marginRight: '$space-2',
  },
})

export const stackContainerTheme = csx({ size: '100%' })
