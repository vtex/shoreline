import React, { useMemo } from 'react'
import { BackdropVariants, SCALES } from '../utils'
import { useSidebarContext } from '../context'
import { motion } from 'framer-motion'

/**
 * We need this component to achieve a nice
 * accessible navigation
 */
export function SidebarBackdrop() {
  const { collapse, currentItem } = useSidebarContext()

  const { width, variants } = useMemo(() => {
    const width = currentItem?.isCollapsible
      ? collapse
        ? SCALES.COLLAPSED_BACKDROP_WIDTH
        : SCALES.COLLAPSIBLE_AREA_WIDTH
      : '0rem'

    return {
      variants: BackdropVariants({
        width,
      }),
      width,
    }
  }, [currentItem, collapse])

  return (
    <motion.div
      style={{
        minWidth: width,
        maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
        zIndex: -1,
      }}
      initial={
        !currentItem?.isCollapsible || collapse ? 'collapsed' : 'expanded'
      }
      animate={
        !currentItem?.isCollapsible || collapse ? 'collapsed' : 'expanded'
      }
      variants={variants}
    />
  )
}
