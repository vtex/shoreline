import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useCollapse } from 'react-collapsed'
import { forwardRef } from '@vtex/shoreline'
import invariant from 'tiny-invariant'

import type {
  AIMessageReasoningRootProps,
  AIMessageReasoningStatus,
} from './types'

type ReasoningRootContextValue = {
  state: {
    status: AIMessageReasoningStatus
    expanded: boolean
    /** Origin of the elapsed time, in epoch ms. */
    startedAt: number | undefined
    /** Time spent reasoning, in ms. */
    duration: number | undefined
    /** Whether an `AIMessageReasoningLabel` is mounted to name the panel. */
    hasLabel: boolean
  }
  actions: {
    setExpanded: (expanded: boolean) => void
    /** Called by the label on mount; returns the unregister function. */
    registerLabel: () => () => void
  }
  meta: {
    contentId: string
    labelId: string
  }
}

type GetCollapseProps = ReturnType<typeof useCollapse>['getCollapseProps']

const ReasoningRootContext = createContext<ReasoningRootContextValue | null>(
  null
)

/**
 * Kept apart from the root context: `getCollapseProps` changes on every root
 * render (it carries the animation state), and only the content needs it.
 */
const ReasoningCollapseContext = createContext<GetCollapseProps | null>(null)

const OUTSIDE_ROOT =
  'AIMessageReasoning parts must be used within AIMessageReasoningRoot'

export function useAIMessageReasoningRootContext(): ReasoningRootContextValue {
  const context = useContext(ReasoningRootContext)

  invariant(context, OUTSIDE_ROOT)

  return context
}

export function useAIMessageReasoningCollapseProps(): GetCollapseProps {
  const context = useContext(ReasoningCollapseContext)

  invariant(context, OUTSIDE_ROOT)

  return context
}

/**
 * Collapsible root for the reasoning (Chain of Thought) panel.
 *
 * @example
 * <AIMessageReasoningRoot status="complete" defaultExpanded>
 *   <AIMessageReasoningHeader />
 *   <AIMessageReasoningContent>
 *     <AIMessageReasoningText />
 *   </AIMessageReasoningContent>
 * </AIMessageReasoningRoot>
 *
 * @status experimental
 */
export const AIMessageReasoningRoot = forwardRef<
  HTMLDivElement,
  AIMessageReasoningRootProps
>(function AIMessageReasoningRoot(props, ref) {
  const {
    status = 'complete',
    duration: durationProp,
    startedAt: startedAtProp,
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

  const id = useId()
  const contentId = `${id}-content`
  const labelId = `${id}-label`

  // Time of the first render with status "running". Set once, never reset.
  const firstRunningAt = useRef<number>()

  if (status === 'running' && firstRunningAt.current === undefined) {
    firstRunningAt.current = Date.now()
  }

  const startedAt = startedAtProp ?? firstRunningAt.current

  // Time counted from startedAt until status turns complete.
  const previousStatus = useRef(status)
  const countedDuration = useRef<number>()

  if (previousStatus.current !== status) {
    if (
      previousStatus.current === 'running' &&
      status === 'complete' &&
      startedAt !== undefined
    ) {
      countedDuration.current = Date.now() - startedAt
    }

    previousStatus.current = status
  }

  const duration = durationProp ?? countedDuration.current

  // Read through a ref so the context value does not change with the callback.
  const handlerRef = useRef<(next: boolean) => void>(() => {})

  handlerRef.current = (next: boolean) => {
    // In controlled mode the parent owns the state, so we only notify it.
    if (expanded === undefined) setExpanded(next)
    onExpandedChange?.(next)
  }

  // Labels mounted in this root. Without one, the trigger names itself.
  const [labelCount, setLabelCount] = useState(0)
  const registerLabel = useCallback(() => {
    setLabelCount((count) => count + 1)

    return () => setLabelCount((count) => count - 1)
  }, [])
  const hasLabel = labelCount > 0

  const contextValue = useMemo<ReasoningRootContextValue>(
    () => ({
      state: { status, expanded: isExpanded, startedAt, duration, hasLabel },
      actions: {
        setExpanded: (next) => handlerRef.current(next),
        registerLabel,
      },
      meta: { contentId, labelId },
    }),
    [
      status,
      isExpanded,
      startedAt,
      duration,
      hasLabel,
      registerLabel,
      contentId,
      labelId,
    ]
  )

  return (
    <ReasoningRootContext.Provider value={contextValue}>
      <ReasoningCollapseContext.Provider value={getCollapseProps}>
        <div
          ref={ref}
          data-sl-ai-message-reasoning
          data-status={status}
          {...divProps}
        >
          {children}
        </div>
      </ReasoningCollapseContext.Provider>
    </ReasoningRootContext.Provider>
  )
})
