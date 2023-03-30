import { csx, dataAttr } from '@vtex/admin-ui-core'

export const avatarTheme = csx({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: '$space-2',
  borderRadius: '$pill',
  textTransform: 'uppercase',
  [dataAttr('palette', 'lightBlue')]: {
    colorTheme: 'lightBlue',
  },
  [dataAttr('palette', 'green')]: {
    colorTheme: 'green',
  },
  [dataAttr('palette', 'orange')]: {
    colorTheme: 'orange',
  },
  [dataAttr('palette', 'cyan')]: {
    colorTheme: 'cyan',
  },
  [dataAttr('palette', 'purple')]: {
    colorTheme: 'purple',
  },
  [dataAttr('palette', 'teal')]: {
    colorTheme: 'teal',
  },
  [dataAttr('palette', 'gray')]: {
    colorTheme: 'gray',
  },
})

export const avatarContentTheme = csx({
  text: '$action1',
})
