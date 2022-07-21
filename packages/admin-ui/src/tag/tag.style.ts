import { style, styleVariants } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

function customPalette(token: string) {
  return {
    bg: `${token}10`,
    color: '$primary',
  }
}

export const baseline = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '100px',
  color: '$primary',
  border: 'none',
  paddingX: '0.75rem',
  outlineColor: (theme) => get(theme, 'bg.primary', 'bg.primary'),
  outlineWidth: '0.125rem',
  outlineStyle: 'solid',
})

export const variants = styleVariants({
  variant: {
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
  size: {
    normal: {
      height: '1.5rem',
      text: '$detail',
    },
    large: {
      height: '1.75rem',
      text: '$body',
    },
  },
})
