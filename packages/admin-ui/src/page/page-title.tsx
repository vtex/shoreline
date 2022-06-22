import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconArrowLeft } from '@vtex/phosphor-icons'

import { usePageHeaderContext } from './page-header-context'
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
            bleedX
            bleedY
            icon={<IconArrowLeft />}
            onClick={onPopNavigation}
            csx={style.popNavigationButton}
          />
        )}
        <tag.div>{children}</tag.div>
      </>
    ),
    ...htmlProps,
  })
})

export type PageTitleProps = ComponentPropsWithRef<typeof PageTitle>
