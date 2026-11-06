import {
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import {
  Button,
  Field,
  IconCaretDown,
  IconCaretRight,
  Label,
  Select,
  SelectItem,
  Tag,
  Text,
  forwardRef,
} from '@vtex/shoreline'

import type {
  AIMessagePart,
  AIReasoningPart,
  AIResourcePart,
  AITextPart,
  AIToolPart,
} from '../../types/public'
import { useAIStreamDebug } from './stream-debug-context'
import type { AIStreamDebugRun, AIStreamDebugStep } from './types'

/** `HH:MM:SS.mmm` in UTC. */
function formatTime(iso: string): string {
  return iso.slice(11, 23)
}

function toJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2) ?? String(value)
  } catch {
    return String(value)
  }
}

function summarize(step: AIStreamDebugStep): string {
  if (step.changes.length === 0) return 'no changes'

  return step.changes
    .map((change) => `${change.type} ${change.kind}`)
    .join(', ')
}

function runLabel(run: AIStreamDebugRun): string {
  return `${formatTime(run.startedAt)} · ${run.status} · ${run.steps.length} steps`
}

function Json(props: { value: unknown }) {
  return <pre data-sl-ai-stream-debug-json>{toJson(props.value)}</pre>
}

function RunDetails(props: { run: AIStreamDebugRun }) {
  const { run } = props

  return (
    <div data-sl-ai-stream-debug-details>
      <Text as="p" variant="caption1">
        Status: {run.status}
      </Text>
      <Text as="p" variant="caption1">
        Run id: {run.runId}
      </Text>
      <Text as="p" variant="caption1">
        Thread id: {run.threadId ?? 'none'}
      </Text>
      <Text as="p" variant="caption1">
        User message id: {run.userMessageId}
      </Text>
      <Text as="p" variant="caption1">
        Started: {formatTime(run.startedAt)}
        {run.endedAt ? ` · Ended: ${formatTime(run.endedAt)}` : ''}
      </Text>
      {run.error ? (
        <Text as="p" variant="caption1" data-sl-ai-stream-debug-error>
          Error: {run.error}
        </Text>
      ) : null}
    </div>
  )
}

function StepRow(props: {
  step: AIStreamDebugStep
  expanded: boolean
  onToggle: () => void
}) {
  const { step, expanded, onToggle } = props
  const contentId = useId()

  return (
    <li data-sl-ai-stream-debug-step>
      <button
        type="button"
        data-sl-ai-stream-debug-step-trigger
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={onToggle}
      >
        {expanded ? <IconCaretDown /> : <IconCaretRight />}
        <span>Step {step.index}</span>
        {' · '}
        <span>{formatTime(step.at)}</span>
        {' · '}
        <span>{step.status ?? 'no status'}</span>
        {' · '}
        <span>{summarize(step)}</span>
      </button>
      <div
        id={contentId}
        hidden={!expanded}
        data-sl-ai-stream-debug-step-content
      >
        {expanded ? <StepContent step={step} /> : null}
      </div>
    </li>
  )
}

