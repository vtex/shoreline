import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const ListItem = jsx('li')({
  text: 'body',
})

export type ListItemProps = ComponentPropsWithRef<typeof ListItem>
