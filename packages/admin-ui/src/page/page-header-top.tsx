import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'

export const PageHeaderTop = createComponent<'div'>((props) =>
  useElement('div', {
    baseStyle: style.pageHeaderTop,
    ...props,
  })
)

export type PageHeaderTop = ComponentPropsWithRef<typeof PageHeaderTop>
