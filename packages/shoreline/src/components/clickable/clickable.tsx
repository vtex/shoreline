import type { ComponentPropsWithoutRef } from 'react'
import type React from 'react'
import { forwardRef } from 'react'
import { hasSomeTextSelected } from '@vtex/shoreline-utils'

import { Compose } from '../compose'

/**
 * Represents clickable surfaces
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
  const shouldBubbleEvent = !!event.target.getAttribute('data-should-bubble')
  event.target.removeAttribute('data-should-bubble')

  return shouldBubbleEvent
}

export interface ExtendedMouseEvent
  extends Omit<React.MouseEvent<any>, 'target'> {
  target: React.MouseEvent<any>['target'] & {
    setAttribute: (qualifiedName: string, value: string) => void
    getAttribute: (attribute: string) => any
    removeAttribute: (attribute: string) => void
  }
}

export interface ClickableOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type ClickableProps = ClickableOptions & ComponentPropsWithoutRef<'div'>
