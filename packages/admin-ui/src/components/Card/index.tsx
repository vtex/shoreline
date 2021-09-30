import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const Card = jsx('div')({
  bg: 'light.primary',
  color: 'dark.primary',
  border: 'default',
  padding: 6,
})

export type CardProps = ComponentPropsWithRef<typeof Card>
