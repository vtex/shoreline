import { ComposerPrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline-utils'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerInputProps } from './types'

/**
 * Composer text input backed by `ComposerPrimitive.Input`.
 * Replicates Shoreline Textarea DOM (`data-sl-textarea` / `data-sl-textarea-input`)
 * without the controlled `Textarea` component (incompatible with `asChild`).
 *
 * @status experimental
 */
export const AIComposerInput = forwardRef<
  HTMLTextAreaElement,
  AIComposerInputProps
>(function AIComposerInput(props, ref) {
  const {
    placeholder: placeholderProp,
    rows = 1,
    autoFocus = false,
    className,
    ...htmlProps
  } = props

  const getMessage = useComposerMessagesContext()
  const placeholder = placeholderProp ?? getMessage('placeholder')

  return (
    <div data-sl-textarea className={className}>
      <ComposerPrimitive.Input
        ref={ref}
        submitMode="enter"
        rows={rows}
        autoFocus={autoFocus}
        placeholder={placeholder}
        data-sl-textarea-input
        data-resizable={false}
        {...htmlProps}
      />
    </div>
  )
})
