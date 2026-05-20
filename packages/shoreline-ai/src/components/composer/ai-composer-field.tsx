import { forwardRef } from '@vtex/shoreline-utils'

import type { AIComposerFieldProps } from './types'

/**
 * Pill container for the composer input and footer.
 *
 * @status experimental
 */
export const AIComposerField = forwardRef<HTMLDivElement, AIComposerFieldProps>(
  function AIComposerField(props, ref) {
    const { children, ...divProps } = props

    return (
      <div ref={ref} data-sl-ai-composer-field {...divProps}>
        {children}
      </div>
    )
  }
)
