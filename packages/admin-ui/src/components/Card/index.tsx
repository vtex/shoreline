import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

export const Card = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: {
      bg: '$primary',
      color: '$primary',
      border: '$neutral',
      borderRadius: 4,
      padding: 6,
    },
    ...props,
  })
})

export type CardProps = ComponentPropsWithRef<typeof Card>
