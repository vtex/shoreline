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
  Text,
  forwardRef,
} from '@vtex/shoreline'

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

/**
 * Types of the parts of a snapshot, in order, for the step header. It only
 * reads the `type` of each part, so a new part type shows up as it is and a
 * snapshot of another shape shows nothing.
 */
function partTypes(snapshot: unknown): string {
  const parts = (snapshot as { parts?: unknown } | null | undefined)?.parts

  if (!Array.isArray(parts)) return ''

  const types: string[] = []

  for (const part of parts) {
    const type = (part as { type?: unknown } | null)?.type

    if (typeof type === 'string') types.push(type)
  }

  return types.join(', ')
}

function runLabel(run: AIStreamDebugRun): string {
  return `${formatTime(run.startedAt)} · ${run.status} · ${run.steps.length} steps`
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
        Thread id: {run.threadId}
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
  const types = partTypes(step.snapshot)

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
        {types ? (
          <>
            {' · '}
            <span>{types}</span>
          </>
        ) : null}
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
  const json = toJson(props.step.snapshot)

  function copy() {
    try {
      navigator.clipboard?.writeText(json)?.catch(() => {})
    } catch {
      // Copying is a convenience: the JSON is still on the screen.
    }
  }

  return (
    <>
      <div data-sl-ai-stream-debug-step-actions>
        <Button variant="tertiary" onClick={copy}>
          Copy JSON
        </Button>
      </div>
      <pre data-sl-ai-stream-debug-json>{json}</pre>
    </>
  )
}

/**
 * Shows one recorded run: its details and error, and one row per snapshot.
 * Expand a row to see the raw snapshot as JSON. `AIStreamDebugPanel` uses it
 * for the selected run. Use it alone to build your own debug view.
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
 * snapshot received from the transport. Expand a row to see the raw snapshot
 * as JSON, with a button to copy it.
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
