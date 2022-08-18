import { createComponent, useElement } from '@vtex/admin-ui-react'
import { MenuSeparator } from 'ariakit'

import * as style from './menu.style'

export const MenuDivider = createComponent<typeof MenuSeparator>((props) => {
  return useElement(MenuSeparator, { baseStyle: style.divider, ...props })
})

export type MenuDividerProps = React.ComponentPropsWithoutRef<
  typeof MenuDivider
>
