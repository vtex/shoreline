import { Children, useRef } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'
import { TabList } from '../components/Tabs'

export const PageHeaderBottom = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props
  const hasTab = useRef(false)

  Children.forEach(children, (child) => {
    if ((child as any)?.type === TabList) {
      hasTab.current = true
    }
  })

  return useElement('div', {
    baseStyle: style.pageHeaderBottom({ tabs: hasTab.current }),
    children,
    ...htmlProps,
  })
})

export type PageHeaderBottom = ComponentPropsWithRef<typeof PageHeaderBottom>
