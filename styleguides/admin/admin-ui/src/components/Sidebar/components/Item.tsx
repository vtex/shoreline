import React, { Fragment, FunctionComponentElement } from 'react'
import { SidebarDisclosure, SidebarDisclosureProps } from './Disclosure'
import { SidebarSubItemProps } from './SubItem'
import { ReakitMenu, useMenuState } from './AriaSidebar'
import { SystemComponent } from '../../../types'
import { useSystem } from '@vtex/admin-core'
import { useSidebarContext } from '../context'
import { Set } from '../../Set'

export interface SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent {
  collapsed?: boolean
  subItems?: {
    children: FunctionComponentElement<SidebarSubItemProps>[]
  }
}

export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { collapsed, subItems, disabled, ...baseProps } = props
  const { cn } = useSystem()

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
  })

  const { direction } = useSidebarContext()

  return (
    <Fragment>
      <SidebarDisclosure
        {...props}
        secret={{
          state,
        }}
      />
      {subItems?.children && subItems.children.length > 0 && (
        <ReakitMenu
          className={cn({
            [direction]: `72px !important`,
            transform: 'unset !important',
            outline: 'none',
            backgroundColor: '#F8F9FA',
            height: '100%',
          })}
          {...state}
          {...baseProps}
          disabled={disabled}
        >
          <Set
            spacing={0.5}
            orientation="vertical"
            styleOverrides={{
              width: 'calc(200px - 0.875rem)',
              padding: '0.875rem',
              height: 'inherit',
              borderRight: '1px solid #E0E2E7',
            }}
          >
            {subItems.children}
          </Set>
        </ReakitMenu>
      )}
    </Fragment>
  )
}
