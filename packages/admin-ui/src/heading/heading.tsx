import { Heading as BaseHeading } from 'ariakit'

import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { headingTheme } from './heading.style'

/**
 * Anchor component
 * @example
 * <Anchor href="#">Link to #</Anchor>
 */
export const Heading = forwardRef(function Heading(
  props: HeadingProps,
  ref: Ref<HTMLHeadingElement>
) {
  const { className = '', children, ...headingProps } = props

  return (
    <BaseHeading
      ref={ref}
      className={cx(headingTheme, className)}
      {...headingProps}
    >
      {children}
    </BaseHeading>
  )
})

type DeprecatedHeadingProps = {
  /**
   * @deprecated Use HeadingLevel instead
   * @example
   * <HeadingLevel>
   *  <Heading>Heading 1</Heading>
   * </HeadingLevel>
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export type HeadingProps = ComponentPropsWithoutRef<'h1'> &
  DeprecatedHeadingProps
