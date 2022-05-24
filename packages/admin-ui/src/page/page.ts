import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'

/**
 * Page component
 * @example
 * <Page>
 *  <PageContent />
 * </Page>
 */
export const Page = createComponent<'div'>((props) =>
  useElement('div', {
    baseStyle: style.page,
    ...props,
  })
)

export type PageProps = ComponentPropsWithRef<typeof Page>
