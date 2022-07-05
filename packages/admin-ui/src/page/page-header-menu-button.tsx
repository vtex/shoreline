import type { Ref } from 'react'
import React, { forwardRef } from 'react'

import type { MenuButtonProps } from '../menu'
import { MenuButton } from '../menu'

/**
 * Page header menu button component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderActions, PageHeaderMenuButton } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *    </PageHeaderTitle>
 *    <PageHeaderActions>
 *      <PageHeaderMenuButton state={state} />
 *      <Menu state={state} aria-label="actions">
 *        <MenuItem label="Create" icon={<IconPlus />} />
 *        <MenuItem label="Edit" icon={<IconPencil />} />
 *      </Menu>
 *    </PageHeaderActions>
 *  </PageHeaderTop>
 * </PageHeader>
 */
export const PageHeaderMenuButton = forwardRef(
  (props: MenuButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      size = 'large',
      bleedY = true,
      variant = 'tertiary',
      labelHidden = true,
      ...menuButtonProps
    } = props

    return (
      <MenuButton
        size={size}
        bleedY={bleedY}
        variant={variant}
        labelHidden={labelHidden}
        ref={ref}
        {...menuButtonProps}
      />
    )
  }
)
