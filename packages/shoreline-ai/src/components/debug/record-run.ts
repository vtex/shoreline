import type { AIMessagePart } from '../../types/public'
import type {
  AIStreamDebugChange,
  AIStreamDebugRun,
  AIStreamDebugStep,
} from './types'

function textOf(part: AIMessagePart): string | undefined {
  return part.type === 'text' || part.type === 'reasoning'
    ? part.text
    : undefined
}

function textDelta(
  prev: AIMessagePart | undefined,
  next: AIMessagePart
): string | undefined {
  const nextText = textOf(next)

  if (!nextText) return undefined

  const prevText = prev ? (textOf(prev) ?? '') : ''

  if (!nextText.startsWith(prevText)) return undefined

  return nextText.slice(prevText.length) || undefined
}

/**
 * Lists the parts of `next` that are new or different from `prev`, in the
 * order they appear in `next`. For text and reasoning parts that grew, the
 * added text is in `delta`.
 *
 * @status experimental
 * @example
 * diffSnapshot(
 *   [{ type: 'text', text: 'Hel' }],
 *   [{ type: 'text', text: 'Hello' }]
 * )
 * // [{ partIndex: 0, type: 'text', kind: 'updated', delta: 'lo' }]
 */
export function diffSnapshot(
  prev: AIMessagePart[],
  next: AIMessagePart[]
): AIStreamDebugChange[] {
  const changes: AIStreamDebugChange[] = []

  next.forEach((part, partIndex) => {
    const before = prev[partIndex]

    if (before === part) return

    const isNew = !before || before.type !== part.type

    if (!isNew && JSON.stringify(before) === JSON.stringify(part)) return

    const delta = textDelta(isNew ? undefined : before, part)

    changes.push({
      partIndex,
      type: part.type,
      kind: isNew ? 'added' : 'updated',
      ...(delta !== undefined && { delta }),
    })
  })

  return changes
}

/** Adds a run at the top of the list and drops the oldest past `maxRuns`. */
export function addRun(
  runs: AIStreamDebugRun[],
  run: AIStreamDebugRun,
  maxRuns: number
): AIStreamDebugRun[] {
  return [run, ...runs].slice(0, Math.max(1, maxRuns))
}

/** Adds a step to a run and drops its oldest steps past `maxSteps`. */
export function addStep(
  runs: AIStreamDebugRun[],
  runId: string,
  step: AIStreamDebugStep,
  maxSteps: number
): AIStreamDebugRun[] {
  return runs.map((run) =>
    run.runId === runId
      ? {
          ...run,
          status: 'streaming',
          steps: [...run.steps, step].slice(-Math.max(1, maxSteps)),
        }
      : run
  )
}

/** Marks a run as ended. */
export function endRun(
  runs: AIStreamDebugRun[],
  runId: string,
  end: Pick<AIStreamDebugRun, 'status' | 'error' | 'finalParts' | 'endedAt'>
): AIStreamDebugRun[] {
  return runs.map((run) => (run.runId === runId ? { ...run, ...end } : run))
}
