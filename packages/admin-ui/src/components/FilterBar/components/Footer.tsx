import { createComponent, useElement } from '@vtex/admin-ui-react'

export const Footer = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: {
      display: 'flex',
      paddingY: '$space-2',
      paddingX: '$space-4',
      borderTop: '$neutral',
      justifyContent: 'space-between',
      bg: 'container',
    },
    ...props,
  })
})
