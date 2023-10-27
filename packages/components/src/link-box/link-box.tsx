import { forwardRef } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import type { NavigationTarget } from './link-box-utils'
import { navigate, hasSomeTextSelected } from './link-box-utils'
import { Compose } from '../compose'

/**
 * A container that acts as a link. It allows text selection and stop its children event propagation.
 * @example
 * <LinkBox href="">
 *   <div>
 *     <a>...</a>
 *   </div>
 *   <button>...</button>
 * </LinkBox>
 */
export const LinkBox = forwardRef<HTMLDivElement, LinkBoxProps>(
  function LinkBox(props, ref) {
    const {
      href,
      target = '_parent',
      onClick,
      asChild = false,
      ...otherProps
    } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        data-sl-link-box
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget !== e.target) return

          if (!hasSomeTextSelected()) {
            navigate(href, e.metaKey ? '_blank' : target)
          }

          onClick?.(e as any)
        }}
        {...otherProps}
      />
    )
  }
)

export interface LinkBoxProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The URL that the hyperlink points to.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href
   */
  href: string
  /**
   * Where to display the linked URL
   * @default '_parent'
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
   */
  target?: NavigationTarget
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
