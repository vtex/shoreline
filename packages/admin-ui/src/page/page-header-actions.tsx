import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Stack } from '../stack'
import * as style from './page.style'

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
export const PageHeaderActions = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props

  return useElement('div', {
    baseStyle: style.pageHeaderActions,
    children: (
      <Stack space="$space-3" direction="row">
        {children}
      </Stack>
    ),
    ...htmlProps,
  })
})

export type PageHeaderActions = ComponentPropsWithRef<typeof PageHeaderActions>
