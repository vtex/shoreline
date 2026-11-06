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
  /** Set when the transport fails before emitting content. */
  errorMessage?: string
  /** Free-form data the transport may attach for the debug inspector. */
  debug?: unknown
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

/**
 * One step of an upload, yielded by {@link AttachmentHandler.add}.
 *
 * @status experimental
 */
export interface AttachmentUploadState {
  /** Upload progress from 0 to 1. */
  progress: number
  /** `uploading` while sending, `ready` when done, `error` when it failed. */
  status: 'uploading' | 'ready' | 'error'
  /** Message shown on the chip when `status` is `error`. */
  error?: string
}

/**
 * Plugin for file uploads. Pass it to `createRuntimeBuilder().attachments()`.
 *
 * `add` yields upload states: the composer shows the progress and, on an
 * `error` state, a chip the user can remove. `send` runs when the message is
 * sent and returns the resource the transport receives. `remove` runs when
 * the user removes a file that was added.
 *
 * @status experimental
 * @example
 * const handler: AttachmentHandler = {
 *   accept: 'image/*,.pdf',
 *   maxSize: 5 * 1024 * 1024,
 *   maxCount: 3,
 *   async *add(file) {
 *     yield { progress: 0.5, status: 'uploading' }
 *     yield { progress: 1, status: 'ready' }
 *   },
 *   async send(pending) {
 *     return {
 *       type: 'resource',
 *       uri: await upload(pending.file),
 *       name: pending.name,
 *       mimeType: pending.contentType,
 *       size: pending.file.size,
 *     }
 *   },
 *   async remove() {},
 * }
 */
export interface AttachmentHandler {
  /**
   * File types the picker offers and the composer accepts, as in the HTML
   * `accept` attribute (for example `image/*,.pdf`).
   * @default '*'
   */
  accept?: string
  /**
   * Largest file size in bytes. A larger file shows an error chip and is
   * not uploaded.
   * @default undefined
   */
  maxSize?: number
  /**
   * Most files the composer holds at once. Files beyond it show an error
   * chip and are not uploaded.
   * @default undefined
   */
  maxCount?: number
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
