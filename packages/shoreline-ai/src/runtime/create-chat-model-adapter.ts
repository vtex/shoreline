/**
 * Runs the transport for each run and passes its snapshots to the chat.
 */

import type {
  ChatModelAdapter,
  ChatModelRunOptions,
  ChatModelRunResult,
} from '@assistant-ui/react'

import type { AIMessagePart } from '../types/public'
import { generateId } from '../utils/generate-id'
import type { BuiltRuntime, RuntimeRunInput, RuntimeSnapshot } from './types'
import type { RunEnd, RunStart } from './run-observer'
import type { RuntimeChannel } from './runtime-core'
import {
  getLastThreadUserMessage,
  mapThreadUserMessageToAIMessage,
} from './bridge/map-from-assistant-ui'
import { mapThreadMessagesToAIMessages } from './bridge/map-thread-messages'
import {
  mapAIMessagePartsToContentParts,
  mapStreamStatus,
} from './bridge/map-to-assistant-ui'

function resolveThreadId(channel: RuntimeChannel): string {
  const resolve = channel.threadIdResolver.current

  if (!resolve) {
    throw new Error('useRuntime: a run needs the runtime inside an AIProvider')
  }

  return resolve()
}

function optionsToRunInput(
  options: ChatModelRunOptions,
  channel: RuntimeChannel
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
    runResponseId: options.unstable_assistantMessageId ?? generateId('asst'),
    threadId: resolveThreadId(channel),
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
  channel: RuntimeChannel
): ChatModelAdapter {
  return {
    async *run(
      options: ChatModelRunOptions
    ): AsyncGenerator<ChatModelRunResult, void> {
      const input = optionsToRunInput(options, channel)

      if (!input) {
        yield {
          content: [{ type: 'text' as const, text: '' }],
          status: { type: 'complete' as const, reason: 'stop' as const },
        }

        return
      }

      const { runResponseId: runId, abortSignal } = input

      const endRun = (end: RunEnd) => {
        for (const observer of channel.observers) observer.onRunEnd(runId, end)
      }
      const report = (snapshot: RuntimeSnapshot) => {
        for (const observer of channel.observers) {
          observer.onSnapshot(runId, snapshot)
        }
      }

      const start: RunStart = {
        runId,
        threadId: input.threadId,
        userMessageId: input.trigger.message.id,
        startedAt: new Date().toISOString(),
      }

      for (const observer of channel.observers) observer.onRunStart(start)

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
            endRun({ status: 'ready', cancelled: true })

            return
          }

          const result = await Promise.race([generator.next(), aborted])

          if (result === ABORTED || abortSignal.aborted) {
            // The transport may be stuck in a pull: do not wait for it.
            void generator.return({ parts: lastParts }).catch(() => {})
            endRun({ status: 'ready', cancelled: true })

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
          endRun({ status: 'ready', cancelled: true })

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
        })
      }
    },
  }
}
