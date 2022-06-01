import { colors, style, styleVariants } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

function customPalette(color: string) {
  return {
    bg: get(colors, `${color}10`, ''),
    color: '$primary',
  }
}

export const baseline = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '100px',
  text: '$detail',
  color: '$primary',
  border: 'none',
  height: '1.5rem',
  paddingX: '0.75rem',
})

export const variants = styleVariants({
  palette: {
    gray: customPalette('gray'),
    red: customPalette('red'),
    orange: customPalette('orange'),
    green: customPalette('green'),
    lightBlue: customPalette('lightBlue'),
    cyan: customPalette('cyan'),
    purple: customPalette('purple'),
    teal: customPalette('teal'),
    pink: customPalette('pink'),
  },
})
