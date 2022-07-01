import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'

export const PageHeaderActions = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props

  return useElement('div', {
    baseStyle: style.pageHeaderActions,
    children,
    ...htmlProps,
  })
})

export type PageHeaderActions = ComponentPropsWithRef<typeof PageHeaderActions>
