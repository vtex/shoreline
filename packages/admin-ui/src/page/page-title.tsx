import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconArrowLeft } from '@vtex/phosphor-icons'

import { usePageHeaderContext } from './page-header-context'
import { Heading } from '../components/Heading'
import { Button } from '../button'
import * as style from './page.style'

/**
 * Page title component
 * @example
 * <PageHeader onPopNavigation={() => {}}>
 *  <PageTitle>
 *    Title
 *  </PageTitle>
 * </PageHeader>
 */
export const PageTitle = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props
  const { onPopNavigation } = usePageHeaderContext()

  return useElement('div', {
    baseStyle: style.pageTitle,
    children: (
      <>
        {onPopNavigation && (
          <Button
            variant="tertiary"
            icon={<IconArrowLeft />}
            onClick={onPopNavigation}
          />
        )}
        <Heading>{children}</Heading>
      </>
    ),
    ...htmlProps,
  })
})

export type PageTitleProps = ComponentPropsWithRef<typeof PageTitle>
