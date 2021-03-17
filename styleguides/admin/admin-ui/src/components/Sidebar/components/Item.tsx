import React, { Children, cloneElement, useEffect, useMemo } from 'react'
import { get, useSystem, useTheme } from '@vtex/admin-core'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { motion } from 'framer-motion'
import { isElement } from 'react-is'
import { Box } from '@vtex/admin-primitives'
import { SystemComponent } from '../../../types'
import { SidebarDisclosureProps, SidebarDisclosure } from './Disclosure'
import { CompositeItem, useCompositeState } from './Aria'
import { useSidebarContext } from '../context'
import { SCALES, transition } from '../consts'
import {
  ArrowKeys,
  Item,
  SidebarSecretProps,
  SidebarItemVariantsKey,
} from '../types'

export function SidebarItem(props: _SidebarItemProps) {
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
    children,
    selected,
    variant,
    ...baseProps
  } = useSidebarItemState(props)

  return (
    <CompositeItem {...rootState} role="menuitem" aria-label={label} id={label}>
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...baseProps}
            {...itemProps}
            label={label}
            onClick={handleOnClick}
            onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
          />
          <motion.ul
            className={cn({
              themeKey: 'components.sidebar.item',
            })}
            initial={variant}
            animate={variant}
            variants={variants}
            data-testid={`${label}-ul`}
          >
            <Box
              aria-label={`${label} menu`}
              element="li"
              style={{
                listStyle: 'none',
              }}
            >
              {Children.map(children, (child, index) => {
                if (child && isElement(child)) {
                  return cloneElement(child, {
                    parentId: label,
                    key: index,
                    state,
                  })
                }

                return null
              })}
            </Box>
          </motion.ul>
        </>
      )}
    </CompositeItem>
  )
}

function useSidebarItemState(props: SidebarItemProps) {
  const {
    children,
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
    children &&
    Array.isArray(children) &&
    children.length > 0 &&
    children?.some(
      (child) =>
        isElement(child) &&
        child.props.children &&
        Array.isArray(child.props.children) &&
        child.props.children.length > 0
    )

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

  const theme = useTheme()

  const variants = useMemo(() => {
    return {
      [SidebarItemVariantsKey.FullyExpanded]: () => ({
        [direction]: SCALES.FIXED_AREA_WIDTH,
        display: 'block',
        opacity: 1,
        borderRight: `1px solid ${get(theme, 'colors.mid.tertiary')}`,
        transition,
        transitionEnd: {
          zIndex: 0,
        },
      }),
      [SidebarItemVariantsKey.FullyCollapsed]: () => ({
        [direction]:
          selected && !!currentItem?.isCollapsible ? '-8.125rem' : '-13.5rem',
        border: 'none',
        transition,
        zIndex: -1,
        transitionEnd: {
          display: 'none',
        },
      }),
      [SidebarItemVariantsKey.PartiallyExpanded]: () => ({
        [direction]: SCALES.FIXED_AREA_WIDTH,
        display: 'block',
        border: 'none',
        opacity: 1,
        transition: {
          ...transition,
          stiffness: 500,
        },
        transitionEnd: {
          zIndex: 0,
          borderRight: `1px solid ${get(theme, 'colors.mid.tertiary')}`,
        },
      }),
      [SidebarItemVariantsKey.PartiallyCollapsed]: () => ({
        [direction]:
          selected && !!currentItem?.isCollapsible ? '-8.125rem' : '2.5rem',
        transition: {
          ...transition,
          stiffness: 1000,
        },
        zIndex: -1,
        opacity: 0,
        border: 'none',
        transitionEnd: {
          display: 'none',
        },
      }),
    }
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

  const variant = useMemo(
    () =>
      shouldFullyCollapseOnTransition
        ? isCollapsed
          ? SidebarItemVariantsKey.FullyCollapsed
          : SidebarItemVariantsKey.FullyExpanded
        : isCollapsed
        ? SidebarItemVariantsKey.PartiallyCollapsed
        : SidebarItemVariantsKey.PartiallyExpanded,
    [shouldFullyCollapseOnTransition, isCollapsed]
  )

  return {
    shouldFullyCollapseOnTransition,
    isCollapsed,
    variants,
    handleOnKeyDown,
    handleOnClick,
    hasSection,
    state,
    children,
    variant,
    currentItem,
    selected,
    ...ctx,
    ...baseProps,
  }
}

export interface _SidebarItemProps
  extends Omit<SidebarDisclosureProps, 'children'>,
    SystemComponent,
    SidebarSecretProps {
  /**
   * `label` is set as the components` composite ID and
   * its value is displayed on its disclosure's tooltip.
   */
  label: string
}

export type SidebarItemProps = Omit<_SidebarItemProps, 'state'>
