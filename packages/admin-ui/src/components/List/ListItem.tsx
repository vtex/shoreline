import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

export const ListItem = createComponent<'li'>((props) => {
  return useElement('li', {
    baseStyle: {
      text: '$body',
    },
    ...props,
  })
})

export type ListItemProps = ComponentPropsWithRef<typeof ListItem>
