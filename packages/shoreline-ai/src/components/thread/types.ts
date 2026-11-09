import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface AIThreadOptions {
  /**
   * Partial override for built-in thread UI strings.
   */
  messages?: AIThreadMessages
  children?: ReactNode
}

export type AIThreadProps = AIThreadOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

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
  children?: ReactNode
}

export type AIThreadViewportProps = AIThreadViewportOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export type AIThreadEmptyProps = ComponentPropsWithoutRef<'div'>

export type AIThreadViewportFooterProps = ComponentPropsWithoutRef<'div'>

export type AIThreadScrollToBottomProps = ComponentPropsWithoutRef<'button'>

export type AIThreadMessages = {
  scrollToBottom?: string
}
