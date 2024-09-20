import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import type { ContentOptions } from '../content'
import { Content } from '../content'

/**
 * Drawer's footer container
 * @example
 * <DrawerProvider>
 *  <DrawerPopover>
 *    <DrawerFooter>
 *      <Button>...</Button>
 *      <Button>...</Button>
 *    </DrawerFooter>
 *  </DrawerPopover>
 * </DrawerProvider>
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter(props, ref) {
    return (
      <Content data-sl-drawer-footer narrow asChild>
        <footer ref={ref} {...props} />
      </Content>
    )
  }
)

export type DrawerFooterOptions = Omit<ContentOptions, 'narrow' | 'asChild'>

export type DrawerFooterProps = DrawerFooterOptions &
  ComponentPropsWithoutRef<'div'>
