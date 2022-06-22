import React from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import type { MenuItemProps, MenuOptions } from '../components/Menu'
import { Menu, MenuButton, MenuItem, MenuList } from '../components/Menu'
import type { TagProps } from '../tag'
import type { TabProps } from '../components/Tabs'
import { TabList, Tab } from '../components/Tabs'
import { IconArrowLeft } from '@vtex/phosphor-icons'

/**
 * Page header component
 * @example
 * <PageHeader onPopNavigation={() => {}}>
 *  <PageTitle>
 *    Title
 *  </PageTitle>
 * </PageHeader>
 */
export const PageHeader = createComponent<'header', PageHeaderOptions>(
  (props) => {
    const {
      onPopNavigation,
      children,
      title,
      actionsOptions,
      tabsOptions,
      menuOptions,
      ...htmlProps
    } = props

    const actions =
      actionsOptions?.map((option) => <Button {...option} size="large" />) ??
      null

    const tabs = tabsOptions?.map((option) => <Tab {...option} />)

    const menu = menuOptions
      ? (({ menuItemOptions, ...menuOptions }) => (
          <Menu {...menuOptions}>
            <MenuButton variant="tertiary" />
            <MenuList aria-label="Menu">
              {menuItemOptions.map((options) => (
                <MenuItem {...options} />
              ))}
            </MenuList>
          </Menu>
        ))(menuOptions)
      : null

    return useElement('header', {
      baseStyle: style.pageHeader,
      children: (
        <PageHeaderContext.Provider
          value={{
            onPopNavigation,
          }}
        >
          <tag.div csx={style.pageHeaderContent}>
            <tag.div csx={style.pageTitle}>
              {onPopNavigation && (
                <Button
                  variant="tertiary"
                  bleedX
                  bleedY
                  icon={<IconArrowLeft />}
                  onClick={onPopNavigation}
                  csx={style.popNavigationButton}
                />
              )}
              <tag.div>{title}</tag.div>
            </tag.div>
            {actions && !menu ? (
              <tag.div csx={style.pageActions}>{actions}</tag.div>
            ) : null}
            {actions && menu ? (
              <tag.div csx={{ display: 'flex', alignItems: 'center' }}>
                <tag.div csx={style.pageActions}>{actions}</tag.div>
                {menu}
              </tag.div>
            ) : null}
            {menu && !actions ? menu : null}
          </tag.div>
          {tabs ? (
            <tag.div
              csx={{
                width: '100%',
                marginTop: '$l',
                marginBottom: '-1.55rem',
                '* > button': {
                  minWidth: 'unset',
                },
                maxWidth: '95rem',
              }}
            >
              <TabList
                csx={{
                  paddingX: 'unset',
                }}
              >
                {tabs}
              </TabList>
            </tag.div>
          ) : null}
        </PageHeaderContext.Provider>
      ),
      ...htmlProps,
    })
  }
)

export interface PageHeaderOptions {
  onPopNavigation?: () => void
  title?: ReactNode
  actionsOptions?: ButtonProps[]
  tagsOptions?: TagProps[]
  /**
   * Tabs options.
   */
  tabsOptions?: TabProps[]
  menuOptions?: PageHeaderMenuOptions
}

export interface PageHeaderMenuOptions extends MenuOptions {
  menuItemOptions: MenuItemProps[]
}

export type PageHeaderProps = ComponentPropsWithRef<typeof PageHeader> &
  PageHeaderOptions
