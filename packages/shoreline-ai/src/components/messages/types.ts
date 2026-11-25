import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ReactElement,
  ReactNode,
} from 'react'

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
  /**
   * Glyph of every reasoning mark in the list that has no children of its
   * own, including the header shown before the first part.
   * @default the My Assistant mark
   */
  workingMark?: ReactNode
}

export type AIMessagesProps = AIMessagesOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageMessages = Partial<
  Record<
    | 'reasoningStreaming'
    | 'reasoningDone'
    | 'reasoningDoneIn'
    | 'copyMessage'
    | 'copyCode'
    | 'messageCopied'
    | 'copied',
    string
  >
>

/**
 * Props of `AIMessagesI18nProvider`. It renders no element, so it takes no
 * HTML props.
 *
 * @status experimental
 * @example
 * <AIMessagesI18nProvider messages={{ copied: 'Done!' }}>
 *   <AIMessageCopy />
 * </AIMessagesI18nProvider>
 */
export interface AIMessagesI18nProviderOptions {
  /**
   * Strings that replace the built-in ones of the current locale.
   * @default undefined
   */
  messages?: AIMessageMessages
  /** Message pieces that read the strings. */
  children: ReactNode
}

export type AIMessagesI18nProviderProps = AIMessagesI18nProviderOptions

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
  /**
   * Template rendered for each reasoning group, and before the first part
   * arrives while the message runs.
   * @default <AIMessageReasoning />
   */
  reasoning?: ReactElement
}

export type AIMessagePartsProps = AIMessagePartsOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIMessageReasoningStatus = 'running' | 'complete'

/**
 * Status of a message: `running` while it streams, `complete` when it
 * finished, `incomplete` when it stopped early (cancelled or failed).
 *
 * @status experimental
 */
export type AIMessageStatus = 'running' | 'complete' | 'incomplete'

/**
 * The current message, as `useAIMessage` returns it.
 *
 * @status experimental
 * @example
 * const { id, role, status, createdAt } = useAIMessage()
 */
export interface AIMessageState {
  /** Stable id of the message. */
  id: string
  role: 'user' | 'assistant'
  status: AIMessageStatus
  /**
   * ISO date the message was created.
   * @default undefined
   */
  createdAt?: string
}

export interface AIMessageReasoningRootOptions {
  /**
   * Whether the reasoning is still being generated. Drives the header label,
   * the mark and the elapsed time.
   * @default 'complete'
   */
  status?: AIMessageReasoningStatus
  /**
   * Time spent reasoning, in milliseconds. When omitted, the time counted
   * from `startedAt` until `status` turns `complete` is used.
   */
  duration?: number
  /**
   * When the reasoning started, in epoch milliseconds. Origin of the elapsed
   * time.
   * @default the time of the first render with `status="running"`
   */
  startedAt?: number
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

export interface AIMessageReasoningOptions {
  /**
   * Whether the reasoning panel starts expanded (uncontrolled).
   * @default false
   */
  defaultExpanded?: boolean
  /**
   * Controlled expanded state. When defined, the panel follows this value and
   * only reports toggles through `onExpandedChange`.
   */
  expanded?: boolean
  /**
   * Called with the next expanded state whenever the trigger is toggled.
   */
  onExpandedChange?: (expanded: boolean) => void
  /**
   * Panel parts.
   * @default header and content
   */
  children?: ReactNode
}

export type AIMessageReasoningProps = AIMessageReasoningOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIMessageReasoningHeaderOptions {
  /**
   * Header parts.
   * @default mark, label, elapsed time and trigger, in that order
   */
  children?: ReactNode
}

export type AIMessageReasoningHeaderProps = AIMessageReasoningHeaderOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIMessageReasoningMarkOptions {
  /**
   * Custom glyph. Falls back to `workingMark` of `AIMessages`, then to the
   * My Assistant mark.
   */
  children?: ReactNode
}

export type AIMessageReasoningMarkProps = AIMessageReasoningMarkOptions &
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>

export interface AIMessageReasoningLabelOptions {
  /**
   * Custom label text. Uses the localized status text when omitted.
   */
  children?: ReactNode
}

export type AIMessageReasoningLabelProps = AIMessageReasoningLabelOptions &
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>

/** The elapsed time has no own props. */
export type AIMessageReasoningElapsedOptions = Record<never, never>

export type AIMessageReasoningElapsedProps = AIMessageReasoningElapsedOptions &
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>

/** The trigger has no own props: its accessible name comes from the label. */
export type AIMessageReasoningTriggerOptions = Record<never, never>

export type AIMessageReasoningTriggerProps = AIMessageReasoningTriggerOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

export interface AIThinkingIndicatorOptions {
  /** Text rendered with the shimmer effect. Nothing is rendered by default. */
  children?: ReactNode
}

export type AIThinkingIndicatorProps = AIThinkingIndicatorOptions &
  ComponentPropsWithoutRef<'span'>

export interface AIWorkingMarkOptions {
  /**
   * Custom glyph. Replaces the default My Assistant mark.
   * @default the My Assistant mark
   */
  children?: ReactNode
}

export type AIWorkingMarkProps = AIWorkingMarkOptions &
  ComponentPropsWithoutRef<'span'>

export interface AIMessageActionsOptions {
  /**
   * Actions of the bar. Replace the default ones, so include `AIMessageCopy`
   * and `AIMessageDate` to keep them.
   * @default <AIMessageCopy /> and <AIMessageDate />, in that order
   */
  children?: ReactNode
}

export type AIMessageActionsProps = AIMessageActionsOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIMessageActionOptions {
  /** Accessible name of the button. */
  label: string
  /** Content of the button, usually an icon. */
  children: ReactNode
}

export type AIMessageActionProps = AIMessageActionOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'aria-label'>

export interface AIMessageCopyOptions {
  /** Called once after the message text is copied successfully. */
  onCopied?: () => void
}

export type AIMessageCopyProps = AIMessageCopyOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'aria-label'>

export interface AIMessageDateOptions {
  /**
   * Date to show, relative to now.
   * @default the creation date of the current message
   */
  date?: Date | string | number
}

export type AIMessageDateProps = AIMessageDateOptions &
  Omit<ComponentPropsWithoutRef<'time'>, 'children' | 'dateTime'>

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
