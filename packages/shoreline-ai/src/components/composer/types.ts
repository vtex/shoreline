import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { AIAttachment } from '../../types/public'
import type enUS from './messages/en-US'

/**
 * Own props of `AIComposer`.
 *
 * @status experimental
 * @example
 * <AIComposer loading={false} messages={{ send: 'Send now' }} />
 */
export interface AIComposerOptions {
  /**
   * Renders skeleton instead of the interactive composer.
   * @default false
   */
  loading?: boolean
  /**
   * Overrides strings from the internal catalog.
   * @default undefined
   */
  messages?: AIComposerMessages
  /**
   * Composer subtree.
   * @default undefined
   */
  children?: ReactNode
}

/**
 * Props of `AIComposer`: `AIComposerOptions` plus `form` attributes.
 *
 * @status experimental
 * @example
 * <AIComposer loading={false} />
 */
export type AIComposerProps = AIComposerOptions &
  Omit<ComponentPropsWithoutRef<'form'>, 'children'>

/**
 * Text overrides for the composer. Unset keys use the language of
 * `LocaleProvider`.
 *
 * @status experimental
 * @example
 * const messages: AIComposerMessages = {
 *   send: 'Send now',
 *   attachmentTooLarge: 'File is too large (max {max})',
 * }
 */
export type AIComposerMessages = Partial<Record<keyof typeof enUS, string>>

/**
 * Props of `AIComposerField`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerField className="field" />
 */
export type AIComposerFieldProps = ComponentPropsWithoutRef<'div'>

/**
 * Props of `AIComposerFooter`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerFooter className="footer" />
 */
export type AIComposerFooterProps = ComponentPropsWithoutRef<'div'>

/**
 * Own props of `AIComposerInput`.
 *
 * @status experimental
 * @example
 * <AIComposerInput placeholder="Ask anything" rows={2} autoFocus />
 */
export interface AIComposerInputOptions {
  /**
   * Textarea placeholder. Uses localized default when omitted.
   * @default the localized placeholder
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

/**
 * Props of `AIComposerInput`: `AIComposerInputOptions` plus `textarea`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIComposerInput rows={2} />
 */
export type AIComposerInputProps = AIComposerInputOptions &
  Omit<
    ComponentPropsWithoutRef<'textarea'>,
    'placeholder' | 'value' | 'defaultValue' | 'onChange' | 'style'
  >

/**
 * Props of `AIComposerActions`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerActions className="actions" />
 */
export type AIComposerActionsProps = ComponentPropsWithoutRef<'div'>

/**
 * Props of `AIComposerSend`: `button` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerSend className="send" />
 */
export type AIComposerSendProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>

/**
 * Props of `AIComposerCancel`: `button` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerCancel className="stop" />
 */
export type AIComposerCancelProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>

/**
 * Props of `AIComposerAction`: `button` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerAction className="action" />
 */
export type AIComposerActionProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>

/**
 * Own props of `AIComposerAddAttachment`.
 *
 * @status experimental
 * @example
 * <AIComposerAddAttachment multiple={false} />
 */
export interface AIComposerAddAttachmentOptions {
  /**
   * Allows multiple file selection.
   * @default true
   */
  multiple?: boolean
}

/**
 * Props of `AIComposerAddAttachment`: `AIComposerAddAttachmentOptions` plus
 * `button` attributes.
 *
 * @status experimental
 * @example
 * <AIComposerAddAttachment multiple={false} />
 */
export type AIComposerAddAttachmentProps = AIComposerAddAttachmentOptions &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>

/**
 * Own props of `AIComposerAttachments`.
 *
 * @status experimental
 * @example
 * <AIComposerAttachments>
 *   {({ attachment }) => <AIComposerAttachment attachment={attachment} />}
 * </AIComposerAttachments>
 */
export interface AIComposerAttachmentsOptions {
  /**
   * Renders each attachment. Uses default chip when omitted.
   * @default the default chip
   */
  children?: (props: { attachment: AIAttachment }) => ReactNode
}

/**
 * Props of `AIComposerAttachments`: `AIComposerAttachmentsOptions` plus `div`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIComposerAttachments className="chips" />
 */
export type AIComposerAttachmentsProps = AIComposerAttachmentsOptions &
  ComponentPropsWithoutRef<'div'>

/**
 * Own props of `AIComposerAttachment`.
 *
 * @status experimental
 * @example
 * <AIComposerAttachment attachment={attachment} />
 */
export interface AIComposerAttachmentOptions {
  /** Attachment data. */
  attachment: AIAttachment
}

/**
 * Props of `AIComposerAttachment`: `AIComposerAttachmentOptions` plus `div`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIComposerAttachment attachment={attachment} />
 */
export type AIComposerAttachmentProps = AIComposerAttachmentOptions &
  ComponentPropsWithoutRef<'div'>

/**
 * Own props of `AIComposerSkeleton`.
 *
 * @status experimental
 * @example
 * <AIComposerSkeleton compact />
 */
export interface AIComposerSkeletonOptions {
  /**
   * Renders a single-line skeleton.
   * @default false
   */
  compact?: boolean
}

/**
 * Props of `AIComposerSkeleton`: `AIComposerSkeletonOptions` plus `div`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIComposerSkeleton compact />
 */
export type AIComposerSkeletonProps = AIComposerSkeletonOptions &
  ComponentPropsWithoutRef<'div'>
