import React, { Children, cloneElement, useEffect, useMemo } from 'react'
import { useSystem } from '@vtex/admin-core'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { isElement } from 'react-is'
import { Box } from '@vtex/admin-primitives'
import { SystemComponent } from '../../../types'
import { SidebarDisclosureProps, SidebarDisclosure } from './Disclosure'
import { CompositeItem, useCompositeState } from './Aria'
import { useSidebarContext } from '../context'
import {
  ArrowKeys,
  Item,
  SidebarSecretProps,
  SidebarItemVariantsKey,
} from '../types'
import { SidebarSection } from './Section'

function _SidebarItem(props: SidebarItemProps) {
  const { cn } = useSystem()
  const {
    hasSection,
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
    direction,
    currentItem,
    collapse,
    setShowCollapseButton,
    ...baseProps
  } = useSidebarItemState(props)

  return (
    <CompositeItem {...rootState} role="menuitem" aria-label={label} id={label}>
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...baseProps}
            {...itemProps}
            selected={selected}
            label={label}
            onClick={handleOnClick}
            onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
          />
          <ul
            className={cn({
              themeKey: 'components.sidebar.item',
              [direction]:
                selected && !!currentItem?.isCollapsible && !collapse
                  ? '3.5rem'
                  : '-13.5rem',
            })}
            data-testid={`${label}-ul`}
            onMouseEnter={() =>
              typeof setShowCollapseButton === 'function' &&
              setShowCollapseButton(true)
            }
            onMouseLeave={() =>
              typeof setShowCollapseButton === 'function' &&
              setShowCollapseButton(false)
            }
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
          </ul>
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
    handleOnKeyDown,
    handleOnClick,
    hasSection,
    state,
    children,
    variant,
    currentItem,
    direction,
    selected,
    collapse,
    ...ctx,
    ...baseProps,
  }
}

export const SidebarItem = Object.assign(_SidebarItem, {
  /**
   * Each `<Sidebar.Item.Section />` is responsible for
   * defining the scope of a section within a sidebar item.
   * It holds the `<Sidebar.Item.Section.Item />`, which
   * is the last node of the sidebar tree and where clients
   * will interact most to perform actions.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Header>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/promotions" })}>
   *       <Sidebar.Item.Section title={"Promotions"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/promotions" })}>
   *         Promotions
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/discounts"})} >
   *         Discounts
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Header>
   *    <Sidebar.Footer>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/apps" })}>
   *       <Sidebar.Item.Section title={"Apps"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps" })}>
   *         Installed apps
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps-store"})} >
   *         Apps store
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  Section: SidebarSection,
})

export interface SidebarItemProps
  extends Omit<SidebarDisclosureProps, 'children'>,
    SystemComponent,
    SidebarSecretProps {
  /**
   * `label` is set as the components` composite ID and
   * its value is displayed on its disclosure's tooltip.
   */
  label: string
}
