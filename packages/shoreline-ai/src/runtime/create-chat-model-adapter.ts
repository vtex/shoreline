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

const ABORTED = Symbol('aborted')

/** One snapshot of the transport. `done` marks the final one. */
interface TransportStep {
  snapshot: RuntimeSnapshot
  done: boolean
}

/**
 * Reads the transport until it ends or `signal` aborts. On abort it ends at
 * once, without waiting for a transport stuck in a pull, and without
 * throwing, even if the transport throws afterwards. It always closes the
 * transport generator.
 */
async function* abortable(
  generator: AsyncGenerator<RuntimeSnapshot, RuntimeSnapshot>,
  signal: AbortSignal
): AsyncGenerator<TransportStep, void> {
  const aborted = new Promise<typeof ABORTED>((resolve) => {
    if (signal.aborted) {
      resolve(ABORTED)

      return
    }

    signal.addEventListener('abort', () => resolve(ABORTED), { once: true })
  })
  let finished = false
  let stuck = false

  try {
    while (!signal.aborted) {
      const result = await Promise.race([generator.next(), aborted])

      if (result === ABORTED || signal.aborted) {
        stuck = result === ABORTED

        return
      }

      yield { snapshot: result.value, done: result.done === true }

      if (result.done) {
        finished = true

        return
      }
    }
  } catch (error) {
    finished = true

    if (!signal.aborted) throw error
  } finally {
    if (!finished) {
      const closing = generator.return({ parts: [] }).catch(() => undefined)

      // A transport stuck in a pull closes only after that pull: do not wait.
      if (!stuck) await closing
    }
  }
}

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

      const start: RunStart = {
        runId,
        threadId: input.threadId,
        userMessageId: input.trigger.message.id,
        startedAt: new Date().toISOString(),
      }

      for (const observer of channel.observers) observer.onRunStart(start)

      let lastEmittedParts: AIMessagePart[] | undefined
      let final: RuntimeSnapshot | undefined
      let thrown: string | undefined

      /**
       * Reports every snapshot and gives the update for the chat, or `null`
       * when its parts are the array already shown. A failed final snapshot
       * is always given, so the message ends as failed.
       */
      const emit = (step: TransportStep): ChatModelRunResult | null => {
        const { snapshot, done } = step

        for (const observer of channel.observers) {
          observer.onSnapshot(runId, snapshot)
        }

        const failed = done && snapshot.status === 'error'
        const parts =
          failed && snapshot.parts.length === 0 && snapshot.errorMessage
            ? textPart(snapshot.errorMessage)
            : snapshot.parts

        if (parts === lastEmittedParts && !failed) return null

        lastEmittedParts = parts

        return {
          content: mapAIMessagePartsToContentParts(parts),
          status: done
            ? (mapStreamStatus(snapshot.status) ?? {
                type: 'complete' as const,
                reason: 'stop' as const,
              })
            : mapStreamStatus(snapshot.status),
        }
      }

      try {
        for await (const step of abortable(
          built.transport.run(input),
          abortSignal
        )) {
          const update = emit(step)

          if (update) yield update

          if (step.done) final = step.snapshot
        }
      } catch (error) {
        thrown = toErrorMessage(error)

        yield {
          content: mapAIMessagePartsToContentParts(textPart(thrown)),
          status: { type: 'incomplete' as const, reason: 'error' as const },
        }
      }

      const end: RunEnd =
        thrown !== undefined
          ? { status: 'error', error: thrown, cancelled: false }
          : final
            ? {
                status: final.status ?? 'ready',
                ...(final.status === 'error' && {
                  error: final.errorMessage ?? 'The run failed',
                }),
                cancelled: false,
              }
            : { status: 'ready', cancelled: true }

      for (const observer of channel.observers) observer.onRunEnd(runId, end)
    },
  }
}
