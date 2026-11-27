import { useAui } from '@assistant-ui/react'
import {
  IconCheck,
  IconCopySimple,
  VisuallyHidden,
  forwardRef,
} from '@vtex/shoreline'
import { useCallback, useEffect, useRef, useState } from 'react'

import { AIMessageAction } from './ai-message-action'
import { useMessageMessagesContext } from './message-messages-context'
import type { AIMessageCopyProps } from './types'

const COPIED_DURATION_MS = 2000

/**
 * Copies the text of the current message to the clipboard. After a copy it
 * shows a check icon for 2 seconds and is named "Copied!".
 *
 * @status experimental
 * @example
 * <AIMessageCopy onCopied={() => track('copy')} />
 */
export const AIMessageCopy = forwardRef<HTMLButtonElement, AIMessageCopyProps>(
  function AIMessageCopy(props, ref) {
    const { onCopied, onClick, ...buttonProps } = props
    const getMessage = useMessageMessagesContext()
    const aui = useAui()
    const [copied, setCopied] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const mounted = useRef(true)

    useEffect(() => {
      mounted.current = true

      return () => {
        mounted.current = false

        if (timer.current) clearTimeout(timer.current)
      }
    }, [])

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)

        // A consumer can cancel the copy, as with the reasoning trigger.
        if (event.defaultPrevented) return

        // Keep this explicit: `await navigator.clipboard?.writeText()` resolves
        // when the clipboard is missing and would show the copied state.
        if (!navigator.clipboard) return

        // Read at click time, so streaming text does not re-render the button.
        const text = aui.message
          .getState()
          .content.flatMap((part) => (part.type === 'text' ? [part.text] : []))
          .join('\n\n')

        try {
          await navigator.clipboard.writeText(text)
        } catch {
          return
        }

        if (!mounted.current) return

        setCopied(true)
        onCopied?.()

        if (timer.current) clearTimeout(timer.current)

        timer.current = setTimeout(() => {
          timer.current = null
          setCopied(false)
        }, COPIED_DURATION_MS)
      },
      [aui, onClick, onCopied]
    )

    return (
      <>
        <AIMessageAction
          ref={ref}
          label={getMessage(copied ? 'copied' : 'copyMessage')}
          data-sl-ai-message-copy
          data-copied={copied ? '' : undefined}
          onClick={handleClick}
          {...buttonProps}
        >
          {copied ? <IconCheck /> : <IconCopySimple />}
        </AIMessageAction>
        {/* Always mounted, so screen readers pick up the announcement. */}
        <VisuallyHidden>
          <span aria-live="polite" data-sl-ai-message-copy-status>
            {copied ? getMessage('messageCopied') : null}
          </span>
        </VisuallyHidden>
      </>
    )
  }
)
