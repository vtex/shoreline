import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { cx } from '@vtex/admin-ui-core'

import * as style from './card.style'

export const CardTitle = createComponent<'p'>((props) => {
  const { className = '', ...restProps } = props

  return useElement('p', {
    ...restProps,
    baseStyle: style.title,
    className: cx('__admin-ui-card-nested-title', className),
  })
})

export type CardTitleProps = ComponentPropsWithRef<typeof CardTitle>
