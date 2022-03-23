import type { ReactElement, ReactNode, Ref } from 'react'
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  forwardRef,
} from 'react'

import { CompositeItem, useCompositeState } from 'reakit/Composite'
import { tag } from '@vtex/admin-ui-react'

import type { SidebarDisclosureProps } from './SidebarDisclosure'
import { SidebarDisclosure } from './SidebarDisclosure'
import { useSidebarContext, ItemProvider } from './SidebarContext'
import { SCALES, ArrowKeys } from '../consts'

/**
 * Corresponds to an item of the sidebar's first level.
 * It can hold multiple sections exhibited when the sidebar is expanded.
 */
export const SidebarItem = forwardRef(function SidebarItem(
  props: SidebarItemProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    children,
    onClick,
    label,
    uniqueKey,
    selected: currentSelected,
    icon,
    ...baseProps
  } = props

  const state = useSidebarContext()

  const selected = useMemo(
    () => state.isSelected(uniqueKey),
    [uniqueKey, state.isSelected]
  )

  const selectedFallback = state.selectedItemFallback?.uniqueKey === uniqueKey

  const compositeState = useCompositeState({
    baseId: 'item--',
    orientation: 'vertical',
    loop: true,
  })

  const expandable = state.isExpandable(children)
  const translate =
    selected && expandable && !state.layout.reduced ? '3rem' : '-13.5rem'

  useEffect(() => {
    if (currentSelected && !expandable) {
      handleSelection()
    }
  }, [currentSelected])

  const handleSelection = () => {
    const currItem = {
      uniqueKey,
      expandable,
    }

    state.setSelectedItem(currItem)
    state.setSelectedItemFallback(currItem)
  }

  const handleExpansion = () => {
    if (!expandable) return

    state.layout.expand()
  }

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    handleSelection()
    handleExpansion()
    onClick?.(event)
  }

  const handleOnKeyDown = (
    event: React.KeyboardEvent<any>,
    itemProps: HTMLAttributesWithRef
  ) => {
    if (typeof itemProps.onKeyDown === 'function') {
      itemProps.onKeyDown(event)

      // Opens sidebar and focus on the first sidebar sub item
      if (event.key === ArrowKeys.Right) {
        handleSelection()
        handleExpansion()
        // We need a delay here in order to allow the object to mount,
        // otherwise there would be nothing to focus on
        setTimeout(() => {
          compositeState.first()
        }, 10)
      }
    }
  }

  return (
    <CompositeItem
      ref={ref}
      {...state.composite}
      role="menuitem"
      aria-label={label}
      id={label}
      onMouseEnter={() => {
        if (!expandable) {
          state.setSelectedItem(state.selectedItemFallback)

          return
        }

        if (state.isReduced()) {
          return
        }

        state.setSelectedItem({
          uniqueKey,
          expandable,
        })
      }}
    >
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...itemProps}
            icon={icon}
            selected={selected}
            selectedFallback={selectedFallback}
            expandable={expandable}
            label={label}
            onClick={handleOnClick}
            onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
          />
          <tag.ul
            csx={{
              position: 'absolute',
              top: 0,
              left: '0.5rem',
              maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
              height: '100%',
              width: '12.5rem',
              padding: '$s',
              outline: 'none',
              overflow: 'auto',
              backgroundColor: 'transparent',
              transform: `translateX(${translate})`,
              opacity: selected && !state.layout.reduced ? 1 : 0,
              transition:
                'transform 150ms cubic-bezier(0.4, 0.14, 0.3, 1), opacity 150ms cubic-bezier(0.4, 0.14, 0.3, 1)',
            }}
            data-testid={`${label}-ul`}
            {...(baseProps as any)}
          >
            <tag.li
              aria-label={`${label} menu`}
              csx={{
                listStyle: 'none',
              }}
            >
              <ItemProvider
                value={{
                  state: compositeState,
                  id: label,
                  selected,
                }}
              >
                {Children.map(children, (child, index) =>
                  cloneElement(child as ReactElement, {
                    key: `sidebar-${label}-element-${index}`,
                    position: index,
                  })
                )}
              </ItemProvider>
            </tag.li>
          </tag.ul>
        </>
      )}
    </CompositeItem>
  )
})

type HTMLAttributesWithRef<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>

export interface SidebarItemProps extends SidebarDisclosureProps {
  children?: ReactNode
  /**
   * `label` is set as the components` composite ID and
   * its value is displayed on its disclosure's tooltip.
   */
  label: string
  /**
   * key that defines your item as unique
   */
  uniqueKey: string | number
}
