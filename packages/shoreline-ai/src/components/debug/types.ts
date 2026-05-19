import type { AIMessagePart } from '../../types/public'

export type SSEEventType = 'ui.message' | 'ui.delta' | 'ui.final'

export interface AIStreamDebugRunMeta {
  runId: string
  traceId: string
  conversationId: string
  userMessageId: string
  startedAt: string
}

export interface AIStreamDebugRow {
  index: number
  at: string
  sseEvent: SSEEventType
  kind: string
  raw: unknown
  mappedParts: AIMessagePart[]
}

export interface AIStreamDebugSession {
  runId: string
  traceId: string
  conversationId: string
  userMessageId: string
  startedAt: string
  endedAt?: string
  errorMessage?: string
  rows: AIStreamDebugRow[]
  finalParts: AIMessagePart[]
}

export interface StreamDebugCallbacks {
  onRunStart: (meta: AIStreamDebugRunMeta) => void
  onEnvelope: (runId: string, row: Omit<AIStreamDebugRow, 'index'>) => void
  onRunEnd: (
    runId: string,
    finalParts: AIMessagePart[],
    meta?: { errorMessage?: string }
  ) => void
}
