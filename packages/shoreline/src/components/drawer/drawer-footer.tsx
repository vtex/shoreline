import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import type { ContentOptions } from '../content'
import { Content } from '../content'

/**
 * Drawer's footer container
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Content data-sl-drawer-footer narrow ref={ref} {...otherProps}>
        {children}
      </Content>
    )
  }
)

export type DrawerFooterOptions = Omit<ContentOptions, 'narrow'>

export type DrawerFooterProps = DrawerFooterOptions &
  ComponentPropsWithoutRef<'div'>
