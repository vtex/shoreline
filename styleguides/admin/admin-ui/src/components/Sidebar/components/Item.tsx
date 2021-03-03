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
    secret: { state: parentState, index, scope },
  } = props

  const state = useCompositeState({
    orientation: 'vertical',
    loop: true,
  })

  const sectionState = useCompositeState()

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

  return (
    <Composite {...parentState} role="toolbar" aria-label="My toolbar">
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...props}
            {...itemProps}
            onClick={(event) => {
              if (!hasSection) {
                setCurrentItem(null)
              }

              onClick(event)
            }}
          />
          {isOpen && (
            <Composite
              className={cn({
                [direction]: `3.5rem !important`,
                position: 'absolute',
                themeKey: 'components.sidebar.item',
              })}
              aria-label={label}
              {...sectionState}
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
                          { ...itemProps, secret: { state } }
                        )
                      }
                    </CompositeItem>
                  )
              )}
            </Composite>
          )}
        </>
      )}
    </Composite>
  )
}
