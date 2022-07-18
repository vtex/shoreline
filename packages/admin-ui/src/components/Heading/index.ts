import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Heading = createComponent<'h1'>((props) => {
  return useElement('h1', {
    baseStyle: {
      text: '$title1',
    },
    ...props,
  })
})

export type HeadingProps = ComponentPropsWithRef<typeof Heading>
