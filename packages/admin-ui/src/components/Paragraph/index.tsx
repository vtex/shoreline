import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Paragraph = jsx('p')({
  text: '$body',
})

export type ParagraphProps = ComponentPropsWithRef<typeof Paragraph>
