/**
 * <AICanvasTrigger> — default trigger component for canvas-mode tool UIs.
 * Can be used standalone or as a reference for custom triggers.
 */

import { type ReactNode, forwardRef, createElement } from 'react'

export interface AICanvasTriggerOptions {
  label?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  isLoading?: boolean
  onClick?: () => void
}

export type AICanvasTriggerProps = AICanvasTriggerOptions

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
