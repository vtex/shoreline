import { forwardRef } from 'react'
import { Drawer as Vaul } from 'vaul'
import type { HeadingProps } from '../heading'
import { Heading } from '../heading'

export const DrawerHeading = forwardRef<HTMLDivElement, DrawerHeadingProps>(
  function DrawerHeading(props, ref) {
    const { variant = 'display1', children, ...rest } = props

    return (
      <Heading data-variant={variant} {...rest} ref={ref} asChild>
        <Vaul.Title data-sl-drawer-heading>{children}</Vaul.Title>
      </Heading>
    )
  }
)

export interface DrawerHeadingProps extends HeadingProps {}
