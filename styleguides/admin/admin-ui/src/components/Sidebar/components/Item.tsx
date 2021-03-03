import React, { cloneElement, useEffect } from 'react'
import {
  SidebarSectionProps,
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
import { ArrowKeys } from '../utils'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'

export interface SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent {
  sections?: Omit<SidebarSectionProps, 'secret'>[]
  label: string
}

export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { sections, selected, onClick, label, ...baseProps } = props
  const { cn } = useSystem()
  const { direction, setCurrentItem } = useSidebarContext()

  const {
    // @ts-ignore
    secret: { parentState, index, scope },
  } = props

  const state = useCompositeState({
    orientation: 'vertical',
    loop: true,
  })

  const hasSection =
    sections &&
    sections.length > 0 &&
    sections?.some((section) => section.children.length > 0)

  const isOpen = selected && hasSection

  useEffect(() => {
    if (isOpen) {
      setCurrentItem({ index, scope })
    }
  }, [isOpen])

  const handleOnClick = (event?: React.MouseEvent<any, MouseEvent>) => {
    // This means the item the user has interacted with
    // doesn't have children, so we set this to null to
    // warn the surrounding components that the sidebar
    // should not open.
    if (!hasSection) {
      setCurrentItem(null)
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

  return (
    <CompositeItem
      {...parentState}
      role="toolbar"
      aria-label={label}
      id={label}
    >
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...props}
            {...itemProps}
            onClick={handleOnClick}
            onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
          />
          {isOpen && (
            <Composite
              className={cn({
                [direction]: `3.5rem !important`,
                position: 'absolute',
                themeKey: 'components.sidebar.item',
              })}
              aria-label={label}
              {...state}
              {...baseProps}
            >
              {sections?.map(
                ({ title, children }, index) =>
                  children.length > 0 && (
                    <CompositeItem {...state} key={index}>
                      {(itemProps) =>
                        cloneElement(
                          <SidebarSection title={title} {...baseProps}>
                            {children}
                          </SidebarSection>,
                          {
                            ...itemProps,
                            secret: { state, parentState, parentId: label },
                          }
                        )
                      }
                    </CompositeItem>
                  )
              )}
            </Composite>
          )}
        </>
      )}
    </CompositeItem>
  )
}
