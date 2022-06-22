import React from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import { Tag } from '../tag'
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
      actionOptions,
      tabOptions,
      menuOptions,
      tagOptions,
      ...htmlProps
    } = props

    const actions =
      actionOptions?.map((option) => <Button {...option} size="large" />) ??
      null

    const tabs = tabOptions?.map((option) => (
      <Tab
        {...option}
        csx={{
          ...option.csx,
          padding: 3,
        }}
      />
    ))

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

    const tags = tagOptions?.map((option) => (
      <Tag
        {...option}
        csx={{
          marginLeft: '$l',
        }}
      />
    ))

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
              <tag.div
                csx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}
              >
                {title} {tags}
              </tag.div>
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
  /**
   * Page header title
   */
  title?: ReactNode
  /**
   * Page headers' actions options.
   */
  actionOptions?: ButtonProps[]
  /**
   * Tags options.
   * Recommended: X
   */
  tagOptions?: TagProps[]
  /**
   * Tabs options.
   * Recommended: X
   */
  tabOptions?: TabProps[]
  /**
   * Menu options.
   * Only one menu per Page Header is allowed.
   */
  menuOptions?: PageHeaderMenuOptions
}

export interface PageHeaderMenuOptions extends MenuOptions {
  menuItemOptions: MenuItemProps[]
}

export type PageHeaderProps = ComponentPropsWithRef<typeof PageHeader> &
  PageHeaderOptions
