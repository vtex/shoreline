import { styleVariants, style } from '@vtex/admin-ui-core'

export const variants = styleVariants({
  palette: {
    lightBlue: { colorTheme: 'lightBlue' },
    green: { colorTheme: 'green' },
    orange: { colorTheme: 'orange' },
    cyan: { colorTheme: 'cyan' },
    purple: { colorTheme: 'purple' },
    teal: { colorTheme: 'teal' },
    gray: { colorTheme: 'gray' },
  },
})

export const baseline = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: '$space-2',
  borderRadius: '$border-radius-pill',
  textTransform: 'uppercase',
})
