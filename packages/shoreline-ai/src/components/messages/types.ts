import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'

import type {
  AIMessagePart,
  AIToolPart,
  AIToolUIRenderProps,
  AIToolUITriggerProps,
  ToolStatus,
} from '../../types/public'

export type AIMessageGroupKey = `group-${string}`

export type AIToolRegistration = {
  mode: 'widget' | 'canvas'
  render: ComponentType<AIToolUIRenderProps>
  trigger?: ComponentType<AIToolUITriggerProps>
  defaultOpen: boolean
}

export type GroupByContext = {
  toolRegistry: ReadonlyMap<string, AIToolRegistration>
}

export type AIMessagePartMeta = {
  index: number
  isStreaming: boolean
  /** 'cot' = inside reasoning panel; 'message' = message level */
  placement: 'cot' | 'message'
  toolRegistration: AIToolRegistration | null
}

export type AIMessagePartRenderer = (
  part: AIMessagePart,
  meta: AIMessagePartMeta
) => ReactNode | null | undefined

export type AIMessageGroupBy = (
  part: AIMessagePart,
  ctx: GroupByContext
) => AIMessageGroupKey[] | null

/**
 * Renders the full message list with default user and assistant layouts.
 *
 * @status experimental
 */
export interface AIMessagesOptions {
  /**
   * Shows tool steps inside the reasoning panel for tools without a custom UI.
   * @default true
   */
  showReasoningTools?: boolean
  /** Custom user/assistant templates. Uses built-in layouts when omitted. */
  children?: ReactNode
  /** Overrides strings from the internal catalog. */
  messages?: AIMessageMessages
}

export type AIMessagesProps = AIMessagesOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageMessages = Partial<
  Record<
    | 'reasoningStreaming'
    | 'reasoningReady'
    | 'copyMessage'
    | 'copyCode'
    | 'workedFor'
    | 'thinking'
    | 'messageCopied',
    string
  >
>

export interface AIMessageRootOptions {
  /** Message author role. Set automatically by `AIMessageUser` / `AIMessageAssistant`. */
  messageRole: 'user' | 'assistant'
  /**
   * Message content and optional siblings such as a future ActionBar.
   * Compose `AIMessageParts` with additional controls as children of
   * `AIMessageAssistant` when customizing the assistant layout.
   */
  children?: ReactNode
}

export type AIMessageRootProps = AIMessageRootOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageUserProps = Omit<AIMessageRootProps, 'messageRole'>

export interface AIMessageAssistantOptions {
  /**
   * Shows tool steps inside the reasoning panel for tools without a custom UI.
   * @default true
   */
  showReasoningTools?: boolean
}

export type AIMessageAssistantProps = AIMessageAssistantOptions &
  Omit<AIMessageRootProps, 'messageRole'>

export interface AIMessagePartsOptions {
  /**
   * Shows compact tool steps inside the reasoning panel for tools without a custom UI.
   * @default true
   */
  showReasoningTools?: boolean
  /**
   * Custom renderer for each message part. Return nothing to use the built-in renderer.
   */
  children?: AIMessagePartRenderer
}

export type AIMessagePartsProps = AIMessagePartsOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageReasoningStatus = 'running' | 'complete'

export interface AIMessageReasoningRootOptions {
  /**
   * Whether the reasoning is still being generated. Drives the trigger label.
   * @default 'complete'
   */
  status?: AIMessageReasoningStatus
  /**
   * Time spent reasoning, in milliseconds.
   */
  duration?: number
  /**
   * Whether the reasoning panel starts expanded (uncontrolled).
   * @default false
   */
  defaultExpanded?: boolean
  /**
   * Controlled expanded state. When defined, the panel follows this value and
   * only reports toggles through `onExpandedChange`. `defaultExpanded` is
   * ignored when controlled. Switching between controlled and uncontrolled
   * during the component lifetime is not supported.
   */
  expanded?: boolean
  /**
   * Called with the next expanded state whenever the trigger is toggled.
   */
  onExpandedChange?: (expanded: boolean) => void
  children?: ReactNode
}

export type AIMessageReasoningRootProps = AIMessageReasoningRootOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIMessageReasoningTriggerOptions {
  /** Overrides the collapse button label. Uses localized default when omitted. */
  label?: ReactNode
}

export type AIMessageReasoningTriggerProps = AIMessageReasoningTriggerOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

export interface AIThinkingIndicatorOptions {
  /**
   * Overrides the label next to the dots. Uses the localized default when omitted.
   * @default the localized `thinking` message
   */
  label?: ReactNode
}

export type AIThinkingIndicatorProps = AIThinkingIndicatorOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIMessageActionsOptions {
  /** Extra actions rendered after the copy button. */
  children?: ReactNode
}

export type AIMessageActionsProps = AIMessageActionsOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIMessageCopyOptions {
  /** Called once after the message text is copied successfully. */
  onCopied?: () => void
}

export type AIMessageCopyProps = AIMessageCopyOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

export type AIMessageReasoningContentProps = ComponentPropsWithoutRef<'div'>

export type AIMessageReasoningTextProps = ComponentPropsWithoutRef<'div'>

export interface AIMessageReasoningToolStepOptions {
  /** Tool part to render as a compact reasoning step. */
  part: AIToolPart
}

export type AIMessageReasoningToolStepProps =
  AIMessageReasoningToolStepOptions &
    Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageTextProps = ComponentPropsWithoutRef<'div'>

export interface AIMarkdownOptions {
  /** Markdown source string. */
  children: string
}

export type AIMarkdownProps = AIMarkdownOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageResourceProps = ComponentPropsWithoutRef<'div'>

export type AIMessageResourcesProps = ComponentPropsWithoutRef<'div'>

export type RenderDefaultPartsOptions = {
  showReasoningTools?: boolean
}

export type { AIToolPart, ToolStatus }
