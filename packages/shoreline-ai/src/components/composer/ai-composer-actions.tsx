import type { ReactElement } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

import type { AIComposerActionsProps } from './types'

const AI_COMPOSER_ACTIONS_SYMBOL = Symbol.for('shoreline-ai.composer-actions')

/**
 * Right footer cluster (send / cancel). Layout marker for `AIComposerFooter`:
 * children that are not `AIComposerActions` render in the start slot (left).
 *
 * @status experimental
 */
export const AIComposerActions = forwardRef<
  HTMLDivElement,
  AIComposerActionsProps
>(function AIComposerActions(props, ref) {
  const { children, ...divProps } = props

  return (
    <div ref={ref} data-sl-ai-composer-actions {...divProps}>
      {children}
    </div>
  )
})

const AIComposerActionsMarker =
  AIComposerActions as typeof AIComposerActions & {
    displayName?: string
    [AI_COMPOSER_ACTIONS_SYMBOL]?: boolean
  }

AIComposerActionsMarker.displayName = 'AIComposerActions'
AIComposerActionsMarker[AI_COMPOSER_ACTIONS_SYMBOL] = true

export function isAIComposerActions(
  child: unknown
): child is ReactElement<AIComposerActionsProps> {
  if (!child || typeof child !== 'object' || !('type' in child)) return false

  const type = child.type as {
    displayName?: string
    [key: symbol]: unknown
  }

  return (
    type.displayName === 'AIComposerActions' ||
    type[AI_COMPOSER_ACTIONS_SYMBOL] === true
  )
}
