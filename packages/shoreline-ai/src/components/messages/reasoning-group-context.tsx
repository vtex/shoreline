import { createContext, useContext, useMemo, type ReactNode } from 'react'

import type { AIMessageReasoningStatus } from './types'

export type ReasoningGroupContextValue = {
  status: AIMessageReasoningStatus
  /** Time spent reasoning, in ms. */
  duration?: number
  /** Origin of the elapsed time, in epoch ms. */
  startedAt?: number
  /** The group's rendered parts; `null` while the message has none yet. */
  parts: ReactNode | null
}

const ReasoningGroupContext = createContext<ReasoningGroupContextValue | null>(
  null
)

/**
 * Hands one reasoning group (or the pending state) to the reasoning template
 * that `AIMessageParts` renders. Internal; not part of the public API.
 */
export function ReasoningGroupProvider(
  props: ReasoningGroupContextValue & { children: ReactNode }
) {
  const { status, duration, startedAt, parts, children } = props

  const value = useMemo<ReasoningGroupContextValue>(
    () => ({ status, duration, startedAt, parts }),
    [status, duration, startedAt, parts]
  )

  return (
    <ReasoningGroupContext.Provider value={value}>
      {children}
    </ReasoningGroupContext.Provider>
  )
}

/** The closest reasoning group, or `null` outside `AIMessageParts`. */
export function useReasoningGroup(): ReasoningGroupContextValue | null {
  return useContext(ReasoningGroupContext)
}

/** Whether the closest group is the header shown before the first part. */
export function useIsPendingReasoning(): boolean {
  const group = useReasoningGroup()

  return group !== null && group.parts === null
}
