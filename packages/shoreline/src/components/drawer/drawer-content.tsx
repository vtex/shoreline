import { Content, type ContentOptions } from '../content'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

/**
 * Drawer's content
 * @example
 * <DrawerProvider>
 *  <DrawerPopover>
 *    <DrawerContent>
 *      The drawer content goes here
 *    <DrawerContent>
 *  </DrawerPopover>
 * </DrawerProvider>
 */
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(props: DrawerContentProps, ref) {
    const { children, ...rest } = props

    return (
      <Content data-sl-drawer-content narrow ref={ref} {...rest}>
        {children}
      </Content>
    )
  }
)

export type DrawerContentOptions = Omit<ContentOptions, 'narrow'>

export type DrawerContentProps = DrawerContentOptions &
  ComponentPropsWithoutRef<'div'>
