import { dataAttr, csx, style } from '@vtex/admin-ui-core'

const variantStyle = (token: string) => {
  return {
    bg: `$${token}`,
    border: `$${token}`,
    '> div:first-child svg': {
      color: `$${token}`,
      marginLeft: 'unset',
    },
  }
}

export const alertTheme = csx({
  text: '$detail',
  color: '$primary',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  minHeight: '3.125rem',
  height: '100%',
  paddingY: '0.9375rem',
  paddingX: '1.188rem',
  borderRadius: '$base',
  transition: 'pop',
  [dataAttr('variant', 'critical')]: variantStyle('critical'),
  [dataAttr('variant', 'info')]: variantStyle('info'),
  [dataAttr('variant', 'warning')]: variantStyle('warning'),
  [dataAttr('variant', 'positive')]: variantStyle('positive'),
})

export const alertActionTheme = csx({
  [dataAttr('dismissible', 'true')]: {
    marginLeft: '$space-7',
    marginRight: '$space-0',
  },
  [dataAttr('dismissible', 'false')]: {
    marginLeft: '$space-7',
  },
})

export const rightInline = csx({ whiteSpace: 'nowrap' })

export const alertDescription = style({
  maxWidth: '49rem',
})
