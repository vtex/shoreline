import { forwardRef } from '@vtex/shoreline-utils'
import React from 'react'

import type { ClickableProps } from '../clickable'
import { Clickable } from '../clickable'
import type { NavigationTarget } from './link-box-utils'
import { navigate } from './link-box-utils'
import './link-box.css'

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
    const { href, target = '_parent', asChild = false, ...otherProps } = props

    return (
      <Clickable
        data-sl-link-box
        asChild={asChild}
        ref={ref}
        onClick={({ metaKey }) => {
          navigate(href, metaKey ? '_blank' : target)
        }}
        {...otherProps}
      />
    )
  }
)

export interface LinkBoxProps extends Omit<ClickableProps, 'onClick'> {
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
}
