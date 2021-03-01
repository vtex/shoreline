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
  const { collapsed, sections, ...baseProps } = props

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
