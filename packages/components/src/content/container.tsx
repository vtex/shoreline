import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { containerStyle } from './content.css'
import type { ContentContainerAs } from './types'

/**
 * Wraps Content component to support Container Queries
 * @example
 * <Container>
 *  <Content>...</Content>
 * </Container>
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const { className, as: Comp = 'div', children, ...otherProps } = props

    return (
      <Comp
        data-sl-container
        ref={ref}
        className={cx(containerStyle, className)}
        {...otherProps}
      >
        {children}
      </Comp>
    )
  }
)

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Select the rendered html tag
   * @default 'div'
   */
  as?: ContentContainerAs
}
