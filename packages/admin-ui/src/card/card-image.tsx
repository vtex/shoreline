import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './card.style'

export const CardImage = createComponent<'img'>((props) => {
  return useElement('img', {
    ...props,
    baseStyle: style.image,
  })
})

export type CardImageProps = ComponentPropsWithRef<typeof CardImage>
