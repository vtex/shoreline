import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Paragraph = createComponent<'p'>((props) => {
  return useElement('p', {
    baseStyle: {
      text: '$body',
    },
    ...props,
  })
})

export type ParagraphProps = ComponentPropsWithRef<typeof Paragraph>
