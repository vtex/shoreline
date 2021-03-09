import React, { useMemo } from 'react'
import { BackdropVariants, SCALES } from '../utils'
import { useSidebarContext } from '../context'
import { motion } from 'framer-motion'
import { SidebarCollapseButton } from './CollapseButton'
import { IconCaret } from '@vtex/admin-ui-icons'

/**
 * We need this component to achieve a nice
 * accessible navigation
 */
export function SidebarBackdrop() {
  const { collapse, currentItem } = useSidebarContext()

  const { width, variants, isCollapsed } = useMemo(() => {
    const width = currentItem?.isCollapsible
      ? collapse
        ? SCALES.COLLAPSED_BACKDROP_WIDTH
        : SCALES.COLLAPSIBLE_AREA_WIDTH
      : '0rem'

    const isCollapsed = !currentItem?.isCollapsible || collapse

    return {
      variants: BackdropVariants({
        width,
      }),
      width,
      isCollapsed,
    }
  }, [currentItem, collapse])

  return (
    <motion.div
      style={{
        minWidth: width,
        maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
      }}
      initial={isCollapsed ? 'collapsed' : 'expanded'}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={variants}
    >
      {currentItem?.isCollapsible && (
        <SidebarCollapseButton
          icon={
            <IconCaret
              direction={collapse ? 'right' : 'left'}
              styleOverrides={{
                display: 'flex',
                justifyContent: 'center',
                '> path': {
                  strokeWidth: 2,
                },
              }}
            />
          }
          isCollapsed={!!collapse}
        />
      )}
    </motion.div>
  )
}
