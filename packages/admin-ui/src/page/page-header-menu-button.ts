import { createComponent, useElement } from '@vtex/admin-ui-react'

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
export const PageHeaderMenuButton = createComponent<typeof MenuButton>(
  (props) => {
    const {
      children,
      size = 'large',
      bleedY = true,
      variant = 'tertiary',
      labelHidden = true,
      ...htmlProps
    } = props

    return useElement(MenuButton, {
      children,
      size,
      bleedY,
      variant,
      labelHidden,
      ...htmlProps,
    })
  }
)
