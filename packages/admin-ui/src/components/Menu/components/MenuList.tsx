import type { Ref, ReactNode } from 'react'
import React, { Children, cloneElement, forwardRef } from 'react'
import { Menu as ReakitMenu } from 'reakit/menu'
import { MenuItem as ReakitMenuItem } from 'reakit'
import { tag } from '@vtex/admin-ui-react'
import { IconContainer } from '@vtex/admin-ui-icons'
import { isElement } from 'react-is'

import { useMenuContext } from '../context'
import type { SystemComponent } from '../../../types'

export const MenuList = forwardRef(
  (props: MenuListProps, ref: Ref<HTMLDivElement>) => {
    const { children, csx, ...menuListProps } = props

    const { state } = useMenuContext()

    return (
      <tag.div
        {...menuListProps}
        ref={ref}
        as={ReakitMenu}
        {...state}
        csx={{
          border: 0,
          padding: 0,
          outline: 'none',
          zIndex: 999,
        }}
      >
        <tag.div
          csx={{
            display: 'flex',
            flexDirection: 'column',
            bg: 'light.primary',
            marginTop: 1,
            padding: 3,
            minWidth: 18,
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'mid.secondary',
            boxShadow: 'menu',
            hr: {
              marginY: 2,
              borderStyle: 'solid',
              borderBottomWidth: 1,
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderColor: 'mid.secondary',
              width: (theme) => `calc(100% -${theme.space?.[3]})`,
              marginX: (theme) => `-${theme.space?.[3]}`,
              outline: 'none',
            },
            ...csx,
          }}
        >
          <IconContainer space="small">
            {Children.map(
              children,
              (child, index) =>
                isElement(child) && (
                  <ReakitMenuItem {...state} {...child.props} key={index}>
                    {(itemProps) => cloneElement(child, itemProps)}
                  </ReakitMenuItem>
                )
            )}
          </IconContainer>
        </tag.div>
      </tag.div>
    )
  }
)

export interface MenuListProps extends SystemComponent {
  /**
   * If is disabled or not
   * @default false
   */
  disabled?: boolean
  /**
   * MenuList's aria-label
   */
  'aria-label': string
  /**
   * Menu items
   */
  children?: ReactNode
}
