import { forwardRef } from '@vtex/shoreline'

import type { AIWorkingMarkProps } from './types'

/** The My Assistant mark: the default glyph of the working mark. */
function DefaultGlyph() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M11.8478 0.143845C13.1249 -0.4434 14.4434 0.875066 13.8562 2.15219L11.627 7L13.8562 11.8478C14.4434 13.1249 13.1249 14.4434 11.8478 13.8562L7 11.627L2.15219 13.8562C0.875063 14.4434 -0.443399 13.1249 0.143845 11.8478L2.37296 7L0.143845 2.15219C-0.443399 0.875063 0.875065 -0.443399 2.15219 0.143846L7 2.37296L11.8478 0.143845Z"
        // Brand color of the My Assistant glyph: the one literal color allowed.
        fill="#F71963"
      />
    </svg>
  )
}

/**
 * Small animated mark shown beside the label of work in progress.
 * Decorative: hidden from assistive technology. The default glyph is the My
 * Assistant mark; pass children to use another one.
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
