import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconArrowLeft } from '@vtex/phosphor-icons'

import { Button } from '../button'
import { usePageHeaderContext } from './page-header-context'
import * as style from './page.style'

export const PageHeaderTitle = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props
  const { onPopNavigation } = usePageHeaderContext()

  return useElement('div', {
    baseStyle: style.pageHeaderTitleBase,
    children: (
      <>
        {onPopNavigation && (
          <Button
            variant="tertiary"
            bleedX
            size="large"
            bleedY
            icon={<IconArrowLeft />}
            onClick={onPopNavigation}
            csx={style.popNavigationButton}
          />
        )}
        <tag.div csx={style.pageHeaderTitle}>{children}</tag.div>
      </>
    ),
    ...htmlProps,
  })
})

export type PageHeaderTitle = ComponentPropsWithRef<typeof PageHeaderTitle>
