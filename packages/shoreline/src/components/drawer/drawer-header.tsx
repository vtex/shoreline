import { Content } from '../content'
import type { ComponentPropsWithoutRef } from 'react'

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
export function DrawerHeader(props: DrawerHeaderProps) {
  return (
    <Content narrow asChild>
      <header data-sl-drawer-header {...props} />
    </Content>
  )
}

export type DrawerHeaderProps = ComponentPropsWithoutRef<'header'>
