/**
 * <AIToolFallback> — generic fallback for tool calls without a registered UI.
 */

import { forwardRef, createElement } from 'react'
import type { ToolStatus } from '../../types/public'

export interface AIToolFallbackOptions {
  toolName: string
  args: Record<string, unknown>
  output?: unknown
  status: ToolStatus
}

export type AIToolFallbackProps = AIToolFallbackOptions

export const AIToolFallback = forwardRef<HTMLDivElement, AIToolFallbackProps>(
  function AIToolFallback(props, ref) {
    const { toolName, args, output, status } = props

    return createElement(
      'div',
      {
        ref,
        'data-sl-ai-tool-fallback': '',
        'data-status': status,
      },
      createElement(
        'div',
        { 'data-sl-ai-tool-fallback-header': '' },
        createElement(
          'span',
          { 'data-sl-ai-tool-fallback-name': '' },
          toolName
        ),
        createElement('span', { 'data-sl-ai-tool-fallback-status': '' }, status)
      ),
      createElement(
        'details',
        { 'data-sl-ai-tool-fallback-args': '' },
        createElement('summary', null, 'Arguments'),
        createElement('pre', null, JSON.stringify(args, null, 2))
      ),
      output !== undefined
        ? createElement(
            'details',
            { 'data-sl-ai-tool-fallback-output': '', open: true },
            createElement('summary', null, 'Output'),
            createElement(
              'pre',
              null,
              typeof output === 'string'
                ? output
                : JSON.stringify(output, null, 2)
            )
          )
        : null
    )
  }
)
