/**
 * Runs the transport for each run and passes its snapshots to the chat.
 */

import type {
  ChatModelAdapter,
  ChatModelRunOptions,
  ChatModelRunResult,
} from '@assistant-ui/react'

import type { AIMessagePart } from '../types/public'
import type { BuiltRuntime, RuntimeRunInput, RuntimeSnapshot } from './types'
import type { RunEnd, RunObserverHandle } from './run-observer'
import {
  getLastThreadUserMessage,
  mapThreadUserMessageToAIMessage,
} from './bridge/map-from-assistant-ui'
import { mapThreadMessagesToAIMessages } from './bridge/map-thread-messages'
import {
  mapAIMessagePartsToContentParts,
  mapStreamStatus,
} from './bridge/map-to-assistant-ui'

function optionsToRunInput(
  options: ChatModelRunOptions,
  getThreadId?: () => string | null
): RuntimeRunInput | null {
  const lastUser = getLastThreadUserMessage(options.messages)

  if (!lastUser) return null

  return {
    messages: mapThreadMessagesToAIMessages(options.messages),
    trigger: {
      type: 'message',
      message: mapThreadUserMessageToAIMessage(lastUser),
    },
    abortSignal: options.abortSignal,
    runResponseId: options.unstable_assistantMessageId ?? `asst-${Date.now()}`,
    threadId: getThreadId?.() ?? null,
  }
}

function snapshotJson(parts: AIMessagePart[]): string {
  return JSON.stringify(parts)
}

const ABORTED = Symbol('aborted')

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function textPart(text: string): AIMessagePart[] {
  return [{ type: 'text', text }]
}

export function createChatModelAdapterFromTransport(
  built: BuiltRuntime,
  observer?: RunObserverHandle
): ChatModelAdapter {
  return {
    async *run(
      options: ChatModelRunOptions
    ): AsyncGenerator<ChatModelRunResult, void> {
      const input = optionsToRunInput(options, built.getThreadId)

      if (!input) {
        yield {
          content: [{ type: 'text' as const, text: '' }],
          status: { type: 'complete' as const, reason: 'stop' as const },
        }

        return
      }

      const { runResponseId: runId, abortSignal } = input

      const endRun = (end: RunEnd) => observer?.current?.onRunEnd(runId, end)
      const report = (snapshot: RuntimeSnapshot) =>
        observer?.current?.onSnapshot(runId, snapshot)

      observer?.current?.onRunStart({
        runId,
        threadId: input.threadId ?? null,
        userMessageId: input.trigger.message.id,
        startedAt: new Date().toISOString(),
      })

      const aborted = new Promise<typeof ABORTED>((resolve) => {
        if (abortSignal.aborted) {
          resolve(ABORTED)

          return
        }

        abortSignal.addEventListener('abort', () => resolve(ABORTED), {
          once: true,
        })
      })

      const generator = built.transport.run(input)
      let lastEmittedJson = ''
      let lastParts: AIMessagePart[] = []

      try {
        while (true) {
          if (abortSignal.aborted) {
            await generator.return({ parts: lastParts })
            endRun({ status: 'ready', cancelled: true, finalParts: lastParts })

            return
          }

          const result = await Promise.race([generator.next(), aborted])

          if (result === ABORTED || abortSignal.aborted) {
            // The transport may be stuck in a pull: do not wait for it.
            void generator.return({ parts: lastParts }).catch(() => {})
            endRun({ status: 'ready', cancelled: true, finalParts: lastParts })

            return
          }

          report(result.value)
          lastParts = result.value.parts

          if (result.done) {
            const final = result.value
            const parts =
              final.parts.length > 0
                ? final.parts
                : final.status === 'error' && final.errorMessage
                  ? textPart(final.errorMessage)
                  : final.parts

            if (snapshotJson(parts) !== lastEmittedJson) {
              yield {
                content: mapAIMessagePartsToContentParts(parts),
                status: mapStreamStatus(final.status) ?? {
                  type: 'complete' as const,
                  reason: 'stop' as const,
                },
              }
            }

            endRun({
              status: final.status ?? 'ready',
              ...(final.status === 'error' && {
                error: final.errorMessage ?? 'The run failed',
              }),
              cancelled: false,
              finalParts: parts,
            })

            return
          }

          const json = snapshotJson(result.value.parts)

          if (json !== lastEmittedJson) {
            yield {
              content: mapAIMessagePartsToContentParts(result.value.parts),
              status: mapStreamStatus(result.value.status),
            }

            lastEmittedJson = json
          }
        }
      } catch (error) {
        if (abortSignal.aborted) {
          endRun({ status: 'ready', cancelled: true, finalParts: lastParts })

          return
        }

        const message = toErrorMessage(error)
        const parts = textPart(message)

        yield {
          content: mapAIMessagePartsToContentParts(parts),
          status: { type: 'incomplete' as const, reason: 'error' as const },
        }

        endRun({
          status: 'error',
          error: message,
          cancelled: false,
          finalParts: parts,
        })
      }
    },
  }
}
