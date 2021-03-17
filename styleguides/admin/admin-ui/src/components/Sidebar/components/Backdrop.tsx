import React, { useMemo } from 'react'
import { IconCaret } from '@vtex/admin-ui-icons'
import { useSystem } from '@vtex/admin-core'
import { motion } from 'framer-motion'
import { SCALES, transition } from '../consts'
import { useSidebarContext } from '../context'
import { SidebarCollapseButton } from './CollapseButton'

/**
 * Components that acts as a spacer.
 */
export function SidebarBackdrop() {
  const {
    collapse,
    currentItem,
    width,
    isCollapsed,
    variants,
  } = useBackdropState()
  const { cn } = useSystem()

  return (
    <>
      <motion.div
        className={cn({
          minWidth: width,
          maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
          backgroundColor:
            !currentItem ||
            !currentItem.isCollapsible ||
            (collapse && currentItem.isCollapsible)
              ? 'light.primary'
              : 'sidebar.light',
          borderRight: isCollapsed ? 'unset' : '1px solid',
          borderColor: 'mid.tertiary',
        })}
        initial={isCollapsed ? 'collapsed' : 'expanded'}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={variants}
      />
      {currentItem?.isCollapsible && (
        <SidebarCollapseButton
          icon={
            <IconCaret
              direction={collapse ? 'right' : 'left'}
              csx={{
                display: 'flex',
                justifyContent: 'center',
                '> path': {
                  strokeWidth: 2,
                },
              }}
            />
          }
        />
      )}
    </>
  )
}

function useBackdropState() {
  const { collapse, currentItem } = useSidebarContext()

  const { width, variants, isCollapsed } = useMemo(() => {
    const width = currentItem?.isCollapsible
      ? collapse
        ? SCALES.COLLAPSED_BACKDROP_WIDTH
        : SCALES.COLLAPSIBLE_AREA_WIDTH
      : '0rem'

    const isCollapsed = !currentItem?.isCollapsible || collapse

    return {
      variants: {
        expanded: () => ({
          minWidth: width,
          width,
          transition,
          zIndex: -2,
        }),
        collapsed: () => ({
          minWidth: width,
          width,
          transition,
        }),
      },
      width,
      isCollapsed,
    }
  }, [currentItem, collapse])

  return { width, variants, isCollapsed, collapse, currentItem }
}
