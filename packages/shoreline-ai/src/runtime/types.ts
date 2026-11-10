/**
 * Types for the stream transport, the attachment handler and the builder.
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
 *
 * @status experimental
 * @example
 * const text = input.trigger.message.parts.find((part) => part.type === 'text')
 */
export interface RuntimeRunTrigger {
  type: 'message'
  /** User message that started this run. */
  message: AIMessage
}

/**
 * Input passed to {@link StreamTransport.run} for each model run.
 *
 * @status experimental
 * @example
 * async *run({ messages, trigger, abortSignal, threadId }) {
 *   // call your backend with trigger.message and threadId
 * }
 */
export interface RuntimeRunInput {
  /** The whole thread, including the user message of this run. */
  messages: AIMessage[]
  /** What started the run. */
  trigger: RuntimeRunTrigger
  /** Aborts when the user cancels or switches thread. Stop your request on it. */
  abortSignal: AbortSignal
  /** Id of the assistant message this run creates. */
  runResponseId: string
  /**
   * Id of the thread the run belongs to. It comes from `AIProvider`: when no
   * thread is open, the provider creates the id before the run starts and
   * reports it with `onThreadChange`.
   */
  threadId: string
}

/**
 * The assistant message at one moment of a run. It replaces the previous
 * snapshot.
 *
 * @status experimental
 * @example
 * const snapshot: RuntimeSnapshot = {
 *   parts: [{ type: 'text', text: 'Hello' }],
 *   status: 'streaming',
 * }
 */
export interface RuntimeSnapshot {
  /** All parts of the assistant message so far. */
  parts: AIMessagePart[]
  /**
   * Status of the run. Return `'error'` in the final snapshot to fail the run.
   * @default undefined
   */
  status?: StreamStatus
  /**
   * Text shown in the message when the final snapshot has `status: 'error'`
   * and no parts. It is also the `message` of the run error.
   * @default undefined
   */
  errorMessage?: string
  /**
   * Any data you want to see in the stream debug panel. The package only
   * stores it and never reads it. Do not change it after you yield it.
   * @default undefined
   */
  debug?: unknown
}

/**
 * Your backend. `run` is an async generator: `yield` a snapshot each time the
 * answer grows and `return` the final snapshot when it ends. Each snapshot
 * holds the whole assistant message so far, not only the new part.
 *
 * If `run` throws, the run fails: the assistant message shows the error text
 * and `useAIStatus` reports the `error` status. If the user cancels, the
 * package stops reading from the generator.
 *
 * @status experimental
 * @example
 * const transport: StreamTransport = {
 *   async *run({ trigger }) {
 *     yield { parts: [{ type: 'text', text: 'Thinking' }], status: 'streaming' }
 *
 *     return { parts: [{ type: 'text', text: 'Done' }], status: 'ready' }
 *   },
 * }
 */
export interface StreamTransport {
  run(input: RuntimeRunInput): AsyncGenerator<RuntimeSnapshot, RuntimeSnapshot>
}

/**
 * A file the user added to the composer and that is not sent yet.
 *
 * @status experimental
 * @example
 * async send(pending: PendingAttachment) {
 *   return { type: 'resource', uri: await upload(pending.file), name: pending.name }
 * }
 */
export interface PendingAttachment {
  /** Id of the attachment in the composer. */
  id: string
  /** The file the user picked. */
  file: File
  /** File name. */
  name: string
  /** MIME type of the file. It is empty when the browser does not know it. */
  contentType: string
}

/**
 * One step of an upload, yielded by {@link AttachmentHandler.add}.
 *
 * @status experimental
 * @example
 * yield { progress: 0.5, status: 'uploading' } satisfies AttachmentUploadState
 */
export interface AttachmentUploadState {
  /** Upload progress from 0 to 1. */
  progress: number
  /** `uploading` while sending, `ready` when done, `error` when it failed. */
  status: 'uploading' | 'ready' | 'error'
  /**
   * Message shown on the chip when `status` is `error`.
   * @default undefined
   */
  error?: string
}

/**
 * Handles file uploads. Pass it to `createRuntimeBuilder().attachments()`.
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
  /**
   * Starts the upload of a picked file. Yield `uploading` states with the
   * progress, then a `ready` state. Yield an `error` state to fail without
   * throwing. If it throws, the chip also shows an error.
   */
  add(file: File): AsyncIterable<AttachmentUploadState>
  /**
   * Called when the message is sent. Return the resource that the transport
   * receives in `trigger.message.parts`.
   */
  send(pending: PendingAttachment): Promise<AIResourcePart>
  /**
   * Called when the user removes a file that was added and not yet sent.
   * Use it to delete the uploaded file.
   */
  remove(pending: PendingAttachment): Promise<void>
}

/**
 * Result of `build()`. Pass it to `useRuntime`.
 *
 * @status experimental
 * @example
 * const built: BuiltRuntime = createRuntimeBuilder().transport(myTransport).build()
 */
export interface BuiltRuntime {
  /** Transport set with `transport()`. */
  transport: StreamTransport
  /**
   * Handler set with `attachments()`. Without it the composer has no uploads.
   * @default undefined
   */
  attachmentHandler?: AttachmentHandler
}

/**
 * Builder returned by `createRuntimeBuilder`. `build()` needs a transport.
 *
 * @status experimental
 * @example
 * const builder: RuntimeBuilder = createRuntimeBuilder()
 */
export interface RuntimeBuilder<HasTransport extends boolean = false> {
  /** Sets the backend. Required before `build()`. */
  transport(transport: StreamTransport): RuntimeBuilder<true>
  /** Turns on file uploads in the composer. */
  attachments(handler: AttachmentHandler): RuntimeBuilder<HasTransport>
  /** Returns the result to pass to `useRuntime`. */
  build(this: RuntimeBuilder<true>): BuiltRuntime
}