function StepContent(props: { step: AIStreamDebugStep }) {
  const { changes, debug } = props.step

  return (
    <>
      {changes.length > 0 ? (
        <ul aria-label="Changes" data-sl-ai-stream-debug-changes>
          {changes.map((change) => (
            <li key={change.partIndex}>
              <Text variant="caption1">
                Part {change.partIndex} · {change.type} {change.kind}
              </Text>
              {change.delta !== undefined ? (
                <Json value={change.delta} />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {debug !== undefined ? (
        <>
          <Text as="p" variant="caption1">
            Debug data
          </Text>
          <Json value={debug} />
        </>
      ) : null}
      {changes.length === 0 && debug === undefined ? (
        <Text as="p" variant="caption1">
          Same parts as the previous step and no debug data.
        </Text>
      ) : null}
    </>
  )
}

function PartTag(props: { children: ReactNode }) {
  return <Tag variant="secondary">{props.children}</Tag>
}

function TextPartView(props: { part: AITextPart }) {
  return (
    <>
      <PartTag>text</PartTag>
      <Text as="p" variant="body" data-sl-ai-stream-debug-part-text>
        {props.part.text}
      </Text>
    </>
  )
}

function ReasoningPartView(props: { part: AIReasoningPart }) {
  return (
    <>
      <PartTag>reasoning</PartTag>
      <Text variant="caption1"> {props.part.status}</Text>
      <Text as="p" variant="body" data-sl-ai-stream-debug-part-text>
        {props.part.text}
      </Text>
    </>
  )
}

function ToolPartView(props: { part: AIToolPart }) {
  const { name, status, args, output, error } = props.part

  return (
    <>
      <PartTag>tool</PartTag>
      <Text variant="caption1">
        {' '}
        {name} · {status}
      </Text>
      <Json value={{ args, output, error }} />
    </>
  )
}

function ResourcePartView(props: { part: AIResourcePart }) {
  const { name, uri, mimeType } = props.part

  return (
    <>
      <PartTag>resource</PartTag>
      <Text variant="caption1">
        {' '}
        {name} · {mimeType ?? 'no type'}
      </Text>
      <Text as="p" variant="caption1" data-sl-ai-stream-debug-part-text>
        {uri}
      </Text>
    </>
  )
}

function PartView(props: { part: AIMessagePart }) {
  const { part } = props

  switch (part.type) {
    case 'text':
      return <TextPartView part={part} />
    case 'reasoning':
      return <ReasoningPartView part={part} />
    case 'tool':
      return <ToolPartView part={part} />
    case 'resource':
      return <ResourcePartView part={part} />
  }
}

/**
 * Shows one recorded run: its details and error, one row per snapshot, and
 * the final parts in stream order. `AIStreamDebugPanel` uses it for the
 * selected run. Use it alone to build your own debug view.
 *
 * @status experimental
 * @example
 * const { runs } = useAIStreamDebug()
 *
 * return runs[0] ? <AIStreamDebugRunView run={runs[0]} /> : null
 */
export const AIStreamDebugRunView = forwardRef<
  HTMLDivElement,
  AIStreamDebugRunViewProps
>(function AIStreamDebugRunView(props, ref) {
  const { run, ...divProps } = props
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set())

  function toggle(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev)

      if (next.has(key)) next.delete(key)
      else next.add(key)

      return next
    })
  }

  return (
    <div ref={ref} data-sl-ai-stream-debug-run {...divProps}>
      <RunDetails run={run} />

      <Text as="p" variant="emphasis">
        Steps
      </Text>
      {run.steps.length === 0 ? (
        <Text as="p" variant="caption1">
          No snapshots received.
        </Text>
      ) : (
        <ol aria-label="Steps" data-sl-ai-stream-debug-steps>
          {run.steps.map((step) => {
            const key = `${run.runId}:${step.index}`

            return (
              <StepRow
                key={key}
                step={step}
                expanded={expanded.has(key)}
                onToggle={() => toggle(key)}
              />
            )
          })}
        </ol>
      )}

      <Text as="p" variant="emphasis">
        Final parts
      </Text>
      {run.finalParts.length === 0 ? (
        <Text as="p" variant="caption1">
          {run.endedAt
            ? 'The run ended with no parts.'
            : 'Shown when the run ends.'}
        </Text>
      ) : (
        <ol aria-label="Final parts" data-sl-ai-stream-debug-parts>
          {run.finalParts.map((part, index) => (
            <li key={index} data-sl-ai-stream-debug-part data-type={part.type}>
              <PartView part={part} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
})

/**
 * Own props of `AIStreamDebugRunView`.
 *
 * @status experimental
 * @example
 * <AIStreamDebugRunView run={run} />
 */
export interface AIStreamDebugRunViewOptions {
  /** Run to show, usually an item of `useAIStreamDebug().runs`. */
  run: AIStreamDebugRun
}

/**
 * Props of `AIStreamDebugRunView`: `AIStreamDebugRunViewOptions` plus `div`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIStreamDebugRunView run={run} />
 */
export type AIStreamDebugRunViewProps = AIStreamDebugRunViewOptions &
  ComponentPropsWithoutRef<'div'>

/**
 * Shows the runs recorded by the nearest `AIProvider` with `debugStream` on:
 * a run picker (newest first), the run details and error, one row per
 * snapshot received from the transport, and the final parts in stream order.
 * Expand a row to see what changed and the `debug` data of the snapshot.
 *
 * Use it while building a transport. Do not ship it to users.
 *
 * @status experimental
 * @example
 * <AIProvider runtime={runtime} debugStream>
 *   <AIThread />
 *   <AIStreamDebugPanel />
 * </AIProvider>
 */
export const AIStreamDebugPanel = forwardRef<
  HTMLElement,
  AIStreamDebugPanelProps
>(function AIStreamDebugPanel(props, ref) {
  const { title = 'Stream debug', ...sectionProps } = props
  const { enabled, runs, clear } = useAIStreamDebug()
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null)
  const titleId = useId()

  const selected = runs.find((run) => run.runId === selectedRunId) ?? runs[0]

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      data-sl-ai-stream-debug
      {...sectionProps}
    >
      <div data-sl-ai-stream-debug-header>
        <Text id={titleId} variant="emphasis">
          {title}
        </Text>
        {enabled ? (
          <Button
            variant="tertiary"
            disabled={runs.length === 0}
            onClick={() => {
              clear()
              setSelectedRunId(null)
            }}
          >
            Clear
          </Button>
        ) : null}
      </div>

      {!enabled ? (
        <Text as="p" variant="body">
          Debug is off. Pass debugStream to AIProvider to record runs.
        </Text>
      ) : !selected ? (
        <Text as="p" variant="body">
          No runs yet. Send a message to record one.
        </Text>
      ) : (
        <>
          <Field>
            <Label>Run</Label>
            <Select
              value={selected.runId}
              setValue={(value) => setSelectedRunId(String(value))}
            >
              {runs.map((run) => (
                <SelectItem key={run.runId} value={run.runId}>
                  {runLabel(run)}
                </SelectItem>
              ))}
            </Select>
          </Field>
          <AIStreamDebugRunView key={selected.runId} run={selected} />
        </>
      )}
    </section>
  )
})

/**
 * Own props of `AIStreamDebugPanel`.
 *
 * @status experimental
 * @example
 * <AIStreamDebugPanel title="Transport debug" />
 */
export interface AIStreamDebugPanelOptions {
  /**
   * Title shown at the top of the panel. It also names the panel region.
   * @default 'Stream debug'
   */
  title?: ReactNode
}

/**
 * Props of `AIStreamDebugPanel`: `AIStreamDebugPanelOptions` plus `section`
 * attributes.
 *
 * @status experimental
 * @example
 * <AIStreamDebugPanel title="Transport debug" />
 */
export type AIStreamDebugPanelProps = AIStreamDebugPanelOptions &
  Omit<ComponentPropsWithoutRef<'section'>, 'title'>
