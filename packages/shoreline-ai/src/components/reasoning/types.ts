import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { AIToolPart } from '../../types/public'

export type AIReasoningStatus = 'running' | 'complete'

export interface AIReasoningRootOptions {
  /**
   * Whether the reasoning is still being generated. Drives the header label,
   * the mark and the elapsed time.
   * @default 'complete'
   */
  status?: AIReasoningStatus
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

export type AIReasoningRootProps = AIReasoningRootOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIReasoningOptions {
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

export type AIReasoningProps = AIReasoningOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIReasoningHeaderOptions {
  /**
   * Header parts.
   * @default mark, label, elapsed time and trigger, in that order
   */
  children?: ReactNode
}

export type AIReasoningHeaderProps = AIReasoningHeaderOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export interface AIReasoningMarkOptions {
  /**
   * Custom glyph. Falls back to `workingMark` of `AIMessages`, then to the
   * My Assistant mark.
   */
  children?: ReactNode
}

export type AIReasoningMarkProps = AIReasoningMarkOptions &
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>

export interface AIReasoningLabelOptions {
  /**
   * Custom label text. Uses the localized status text when omitted.
   */
  children?: ReactNode
}

export type AIReasoningLabelProps = AIReasoningLabelOptions &
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>

/** The elapsed time has no own props. */
export type AIReasoningElapsedOptions = Record<never, never>

export type AIReasoningElapsedProps = AIReasoningElapsedOptions &
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>

/** The trigger has no own props: its accessible name comes from the label. */
export type AIReasoningTriggerOptions = Record<never, never>

export type AIReasoningTriggerProps = AIReasoningTriggerOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

export type AIReasoningContentProps = ComponentPropsWithoutRef<'div'>

export type AIReasoningTextProps = ComponentPropsWithoutRef<'div'>

export interface AIReasoningToolStepOptions {
  /** Tool part to render as a compact reasoning step. */
  part: AIToolPart
}

export type AIReasoningToolStepProps = AIReasoningToolStepOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>
