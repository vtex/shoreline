import type { ReactNode } from 'react'
import { Drawer as Vaul } from 'vaul'

/**
 * Drawer's state provider
 */
export function DrawerProvider(props: DrawerProviderProps) {
  const { children, open, onClose, onOpenChange, dismissible } = props

  return (
    <Vaul.Root
      open={open}
      onClose={onClose}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
      dismissible={dismissible}
      modal={false}
      direction="right"
    >
      {children}
    </Vaul.Root>
  )
}

export interface DrawerProviderOptions {
  /**
   * Provider Children
   */
  children: ReactNode
  /**
   * Wether the Drawer is open
   */
  open?: boolean
  /**
   * Dispatched on close the Drawer
   */
  onClose?: () => void
  /**
   * Distached on change the value of open
   */
  onOpenChange?: (open: boolean) => void
  /**
   * When false dragging, clicking outside, pressing esc, etc. will not close the drawer.
   * Use this in comination with the open prop, otherwise you won't be able to open/close the drawer.
   */
  dismissible?: boolean
}

export type DrawerProviderProps = DrawerProviderOptions
