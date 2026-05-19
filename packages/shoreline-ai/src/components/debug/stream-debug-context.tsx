import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type {
  AIStreamDebugRunMeta,
  AIStreamDebugRow,
  AIStreamDebugSession,
  StreamDebugCallbacks,
} from './types'

export interface AIStreamDebugContextValue {
  enabled: boolean
  sessions: AIStreamDebugSession[]
  clearSessions: () => void
  callbacks: StreamDebugCallbacks
}

const AIStreamDebugContext = createContext<AIStreamDebugContextValue | null>(
  null
)

function appendRow(
  sessions: AIStreamDebugSession[],
  runId: string,
  row: Omit<AIStreamDebugRow, 'index'>
): AIStreamDebugSession[] {
  return sessions.map((session) => {
    if (session.runId !== runId) return session

    return {
      ...session,
      rows: [
        ...session.rows,
        {
          ...row,
          index: session.rows.length + 1,
        },
      ],
    }
  })
}

export function AIStreamDebugProvider(props: {
  children: ReactNode
  enabled?: boolean
}) {
  const { children, enabled = true } = props
  const [sessions, setSessions] = useState<AIStreamDebugSession[]>([])

  const clearSessions = useCallback(() => {
    setSessions([])
  }, [])

  const callbacks = useMemo<StreamDebugCallbacks>(
    () => ({
      onRunStart: (meta: AIStreamDebugRunMeta) => {
        setSessions((prev) => [
          {
            runId: meta.runId,
            traceId: meta.traceId,
            conversationId: meta.conversationId,
            userMessageId: meta.userMessageId,
            startedAt: meta.startedAt,
            rows: [],
            finalParts: [],
          },
          ...prev,
        ])
      },
      onEnvelope: (runId, row) => {
        setSessions((prev) => appendRow(prev, runId, row))
      },
      onRunEnd: (runId, finalParts, meta) => {
        setSessions((prev) =>
          prev.map((session) =>
            session.runId === runId
              ? {
                  ...session,
                  endedAt: new Date().toISOString(),
                  finalParts,
                  errorMessage: meta?.errorMessage,
                }
              : session
          )
        )
      },
    }),
    []
  )

  const value = useMemo(
    () => ({
      enabled,
      sessions,
      clearSessions,
      callbacks,
    }),
    [enabled, sessions, clearSessions, callbacks]
  )

  return (
    <AIStreamDebugContext.Provider value={value}>
      {children}
    </AIStreamDebugContext.Provider>
  )
}

export function useAIStreamDebug(): AIStreamDebugContextValue {
  const context = useContext(AIStreamDebugContext)

  if (!context) {
    return {
      enabled: false,
      sessions: [],
      clearSessions: () => {},
      callbacks: {
        onRunStart: () => {},
        onEnvelope: () => {},
        onRunEnd: () => {},
      },
    }
  }

  return context
}

export function useStreamDebugCallbacks(
  enabled: boolean
): StreamDebugCallbacks | undefined {
  const { callbacks, enabled: contextEnabled } = useAIStreamDebug()

  if (!enabled || !contextEnabled) return undefined

  return callbacks
}
