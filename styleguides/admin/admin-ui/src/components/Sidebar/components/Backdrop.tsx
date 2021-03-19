import React, { useMemo, Fragment } from 'react'
import { IconCaret } from '@vtex/admin-ui-icons'
import { useSystem } from '@vtex/admin-core'
import { SCALES } from '../consts'
import { useSidebarContext } from '../context'
import { SidebarCollapseButton } from './CollapseButton'
import { SidebarSecretProps } from '../types'

/**
 * Components that acts as a spacer.
 */
export function SidebarBackdrop(props: SidebarBackdropProps) {
  const { showCollapseButton, setShowCollapseButton } = props
  const { collapse, currentItem, width, isCollapsed } = useBackdropState()
  const { cn } = useSystem()

  return (
    <Fragment>
      <div
        className={cn({
          minWidth: width,
          maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
          backgroundColor: isCollapsed ? 'light.primary' : 'sidebar.light',
          borderRight:
            currentItem && currentItem.isCollapsible
              ? '1px solid'
              : '0px solid',
          borderColor:
            currentItem && currentItem.isCollapsible
              ? 'mid.tertiary'
              : 'transparent',
          marginRight:
            currentItem && currentItem.isCollapsible ? '0.25rem' : '0rem',
        })}
        onMouseEnter={() => setShowCollapseButton(true)}
        onMouseLeave={() => setShowCollapseButton(false)}
      />
      {currentItem?.isCollapsible && (
        <SidebarCollapseButton
          setShowCollapseButton={setShowCollapseButton}
          showCollapseButton={showCollapseButton}
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
    </Fragment>
  )
}

function useBackdropState() {
  const { collapse, currentItem } = useSidebarContext()

  const { width, isCollapsed } = useMemo(() => {
    const width = currentItem?.isCollapsible
      ? collapse
        ? '1rem'
        : SCALES.COLLAPSIBLE_AREA_WIDTH
      : '0rem'

    const isCollapsed = !currentItem?.isCollapsible || collapse

    return {
      width,
      isCollapsed,
    }
  }, [currentItem, collapse])

  return { width, isCollapsed, collapse, currentItem }
}

export type SidebarBackdropProps = Required<
  Pick<SidebarSecretProps, 'showCollapseButton' | 'setShowCollapseButton'>
>
