import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { Drawer as Vaul } from 'vaul'
import { Container } from '../content'

/**
 * Drawer's popover box
 * @example
 * <DrawerProvider>
 *  <DrawerPopover>
 *    <DrawerHeader>
 *      <DrawerHeading>Heading</DrawerHeading>
 *      <DrawerDismiss />
 *    </DrawerHeader>
 *    <DrawerContent>
 *      The content
 *    </DrawerContent>
 *  </DrawerPopover>
 * </DrawerProvider>
 */
export const DrawerPopover = forwardRef<HTMLDivElement, DrawerPopoverProps>(
  function DrawerPopover(props, ref) {
    const { children, size = 'medium', style, ...rest } = props

    return (
      <Vaul.Portal>
        <Vaul.Content
          data-vaul-no-drag
          data-size={size}
          data-sl-drawer-popover
          ref={ref}
          asChild
          style={{
            /**
             * Vaul disables user selection by default.
             * On Shoreline, the text selection is a desired feature.
             */
            userSelect: 'text',
            ...style,
          }}
        >
          <Container {...rest}>{children}</Container>
        </Vaul.Content>
      </Vaul.Portal>
    )
  }
)

export interface DrawerPopoverOptions {
  /**
   * Popover children
   */
  children: ReactNode
  /**
   * Popover width
   * @default 'medium'
   */
  size?: 'small' | 'medium'
}

export type DrawerPopoverProps = DrawerPopoverOptions &
  ComponentPropsWithoutRef<'div'>
