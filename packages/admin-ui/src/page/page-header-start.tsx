import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconArrowLeft } from '@vtex/phosphor-icons'

import { Button } from '../button'
import { usePageHeaderContext } from './page-header-context'
import { Tag } from '../tag'
import * as style from './page.style'

export const PageHeaderStart = createComponent<'div'>((props) => {
  const { ...htmlProps } = props
  const { onPopNavigation, title, tagOptions } = usePageHeaderContext()

  const tags = tagOptions?.map((option) => (
    <Tag
      {...option}
      csx={{
        ...option.csx,
        ...style.pageHeaderTag,
      }}
      size="large"
    />
  ))

  return useElement('div', {
    baseStyle: style.pageHeaderStart,
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
        <tag.div csx={style.pageHeaderTitle}>
          {title} {tags}
        </tag.div>
      </>
    ),
    ...htmlProps,
  })
})

export type PageHeaderStart = ComponentPropsWithRef<typeof PageHeaderStart>
