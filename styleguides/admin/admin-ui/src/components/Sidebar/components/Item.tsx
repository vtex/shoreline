import React, { cloneElement, useEffect, useMemo } from 'react'
import {
  _SidebarSectionProps,
  SidebarSection,
  SidebarDisclosureProps,
  SidebarDisclosure,
  useCompositeState,
  Composite,
  CompositeItem,
} from './index'
import { SystemComponent } from '../../../types'
import { useSystem } from '@vtex/admin-core'
import { useSidebarContext } from '../context'
import {
  ArrowKeys,
  Item,
  SidebarItemVariants,
  SidebarSecretProps,
} from '../utils'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { motion } from 'framer-motion'

export interface SidebarSectionProps
  extends Omit<_SidebarSectionProps, 'state'> {}

export interface _SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent,
    SidebarSecretProps {
  sections?: SidebarSectionProps[]
  label: string
}

export interface SidebarItemProps extends Omit<_SidebarItemProps, 'state'> {}

export function SidebarItem(props: SidebarItemProps) {
  const {
    sections,
    selected,
    onClick,
    label,
    index = 0,
    scope = 'top',
    ...baseProps
  } = props
  const { cn } = useSystem()
  const {
    direction,
    collapse,
    currentItem,
    setCurrentItem,
    setSelectedItemsMemory,
    selectedItemsMemory,
    setCollapse,
    rootState,
  } = useSidebarContext()

  const state = useCompositeState({
    orientation: 'vertical',
    loop: true,
  })

  const hasSection =
    sections &&
    sections.length > 0 &&
    sections?.some((section) => section.children.length > 0)

  useEffect(() => {
    if (selected) {
      const currItem: Item = { index, scope, isCollapsible: !!hasSection }
      setCurrentItem(currItem)
      setSelectedItemsMemory([currItem, ...selectedItemsMemory.slice(0, 2)])
      setCollapse(false)
    }
  }, [selected, hasSection])

  const handleOnClick = (event?: React.MouseEvent<any, MouseEvent>) => {
    // This means the item the user has interacted with
    // doesn't have children, so we set this to null to
    // warn the surrounding components that the sidebar
    // should not open.
    if (!hasSection) {
      setCurrentItem(null)
      setSelectedItemsMemory([])
    } else {
      setCollapse(false)
    }

    onClick(event)
  }

  const handleOnKeyDown = (
    event: React.KeyboardEvent<any>,
    itemProps: HTMLAttributesWithRef
  ) => {
    if (typeof itemProps.onKeyDown === 'function') {
      itemProps.onKeyDown(event)

      // Opens sidebar and focus on the first sidebar sub item
      if (event.key === ArrowKeys.Right) {
        handleOnClick(undefined)
        // We need a delay here in order to allow the object to mount,
        // otherwise there would be nothing to focus on
        setTimeout(() => {
          state.first()
        }, 10)
      }
    }
  }

  const variants = useMemo(() => {
    return SidebarItemVariants({
      direction,
      currentItemIsCollapsible: !!currentItem?.isCollapsible,
      selected,
    })
  }, [direction, currentItem, selected])

  const isCollapsed = useMemo(
    () => (selected && !currentItem?.isCollapsible) || !selected || collapse,
    [selected, currentItem, collapse]
  )

  const className = cn({
    themeKey: 'components.sidebar.item',
    backgroundColor: collapse ? 'white' : '#F8F9FA',
  })

  return (
    <CompositeItem {...rootState} role="nav" aria-label={label} id={label}>
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...props}
            {...itemProps}
            onClick={handleOnClick}
            onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
          />
          <motion.ul
            className={className}
            initial={isCollapsed ? 'collapsed' : 'expanded'}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            variants={variants}
          >
            <Composite aria-label={label} {...state} {...baseProps}>
              {sections?.map(
                ({ title, children }, index) =>
                  children.length > 0 && (
                    <CompositeItem {...state} key={index}>
                      {(itemProps) =>
                        cloneElement(
                          <SidebarSection
                            title={title}
                            state={state}
                            parentId={label}
                            {...baseProps}
                          >
                            {children}
                          </SidebarSection>,
                          {
                            ...itemProps,
                          }
                        )
                      }
                    </CompositeItem>
                  )
              )}
            </Composite>
          </motion.ul>
        </>
      )}
    </CompositeItem>
  )
}
