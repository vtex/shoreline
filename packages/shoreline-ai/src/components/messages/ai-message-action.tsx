import { forwardRef } from '@vtex/shoreline'

import type { AIMessageActionProps } from './types'

/**
 * Button of the message actions bar. Renders its children (usually a 14px
 * icon) in a 20px button named by `label`.
 *
 * @status experimental
 * @example
 * <AIMessageAction label="Good response" aria-pressed={liked} onClick={like}>
 *   <IconThumbsUp />
 * </AIMessageAction>
 */
export const AIMessageAction = forwardRef<
  HTMLButtonElement,
  AIMessageActionProps
>(function AIMessageAction(props, ref) {
  const { label, children, ...rest } = props

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      data-sl-ai-message-action
      {...rest}
    >
      {children}
    </button>
  )
})
