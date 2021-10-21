import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const Center = jsx('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export type CenterProps = ComponentPropsWithRef<typeof Center>
