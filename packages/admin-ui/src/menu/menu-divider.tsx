import { jsx } from '@vtex/admin-ui-react'
import { MenuSeparator } from 'ariakit/menu'

import * as style from './menu.style'

export const MenuDivider = jsx(MenuSeparator)(style.divider)

export type MenuDividerProps = React.ComponentPropsWithoutRef<
  typeof MenuDivider
>
