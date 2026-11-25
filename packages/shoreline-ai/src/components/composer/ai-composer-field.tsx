import { isFocusVisible } from '@react-aria/interactions'
import { forwardRef } from '@vtex/shoreline'
import { useState } from 'react'

import type { AIComposerFieldProps } from './types'

/**
 * Pill container for the composer input and footer. It draws a focus ring
 * when the text field receives focus from the keyboard (`data-focus-visible`).
 * A text field matches `:focus-visible` on a click too, so the CSS alone
 * cannot tell a Tab from a click. The buttons keep their own ring.
 *
 * @status experimental
 */
export const AIComposerField = forwardRef<HTMLDivElement, AIComposerFieldProps>(
  function AIComposerField(props, ref) {
    const { children, onFocus, onBlur, ...divProps } = props
    const [keyboardFocus, setKeyboardFocus] = useState(false)

    return (
      <div
        ref={ref}
        data-sl-ai-composer-field
        data-focus-visible={keyboardFocus ? '' : undefined}
        onFocus={(event) => {
          const isTextField = event.target.matches('textarea, input')
          setKeyboardFocus(isTextField && isFocusVisible())
          onFocus?.(event)
        }}
        onBlur={(event) => {
          setKeyboardFocus(false)
          onBlur?.(event)
        }}
        {...divProps}
      >
        {children}
      </div>
    )
  }
)
