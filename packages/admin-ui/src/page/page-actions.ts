import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'

/**
 * Page actions component
 * @example
 * <PageHeader>
 *  <PageActions>
 *    <Button />
 *  </PageActions>
 * </PageHeader>
 */
export const PageActions = createComponent<'div'>((props) =>
  useElement('div', {
    baseStyle: style.pageActions,
    ...props,
  })
)

export type PageActionsProps = ComponentPropsWithRef<typeof PageActions>
