import { forwardRef } from '@vtex/shoreline'

import { AIMessageParts } from './ai-message-parts'
import { AIMessageRoot } from './ai-message-root'
import type { AIMessageUserProps } from './types'

/**
 * User message shell with default part rendering and bubble styling.
 *
 * @status experimental
 */
export const AIMessageUser = forwardRef<HTMLDivElement, AIMessageUserProps>(
  function AIMessageUser(props, ref) {
    const { children, ...rootProps } = props

    return (
      <AIMessageRoot ref={ref} messageRole="user" {...rootProps}>
        {children ?? <AIMessageParts />}
      </AIMessageRoot>
    )
  }
)
