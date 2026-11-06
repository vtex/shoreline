/**
 * <AICanvasTrigger> — default trigger component for canvas-mode tool UIs.
 * Can be used standalone or as a reference for custom triggers.
 */

import { type ReactNode, forwardRef, createElement } from 'react'

/**
 * Own props of `AICanvasTrigger`.
 *
 * @status experimental
 * @example
 * <AICanvasTrigger label="Open chart" isLoading />
 */
export interface AICanvasTriggerOptions {
  /**
   * Main text of the button.
   * @default undefined
   */
  label?: ReactNode
  /**
   * Secondary text under the label.
   * @default undefined
   */
  description?: ReactNode
  /**
   * Icon shown before the text.
   * @default undefined
   */
  icon?: ReactNode
  /**
   * Shows the loading state while the tool runs.
   * @default false
   */
  isLoading?: boolean
  /**
   * Called when the button is clicked.
   * @default undefined
   */
  onClick?: () => void
}

/**
 * Props of `AICanvasTrigger`.
 *
 * @status experimental
 * @example
 * <AICanvasTrigger label="Open chart" />
 */
export type AICanvasTriggerProps = AICanvasTriggerOptions

/**
 * Default button that opens a canvas tool UI. Use it as is or as a base for
 * your own trigger.
 *
 * @status experimental
 * @example
 * <AICanvasTrigger label="Open chart" onClick={openCanvas} />
 */
export const AICanvasTrigger = forwardRef<
  HTMLButtonElement,
  AICanvasTriggerProps
>(function AICanvasTrigger(props, ref) {
  const { label, description, icon, isLoading = false, onClick } = props

  return createElement(
    'button',
    {
      ref,
      type: 'button',
      onClick,
      'data-sl-ai-canvas-trigger': '',
      'data-loading': isLoading || undefined,
      'aria-label': typeof label === 'string' ? `Open ${label}` : 'Open canvas',
      tabIndex: 0,
    },
    icon
      ? createElement('span', { 'data-sl-ai-canvas-trigger-icon': '' }, icon)
      : null,
    createElement(
      'span',
      { 'data-sl-ai-canvas-trigger-content': '' },
      label
        ? createElement(
            'span',
            { 'data-sl-ai-canvas-trigger-label': '' },
            label
          )
        : null,
      description
        ? createElement(
            'span',
            { 'data-sl-ai-canvas-trigger-description': '' },
            description
          )
        : null
    ),
    isLoading
      ? createElement(
          'span',
          { 'data-sl-ai-canvas-trigger-loading': '' },
          '...'
        )
      : null
  )
})
