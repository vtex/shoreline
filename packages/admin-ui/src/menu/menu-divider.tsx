import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { MenuSeparator } from 'ariakit/Menu'

import * as style from './menu.style'

export const MenuDivider = jsx(MenuSeparator)(style.divider)

export type MenuDividerProps = ComponentPropsWithRef<typeof MenuDivider>
