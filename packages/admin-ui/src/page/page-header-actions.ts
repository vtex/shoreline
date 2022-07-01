import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'

/**
 * Page header actions component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderActions, Button } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *    </PageHeaderTitle>
 *    <PageHeaderActions>
 *      <Button size="large" bleedY>Create</Button>
 *      <Button size="large" bleedY variant="critical">Delete</Button>
 *      <MenuButton
 *        state={state}
 *        variant="tertiary"
 *        size="large"
 *        labelHidden
 *        bleedY
 *      />
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
    children,
    ...htmlProps,
  })
})

export type PageHeaderActions = ComponentPropsWithRef<typeof PageHeaderActions>
