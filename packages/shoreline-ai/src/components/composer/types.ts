import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { AIAttachment } from '../../types/public'
import type enUS from './messages/en-US'

/**
 * Arrangement of the composer field.
 * @status experimental
 */
export type AIComposerLayout = 'stacked' | 'expanded' | 'inline'

/** @status experimental */
export interface AIComposerOptions {
  /**
   * Arrangement of the field: `stacked` (text, then a footer row),
   * `expanded` (start slot above the text) or `inline` (one row).
   * @default 'stacked'
   */
  layout?: AIComposerLayout
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
  /**
   * Renders the child as the textarea, so an app can attach its own
   * behavior, such as a combobox.
   * @default false
   */
  asChild?: boolean
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
  children?: (props: { attachment: AIAttachment }) => ReactNode
}

export type AIComposerAttachmentsProps = AIComposerAttachmentsOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/** @status experimental */
export interface AIComposerAttachmentOptions {
  /** Attachment data. */
  attachment: AIAttachment
}

export type AIComposerAttachmentProps = AIComposerAttachmentOptions &
  ComponentPropsWithoutRef<'div'>

/** @status experimental */
export interface AIComposerSkeletonOptions {
  /**
   * Layout the skeleton stands in for. `inline` renders the one-row height.
   * @default 'stacked'
   */
  layout?: AIComposerLayout
}

export type AIComposerSkeletonProps = AIComposerSkeletonOptions &
  ComponentPropsWithoutRef<'div'>

/** @status experimental */
export type AIComposerHeaderProps = ComponentPropsWithoutRef<'div'>

/** @status experimental */
export type AIComposerContextItemsProps = ComponentPropsWithoutRef<'ul'>

/** @status experimental */
export interface AIComposerContextItemOptions {
  /**
   * Leading icon. Uses a pin when omitted.
   */
  icon?: ReactNode
  /**
   * Shows a remove button when set. Called when the user removes the item.
   */
  onRemove?: () => void
  /**
   * Renders the child as the item, so the app owns the whole UI and keeps the
   * package attributes and the ref. The default icon, label and remove button
   * are not rendered. The child should be an `li`.
   * @default false
   */
  asChild?: boolean
}

export type AIComposerContextItemProps = AIComposerContextItemOptions &
  ComponentPropsWithoutRef<'li'>
