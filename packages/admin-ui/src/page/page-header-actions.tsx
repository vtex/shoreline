import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { Stack } from '../stack'
import { pageHeaderActionsTheme } from './page.css'

/**
 * Page header actions component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderActions, PageHeaderButton, PageHeaderMenuButton } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *    </PageHeaderTitle>
 *    <PageHeaderActions>
 *      <PageHeaderButton>Create</PageHeaderButton>
 *      <PageHeaderButton variant="critical">Delete</PageHeaderButton>
 *      <PageHeaderMenuButton state={state} />
 *      <Menu state={state} aria-label="actions">
 *        <MenuItem label="Create" icon={<IconPlus />} />
 *        <MenuItem label="Edit" icon={<IconPencil />} />
 *      </Menu>
 *    </PageHeaderActions>
 *  </PageHeaderTop>
 * </PageHeader>
 */
export const PageHeaderActions = forwardRef(function PageHeaderActions(
  props: PageHeaderActionsProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', children, ...htmlProps } = props

  return (
    <div
      ref={ref}
      className={cx(pageHeaderActionsTheme, className)}
      {...htmlProps}
    >
      <Stack space="$space-3" direction="row">
        {children}
      </Stack>
    </div>
  )
})

export type PageHeaderActionsProps = ComponentPropsWithoutRef<'div'>
