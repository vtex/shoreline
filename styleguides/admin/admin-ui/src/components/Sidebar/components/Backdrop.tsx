import React from 'react'
import { SCALES } from '../utils'
import { Box } from '../../Box'
import { useSidebarContext } from '../context'
/**
 * We need this component to achieve a nice
 * accessible navigation
 */
export function SidebarBackdrop() {
  const { collapse } = useSidebarContext()

  const width = collapse
    ? SCALES.COLLAPSED_BACKDROP_WIDTH
    : SCALES.COLLAPSIBLE_AREA_WIDTH

  return (
    <Box
      styles={{
        minWidth: width,
        maxWidth: width,
      }}
    />
  )
}
