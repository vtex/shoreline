import { createContext, useContext } from 'react'
import { useCollapse } from 'react-collapsed'
import { forwardRef } from '@vtex/shoreline'
import invariant from 'tiny-invariant'

import type {
  AIMessageReasoningRootProps,
  AIMessageReasoningStatus,
} from './types'

type ReasoningRootContextValue = {
  getCollapseProps: ReturnType<typeof useCollapse>['getCollapseProps']
  isExpanded: boolean
  setExpanded: (expanded: boolean) => void
  status: AIMessageReasoningStatus
  duration?: number
}

const ReasoningRootContext = createContext<ReasoningRootContextValue | null>(
  null
)

export function useAIMessageReasoningRootContext(): ReasoningRootContextValue {
  const context = useContext(ReasoningRootContext)

  invariant(
    context,
    'AIMessageReasoningTrigger and AIMessageReasoningContent must be used within AIMessageReasoningRoot'
  )

  return context
}

/**
 * Collapsible root for the reasoning (Chain of Thought) panel.
 *
 * @status experimental
 */
export const AIMessageReasoningRoot = forwardRef<
  HTMLDivElement,
  AIMessageReasoningRootProps
>(function AIMessageReasoningRoot(props, ref) {
  const {
    status = 'complete',
    duration,
    defaultExpanded = false,
    expanded,
    onExpandedChange,
    children,
    ...divProps
  } = props

  const { getCollapseProps, isExpanded, setExpanded } = useCollapse({
    defaultExpanded,
    isExpanded: expanded,
  })

  function handleSetExpanded(next: boolean) {
    // In controlled mode the parent owns the state, so we only notify it.
    if (expanded === undefined) setExpanded(next)
    onExpandedChange?.(next)
  }

  const contextValue: ReasoningRootContextValue = {
    getCollapseProps,
    isExpanded,
    setExpanded: handleSetExpanded,
    status,
    duration,
  }

  return (
    <ReasoningRootContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-sl-ai-message-reasoning
        data-status={status}
        {...divProps}
      >
        {children}
      </div>
    </ReasoningRootContext.Provider>
  )
})
