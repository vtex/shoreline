import React from 'react'
import type { ReactNode } from 'react'

import { Box } from '../box'
import { Tooltip } from '../tooltip'

export const TabWrapper = (props: TabWrapperProps) => {
  const { children, disabled, disabledHint } = props

  if (disabled && disabledHint) {
    return (
      <Tooltip text={disabledHint}>
        <Box>{children}</Box>
      </Tooltip>
    )
  }

  return <>{children}</>
}

export type TabWrapperProps = {
  disabled?: boolean
  disabledHint?: string
  children: ReactNode
}
