import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import { Drawer as Vaul } from 'vaul'
import { Container } from '../content'

export const DrawerPopover = forwardRef<HTMLDivElement, DrawerPopoverProps>(
  function DrawerPopover(props, ref) {
    const { children, size = 'medium', ...rest } = props

    return (
      <Vaul.Portal>
        <Vaul.Content
          data-size={size}
          data-sl-drawer-popover
          ref={ref}
          asChild
          {...rest}
        >
          <Container data-sl-drawer-container>{children}</Container>
        </Vaul.Content>
      </Vaul.Portal>
    )
  }
)

export interface DrawerPopoverProps {
  className?: string
  children: ReactNode
  size?: 'small' | 'medium' | 'large'
}
