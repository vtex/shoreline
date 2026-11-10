import { type ReactNode, useMemo } from 'react'
import {
  act,
  describe,
  expect,
  it,
  render,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { AIProvider } from '../components/provider'
import { createRuntimeBuilder } from '../runtime/builder'
import { getRuntimeCore } from '../runtime/runtime-core'
import type { StreamTransport } from '../runtime/types'
import { useRuntime } from '../runtime/use-runtime'
import type { AIThreadError } from '../types/public'
import type { AIRuntime } from '../types/runtime'

// The engine is mounted once, around both providers: it supports a single
// mount. The providers only follow the runs.
const { AssistantRuntimeProvider: EngineProvider } = await vi.importActual<
  typeof import('@assistant-ui/react')
>('@assistant-ui/react')

vi.mock('@assistant-ui/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@assistant-ui/react')>()),
  AssistantRuntimeProvider: (props: { children: ReactNode }) => props.children,
}))

const FAILING_TRANSPORT: StreamTransport = {
  // biome-ignore lint/correctness/useYield: the transport fails before any snapshot
  async *run() {
    throw new Error('boom')
  },
}

function SharedRuntime(props: {
  runtimeRef: { current: AIRuntime | null }
  onFirstError: (error: AIThreadError) => void
  onSecondError: (error: AIThreadError) => void
}) {
  const built = useMemo(
    () => createRuntimeBuilder().transport(FAILING_TRANSPORT).build(),
    []
  )
  const runtime = useRuntime(built)

  props.runtimeRef.current = runtime

  return (
    <EngineProvider runtime={getRuntimeCore(runtime).engine}>
      <AIProvider runtime={runtime} onRunError={props.onFirstError} />
      <AIProvider runtime={runtime} onRunError={props.onSecondError} />
    </EngineProvider>
  )
}

describe('shared runtime', () => {
  it('reports a run to every provider that uses the runtime', async () => {
    const runtimeRef: { current: AIRuntime | null } = { current: null }
    const onFirstError = vi.fn()
    const onSecondError = vi.fn()

    render(
      <SharedRuntime
        runtimeRef={runtimeRef}
        onFirstError={onFirstError}
        onSecondError={onSecondError}
      />
    )

    const runtime = runtimeRef.current

    if (!runtime) throw new Error('runtime was not created')

    act(() => {
      getRuntimeCore(runtime).engine.thread.append({
        role: 'user',
        content: [{ type: 'text', text: 'hello' }],
        startRun: true,
      })
    })

    await waitFor(() => expect(onFirstError).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(onSecondError).toHaveBeenCalledTimes(1))
    expect(onFirstError).toHaveBeenCalledWith({ type: 'run', message: 'boom' })
    expect(onSecondError).toHaveBeenCalledWith({ type: 'run', message: 'boom' })
  })
})
