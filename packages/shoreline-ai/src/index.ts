/**
 * @vtex/shoreline-ai — AI runtime for VTEX Admin built on Assistant-UI.
 *
 * @status experimental
 */

// Public types
export type {
  AITextPart,
  AIReasoningPart,
  AIToolPart,
  AIResourcePart,
  AIMessagePart,
  AIMessage,
  AIThreadData,
  AIMessageInput,
  AIMessageInputPart,
  AIToolRenderMode,
  AIToolUIRenderProps,
  AIToolUITriggerProps,
  StreamStatus,
  ToolStatus,
  AIThreadError,
  AIThreadErrorType,
} from './types'

export type { AIRuntime } from './types/runtime'

// Runtime builder (agnostic to Assistant-UI for consumers wiring transport)
export { createRuntimeBuilder } from './runtime/builder'
export { useRuntime } from './runtime/use-runtime'
export { loadThreadMessages } from './runtime/load-thread-messages'
export { generateId, generateThreadId } from './utils/generate-id'
export type {
  StreamTransport,
  RuntimeBuilder,
  BuiltRuntime,
  RuntimeRunInput,
  RuntimeRunTrigger,
  RuntimeSnapshot,
  AttachmentHandler,
  PendingAttachment,
  AttachmentUploadState,
} from './runtime/types'

// Provider
export { AIProvider, useAIContext } from './components/provider'
export type { AIProviderOptions, AIProviderProps } from './components/provider'

// Stream debug (dev / sandbox)
export {
  AIStreamDebugProvider,
  useAIStreamDebug,
  useStreamDebugCallbacks,
} from './components/debug'
export type {
  AIStreamDebugRow,
  AIStreamDebugSession,
  SSEEventType,
} from './components/debug'

// Public hooks
export { useAIReasonings } from './hooks/use-ai-reasonings'
export { useAITools } from './hooks/use-ai-tools'
export { useAIResources } from './hooks/use-ai-resources'
export { useAIStatus } from './hooks/use-ai-status'
export { useAIThread } from './hooks/use-ai-thread'
export { useAIComposer } from './hooks/use-ai-composer'
export { useAIMessageParts } from './hooks/use-ai-message-parts'

// Thread
export {
  AIThread,
  AIThreadViewport,
  AIThreadEmpty,
  AIThreadViewportFooter,
  AIThreadScrollToBottom,
} from './components/thread'
export type {
  AIThreadProps,
  AIThreadOptions,
  AIThreadViewportProps,
  AIThreadViewportOptions,
  AIThreadEmptyProps,
  AIThreadViewportFooterProps,
  AIThreadScrollToBottomProps,
  AIThreadMessages,
} from './components/thread'

// Composer
export {
  AIComposer,
  AIComposerAttachments,
  AIComposerAttachment,
  AIComposerAddAttachment,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  AIComposerActions,
  AIComposerSend,
  AIComposerCancel,
  AIComposerAction,
  AIComposerSkeleton,
} from './components/composer'
export type {
  AIComposerProps,
  AIComposerOptions,
  AIComposerMessages,
  AIComposerFieldProps,
  AIComposerFooterProps,
  AIComposerInputProps,
  AIComposerInputOptions,
  AIComposerActionsProps,
  AIComposerSendProps,
  AIComposerCancelProps,
  AIComposerActionProps,
  AIComposerAddAttachmentProps,
  AIComposerAddAttachmentOptions,
  AIComposerAttachmentsProps,
  AIComposerAttachmentsOptions,
  AIComposerAttachmentProps,
  AIComposerAttachmentOptions,
  AIComposerSkeletonProps,
  AIComposerSkeletonOptions,
} from './components/composer'

// Messages
export {
  AIMessages,
  AIMessageUser,
  AIMessageAssistant,
  AIMessageRoot,
  AIMessageParts,
  AIMessageText,
  AIMarkdown,
  AIMessageReasoningRoot,
  AIMessageReasoningHeader,
  AIMessageReasoningTrigger,
  AIMessageReasoningContent,
  AIMessageReasoningText,
  AIMessageReasoningToolStep,
  AIMessageResources,
  AIMessageResource,
  AIMessageResourceFile,
  AIMessageResourceImage,
  renderDefaultParts,
} from './components/messages'
export type {
  AIMessagesProps,
  AIMessagesOptions,
  AIMessageUserProps,
  AIMessageAssistantProps,
  AIMessageAssistantOptions,
  AIMessageRootProps,
  AIMessageRootOptions,
  AIMessagePartsProps,
  AIMessagePartsOptions,
  AIMessageTextProps,
  AIMarkdownProps,
  AIMarkdownOptions,
  AIMessageReasoningRootProps,
  AIMessageReasoningRootOptions,
  AIMessageReasoningTriggerProps,
  AIMessageReasoningTriggerOptions,
  AIMessageReasoningContentProps,
  AIMessageReasoningTextProps,
  AIMessageReasoningToolStepProps,
  AIMessageReasoningToolStepOptions,
  AIMessageResourceProps,
  AIMessageResourcesProps,
  AIMessageMessages,
  AIMessagePartMeta,
  AIMessagePartRenderer,
  GroupByContext,
  AIToolRegistration,
  RenderDefaultPartsOptions,
} from './components/messages'
export type {
  AIMessageResourceFileProps,
  AIMessageResourceImageProps,
} from './components/messages/ai-message-resource'

// Tool UI
export { makeAIToolUI } from './components/tool-ui/make-ai-tool-ui'
export { AICanvas } from './components/tool-ui/ai-canvas'
export type {
  AICanvasOptions,
  AICanvasProps,
} from './components/tool-ui/ai-canvas'
export { AIToolFallback } from './components/tool-ui/ai-tool-fallback'
export type {
  AIToolFallbackOptions,
  AIToolFallbackProps,
} from './components/tool-ui/ai-tool-fallback'
export { AICanvasTrigger } from './components/tool-ui/ai-canvas-trigger'
export type {
  AICanvasTriggerOptions,
  AICanvasTriggerProps,
} from './components/tool-ui/ai-canvas-trigger'
