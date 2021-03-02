import React, { cloneElement } from 'react'
import { SidebarDisclosure, SidebarDisclosureProps } from './Disclosure'
import { ReakitMenuItem, ReakitMenu, useMenuState } from './AriaSidebar'
import { SystemComponent } from '../../../types'
import { SidebarSectionProps } from './Section'
import { Sidebar } from '..'
import { useSystem } from '@vtex/admin-core'
import { useSidebarContext } from '../context'

export interface SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent {
  collapsed?: boolean
  sections?: Omit<SidebarSectionProps, 'secret'>[]
}

export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { collapsed, sections, onClick, ...baseProps } = props
  const { cn } = useSystem()
  const { direction } = useSidebarContext()

  const {
    // @ts-ignore
    secret: { state: parentState },
  } = props

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
  })

  const sectionState = useMenuState()

  return (
    <ReakitMenuItem {...parentState}>
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...props}
            {...itemProps}
            // These prevent the sidebar to open/collapse as
            // a user hovers the mouse over the sidebar disclosure
            onMouseEnter={(event) => event.preventDefault()}
            onMouseLeave={(event) => event.preventDefault()}
            onClick={onClick}
            secret={{
              state,
            }}
          />
          {sections &&
            sections.length > 0 &&
            sections?.some((section) => section.children.length > 0) && (
              <ReakitMenu
                className={cn({
                  [direction]: `56px !important`,
                  transform: 'unset !important',
                  outline: 'none',
                  backgroundColor: '#F8F9FA',
                  height: '100%',
                  padding: '1.875rem 0.875rem',
                  borderRight: '1px solid #E0E2E7',
                })}
                aria-label={'Tooltip title should come here'}
                {...sectionState}
                {...state}
                {...baseProps}
              >
                {sections?.map(
                  ({ title, children }, index) =>
                    children.length > 0 && (
                      <ReakitMenuItem {...state} key={index}>
                        {(itemProps) =>
                          cloneElement(
                            <Sidebar.Section title={title} {...baseProps}>
                              {children}
                            </Sidebar.Section>,
                            { ...itemProps, secret: { state } }
                          )
                        }
                      </ReakitMenuItem>
                    )
                )}
              </ReakitMenu>
            )}
        </>
      )}
    </ReakitMenuItem>
  )
}
