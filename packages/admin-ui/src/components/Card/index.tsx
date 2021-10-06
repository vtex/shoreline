import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const Card = jsx('div')({
  bg: 'base',
  color: 'base',
  border: 'default',
  padding: 6,
})

export type CardProps = ComponentPropsWithRef<typeof Card>
