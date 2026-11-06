import {
  act,
  describe,
  expect,
  it,
  renderHook,
  waitFor,
} from '@vtex/shoreline-test-utils'
import type { ReactNode } from 'react'
import { vi } from 'vitest'

import { MockRuntimeProvider } from '../../test-utils'
import type { AIThreadData } from '../../types/public'
import type { AIThreadAdapter } from '../../types/threads'
import { useAIThread } from '../use-ai-thread'
import { useAIThreadList } from '../use-ai-thread-list'

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

const THREADS: AIThreadData[] = [
  { id: 'a', title: 'First', createdAt: '2026-01-01' },
  { id: 'b', title: 'Second', createdAt: '2026-01-02' },
]

function setup(adapter?: AIThreadAdapter) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MockRuntimeProvider threads={adapter}>{children}</MockRuntimeProvider>
  )

  return renderHook(
    () => ({ list: useAIThreadList(), thread: useAIThread() }),
    {
      wrapper,
    }
  )
}

describe('useAIThreadList', () => {
  it('loads the list once on mount', async () => {
    const list = vi.fn().mockResolvedValue(THREADS)
    const { result } = setup({ list })

    expect(result.current.list.isLoading).toBe(true)
    await waitFor(() => expect(result.current.list.threads).toEqual(THREADS))
    expect(result.current.list.isLoading).toBe(false)
    expect(list).toHaveBeenCalledTimes(1)
  })

  it('returns an empty list with no error when there is no adapter', async () => {
    const { result } = setup()

    expect(result.current.list.threads).toEqual([])
    expect(result.current.list.isLoading).toBe(false)
    expect(result.current.list.error).toBeNull()
    await expect(result.current.list.refresh()).resolves.toBeUndefined()
  })

  it('refresh fetches again and shares one request while one is pending', async () => {
    const list = vi.fn().mockResolvedValue(THREADS)
    const { result } = setup({ list })

    await waitFor(() => expect(result.current.list.isLoading).toBe(false))

    const next = deferred<AIThreadData[]>()

    list.mockReturnValueOnce(next.promise)

    let first!: Promise<void>
    let second!: Promise<void>

    act(() => {
      first = result.current.list.refresh()
      second = result.current.list.refresh()
    })
    expect(list).toHaveBeenCalledTimes(2)

    await act(async () => {
      next.resolve([THREADS[0]])
      await Promise.all([first, second])
    })
    expect(result.current.list.threads).toEqual([THREADS[0]])
  })

  it('archiveThread marks the thread archived right away and keeps it after the server confirms', async () => {
    const pending = deferred<void>()
    const archive = vi.fn().mockReturnValue(pending.promise)
    const list = vi.fn().mockResolvedValue(THREADS)
    const { result } = setup({ list, archive })

    await waitFor(() => expect(result.current.list.threads).toHaveLength(2))

    let request!: Promise<void>

    act(() => {
      request = result.current.list.archiveThread('a')
    })
    expect(result.current.list.threads[0].archived).toBe(true)
    expect(result.current.list.threads[1].archived).toBeUndefined()

    await act(async () => {
      pending.resolve()
      await request
    })
    expect(archive).toHaveBeenCalledWith('a')
    expect(result.current.list.threads[0].archived).toBe(true)
    expect(list).toHaveBeenCalledTimes(1)
  })

  it('archiveThread restores the thread and sets error thread_archive when archive rejects', async () => {
    const archive = vi.fn().mockRejectedValue(new Error('boom'))
    const { result } = setup({
      list: vi.fn().mockResolvedValue(THREADS),
      archive,
    })

    await waitFor(() => expect(result.current.list.threads).toHaveLength(2))

    await act(async () => {
      await expect(result.current.list.archiveThread('a')).rejects.toBeDefined()
    })
    expect(result.current.list.threads).toEqual(THREADS)
    expect(result.current.list.error).toEqual({
      type: 'thread_archive',
      message: 'boom',
    })
  })

  it('archiveThread rejects with a clear message when the adapter has no archive', async () => {
    const { result } = setup({ list: vi.fn().mockResolvedValue(THREADS) })

    await waitFor(() => expect(result.current.list.threads).toHaveLength(2))
    await expect(result.current.list.archiveThread('a')).rejects.toMatchObject({
      message: expect.stringMatching(/no archive method/),
    })
    expect(result.current.list.threads).toEqual(THREADS)
  })

  it('archiveThread called twice for the same id sends one request', async () => {
    const pending = deferred<void>()
    const archive = vi.fn().mockReturnValue(pending.promise)
    const { result } = setup({
      list: vi.fn().mockResolvedValue(THREADS),
      archive,
    })

    await waitFor(() => expect(result.current.list.threads).toHaveLength(2))

    let first!: Promise<void>
    let second!: Promise<void>

    act(() => {
      first = result.current.list.archiveThread('a')
      second = result.current.list.archiveThread('a')
    })
    expect(archive).toHaveBeenCalledTimes(1)

    await act(async () => {
      pending.resolve()
      await Promise.all([first, second])
    })
  })

  it('archiveThread for an unknown id rejects and leaves the list unchanged', async () => {
    const archive = vi.fn().mockResolvedValue(undefined)
    const { result } = setup({
      list: vi.fn().mockResolvedValue(THREADS),
      archive,
    })

    await waitFor(() => expect(result.current.list.threads).toHaveLength(2))
    await expect(
      result.current.list.archiveThread('zzz')
    ).rejects.toMatchObject({
      message: expect.stringMatching(/not in the list/),
    })
    expect(archive).not.toHaveBeenCalled()
    expect(result.current.list.threads).toEqual(THREADS)
  })

  it('sets error thread_list when list rejects', async () => {
    const { result } = setup({
      list: vi.fn().mockRejectedValue(new Error('down')),
    })

    await waitFor(() =>
      expect(result.current.list.error).toEqual({
        type: 'thread_list',
        message: 'down',
      })
    )
    expect(result.current.list.isLoading).toBe(false)
    expect(result.current.list.threads).toEqual([])
  })

  it('does not archive the active thread automatically switching away', async () => {
    const archive = vi.fn().mockResolvedValue(undefined)
    const { result } = setup({
      list: vi.fn().mockResolvedValue(THREADS),
      archive,
    })

    await waitFor(() => expect(result.current.list.threads).toHaveLength(2))

    const active = result.current.thread.threadId

    await act(async () => {
      await result.current.list.archiveThread('a')
    })
    expect(result.current.thread.threadId).toBe(active)
  })
})
