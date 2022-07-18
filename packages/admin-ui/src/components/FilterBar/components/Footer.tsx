import { createComponent, useElement } from '@vtex/admin-ui-react'

export const Footer = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: {
      display: 'flex',
      paddingY: 2,
      paddingX: 4,
      borderTop: '$neutral',
      justifyContent: 'space-between',
      bg: 'container',
    },
    ...props,
  })
})
