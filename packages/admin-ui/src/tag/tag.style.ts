import { palette, style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '100px',
  text: '$body',
  border: 'none',
  '> svg:nth-of-type(1)': {
    marginRight: 1,
  },
  height: 40,
  paddingX: '4',
  svg: {
    width: 20,
    minWidth: 20,
    height: 20,
    minHeight: 20,
  },
})

export const variants = styleVariants({
  palette: {
    lightBlue: palette('lightBlue'),
    green: palette('green'),
    orange: palette('orange'),
    cyan: palette('cyan'),
    purple: palette('purple'),
    teal: palette('teal'),
    red: palette('red'),
    gray: palette('gray'),
  },
})
