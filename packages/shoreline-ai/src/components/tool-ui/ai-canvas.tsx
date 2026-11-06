/**
 * <AICanvas> — renders the active canvas tool UI.
 * Positioned freely by the consumer in their layout.
 */

import { IconButton, IconXSmall } from '@vtex/shoreline'
import { forwardRef, type ReactNode } from 'react'

import type { ToolStatus } from '../../types/public'
import { useAIContext } from '../provider/ai-context'
import { getToolRegistration } from './make-ai-tool-ui'

/**
 * Own props of `AICanvas`.
 *
 * @status experimental
 * @example
 * <AICanvas>Custom content</AICanvas>
 */
export interface AICanvasOptions {
  /**
   * Content shown instead of the registered tool UI.
   * @default the registered tool UI
   */
  children?: ReactNode
}

/**
 * Props of `AICanvas`.
 *
 * @status experimental
 * @example
 * <AICanvas />
 */
export type AICanvasProps = AICanvasOptions

/**
 * Shows the component of the tool UI that is open in canvas mode. Place it
 * where you want the canvas in your layout.
 *
 * @status experimental
 * @example
 * <AIProvider runtime={runtime}>
 *   <AIThread />
 *   <AICanvas />
 * </AIProvider>
 */
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

    const Render = registration.render

    const content = children ?? (
      <Render
        args={canvas.args}
        result={canvas.result}
        status={canvas.status as ToolStatus}
        toolCallId={canvas.toolCallId ?? ''}
        toolName={canvas.component}
        isError={canvas.status === 'error'}
      />
    )

    return (
      <div
        ref={ref}
        data-sl-ai-canvas=""
        role="complementary"
        aria-label={`Canvas: ${canvas.component}`}
      >
        <div data-sl-ai-canvas-header="">
          <IconButton
            label="Close canvas"
            variant="tertiary"
            onClick={closeCanvas}
            data-sl-ai-canvas-close=""
          >
            <IconXSmall />
          </IconButton>
        </div>
        <div data-sl-ai-canvas-body="">{content}</div>
      </div>
    )
  }
)
