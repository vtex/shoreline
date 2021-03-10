import React, { cloneElement, useEffect, useMemo } from 'react'
import {
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
  SidebarItemVariantsKey,
} from '../utils'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { motion } from 'framer-motion'
import { SidebarSectionProps } from './Section'

export function SidebarItem(props: SidebarItemProps) {
  const { cn } = useSystem()
  const {
    hasSection,
    variants,
    isCollapsed,
    rootState,
    state,
    handleOnClick,
    handleOnKeyDown,
    label,
    shouldFullyCollapseOnTransition,
    sections,
    ...baseProps
  } = useSidebarItemState(props)

  const className = cn({
    themeKey: 'components.sidebar.item',
  })

  return (
    <CompositeItem {...rootState} role="menuitem" aria-label={label} id={label}>
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
            initial={
              shouldFullyCollapseOnTransition
                ? isCollapsed
                  ? SidebarItemVariantsKey.FullyCollapsed
                  : SidebarItemVariantsKey.FullyExpanded
                : isCollapsed
                ? SidebarItemVariantsKey.PartiallyCollapsed
                : SidebarItemVariantsKey.PartiallyExpanded
            }
            animate={
              shouldFullyCollapseOnTransition
                ? isCollapsed
                  ? SidebarItemVariantsKey.FullyCollapsed
                  : SidebarItemVariantsKey.FullyExpanded
                : isCollapsed
                ? SidebarItemVariantsKey.PartiallyCollapsed
                : SidebarItemVariantsKey.PartiallyExpanded
            }
            variants={variants}
            data-testid={`${label}-ul`}
          >
            <Composite
              aria-label={`${label} menu`}
              as="li"
              style={{
                listStyle: 'none',
              }}
              {...state}
              {...baseProps}
            >
              {sections?.map(
                ({ title, children }, index) =>
                  children.length > 0 && (
                    <CompositeItem {...state} key={index}>
                      {(itemProps) =>
                        cloneElement(
                          <SidebarSection
                            title={title}
                            parentId={label}
                            state={state}
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

function useSidebarItemState(props: SidebarItemProps) {
  const {
    sections,
    selected,
    onClick,
    index = 0,
    scope = 'top',
    ...baseProps
  } = props
  const {
    direction,
    collapse,
    currentItem,
    setCurrentItem,
    setSelectedItemsMemory,
    selectedItemsMemory,
    setCollapse,
    ...ctx
  } = useSidebarContext()

  const hasSection =
    sections &&
    sections.length > 0 &&
    sections?.some((section) => section.children.length > 0)

  useEffect(() => {
    if (selected) {
      const currItem: Item = { index, scope, isCollapsible: !!hasSection }
      setCurrentItem(currItem)
      setSelectedItemsMemory([currItem, ...selectedItemsMemory.slice(0, 1)])
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
    } else {
      setCollapse(false)
    }

    onClick(event)
  }

  const state = useCompositeState({
    orientation: 'vertical',
    loop: true,
  })

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

  const shouldFullyCollapseOnTransition = useMemo(() => {
    if (!selectedItemsMemory || selectedItemsMemory.length === 0) {
      return true
    }

    if (
      selectedItemsMemory.every((item) => item.isCollapsible) ||
      selectedItemsMemory[0].isCollapsible
    ) {
      return false
    }

    return true
  }, [selectedItemsMemory, currentItem])

  return {
    shouldFullyCollapseOnTransition,
    isCollapsed,
    variants,
    handleOnKeyDown,
    handleOnClick,
    hasSection,
    state,
    sections,
    ...ctx,
    ...baseProps,
  }
}

export interface _SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent,
    SidebarSecretProps {
  /**
   * `sections` are the body of an item's menu.
   * Their titles are displayed and above its children,
   * and they are used to separed one section from another.
   */
  sections?: SidebarSectionProps[]
  /**
   * `label` is set as the components` composite ID and
   * its value is displayed on its disclosure's tooltip.
   */
  label: string
}

export interface SidebarItemProps extends Omit<_SidebarItemProps, 'state'> {}
