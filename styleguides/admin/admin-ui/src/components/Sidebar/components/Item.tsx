import React, { cloneElement, Fragment } from 'react'
import { SidebarDisclosure, SidebarDisclosureProps } from './Disclosure'
import { useMenuState } from './AriaSidebar'
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

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
  })

  return (
    <Fragment>
      <SidebarDisclosure
        {...props}
        secret={{
          state,
        }}
      />
      {sections?.map(
        ({ title, children }) =>
          children.length > 0 &&
          cloneElement(
            <Sidebar.Section title={title} {...baseProps}>
              {children}
            </Sidebar.Section>,
            { secret: { state } }
          )
      )}
    </Fragment>
  )
}
