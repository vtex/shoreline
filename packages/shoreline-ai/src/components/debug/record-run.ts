import type { AIStreamDebugRun, AIStreamDebugStep } from './types'

/**
 * Copies a snapshot so later changes to the original do not change the
 * record. A value that `structuredClone` cannot copy (a function, for
 * example) is copied through JSON. When that fails too, the value itself is
 * kept. It never throws.
 *
 * @status experimental
 * @example
 * const copy = copySnapshot({ parts: [{ type: 'text', text: 'Hi' }] })
 */
export function copySnapshot(value: unknown): unknown {
  try {
    return structuredClone(value)
  } catch {
    try {
      return JSON.parse(JSON.stringify(value))
    } catch {
      return value
    }
  }
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
  end: Pick<AIStreamDebugRun, 'status' | 'error' | 'endedAt'>
): AIStreamDebugRun[] {
  return runs.map((run) => (run.runId === runId ? { ...run, ...end } : run))
}
