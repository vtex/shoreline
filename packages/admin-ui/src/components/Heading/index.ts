import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Heading = jsx('h1')({
  text: '$title1',
})

export type HeadingProps = ComponentPropsWithRef<typeof Heading>
