import { createContext, useContext } from 'react'
import { useCollapse } from 'react-collapsed'
import { forwardRef } from '@vtex/shoreline'
import invariant from 'tiny-invariant'

import type { AIMessageReasoningRootProps } from './types'

type ReasoningRootContextValue = {
  getCollapseProps: ReturnType<typeof useCollapse>['getCollapseProps']
  isExpanded: boolean
  setExpanded: (expanded: boolean) => void
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
  const { defaultExpanded = false, children, ...divProps } = props
  const { getCollapseProps, isExpanded, setExpanded } = useCollapse({
    defaultExpanded,
  })

  const contextValue: ReasoningRootContextValue = {
    getCollapseProps,
    isExpanded,
    setExpanded,
  }

  return (
    <ReasoningRootContext.Provider value={contextValue}>
      <div ref={ref} data-sl-ai-message-reasoning {...divProps}>
        {children}
      </div>
    </ReasoningRootContext.Provider>
  )
})
