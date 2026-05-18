/**
 * <AICanvas> — renders the active canvas tool UI.
 * Positioned freely by the consumer in their layout.
 */

import { type ReactNode, forwardRef, createElement } from 'react'

import { useAIContext } from '../provider/ai-context'
import { getToolRegistration } from './make-ai-tool-ui'
import type { ToolStatus } from '../../types/public'

export interface AICanvasOptions {
  children?: ReactNode
}

export type AICanvasProps = AICanvasOptions

export const AICanvas = forwardRef<HTMLDivElement, AICanvasProps>(
  function AICanvas(props, ref) {
    const { children } = props
    const { canvas, closeCanvas } = useAIContext()

    if (!canvas.open || !canvas.component) {
      return null
    }

    const registration = getToolRegistration(canvas.component)

    if (!registration) {
      return null
    }

    const content =
      children ??
      createElement(registration.render, {
        args: canvas.args,
        result: canvas.result,
        status: canvas.status as ToolStatus,
        toolCallId: canvas.toolCallId ?? '',
        toolName: canvas.component,
        isError: canvas.status === 'error',
      })

    return createElement(
      'div',
      {
        ref,
        'data-sl-ai-canvas': '',
        role: 'complementary',
        'aria-label': `Canvas: ${canvas.component}`,
      },
      createElement(
        'div',
        { 'data-sl-ai-canvas-header': '' },
        createElement(
          'button',
          {
            type: 'button',
            onClick: closeCanvas,
            'data-sl-ai-canvas-close': '',
            'aria-label': 'Close canvas',
            tabIndex: 0,
          },
          '×'
        )
      ),
      createElement('div', { 'data-sl-ai-canvas-body': '' }, content)
    )
  }
)
