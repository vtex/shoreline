import { createElement, useEffect } from 'react'

import type { AIMessagePart } from '../../types/public'
import { useAIContextInternal } from '../provider/ai-context'
import { AICanvasTrigger } from '../tool-ui/ai-canvas-trigger'
import { AIToolFallback } from '../tool-ui/ai-tool-fallback'
import { getToolRegistration, toolRegistry } from '../tool-ui/make-ai-tool-ui'
import { AIMessageReasoningText } from './ai-message-reasoning-text'
import { AIMessageReasoningToolStep } from './ai-message-reasoning-tool-step'
import { AIMessageResource } from './ai-message-resource'
import { AIMessageResources } from './ai-message-resources'
import { AIMessageText } from './ai-message-text'
import type {
  AIMessageGroupKey,
  AIMessagePartMeta,
  GroupByContext,
  RenderDefaultPartsOptions,
} from './types'

/**
 * Default grouping: reasoning and unregistered tools belong to the CoT group.
 */
export function defaultMessageGroupBy(
  part: AIMessagePart,
  ctx: GroupByContext
): AIMessageGroupKey[] | null {
  if (part.type === 'reasoning') {
    return ['group-cot']
  }

  if (part.type === 'tool') {
    const registration = ctx.toolRegistry.get(part.name)

    if (!registration) {
      return ['group-cot']
    }

    return null
  }

  return null
}

function CanvasToolRenderer(props: {
  part: Extract<AIMessagePart, { type: 'tool' }>
  registration: NonNullable<ReturnType<typeof getToolRegistration>>
}) {
  const { part, registration } = props
  const context = useAIContextInternal()
  const Trigger = registration.trigger
  const toolCallId =
    (part.metadata?.toolCallId as string | undefined) ?? part.name

  function handleOpenCanvas() {
    context.openCanvas({
      toolCallId,
      component: part.name,
      args: part.args,
      result: part.output,
      status: part.status,
    })
  }

  useEffect(() => {
    if (
      registration.defaultOpen &&
      part.status === 'running' &&
      context.canvas.toolCallId !== toolCallId
    ) {
      handleOpenCanvas()
    }
  }, [
    context.canvas.toolCallId,
    part.status,
    registration.defaultOpen,
    toolCallId,
  ])

  if (Trigger) {
    return createElement(Trigger, {
      args: part.args,
      result: part.output,
      status: part.status,
      toolName: part.name,
      isLoading: part.status === 'running',
      openCanvas: handleOpenCanvas,
    })
  }

  return createElement(AICanvasTrigger, {
    label: part.name,
    isLoading: part.status === 'running',
    onClick: handleOpenCanvas,
  })
}

function WidgetToolRenderer(props: {
  part: Extract<AIMessagePart, { type: 'tool' }>
  registration: NonNullable<ReturnType<typeof getToolRegistration>>
}) {
  const { part, registration } = props
  const Render = registration.render
  const toolCallId =
    (part.metadata?.toolCallId as string | undefined) ?? part.name

  return createElement(Render, {
    args: part.args,
    result: part.output,
    status: part.status,
    toolCallId,
    toolName: part.name,
    isError: part.status === 'error',
    metadata: part.metadata,
  })
}

/**
 * Built-in renderer for message parts, including tool registry lookup.
 */
export function renderDefaultParts(
  part: AIMessagePart,
  meta: AIMessagePartMeta,
  options: RenderDefaultPartsOptions = {}
): React.ReactNode {
  const showReasoningTools = options.showReasoningTools ?? true

  if (part.type === 'text') {
    return <AIMessageText key={meta.index} />
  }

  if (part.type === 'reasoning' && meta.placement === 'cot') {
    return <AIMessageReasoningText key={meta.index} />
  }

  if (part.type === 'resource') {
    return (
      <AIMessageResources key={meta.index}>
        <AIMessageResource />
      </AIMessageResources>
    )
  }

  if (part.type === 'tool') {
    const registration =
      meta.toolRegistration ?? getToolRegistration(part.name) ?? null

    if (registration?.mode === 'widget') {
      return (
        <WidgetToolRenderer
          part={part}
          registration={registration}
          key={meta.index}
        />
      )
    }

    if (registration?.mode === 'canvas') {
      return (
        <CanvasToolRenderer
          part={part}
          registration={registration}
          key={meta.index}
        />
      )
    }

    if (meta.placement === 'cot') {
      if (!showReasoningTools) {
        return null
      }

      return <AIMessageReasoningToolStep part={part} key={meta.index} />
    }

    return (
      <AIToolFallback
        key={meta.index}
        toolName={part.name}
        args={part.args}
        output={part.output}
        status={part.status}
      />
    )
  }

  return null
}

export { toolRegistry }
