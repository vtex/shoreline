import { useAuiState } from '@assistant-ui/react'
import { forwardRef, useLocale } from '@vtex/shoreline'

import { formatRelativeDate } from './format-relative-date'
import { useOptionalMessageMessages } from './message-messages-context'
import type { AIMessageDateProps } from './types'
import { useNow } from './use-now'

/**
 * When the message was sent, for a reader now: "now", "5m ago", the time on
 * the same day, "yesterday, 2:32 PM", then the date and time. Refreshed by
 * the shared one-minute clock. The exact local date and time is its title.
 * Renders nothing without a valid date. On the server and during hydration
 * it renders only the `time` element with `dateTime`; the text and the title
 * come after mount, in the viewer's locale and timezone.
 *
 * @status experimental
 * @example
 * <AIMessageActions>
 *   <AIMessageCopy />
 *   <AIMessageDate />
 * </AIMessageActions>
 */
export const AIMessageDate = forwardRef<HTMLTimeElement, AIMessageDateProps>(
  function AIMessageDate(props, ref) {
    const { date, ...rest } = props
    const createdAt = useAuiState((state) => state.message.createdAt)
    const locale = useLocale()
    const getMessage = useOptionalMessageMessages()
    const now = useNow()

    const value = toDate(date ?? createdAt)

    if (!value || Number.isNaN(value.getTime())) return null

    if (now === null) {
      return (
        <time
          ref={ref}
          data-sl-ai-message-date
          dateTime={value.toISOString()}
          {...rest}
        />
      )
    }

    const relative = formatRelativeDate(value, now, locale, getMessage)

    if (!relative) return null

    return (
      <time
        ref={ref}
        data-sl-ai-message-date
        data-just-now={relative.justNow ? '' : undefined}
        dateTime={value.toISOString()}
        title={new Intl.DateTimeFormat(locale, {
          dateStyle: 'short',
          timeStyle: 'medium',
        }).format(value)}
        {...rest}
      >
        {relative.text}
      </time>
    )
  }
)

function toDate(value: Date | string | number | undefined): Date | null {
  if (value === undefined || value === null) return null

  return value instanceof Date ? value : new Date(value)
}
