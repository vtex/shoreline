import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'

import type {
  AIMessagePart,
  AIToolPart,
  AIToolUIRenderProps,
  AIToolUITriggerProps,
  ToolStatus,
} from '../../types/public'

export type AIMessageGroupKey = `group-${string}`

/**
 * A tool UI registered with `makeAIToolUI`.
 *
 * @status experimental
 * @example
 * const widget = (registration: AIToolRegistration) => registration.mode === 'widget'
 */
export type AIToolRegistration = {
  mode: 'widget' | 'canvas'
  render: ComponentType<AIToolUIRenderProps>
  trigger?: ComponentType<AIToolUITriggerProps>
  defaultOpen: boolean
}

/**
 * Context passed when the message parts are grouped: the registered tool UIs.
 *
 * @status experimental
 * @example
 * const hasUI = (context: GroupByContext, name: string) =>
 *   context.toolRegistry.has(name)
 */
export type GroupByContext = {
  toolRegistry: ReadonlyMap<string, AIToolRegistration>
}

/**
 * Second argument of a custom part renderer: where the part is and whether it
 * is still streaming.
 *
 * @status experimental
 * @example
 * <AIMessageParts>
 *   {(part, meta) => (meta.isStreaming ? <span>...</span> : null)}
 * </AIMessageParts>
 */
export type AIMessagePartMeta = {
  index: number
  isStreaming: boolean
  /** 'cot' = inside reasoning panel; 'message' = message level */
  placement: 'cot' | 'message'
  toolRegistration: AIToolRegistration | null
}

/**
 * Function that renders one message part. Return `null` to use the built-in
 * renderer.
 *
 * @status experimental
 * @example
 * const renderer: AIMessagePartRenderer = (part) =>
 *   part.type === 'text' ? <p>{part.text}</p> : null
 */
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
 * @example
 * <AIMessages showReasoningTools={false} />
 */
export interface AIMessagesOptions {
  /**
   * Shows tool steps inside the reasoning panel for tools without a custom UI.
   * @default true
   */
  showReasoningTools?: boolean
  /**
   * Custom user/assistant templates. Uses built-in layouts when omitted.
   * @default the built-in user and assistant layouts
   */
  children?: ReactNode
  /**
   * Overrides strings from the internal catalog.
   * @default undefined
   */
  messages?: AIMessageMessages
}

/**
 * Props of `AIMessages`: `AIMessagesOptions` plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessages showReasoningTools={false} />
 */
export type AIMessagesProps = AIMessagesOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Text overrides for messages. Unset keys use the language of `LocaleProvider`.
 *
 * @status experimental
 * @example
 * const messages: AIMessageMessages = { copyMessage: 'Copy' }
 */
export type AIMessageMessages = Partial<
  Record<
    'reasoningStreaming' | 'reasoningReady' | 'copyMessage' | 'copyCode',
    string
  >
>

/**
 * Own props of `AIMessageRoot`.
 *
 * @status experimental
 * @example
 * <AIMessageRoot messageRole="user" />
 */
export interface AIMessageRootOptions {
  /** Message author role. Set automatically by `AIMessageUser` / `AIMessageAssistant`. */
  messageRole: 'user' | 'assistant'
  /**
   * Message content and optional siblings such as a future ActionBar.
   * Compose `AIMessageParts` with additional controls as children of
   * `AIMessageAssistant` when customizing the assistant layout.
   * @default undefined
   */
  children?: ReactNode
}

/**
 * Props of `AIMessageRoot`: `AIMessageRootOptions` plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageRoot messageRole="user" />
 */
export type AIMessageRootProps = AIMessageRootOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Props of `AIMessageUser`: the props of `AIMessageRoot` without `messageRole`.
 *
 * @status experimental
 * @example
 * <AIMessageUser className="user-message" />
 */
export type AIMessageUserProps = Omit<AIMessageRootProps, 'messageRole'>

/**
 * Own props of `AIMessageAssistant`.
 *
 * @status experimental
 * @example
 * <AIMessageAssistant showReasoningTools={false} />
 */
export interface AIMessageAssistantOptions {
  /**
   * Shows tool steps inside the reasoning panel for tools without a custom UI.
   * @default true
   */
  showReasoningTools?: boolean
}

