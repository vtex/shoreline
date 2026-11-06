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

/** Options of `makeAIToolUI`. */
interface AIToolUIOptions<TArgs = unknown, TResult = unknown> {
  /** Name of the tool this component renders. */
  component: string
  /**
   * `widget` renders inside the message. `canvas` shows a trigger in the
   * message and the component in `AICanvas`.
   * @default 'widget'
   */
  mode?: AIToolRenderMode
  /** Component that renders the tool call. */
  render: ComponentType<AIToolUIRenderProps<TArgs, TResult>>
  /**
   * Component shown in the message in `canvas` mode.
   * @default undefined
   */
  trigger?: ComponentType<AIToolUITriggerProps<TArgs, TResult>>
  /**
   * Opens the canvas when the tool call appears.
   * @default false
   */
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

/**
 * Registers a React component that renders a tool call by name. In `widget`
 * mode it renders inside the message. In `canvas` mode the message shows a
 * trigger and `AICanvas` shows the component. Render the returned component
 * once inside `AIProvider`.
 *
 * @status experimental
 * @example
 * const ChartToolUI = makeAIToolUI<{ title: string }>({
 *   component: 'show_chart',
 *   render: ({ args }) => <h3>{args.title}</h3>,
 * })
 *
 * <ChartToolUI />
 */
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
