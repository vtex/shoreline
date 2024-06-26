import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { Compose } from '../compose'

/**
 * Links represent navigation inside a page or between pages, including to pages outside the Admin. They exist within or directly after a text.
 * @status stable
 * @example
 * <Link href="https://vtex.com">Go to VTEX</Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { asChild, ...otherProps } = props
    const Comp = asChild ? Compose : 'a'

    return <Comp data-sl-link ref={ref} {...otherProps} />
  }
)

export interface LinkOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type LinkProps = LinkOptions & ComponentPropsWithoutRef<'a'>
