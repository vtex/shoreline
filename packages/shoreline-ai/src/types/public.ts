/**
 * Public types for @vtex/shoreline-ai.
 * These types do not depend on any backend or wire format.
 *
 * @status experimental
 */

/**
 * State of an assistant run: `idle` before any message, `submitted` while the
 * assistant has not answered yet, `streaming` while it answers, `ready` when
 * it is done and `error` when the run failed.
 *
 * @status experimental
 * @example
 * const status: StreamStatus = 'streaming'
 */
export type StreamStatus =
  | 'idle'
  | 'submitted'
  | 'streaming'
  | 'ready'
  | 'error'

/**
 * A piece of plain text in a message. Markdown is allowed.
 *
 * @status experimental
 * @example
 * const part: AITextPart = { type: 'text', text: 'Hello' }
 */
export interface AITextPart {
  type: 'text'
  text: string
  /**
   * MIME type of the text, for example `text/markdown`.
   * @default undefined
   */
  mimeType?: string
  /**
   * Extra data your app wants to keep with the part.
   * @default undefined
   */
  metadata?: Record<string, unknown>
}

/**
 * Reasoning text the assistant shows before or while it answers.
 *
 * @status experimental
 * @example
 * const part: AIReasoningPart = {
 *   type: 'reasoning',
 *   text: 'Checking the order',
 *   status: 'streaming',
 * }
 */
export interface AIReasoningPart {
  type: 'reasoning'
  text: string
  status: 'streaming' | 'complete'
  /**
   * Extra data your app wants to keep with the part.
   * @default undefined
   */
  metadata?: Record<string, unknown>
}

/**
 * State of a tool call.
 *
 * @status experimental
 * @example
 * const status: ToolStatus = 'running'
 */
export type ToolStatus = 'running' | 'complete' | 'error'

/**
 * A tool call made by the assistant, with its arguments and result.
 *
 * @status experimental
 * @example
 * const part: AIToolPart = {
 *   type: 'tool',
 *   name: 'search_orders',
 *   args: { query: 'late' },
 *   status: 'running',
 * }
 */
export interface AIToolPart {
  type: 'tool'
  name: string
  args: Record<string, unknown>
  /**
   * Result of the tool. Not set until the tool ends.
   * @default undefined
   */
  output?: unknown
  /**
   * Why the tool failed. Set when `status` is `error`.
   * @default undefined
   */
  error?: { message: string } | Record<string, unknown>
  status: ToolStatus
  /**
   * Extra data your app wants to keep with the part.
   * @default undefined
   */
  metadata?: Record<string, unknown>
}

/**
 * A file or a link in a message, for example an upload or an image.
 *
 * @status experimental
 * @example
 * const part: AIResourcePart = {
 *   type: 'resource',
 *   uri: 'https://example.com/report.pdf',
 *   name: 'report.pdf',
 *   mimeType: 'application/pdf',
 * }
 */
export interface AIResourcePart {
  type: 'resource'
  uri: string
  name: string
  /**
   * Short text that describes the resource.
   * @default undefined
   */
  description?: string
  /**
   * MIME type of the resource. Images (`image/*`) show as pictures.
   * @default undefined
   */
  mimeType?: string
  /**
   * Size in bytes.
   * @default undefined
   */
  size?: number
  /**
   * Extra data your app wants to keep with the part.
   * @default undefined
   */
  metadata?: Record<string, unknown>
}

/**
 * One part of a message: text, reasoning, tool call or resource.
 *
 * @status experimental
 * @example
 * const parts: AIMessagePart[] = [{ type: 'text', text: 'Hello' }]
 */
export type AIMessagePart =
  | AITextPart
  | AIReasoningPart
  | AIToolPart
  | AIResourcePart

/**
 * A message of the conversation, made of parts.
 *
 * @status experimental
 * @example
 * const message: AIMessage = {
 *   id: 'msg-1',
 *   role: 'user',
 *   createdAt: new Date().toISOString(),
 *   parts: [{ type: 'text', text: 'Hello' }],
 * }
 */
