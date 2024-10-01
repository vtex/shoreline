import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { Drawer as Vaul } from 'vaul'
import { Heading } from '../heading'
import type { HeadingOptions } from '../heading'

/**
 * Drawer's heading
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
export const DrawerHeading = forwardRef<HTMLDivElement, DrawerHeadingProps>(
  function DrawerHeading(props, ref) {
    const { children, ...rest } = props

    return (
      <Heading variant="display2" {...rest} ref={ref} asChild>
        <Vaul.Title data-sl-drawer-heading>{children}</Vaul.Title>
      </Heading>
    )
  }
)

export type DrawerHeadingOptions = Omit<HeadingOptions, 'variant'>

export type DrawerHeadingProps = DrawerHeadingOptions &
  ComponentPropsWithoutRef<'h1'>
