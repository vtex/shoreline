import { forwardRef } from '@vtex/shoreline'
import { useRef, useState } from 'react'

import type { AIComposerFieldProps } from './types'

/**
 * Pill container for the composer input and footer. It draws a focus ring
 * only when focus does not come from a pointer (`data-focus-visible`): a text
 * field matches `:focus-visible` on a click too, so the CSS alone cannot tell
 * a Tab from a click.
 *
 * @status experimental
 */
export const AIComposerField = forwardRef<HTMLDivElement, AIComposerFieldProps>(
  function AIComposerField(props, ref) {
    const { children, onPointerDown, onFocus, onBlur, ...divProps } = props
    const pointerDown = useRef(false)
    const [keyboardFocus, setKeyboardFocus] = useState(false)

    return (
      <div
        ref={ref}
        data-sl-ai-composer-field
        data-focus-visible={keyboardFocus ? '' : undefined}
        onPointerDown={(event) => {
          pointerDown.current = true
          onPointerDown?.(event)
        }}
        onFocus={(event) => {
          setKeyboardFocus(!pointerDown.current)
          onFocus?.(event)
        }}
        onBlur={(event) => {
          pointerDown.current = false
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setKeyboardFocus(false)
          }
          onBlur?.(event)
        }}
        {...divProps}
      >
        {children}
      </div>
    )
  }
)
