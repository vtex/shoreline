import { forwardRef } from '@vtex/shoreline'

import type { AIWorkingMarkProps } from './types'

function DefaultGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5c.6 5.9 4.6 9.9 10.5 10.5-5.9.6-9.9 4.6-10.5 10.5C11.4 16.6 7.4 12.6 1.5 12 7.4 11.4 11.4 7.4 12 1.5z" />
    </svg>
  )
}

/**
 * Small animated mark shown beside the label of work in progress.
 * Decorative: hidden from assistive technology.
 *
 * @status experimental
 * @example
 * <AIWorkingMark />
 */
export const AIWorkingMark = forwardRef<HTMLSpanElement, AIWorkingMarkProps>(
  function AIWorkingMark(props, ref) {
    const { children, ...rest } = props

    return (
      <span ref={ref} aria-hidden="true" data-sl-ai-working-mark {...rest}>
        <span data-sl-ai-working-mark-glyph>
          {children ?? <DefaultGlyph />}
        </span>
      </span>
    )
  }
)
