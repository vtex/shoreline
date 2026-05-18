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

export type { StreamStatus }

export interface RuntimeRunInput {
  messages: AIMessage[]
  abortSignal: AbortSignal
  assistantMessageId: string
}

export interface RuntimeSnapshot {
  parts: AIMessagePart[]
  status?: StreamStatus
}

/** Plugin implemented by protocol runtimes (e.g. VTEX in agentic-ui). */
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
}

export interface RuntimeBuilder {
  transport(transport: StreamTransport): RuntimeBuilder
  attachments(handler: AttachmentHandler): RuntimeBuilder
  build(): BuiltRuntime
}
