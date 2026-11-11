import { ComposerPrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerInputProps } from './types'

/**
 * Text input of the composer. It uses the same markup as the Shoreline
 * `Textarea` (`data-sl-textarea` and `data-sl-textarea-input`), so it gets the
 * same styles.
 *
 * @status experimental
 * @example
 * <AIComposerInput placeholder="Ask anything" />
 * @example
 * <AIComposerInput asChild>
 *   <ComboboxInput asChild>
 *     <textarea />
 *   </ComboboxInput>
 * </AIComposerInput>
 */
export const AIComposerInput = forwardRef<
  HTMLTextAreaElement,
  AIComposerInputProps
>(function AIComposerInput(props, ref) {
  const {
    placeholder: placeholderProp,
    rows = 1,
    autoFocus = false,
    asChild = false,
    className,
    ...htmlProps
  } = props

  const getMessage = useComposerMessagesContext()
  const placeholder = placeholderProp ?? getMessage('placeholder')

  return (
    <div data-sl-textarea className={className}>
      <ComposerPrimitive.Input
        ref={ref}
        asChild={asChild}
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
