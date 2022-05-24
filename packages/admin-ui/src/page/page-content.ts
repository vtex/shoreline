import { Children } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './page.style'

/**
 * Page content component
 * @example
 * <Page>
 *  <PageContent />
 * </Page>
 */
export const PageContent = createComponent<'div', PageContentOptions>(
  (props) => {
    const { layout = 'standard', template, ...htmlProps } = props

    const gridTemplateColumns =
      template ?? `repeat(${Children.count(htmlProps.children)}, 1fr)`

    return useElement('div', {
      baseStyle: {
        ...style.pageContent,
        ...style.pageContentVariants({
          layout,
        }),
        gridTemplateColumns,
      },
      ...htmlProps,
    })
  }
)

export type PageContentOptions = VariantProps<
  typeof style.pageContentVariants
> & {
  template?: string
}

export type PageContentProps = ComponentPropsWithRef<typeof PageContent> &
  PageContentOptions
