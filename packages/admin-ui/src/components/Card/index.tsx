import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const Card = jsx('div')({
  bg: '$primary',
  color: '$primary',
  border: '$neutral',
  borderRadius: 4,
  padding: 6,
})

export type CardProps = ComponentPropsWithRef<typeof Card>
