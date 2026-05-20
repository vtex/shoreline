import type { Attachment } from '@assistant-ui/react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type enUS from './messages/en-US'

/** @status experimental */
export interface AIComposerOptions {
  /**
   * Renders skeleton instead of the interactive composer.
   * @default false
   */
  loading?: boolean
  /**
   * Overrides strings from the internal catalog.
   */
  messages?: AIComposerMessages
  /** Composer subtree. */
  children?: ReactNode
}

export type AIComposerProps = AIComposerOptions &
  Omit<ComponentPropsWithoutRef<'form'>, 'children'>

/** @status experimental */
export type AIComposerMessages = Partial<Record<keyof typeof enUS, string>>

export type AIComposerFieldProps = ComponentPropsWithoutRef<'div'>

export type AIComposerFooterProps = ComponentPropsWithoutRef<'div'>

/** @status experimental */
export interface AIComposerInputOptions {
  /**
   * Textarea placeholder. Uses localized default when omitted.
   */
  placeholder?: string
  /**
   * Visible row count.
   * @default 1
   */
  rows?: number
  /**
   * Focus textarea on mount.
   * @default false
   */
  autoFocus?: boolean
}

export type AIComposerInputProps = AIComposerInputOptions &
  Omit<
    ComponentPropsWithoutRef<'textarea'>,
    'placeholder' | 'value' | 'defaultValue' | 'onChange' | 'style'
  >

export type AIComposerActionsProps = ComponentPropsWithoutRef<'div'>

export type AIComposerSendProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>

export type AIComposerCancelProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>

export type AIComposerActionProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>

/** @status experimental */
export interface AIComposerAddAttachmentOptions {
  /**
   * Accepted file types for the picker (e.g. `image/*`).
   */
  accept?: string
  /**
   * Allows multiple file selection.
   * @default true
   */
  multiple?: boolean
}

export type AIComposerAddAttachmentProps = AIComposerAddAttachmentOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

/** @status experimental */
export interface AIComposerAttachmentsOptions {
  /**
   * Renders each attachment. Uses default chip when omitted.
   */
  children?: (props: { attachment: Attachment }) => ReactNode
}

export type AIComposerAttachmentsProps = AIComposerAttachmentsOptions &
  ComponentPropsWithoutRef<'div'>

/** @status experimental */
export interface AIComposerAttachmentOptions {
  /** Attachment data. */
  attachment: Attachment
}

export type AIComposerAttachmentProps = AIComposerAttachmentOptions &
  ComponentPropsWithoutRef<'div'>

/** @status experimental */
export interface AIComposerSkeletonOptions {
  /**
   * Renders a single-line skeleton.
   * @default false
   */
  compact?: boolean
}

export type AIComposerSkeletonProps = AIComposerSkeletonOptions &
  ComponentPropsWithoutRef<'div'>
