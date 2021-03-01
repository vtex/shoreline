import React, { cloneElement } from 'react'
import { SidebarDisclosure, SidebarDisclosureProps } from './Disclosure'
import { ReakitMenuItem, useMenuState } from './AriaSidebar'
import { SystemComponent } from '../../../types'
import { SidebarSectionProps } from './Section'
import { Sidebar } from '..'

export interface SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent {
  collapsed?: boolean
  sections?: Omit<SidebarSectionProps, 'secret'>[]
}

export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { collapsed, sections, onClick, ...baseProps } = props

  const {
    // @ts-ignore
    secret: { state: parentState },
  } = props

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
  })

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
        </>
      )}
    </ReakitMenuItem>
  )
}
