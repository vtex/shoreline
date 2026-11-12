import { useAuiState } from '@assistant-ui/react'
import {
  IconButton,
  IconCheck,
  IconCopySimple,
  VisuallyHidden,
  forwardRef,
} from '@vtex/shoreline'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useMessageMessagesContext } from './message-messages-context'
import type { AIMessageCopyProps } from './types'

const COPIED_DURATION_MS = 2000

/**
 * Copies the text of the current message to the clipboard.
 *
 * @status experimental
 * @example
 * <AIMessageCopy onCopied={() => track('copy')} />
 */
export const AIMessageCopy = forwardRef<HTMLButtonElement, AIMessageCopyProps>(
  function AIMessageCopy(props, ref) {
    const { onCopied, onClick, ...buttonProps } = props
    const getMessage = useMessageMessagesContext()
    const [copied, setCopied] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const mounted = useRef(true)

    const text = useAuiState((state) =>
      state.message.content
        .flatMap((part) => (part.type === 'text' ? [part.text] : []))
        .join('\n\n')
    )

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

        try {
          await navigator.clipboard?.writeText(text)
        } catch {
          return
        }

        if (!navigator.clipboard || !mounted.current) return

        setCopied(true)
        onCopied?.()

        if (timer.current) clearTimeout(timer.current)

        timer.current = setTimeout(() => {
          timer.current = null
          setCopied(false)
        }, COPIED_DURATION_MS)
      },
      [onClick, onCopied, text]
    )

    return (
      <>
        <IconButton
          ref={ref}
          type="button"
          variant="tertiary"
          label={getMessage('copyMessage')}
          data-sl-ai-message-copy
          data-copied={copied ? '' : undefined}
          onClick={handleClick}
          {...buttonProps}
        >
          {copied ? <IconCheck /> : <IconCopySimple />}
        </IconButton>
        <span aria-live="polite" data-sl-ai-message-copy-status>
          {copied ? (
            <VisuallyHidden>{getMessage('messageCopied')}</VisuallyHidden>
          ) : null}
        </span>
      </>
    )
  }
)