/**
 * Props of `AIMessageAssistant`: `AIMessageAssistantOptions` plus the props of
 * `AIMessageRoot` without `messageRole`.
 *
 * @status experimental
 * @example
 * <AIMessageAssistant showReasoningTools={false} />
 */
export type AIMessageAssistantProps = AIMessageAssistantOptions &
  Omit<AIMessageRootProps, 'messageRole'>

/**
 * Own props of `AIMessageParts`.
 *
 * @status experimental
 * @example
 * <AIMessageParts showReasoningTools={false} />
 */
export interface AIMessagePartsOptions {
  /**
   * Shows compact tool steps inside the reasoning panel for tools without a
   * custom UI.
   * @default true
   */
  showReasoningTools?: boolean
  /**
   * Custom renderer for each message part. Return nothing to use the built-in
   * renderer.
   * @default the built-in renderer
   */
  children?: AIMessagePartRenderer
}

/**
 * Props of `AIMessageParts`: `AIMessagePartsOptions` plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageParts showReasoningTools={false} />
 */
export type AIMessagePartsProps = AIMessagePartsOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Own props of `AIMessageReasoningRoot`.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningRoot defaultExpanded />
 */
export interface AIMessageReasoningRootOptions {
  /**
   * Whether the reasoning panel starts expanded.
   * @default false
   */
  defaultExpanded?: boolean
  /**
   * Panel content.
   * @default undefined
   */
  children?: ReactNode
}

/**
 * Props of `AIMessageReasoningRoot`: `AIMessageReasoningRootOptions` plus `div`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningRoot defaultExpanded />
 */
export type AIMessageReasoningRootProps = AIMessageReasoningRootOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Own props of `AIMessageReasoningTrigger`.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningTrigger label="Reasoning" streaming />
 */
export interface AIMessageReasoningTriggerOptions {
  /**
   * Overrides the collapse button label. Uses localized default when omitted.
   * @default the localized label
   */
  label?: string
  /**
   * Whether the assistant is still generating the current message.
   * @default false
   */
  streaming?: boolean
}

/**
 * Props of `AIMessageReasoningTrigger`: `AIMessageReasoningTriggerOptions` plus
 * `button` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningTrigger label="Reasoning" />
 */
export type AIMessageReasoningTriggerProps = AIMessageReasoningTriggerOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

/**
 * Props of `AIMessageReasoningContent`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningContent className="content" />
 */
export type AIMessageReasoningContentProps = ComponentPropsWithoutRef<'div'>

/**
 * Props of `AIMessageReasoningText`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningText className="text" />
 */
export type AIMessageReasoningTextProps = ComponentPropsWithoutRef<'div'>

/**
 * Own props of `AIMessageReasoningToolStep`.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningToolStep part={toolPart} />
 */
export interface AIMessageReasoningToolStepOptions {
  /** Tool part to render as a compact reasoning step. */
  part: AIToolPart
}

/**
 * Props of `AIMessageReasoningToolStep`: `AIMessageReasoningToolStepOptions`
 * plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageReasoningToolStep part={toolPart} />
 */
export type AIMessageReasoningToolStepProps =
  AIMessageReasoningToolStepOptions &
    Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Props of `AIMessageText`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageText className="text" />
 */
export type AIMessageTextProps = ComponentPropsWithoutRef<'div'>

/**
 * Own props of `AIMarkdown`.
 *
 * @status experimental
 * @example
 * <AIMarkdown>{'**Hello**'}</AIMarkdown>
 */
export interface AIMarkdownOptions {
  /** Markdown source string. */
  children: string
}

/**
 * Props of `AIMarkdown`: `AIMarkdownOptions` plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMarkdown>{'**Hello**'}</AIMarkdown>
 */
export type AIMarkdownProps = AIMarkdownOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Props of `AIMessageResource`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageResource className="resource" />
 */
export type AIMessageResourceProps = ComponentPropsWithoutRef<'div'>

/**
 * Props of `AIMessageResources`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIMessageResources className="resources" />
 */
export type AIMessageResourcesProps = ComponentPropsWithoutRef<'div'>

/**
 * Options of `renderDefaultParts`.
 *
 * @status experimental
 * @example
 * renderDefaultParts(part, meta, { showReasoningTools: false })
 */
export type RenderDefaultPartsOptions = {
  showReasoningTools?: boolean
}

export type { AIToolPart, ToolStatus }
