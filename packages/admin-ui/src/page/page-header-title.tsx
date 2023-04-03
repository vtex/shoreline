import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconArrowLeft } from '@vtex/phosphor-icons'
import { cx } from '@vtex/admin-ui-core'

import { Button } from '../button'
import { usePageHeaderContext } from './page-header-context'

import {
  pageHeaderTitleContainer,
  pageHeaderTitleTheme,
  popNavigationButtonContainer,
} from './page.css'
import { Center } from '../center'
import { Bleed } from '../bleed'

/**
 * Page header title component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderTitle, PageHeaderTags, PageHeaderTag } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *      <PageHeaderTags>
 *        <PageHeaderTag label="Short text" />
 *        <PageHeaderTag label="Short text" />
 *      </PageHeaderTags>
 *    </PageHeaderTitle>
 *  </PageHeaderTop>
 * </PageHeader>
 */
export const PageHeaderTitle = forwardRef(function PageHeaderTitle(
  props: PageHeaderTitleProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', children, ...htmlProps } = props
  const { onPopNavigation } = usePageHeaderContext()

  return (
    <div
      ref={ref}
      className={cx(pageHeaderTitleContainer, className)}
      {...htmlProps}
    >
      {onPopNavigation && (
        <Bleed left="$space-4" className={popNavigationButtonContainer}>
          <Center>
            <Button
              aria-label="Back"
              variant="tertiary"
              size="large"
              bleedY
              icon={<IconArrowLeft />}
              onClick={onPopNavigation}
            />
          </Center>
        </Bleed>
      )}
      <div className={pageHeaderTitleTheme}>{children}</div>
    </div>
  )
})

export type PageHeaderTitleProps = ComponentPropsWithoutRef<'div'>
