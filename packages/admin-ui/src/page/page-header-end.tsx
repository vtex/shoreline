import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import { usePageHeaderContext } from './page-header-context'
import { Button } from '../button'
import { Menu, MenuButton, MenuItem, MenuList } from '../components/Menu'
import * as style from './page.style'

export const PageHeaderEnd = createComponent<'div'>((props) => {
  const { ...htmlProps } = props
  const { actionOptions, menuOptions } = usePageHeaderContext()

  const actionSet =
    actionOptions?.map((option) => <Button {...option} size="large" />) ?? null

  const actions = actionSet ? (
    <tag.div csx={style.pageHeaderActions}>{actionSet}</tag.div>
  ) : null

  const menu = menuOptions
    ? (({ menuItemOptions, ...menuOptions }) => (
        <Menu {...menuOptions} csx={{ display: 'flex' }}>
          <MenuButton
            variant="tertiary"
            bleedY
            bleedX
            csx={{ marginLeft: '0rem' }}
          />
          <MenuList aria-label="Menu">
            {menuItemOptions.map((options) => (
              <MenuItem {...options} />
            ))}
          </MenuList>
        </Menu>
      ))(menuOptions)
    : null

  return useElement('div', {
    baseStyle: { display: 'flex', alignItems: 'center' },
    children: (
      <>
        {actions}
        {menu}
      </>
    ),
    ...htmlProps,
  })
})

export type PageHeaderEnd = ComponentPropsWithRef<typeof PageHeaderEnd>
