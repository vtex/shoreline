import React from 'react'
import type { ReactNode } from 'react'

import { Box } from '../box'
import { Tooltip } from '../tooltip'
import * as style from './menu.style'

export const MenuItemWrapper = (props: MenuItemWrapperProps) => {
  const { children, disabled, disabledHint } = props

  if (disabled && disabledHint) {
    return (
      <Tooltip text={disabledHint}>
        <Box csx={style.disabledItemWrapper}>{children}</Box>
      </Tooltip>
    )
  }

  return <>{children}</>
}

export type MenuItemWrapperProps = {
  disabled?: boolean
  disabledHint?: string
  children: ReactNode
}
