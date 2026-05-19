/**
 * Runtime plugin types — public API, agnostic to Assistant-UI.
 *
 * @status experimental
 */

import type {
  AIMessage,
  AIMessagePart,
  AIResourcePart,
  StreamStatus,
} from '../types/public'

/**
 * What initiated a model run.
 */
export interface RuntimeRunTrigger {
  type: 'message'
  /** User message that started this run. */
  message: AIMessage
}

/**
 * Input passed to {@link StreamTransport.run} for each model run.
 */
export interface RuntimeRunInput {
  /** Full thread history at run time. */
  messages: AIMessage[]
  trigger: RuntimeRunTrigger
  abortSignal: AbortSignal
  /** Assistant message slot id for this run (from Assistant-UI). */
  runResponseId: string
  /** Active persistence thread id (e.g. conversation id), when known. */
  threadId?: string | null
}

export interface RuntimeSnapshot {
  parts: AIMessagePart[]
  status?: StreamStatus
  /** Set when the SSE transport fails before emitting content. */
  errorMessage?: string
}

/**
 * Streaming plugin implemented by protocol runtimes.
 *
 * Contract:
 * - **`yield`** — partial snapshots while the stream is in progress.
 * - **`return`** — final authoritative snapshot when the stream ends.
 *
 * Consumers (e.g. `createChatModelAdapterFromTransport`) must handle both:
 * `for await` alone does not read the generator `return` value.
 */
export interface StreamTransport {
  run(input: RuntimeRunInput): AsyncGenerator<RuntimeSnapshot, RuntimeSnapshot>
}

export interface PendingAttachment {
  id: string
  file: File
  name: string
  contentType: string
}

export interface AttachmentUploadState {
  progress: number
  status: 'uploading' | 'ready' | 'error'
  error?: string
}

/** Plugin for file uploads — bridged to Assistant-UI internally. */
export interface AttachmentHandler {
  add(file: File): AsyncIterable<AttachmentUploadState>
  send(pending: PendingAttachment): Promise<AIResourcePart>
  remove(pending: PendingAttachment): Promise<void>
}

export interface BuiltRuntime {
  transport: StreamTransport
  attachmentHandler?: AttachmentHandler
  /** Optional source for {@link RuntimeRunInput.threadId} on each run. */
  getThreadId?: () => string | null
}

export interface RuntimeBuilder<HasTransport extends boolean = false> {
  transport(transport: StreamTransport): RuntimeBuilder<true>
  threadId(getThreadId: () => string | null): RuntimeBuilder<HasTransport>
  attachments(handler: AttachmentHandler): RuntimeBuilder<HasTransport>
  build(this: RuntimeBuilder<true>): BuiltRuntime
}
