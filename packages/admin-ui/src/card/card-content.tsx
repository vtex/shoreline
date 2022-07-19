import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './card.style'

export const CardContent = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: style.content,
    ...props,
  })
})

export type CardContentProps = ComponentPropsWithRef<typeof CardContent>
