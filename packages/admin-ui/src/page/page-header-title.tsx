import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconArrowLeft } from '@vtex/phosphor-icons'
import { cx } from '@vtex/admin-ui-core'

import { Button } from '../button'
import { usePageHeaderContext } from './page-header-context'

import {
  pageHeaderTitleContainer,
  pageHeaderTitleTheme,
  popNavigationButtonTheme,
} from './page.css'

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
        <Button
          aria-label="Back"
          variant="tertiary"
          size="large"
          bleedY
          bleedX
          icon={<IconArrowLeft />}
          onClick={onPopNavigation}
          className={popNavigationButtonTheme}
        />
      )}
      <div className={pageHeaderTitleTheme}>{children}</div>
    </div>
  )
})

export type PageHeaderTitleProps = ComponentPropsWithoutRef<'div'>
