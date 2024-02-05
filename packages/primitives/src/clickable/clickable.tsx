import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { hasSomeTextSelected } from '@vtex/shoreline-utils'

import { Compose } from '../compose'

/**
 * Represents clickable surfaces
 *
 * @kind primitives
 * @example
 * <Clickable>
 *   Text <button>Click Me</button>
 * </Clickable>
 */
export const Clickable = forwardRef<HTMLDivElement, ClickableProps>(
  function Clickable(props, ref) {
    const { asChild = false, onClick, style, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    const clickEvent = (event: ExtendedMouseEvent): void => {
      const shouldPreventClick =
        event.currentTarget !== event.target && !shouldBubble(event)

      if (shouldPreventClick) return

      if (!hasSomeTextSelected()) {
        onClick?.(event)
      }
    }

    return (
      <Comp
        data-sl-clickable
        ref={ref}
        onClick={clickEvent}
        style={{
          userSelect: 'none',
          ...style,
        }}
        {...otherProps}
      />
    )
  }
)

function shouldBubble(event: ExtendedMouseEvent): boolean {
  return !!event?.target?.getAttribute('data-sl-clickable-bubble')
}

interface ExtendedMouseEvent extends Omit<React.MouseEvent<any>, 'target'> {
  target: React.MouseEvent<any>['target'] & {
    getAttribute: (attribute: string) => any
  }
}

export interface ClickableProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
