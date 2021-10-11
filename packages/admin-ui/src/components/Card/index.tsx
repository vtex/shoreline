import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const Card = jsx('div')({
  bg: 'container',
  color: 'container',
  borderColor: 'container',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  padding: 6,
})

export type CardProps = ComponentPropsWithRef<typeof Card>
