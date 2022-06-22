import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { Button } from '../button'

import * as style from './page.style'
import { usePageHeaderContext } from './page-header-context'
import { IconArrowLeft } from '@vtex/phosphor-icons'
import { Tag } from '../tag'

export const PageHeaderStart = createComponent<'div'>((props) => {
  const { ...htmlProps } = props
  const { onPopNavigation, title, tagOptions } = usePageHeaderContext()

  const tags = tagOptions?.map((option) => (
    <Tag
      {...option}
      csx={{
        ...option.csx,
        marginLeft: '$l',
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
