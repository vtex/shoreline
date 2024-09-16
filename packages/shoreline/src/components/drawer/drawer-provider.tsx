import type { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { Drawer as Vaul } from 'vaul'

/**
 * Drawer's state provider
 */
export function DrawerProvider(props: DrawerProviderProps) {
  const { children, open, onClose, onOpenChange, ...rest } = props

  return (
    <Vaul.Root
      open={open}
      onClose={onClose}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
      modal={false}
      direction="right"
    >
      <div data-sl-drawer-root {...rest}>
        {children}
      </div>
    </Vaul.Root>
  )
}

export type DrawerPropviderOptions = Pick<
  ComponentProps<typeof Vaul.Root>,
  'open' | 'onClose' | 'onOpenChange'
>

export type DrawerProviderProps = ComponentPropsWithoutRef<'div'> &
  DrawerPropviderOptions
