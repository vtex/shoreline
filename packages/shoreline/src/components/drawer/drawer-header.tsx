import { Content, type ContentOptions } from '../content'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

/**
 * Drawer's header container
 * @example
 * <DrawerProvider>
 *  <DrawerPopover>
 *    <DrawerHeader>
 *      <DrawerHeading>Heading</DrawerHeading>
 *      <DrawerDismiss />
 *    </DrawerHeader>
 *  </DrawerPopover>
 * </DrawerProvider>
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader(props, ref) {
    return (
      <Content narrow asChild>
        <header data-sl-drawer-header ref={ref} {...props} />
      </Content>
    )
  }
)

export type DrawerHeaderOptions = Omit<ContentOptions, 'narrow' | 'asChild'>

export type DrawerHeaderProps = DrawerHeaderOptions &
  ComponentPropsWithoutRef<'header'>
