import React from 'react'
import { Box } from '../../Box'
import { SCALES } from '../utils'

export function SidebarBackdrop() {
  return (
    <Box
      styles={{
        minWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
        maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
      }}
      tabIndex={0}
    />
  )
}
