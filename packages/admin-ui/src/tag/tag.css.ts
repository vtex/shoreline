import type { Theme } from '@vtex/admin-ui-core'
import { dataAttr, csx } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

function customPalette(token: string) {
  return {
    bg: `${token}10`,
    color: '$primary',
  }
}

export const tagTheme = csx({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '100px',
  color: '$primary',
  border: 'none',
  paddingX: '0.75rem',
  outlineColor: (theme: Theme) => get(theme, 'bg.primary', 'bg.primary'),
  outlineWidth: '0.125rem',
  outlineStyle: 'solid',
  [dataAttr('variant', 'gray')]: customPalette('gray'),
  [dataAttr('variant', 'red')]: customPalette('red'),
  [dataAttr('variant', 'orange')]: customPalette('orange'),
  [dataAttr('variant', 'green')]: customPalette('green'),
  [dataAttr('variant', 'lightBlue')]: customPalette('lightBlue'),
  [dataAttr('variant', 'cyan')]: customPalette('cyan'),
  [dataAttr('variant', 'purple')]: customPalette('purple'),
  [dataAttr('variant', 'teal')]: customPalette('teal'),
  [dataAttr('variant', 'pink')]: customPalette('pink'),
  [dataAttr('size', 'normal')]: {
    height: '1.5rem',
    text: '$detail',
  },
  [dataAttr('size', 'large')]: {
    height: '1.75rem',
    text: '$body',
  },
})
