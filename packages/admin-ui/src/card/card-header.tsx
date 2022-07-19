import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './card.style'

export const CardHeader = createComponent<'div'>((props) => {
  return useElement('div', {
    ...props,
    baseStyle: style.header,
  })
})

export type CardHeaderProps = ComponentPropsWithRef<typeof CardHeader>
