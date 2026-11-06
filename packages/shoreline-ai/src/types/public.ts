/**
 * Public types for @vtex/shoreline-ai.
 * These types do not depend on any backend or wire format.
 *
 * @status experimental
 */

export type StreamStatus =
  | 'idle'
  | 'submitted'
  | 'streaming'
  | 'ready'
  | 'error'

export interface AITextPart {
  type: 'text'
  text: string
  mimeType?: string
  metadata?: Record<string, unknown>
}

export interface AIReasoningPart {
  type: 'reasoning'
  text: string
  status: 'streaming' | 'complete'
  metadata?: Record<string, unknown>
}

export type ToolStatus = 'running' | 'complete' | 'error'

export interface AIToolPart {
  type: 'tool'
  name: string
  args: Record<string, unknown>
  output?: unknown
  error?: { message: string } | Record<string, unknown>
  status: ToolStatus
  metadata?: Record<string, unknown>
}

export interface AIResourcePart {
  type: 'resource'
  uri: string
  name: string
  description?: string
  mimeType?: string
  size?: number
  metadata?: Record<string, unknown>
}

export type AIMessagePart =
  | AITextPart
  | AIReasoningPart
  | AIToolPart
  | AIResourcePart

export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  parts: AIMessagePart[]
  createdAt: string
  metadata?: Record<string, unknown>
}

export interface AIThreadData {
  id: string
  title?: string
  createdAt: string
  updatedAt?: string
  archived?: boolean
}

/** Category of errors exposed on {@link useAIThread}. */
export type AIThreadErrorType =
  | 'thread_open'
  | 'thread_list'
  | 'thread_archive'
  | 'run'

/** Serializable thread error for UI, logging, and i18n. */
export interface AIThreadError {
  type: AIThreadErrorType
  message: string
}

/** User message part for {@link AIMessageInput}. */
export type AIMessageInputPart =
  | { type: 'text'; text: string }
  | {
      type: 'file'
      uri: string
      name: string
      mimeType?: string
      size?: number
      metadata?: Record<string, unknown>
    }
  | {
      type: 'image'
      uri: string
      name?: string
      mimeType?: string
      metadata?: Record<string, unknown>
    }

/**
 * Input for {@link useAIThread.sendMessage}.
 * Pass `parts` or the `text` shorthand for a single text part.
 */
export type AIMessageInput =
  | {
      parts: AIMessageInputPart[]
      metadata?: Record<string, unknown>
    }
  | {
      text: string
      metadata?: Record<string, unknown>
    }

export type AIToolRenderMode = 'widget' | 'canvas'

export interface AIToolUIRenderProps<TArgs = unknown, TResult = unknown> {
  args: TArgs
  result?: TResult
  status: ToolStatus
  toolCallId: string
  toolName: string
  isError: boolean
  metadata?: Record<string, unknown>
}

export interface AIToolUITriggerProps<TArgs = unknown, TResult = unknown> {
  args: TArgs
  result?: TResult
  status: ToolStatus
  toolName: string
  isLoading: boolean
  openCanvas: () => void
}

/**
 * A file in the composer, from the moment it is picked until it is sent.
 *
 * @status experimental
 * @example
 * const { attachments } = useAIComposer()
 * attachments.filter((item) => item.status === 'error')
 */
export interface AIAttachment {
  /** Unique id of the attachment in the composer. */
  id: string
  /** File name. */
  name: string
  /** Kind of file, used to pick the chip layout. */
  type: 'image' | 'document' | 'file'
  /** MIME type of the file, when known. */
  contentType?: string
  /** `uploading` while the handler uploads, `error` when it failed. */
  status: 'uploading' | 'ready' | 'error'
  /** Upload progress from 0 to 1. Set while `status` is `uploading`. */
  progress?: number
  /** Why the upload failed. Set when `status` is `error`. */
  error?: string
  /** The picked file. Used for the image preview and the size. */
  file?: File
}