export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  parts: AIMessagePart[]
  createdAt: string
  /**
   * Extra data your app wants to keep with the message.
   * @default undefined
   */
  metadata?: Record<string, unknown>
}

/**
 * A saved conversation as it appears in a history list.
 *
 * @status experimental
 * @example
 * const thread: AIThreadData = {
 *   id: 'thread-1',
 *   title: 'Late orders',
 *   createdAt: '2026-01-01T00:00:00.000Z',
 * }
 */
export interface AIThreadData {
  id: string
  /**
   * Name shown in the history list.
   * @default undefined
   */
  title?: string
  createdAt: string
  /**
   * ISO date of the last change.
   * @default undefined
   */
  updatedAt?: string
  /**
   * True when the thread is archived.
   * @default undefined
   */
  archived?: boolean
}

/**
 * Where an {@link AIThreadError} comes from: `thread_open` when `threads.load`
 * fails, `thread_list` and `thread_archive` when the list or an archive fails,
 * and `run` when a run fails.
 *
 * @status experimental
 * @example
 * const type: AIThreadErrorType = 'thread_list'
 */
export type AIThreadErrorType =
  | 'thread_open'
  | 'thread_list'
  | 'thread_archive'
  | 'run'

/**
 * Serializable thread error for UI, logging, and i18n.
 *
 * @status experimental
 * @example
 * const error: AIThreadError = { type: 'run', message: 'The run failed.' }
 */
export interface AIThreadError {
  type: AIThreadErrorType
  message: string
}

/**
 * User message part for {@link AIMessageInput}.
 *
 * @status experimental
 * @example
 * const part: AIMessageInputPart = { type: 'text', text: 'Analyze this' }
 */
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
 *
 * @status experimental
 * @example
 * sendMessage({ text: 'Hello' })
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

/**
 * Where a tool UI renders: `widget` inside the message, `canvas` in `AICanvas`.
 *
 * @status experimental
 * @example
 * makeAIToolUI({ component: 'chart', mode: 'canvas', render: Chart })
 */
export type AIToolRenderMode = 'widget' | 'canvas'

/**
 * Props received by the component that renders a tool call.
 *
 * @status experimental
 * @example
 * function Chart(props: AIToolUIRenderProps<{ title: string }>) {
 *   return <h3>{props.args.title}</h3>
 * }
 */
export interface AIToolUIRenderProps<TArgs = unknown, TResult = unknown> {
  args: TArgs
  /**
   * Result of the tool. Not set until the tool ends.
   * @default undefined
   */
  result?: TResult
  status: ToolStatus
  toolCallId: string
  toolName: string
  isError: boolean
  /**
   * Extra data sent with the tool call.
   * @default undefined
   */
  metadata?: Record<string, unknown>
}

/**
 * Props received by the trigger of a canvas tool UI.
 *
 * @status experimental
 * @example
 * function Trigger(props: AIToolUITriggerProps) {
 *   return <button onClick={props.openCanvas}>{props.toolName}</button>
 * }
 */
export interface AIToolUITriggerProps<TArgs = unknown, TResult = unknown> {
  args: TArgs
  /**
   * Result of the tool. Not set until the tool ends.
   * @default undefined
   */
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
  /**
   * MIME type of the file, when known.
   * @default undefined
   */
  contentType?: string
  /** `uploading` while the handler uploads, `error` when it failed. */
  status: 'uploading' | 'ready' | 'error'
  /**
   * Upload progress from 0 to 1. Set while `status` is `uploading`.
   * @default undefined
   */
  progress?: number
  /**
   * Why the upload failed. Set when `status` is `error`.
   * @default undefined
   */
  error?: string
  /**
   * The picked file, used for the image preview and the size. It can be
   * missing, so check it before you use it.
   * @default undefined
   */
  file?: File
}
