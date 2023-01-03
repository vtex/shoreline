import type { ReactNode } from 'react'
import React from 'react'
import invariant from 'tiny-invariant'

import { Skeleton } from '../../skeleton'
import { Menu, MenuButton, MenuItem, useMenuState } from '../../menu'
import type { ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'

export function menuResolver<T>() {
  return createResolver<T, 'menu', MenuResolver<T>>({
    cell: function MenuResolver({ item, column, context }) {
      if (context === 'loading') {
        return <Skeleton csx={{ size: 24 }} />
      }

      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the menu resolver'
      )

      const { actions } = resolver

      const state = useMenuState()

      const data = (
        <>
          <MenuButton
            state={state}
            onClick={(e) => e.stopPropagation()}
            variant="neutralTertiary"
            labelHidden
          />
          <Menu state={state}>
            {actions.map((action, index) => {
              return (
                <MenuItem
                  label={action.label}
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick(item, e)
                  }}
                  disabled={action?.disabled}
                  critical={action?.critical}
                  icon={action?.icon}
                  key={index}
                />
              )
            })}
          </Menu>
        </>
      )

      const render = resolver?.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

export interface MenuActions<T> {
  label: string
  onClick: (item: T, event: React.MouseEvent<HTMLDivElement>) => void
  icon?: ReactNode
  disabled?: boolean
  critical?: boolean
}

export type MenuResolver<T> = {
  type: 'menu'
  actions: Array<MenuActions<T>>
  render?: (props: ResolverRenderProps<JSX.Element, T>) => JSX.Element
}
