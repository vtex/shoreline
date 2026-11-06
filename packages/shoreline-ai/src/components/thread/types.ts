import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Own props of `AIThread`.
 *
 * @status experimental
 * @example
 * <AIThread messages={{ scrollToBottom: 'Go to the end' }} />
 */
export interface AIThreadOptions {
  /**
   * Partial override for built-in thread UI strings.
   * @default undefined
   */
  messages?: AIThreadMessages
  /**
   * Thread content, usually `AIThreadViewport`.
   * @default undefined
   */
  children?: ReactNode
}

/**
 * Props of `AIThread`: `AIThreadOptions` plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIThread messages={{ scrollToBottom: 'Go to the end' }} />
 */
export type AIThreadProps = AIThreadOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Own props of `AIThreadViewport`.
 *
 * @status experimental
 * @example
 * <AIThreadViewport autoScroll={false} />
 */
export interface AIThreadViewportOptions {
  /**
   * Scroll to bottom when new messages arrive.
   * @default true
   */
  autoScroll?: boolean
  /**
   * Scroll to bottom when a new run starts.
   * @default true
   */
  scrollToBottomOnRunStart?: boolean
  /**
   * Scroll to bottom when thread history is first loaded.
   * @default true
   */
  scrollToBottomOnInitialize?: boolean
  /**
   * Scroll to bottom when switching to a different thread.
   * @default true
   */
  scrollToBottomOnThreadSwitch?: boolean
  /**
   * Viewport content, usually `AIMessages`.
   * @default undefined
   */
  children?: ReactNode
}

/**
 * Props of `AIThreadViewport`: `AIThreadViewportOptions` plus `div` attributes.
 *
 * @status experimental
 * @example
 * <AIThreadViewport autoScroll={false} />
 */
export type AIThreadViewportProps = AIThreadViewportOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Props of `AIThreadEmpty`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIThreadEmpty className="welcome" />
 */
export type AIThreadEmptyProps = ComponentPropsWithoutRef<'div'>

/**
 * Props of `AIThreadViewportFooter`: `div` attributes.
 *
 * @status experimental
 * @example
 * <AIThreadViewportFooter className="footer" />
 */
export type AIThreadViewportFooterProps = ComponentPropsWithoutRef<'div'>

/**
 * Props of `AIThreadScrollToBottom`: `button` attributes.
 *
 * @status experimental
 * @example
 * <AIThreadScrollToBottom className="scroll" />
 */
export type AIThreadScrollToBottomProps = ComponentPropsWithoutRef<'button'>

/**
 * Text overrides for the thread. Unset keys use the language of
 * `LocaleProvider`.
 *
 * @status experimental
 * @example
 * const messages: AIThreadMessages = { scrollToBottom: 'Go to the end' }
 */
export type AIThreadMessages = {
  scrollToBottom?: string
}
