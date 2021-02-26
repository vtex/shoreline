import React, { Fragment, FunctionComponentElement } from 'react'
import { Box } from '../../Box'
import { SidebarDisclosure, SidebarDisclosureProps } from './Disclosure'
import { SidebarSubItemProps } from './SubItem'
import { ReakitMenu, useMenuState } from './AriaSidebar'
import { SystemComponent } from '../../../types'
import { useSystem } from '@vtex/admin-core'
import { useSidebarContext } from '../context'

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
      {subItems?.children && (
        <ReakitMenu
          className={cn({
            [direction]: `72px !important`,
            transform: 'unset !important',
            outline: 'none',
          })}
          {...state}
          {...baseProps}
          disabled={disabled}
        >
          <Box
            styles={{
              display: 'flex',
              flexDirection: 'column',
              width: 200,
              height: 'inherit',
            }}
          >
            {subItems.children}
          </Box>
        </ReakitMenu>
      )}
    </Fragment>
  )
}
