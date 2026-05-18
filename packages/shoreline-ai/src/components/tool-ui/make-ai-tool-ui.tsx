/**
 * makeAIToolUI — registers a custom React component for rendering tool calls.
 *
 * Supports two modes:
 * - 'widget': renders inline in the message (wraps makeAssistantToolUI)
 * - 'canvas': renders a trigger in the message, full component in <AICanvas>
 */

import type { ComponentType } from 'react'
import { createElement, useContext } from 'react'
import { makeAssistantToolUI } from '@assistant-ui/react'
import type {
  AIToolRenderMode,
  AIToolUIRenderProps,
  AIToolUITriggerProps,
  ToolStatus,
} from '../../types/public'
import { AIContext } from '../provider/ai-context'

interface AIToolUIOptions<TArgs = unknown, TResult = unknown> {
  component: string
  mode?: AIToolRenderMode
  render: ComponentType<AIToolUIRenderProps<TArgs, TResult>>
  trigger?: ComponentType<AIToolUITriggerProps<TArgs, TResult>>
  defaultOpen?: boolean
}

const toolRegistry = new Map<
  string,
  {
    mode: AIToolRenderMode
    render: ComponentType<AIToolUIRenderProps>
    trigger?: ComponentType<AIToolUITriggerProps>
    defaultOpen: boolean
  }
>()

function mapToolCallStatus(status: string | undefined): ToolStatus {
  if (status === 'complete' || status === 'success') return 'complete'
  if (status === 'error' || status === 'incomplete') return 'error'

  return 'running'
}

export function makeAIToolUI<TArgs = unknown, TResult = unknown>(
  options: AIToolUIOptions<TArgs, TResult>
): ComponentType {
  const {
    component,
    mode = 'widget',
    render,
    trigger,
    defaultOpen = false,
  } = options

  toolRegistry.set(component, {
    mode,
    render: render as ComponentType<AIToolUIRenderProps>,
    trigger: trigger as ComponentType<AIToolUITriggerProps> | undefined,
    defaultOpen,
  })

  if (mode === 'widget') {
    return makeAssistantToolUI({
      toolName: component,
      render: function WidgetToolUI(props) {
        const status = mapToolCallStatus(
          (props as Record<string, unknown>).status as string | undefined
        )

        return createElement(render as ComponentType<AIToolUIRenderProps>, {
          args: (props.args ?? {}) as TArgs,
          result: props.result as TResult | undefined,
          status,
          toolCallId: props.toolCallId ?? '',
          toolName: props.toolName ?? component,
          isError: props.isError ?? false,
          metadata: ((props.args ?? {}) as Record<string, unknown>).metadata as
            | Record<string, unknown>
            | undefined,
        })
      },
    })
  }

  // mode === 'canvas'
  return makeAssistantToolUI({
    toolName: component,
    render: function CanvasToolUI(props) {
      const context = useContext(AIContext)
      const status = mapToolCallStatus(
        (props as Record<string, unknown>).status as string | undefined
      )

      const handleOpenCanvas = () => {
        context?.openCanvas({
          toolCallId: props.toolCallId ?? '',
          component,
          args: props.args,
          result: props.result,
          status,
        })
      }

      // Auto-open if defaultOpen
      if (
        defaultOpen &&
        status === 'running' &&
        context?.canvas.toolCallId !== props.toolCallId
      ) {
        handleOpenCanvas()
      }

      const triggerProps: AIToolUITriggerProps<TArgs, TResult> = {
        args: (props.args ?? {}) as TArgs,
        result: props.result as TResult | undefined,
        status,
        toolName: props.toolName ?? component,
        isLoading: status === 'running',
        openCanvas: handleOpenCanvas,
      }

      if (trigger) {
        return createElement(
          trigger as ComponentType<AIToolUITriggerProps>,
          triggerProps
        )
      }

      return createElement(AICanvasTriggerDefault, {
        label: props.toolName ?? component,
        isLoading: status === 'running',
        onClick: handleOpenCanvas,
      })
    },
  })
}

function AICanvasTriggerDefault(props: {
  label: string
  isLoading: boolean
  onClick: () => void
}) {
  return createElement(
    'button',
    {
      type: 'button',
      onClick: props.onClick,
      'data-sl-ai-canvas-trigger': '',
      'data-loading': props.isLoading || undefined,
      'aria-label': `Open ${props.label}`,
      tabIndex: 0,
    },
    props.isLoading ? 'Loading...' : props.label
  )
}

export function getToolRegistration(component: string) {
  return toolRegistry.get(component)
}

export { toolRegistry }
